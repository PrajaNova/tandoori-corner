import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { buildApp } from "../app.js";
import type {
  AccountService,
  AccountSummary,
  LoginChallenge,
} from "../services/account-service.js";
import { createMemoryCatalogService } from "../services/catalog-service.js";
import type { EmailMessage } from "../services/notification-service.js";

function createMemoryAccountService(): AccountService {
  const account: AccountSummary = {
    customer: {
      id: "customer_1",
      email: "asha@example.com",
      marketingOptIn: false,
      createdAt: new Date().toISOString(),
    },
    orders: [],
    bookings: [],
    eventEnquiries: [],
  };
  return {
    linkCustomer: async () => account.customer,
    requestLogin: async () =>
      ({
        customer: account.customer,
        channel: "email",
        destination: "asha@example.com",
        code: "123456",
        expiresAt: new Date(Date.now() + 600_000).toISOString(),
      }) satisfies LoginChallenge,
    verifyLogin: async () => ({ token: "token_1", account }),
    signInWithGoogle: async () => ({ token: "token_1", account }),
    getAccountByToken: async (token) => {
      assert.equal(token, "token_1");
      return account;
    },
  };
}

describe("account routes", () => {
  let app: Awaited<ReturnType<typeof buildApp>> | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
  });

  it("requests a login code, verifies it, and returns account history", async () => {
    const sent: EmailMessage[] = [];
    app = await buildApp({
      accountService: createMemoryAccountService(),
      catalogService: createMemoryCatalogService(),
      notificationService: {
        sendEmail: async (message) => {
          sent.push(message);
        },
        sendWhatsApp: async () => {},
      },
    });

    const login = await app.inject({
      method: "POST",
      url: "/api/account/login",
      payload: { email: "asha@example.com" },
    });
    assert.equal(login.statusCode, 200);
    assert.equal(sent[0].to, "asha@example.com");
    assert.equal(login.json().debugCode, undefined);

    const verify = await app.inject({
      method: "POST",
      url: "/api/account/verify",
      payload: { email: "asha@example.com", code: "123456" },
    });
    assert.equal(verify.statusCode, 200);
    assert.equal(verify.json().token, "token_1");

    const me = await app.inject({
      method: "GET",
      url: "/api/account/me",
      headers: { authorization: "Bearer token_1" },
    });
    assert.equal(me.statusCode, 200);
    assert.equal(me.json().customer.email, "asha@example.com");
  });

  it("rate-limits account login requests", async () => {
    app = await buildApp({
      accountService: createMemoryAccountService(),
      catalogService: createMemoryCatalogService(),
      notificationService: {
        sendEmail: async () => {},
        sendWhatsApp: async () => {},
      },
    });

    let statusCode = 0;
    for (let index = 0; index < 11; index += 1) {
      const response = await app.inject({
        method: "POST",
        url: "/api/account/login",
        remoteAddress: "198.51.100.20",
        payload: { email: "asha@example.com" },
      });
      statusCode = response.statusCode;
    }

    assert.equal(statusCode, 429);
  });

  it("rejects google login when google client id is not configured", async () => {
    app = await buildApp({
      accountService: createMemoryAccountService(),
      catalogService: createMemoryCatalogService(),
      notificationService: {
        sendEmail: async () => {},
        sendWhatsApp: async () => {},
      },
    });

    const response = await app.inject({
      method: "POST",
      url: "/api/account/google",
      payload: { credential: "not.a.real.google.jwt" },
    });

    assert.equal(response.statusCode, 400);
  });
});
