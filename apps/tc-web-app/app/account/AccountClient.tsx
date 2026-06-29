"use client";

import { useCallback, useEffect, useState } from "react";

type AccountSummary = {
  customer: { name?: string; email?: string; phone?: string };
  orders: Array<{
    id: string;
    status: string;
    totalCents: number;
    createdAt: string;
  }>;
  bookings: Array<{
    id: string;
    status: string;
    bookedFor: string;
    partySize: number;
  }>;
  eventEnquiries: Array<{
    id: string;
    status: string;
    eventType: string;
    guestCount: number;
  }>;
};

const tokenKey = "tc_account_token";

function apiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
}

export function AccountClient() {
  const [identity, setIdentity] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [debugCode, setDebugCode] = useState<string | undefined>();
  const [account, setAccount] = useState<AccountSummary | null>(null);

  const loadAccount = useCallback(async (token: string) => {
    const response = await fetch(`${apiBaseUrl()}/api/account/me`, {
      headers: { authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      localStorage.removeItem(tokenKey);
      return;
    }
    setAccount((await response.json()) as AccountSummary);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    if (token) void loadAccount(token);
  }, [loadAccount]);

  async function requestCode(event: React.FormEvent) {
    event.preventDefault();
    setStatus("Sending code...");
    const isEmail = identity.includes("@");
    const response = await fetch(`${apiBaseUrl()}/api/account/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(isEmail ? { email: identity } : { phone: identity }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      setStatus(body.message ?? "Could not send code.");
      return;
    }
    setDebugCode(body.debugCode);
    setStatus(`Code sent by ${body.channel}.`);
  }

  async function verifyCode(event: React.FormEvent) {
    event.preventDefault();
    setStatus("Verifying...");
    const isEmail = identity.includes("@");
    const response = await fetch(`${apiBaseUrl()}/api/account/verify`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(
        isEmail ? { email: identity, code } : { phone: identity, code },
      ),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      setStatus(body.message ?? "Invalid code.");
      return;
    }
    localStorage.setItem(tokenKey, body.token);
    setAccount(body.account);
    setStatus(null);
  }

  if (account) {
    return (
      <div className="space-y-8">
        <div className="border border-border bg-white p-6">
          <h2 className="text-xl font-semibold text-ink">
            {account.customer.name ??
              account.customer.email ??
              account.customer.phone}
          </h2>
          <button
            type="button"
            className="mt-3 text-sm font-bold uppercase tracking-widest text-brand-gold"
            onClick={() => {
              localStorage.removeItem(tokenKey);
              setAccount(null);
            }}
          >
            Sign out
          </button>
        </div>
        <AccountList
          title="Orders"
          items={account.orders}
          empty="No orders yet."
        />
        <AccountList
          title="Bookings"
          items={account.bookings}
          empty="No bookings yet."
        />
        <AccountList
          title="Event enquiries"
          items={account.eventEnquiries}
          empty="No event enquiries yet."
        />
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <form
        onSubmit={requestCode}
        className="border border-border bg-white p-6"
      >
        <h2 className="text-xl font-semibold text-ink">Send login code</h2>
        <input
          required
          value={identity}
          onChange={(event) => setIdentity(event.target.value)}
          placeholder="Email or WhatsApp number"
          className="mt-5 h-12 w-full border border-border bg-transparent px-3"
        />
        <button
          type="submit"
          className="mt-4 bg-ink px-5 py-3 text-sm font-bold uppercase tracking-widest text-white"
        >
          Send Code
        </button>
      </form>
      <form onSubmit={verifyCode} className="border border-border bg-white p-6">
        <h2 className="text-xl font-semibold text-ink">Verify</h2>
        <input
          required
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="6-digit code"
          className="mt-5 h-12 w-full border border-border bg-transparent px-3"
        />
        <button
          type="submit"
          className="mt-4 bg-brand-gold px-5 py-3 text-sm font-bold uppercase tracking-widest text-brand-dark"
        >
          Open Account
        </button>
        {debugCode ? (
          <p className="mt-3 text-sm text-ink/50">Dev code: {debugCode}</p>
        ) : null}
        {status ? <p className="mt-3 text-sm text-ink/60">{status}</p> : null}
      </form>
    </div>
  );
}

function AccountList({
  title,
  items,
  empty,
}: {
  title: string;
  items: Array<Record<string, unknown>>;
  empty: string;
}) {
  return (
    <section className="border border-border bg-white p-6">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-ink/50">{empty}</p>
      ) : (
        <ul className="mt-4 divide-y divide-border">
          {items.map((item) => (
            <li key={String(item.id)} className="py-3 text-sm text-ink/70">
              <span className="font-semibold text-ink">
                {String(item.status)}
              </span>{" "}
              <span>{String(item.id)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
