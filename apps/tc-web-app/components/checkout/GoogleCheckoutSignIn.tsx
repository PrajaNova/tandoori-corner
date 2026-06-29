"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type GoogleCheckoutSignInProps = {
  onCredential: (credential: string) => Promise<void>;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            callback: (response: { credential?: string }) => void;
            client_id: string;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: { size: "large"; text: "continue_with"; theme: "outline" },
          ) => void;
        };
      };
    };
  }
}

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export function GoogleCheckoutSignIn({
  onCredential,
}: GoogleCheckoutSignInProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!googleClientId || !loaded || !buttonRef.current || !window.google) {
      return;
    }
    buttonRef.current.innerHTML = "";
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: async ({ credential }) => {
        if (!credential) return;
        setStatus("Signing in...");
        await onCredential(credential);
        setStatus(null);
      },
    });
    window.google.accounts.id.renderButton(buttonRef.current, {
      size: "large",
      text: "continue_with",
      theme: "outline",
    });
  }, [loaded, onCredential]);

  if (!googleClientId) {
    return (
      <p className="text-xs font-light text-ink/50">
        Google sign-in needs `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
        onLoad={() => setLoaded(true)}
      />
      <div ref={buttonRef} />
      {status ? <p className="mt-2 text-xs text-ink/50">{status}</p> : null}
    </>
  );
}
