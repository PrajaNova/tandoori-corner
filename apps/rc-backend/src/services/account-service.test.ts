import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { AccountError, createPrismaAccountService } from "./account-service.js";

describe("account service security", () => {
  it("does not graft unverified login contact data onto an existing customer", async () => {
    const customer = {
      id: "customer_1",
      googleSub: null,
      name: null,
      email: "asha@example.com",
      phone: null,
      marketingOptIn: false,
      createdAt: new Date(),
    };
    const service = createPrismaAccountService({
      customer: {
        findFirst: async () => customer,
        findUnique: async () => null,
        create: async () => {
          throw new Error("must not create");
        },
        update: async () => {
          throw new Error("must not update");
        },
      },
      customerOtp: {
        create: async ({ data }: { data: { destination: string } }) => data,
      },
      customerSession: {},
      order: {},
      booking: {},
      eventEnquiry: {},
    } as never);

    const challenge = await service.requestLogin({
      email: "asha@example.com",
      phone: "+6599999999",
      channel: "email",
    });

    assert.equal(challenge.destination, "asha@example.com");
    assert.equal(customer.phone, null);
  });

  it("locks an OTP after repeated wrong codes", async () => {
    const customer = {
      id: "customer_1",
      googleSub: null,
      name: null,
      email: "asha@example.com",
      phone: null,
      marketingOptIn: false,
      createdAt: new Date(),
    };
    const otp = {
      id: "otp_1",
      codeHash: "wrong-hash",
      failedAttempts: 0,
      lockedAt: null as Date | null,
    };
    const service = createPrismaAccountService({
      customer: {
        findFirst: async () => customer,
        findUnique: async () => null,
      },
      customerOtp: {
        findFirst: async () => otp,
        update: async ({
          data,
        }: {
          data: { failedAttempts?: { increment: number }; lockedAt?: Date };
        }) => {
          otp.failedAttempts += data.failedAttempts?.increment ?? 0;
          otp.lockedAt = data.lockedAt ?? otp.lockedAt;
          return otp;
        },
      },
      customerSession: {},
      order: {},
      booking: {},
      eventEnquiry: {},
    } as never);

    for (let index = 0; index < 5; index += 1) {
      await assert.rejects(
        service.verifyLogin({
          email: "asha@example.com",
          code: "000000",
        }),
        AccountError,
      );
    }

    assert.ok(otp.lockedAt);
    await assert.rejects(
      service.verifyLogin({ email: "asha@example.com", code: "123456" }),
      AccountError,
    );
  });
});
