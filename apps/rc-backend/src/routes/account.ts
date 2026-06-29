import type { JsonWebKey } from "node:crypto";
import { createPublicKey, verify } from "node:crypto";
import type {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

import {
  AccountError,
  type AccountService,
  type GoogleAccountProfile,
  type LoginRequest,
} from "../services/account-service.js";
import type { NotificationService } from "../services/notification-service.js";

interface AccountRouteOptions {
  accountService: AccountService;
  googleClientId?: string;
  notificationService: NotificationService;
}

const loginSchema = {
  body: {
    type: "object",
    additionalProperties: false,
    properties: {
      name: { type: "string", maxLength: 120 },
      email: { type: "string", maxLength: 160 },
      phone: { type: "string", maxLength: 40 },
      channel: { type: "string", enum: ["email", "whatsapp"] },
    },
  },
} as const;

const verifySchema = {
  body: {
    type: "object",
    required: ["code"],
    additionalProperties: false,
    properties: {
      email: { type: "string", maxLength: 160 },
      phone: { type: "string", maxLength: 40 },
      code: { type: "string", minLength: 6, maxLength: 6 },
    },
  },
} as const;

const googleSchema = {
  body: {
    type: "object",
    required: ["credential"],
    additionalProperties: false,
    properties: {
      credential: { type: "string", minLength: 20 },
    },
  },
} as const;

type GoogleJwk = JsonWebKey & { kid: string };
let googleKeys: { expiresAt: number; keys: GoogleJwk[] } | undefined;

function decodeBase64UrlJson<T>(value: string): T {
  return JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as T;
}

async function getGoogleKeys() {
  if (googleKeys && googleKeys.expiresAt > Date.now()) return googleKeys.keys;
  const response = await fetch("https://www.googleapis.com/oauth2/v3/certs");
  if (!response.ok) throw new AccountError("INVALID_CODE");
  const maxAge = /max-age=(\d+)/.exec(
    response.headers.get("cache-control") ?? "",
  );
  const body = (await response.json()) as { keys: GoogleJwk[] };
  googleKeys = {
    expiresAt: Date.now() + Number(maxAge?.[1] ?? 3600) * 1000,
    keys: body.keys,
  };
  return body.keys;
}

async function verifyGoogleCredential(
  credential: string,
  clientId: string | undefined,
): Promise<GoogleAccountProfile> {
  if (!clientId) throw new AccountError("INVALID_CODE");
  const [encodedHeader, encodedPayload, encodedSignature] =
    credential.split(".");
  if (!encodedHeader || !encodedPayload || !encodedSignature) {
    throw new AccountError("INVALID_CODE");
  }

  const header = decodeBase64UrlJson<{ alg?: string; kid?: string }>(
    encodedHeader,
  );
  const payload = decodeBase64UrlJson<{
    aud?: string;
    email?: string;
    email_verified?: boolean;
    exp?: number;
    iss?: string;
    name?: string;
    sub?: string;
  }>(encodedPayload);
  if (
    header.alg !== "RS256" ||
    !header.kid ||
    payload.aud !== clientId ||
    !["accounts.google.com", "https://accounts.google.com"].includes(
      payload.iss ?? "",
    ) ||
    !payload.exp ||
    payload.exp * 1000 <= Date.now() ||
    !payload.sub ||
    !payload.email ||
    payload.email_verified !== true
  ) {
    throw new AccountError("INVALID_CODE");
  }

  const key = (await getGoogleKeys()).find((item) => item.kid === header.kid);
  if (!key) throw new AccountError("INVALID_CODE");
  const valid = verify(
    "RSA-SHA256",
    Buffer.from(`${encodedHeader}.${encodedPayload}`),
    createPublicKey({ key, format: "jwk" }),
    Buffer.from(encodedSignature, "base64url"),
  );
  if (!valid) throw new AccountError("INVALID_CODE");

  return { sub: payload.sub, email: payload.email, name: payload.name };
}

function sendAccountError(reply: FastifyReply, error: unknown) {
  if (error instanceof AccountError) {
    const status = error.code === "SESSION_NOT_FOUND" ? 401 : 400;
    return reply.code(status).send({
      error: error.code,
      message: "We could not verify your account. Please try again.",
    });
  }
  throw error;
}

async function sendWithRetry(
  label: string,
  send: () => Promise<void>,
  log: FastifyBaseLogger,
) {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      await send();
      return;
    } catch (error) {
      log.error({ error, label, attempt }, "Account notification failed");
    }
  }
}

function tokenFromHeader(value: string | undefined) {
  return value?.startsWith("Bearer ") ? value.slice("Bearer ".length) : "";
}

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimitAccountRequests(max = 10, windowMs = 60_000) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const key = request.ip;
    const now = Date.now();
    const current = hits.get(key);
    const next =
      current && current.resetAt > now
        ? { count: current.count + 1, resetAt: current.resetAt }
        : { count: 1, resetAt: now + windowMs };
    hits.set(key, next);

    if (next.count > max) {
      return reply.code(429).send({
        error: "RATE_LIMITED",
        message: "Too many account requests. Please try again shortly.",
      });
    }
  };
}

export async function registerAccountRoutes(
  app: FastifyInstance,
  { accountService, googleClientId, notificationService }: AccountRouteOptions,
) {
  app.post(
    "/login",
    { schema: loginSchema, preHandler: rateLimitAccountRequests() },
    async (request, reply) => {
      try {
        const challenge = await accountService.requestLogin(
          request.body as LoginRequest,
        );
        const message = `Your Tandoori Corner account code is ${challenge.code}. It expires in 10 minutes.`;
        if (challenge.channel === "email") {
          await sendWithRetry(
            "account.login.email",
            () =>
              notificationService.sendEmail({
                to: challenge.destination,
                subject: "Your Tandoori Corner login code",
                text: message,
              }),
            request.log,
          );
        } else {
          await sendWithRetry(
            "account.login.whatsapp",
            () =>
              notificationService.sendWhatsApp({
                to: challenge.destination,
                text: message,
              }),
            request.log,
          );
        }

        return reply.send({
          channel: challenge.channel,
          destination: challenge.destination,
          expiresAt: challenge.expiresAt,
        });
      } catch (error) {
        return sendAccountError(reply, error);
      }
    },
  );

  app.post(
    "/verify",
    { schema: verifySchema, preHandler: rateLimitAccountRequests() },
    async (request, reply) => {
      try {
        return await accountService.verifyLogin(
          request.body as { email?: string; phone?: string; code: string },
        );
      } catch (error) {
        return sendAccountError(reply, error);
      }
    },
  );

  app.post(
    "/google",
    { schema: googleSchema, preHandler: rateLimitAccountRequests() },
    async (request, reply) => {
      try {
        const { credential } = request.body as { credential: string };
        const profile = await verifyGoogleCredential(
          credential,
          googleClientId,
        );
        return await accountService.signInWithGoogle(profile);
      } catch (error) {
        return sendAccountError(reply, error);
      }
    },
  );

  app.get("/me", async (request, reply) => {
    try {
      return await accountService.getAccountByToken(
        tokenFromHeader(request.headers.authorization),
      );
    } catch (error) {
      return sendAccountError(reply, error);
    }
  });
}
