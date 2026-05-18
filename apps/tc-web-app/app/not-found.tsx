import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 py-32 text-center">
      <Link
        href="/"
        className="mb-8 font-space text-2xl font-bold text-ink"
        aria-label="Tandoori Corner home"
      >
        Tandoori<span className="text-brand-gold">Corner</span>
      </Link>
      <h1 className="mb-4 font-space text-5xl text-ink">Page not found</h1>
      <p className="mb-8 max-w-md text-sm leading-7 text-muted-foreground">
        This page may have moved. Continue to the menu or return home.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/menu">View Menu</ButtonLink>
        <ButtonLink href="/" variant="outline">
          Back Home
        </ButtonLink>
      </div>
    </div>
  );
}
