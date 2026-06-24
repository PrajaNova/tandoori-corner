"use client";

import { useEffect } from "react";

/**
 * Reliable in-page anchor scrolling.
 *
 * Next.js App Router soft-navigation to a same-page hash (e.g. "/#reservation")
 * can mis-land when sections are still settling (parallax backgrounds, images).
 * This handles two cases accurately:
 *   1. Clicking a same-page hash link → intercept and scrollIntoView.
 *   2. Landing on the page with a hash (cross-page nav) → scroll once settled.
 */
export function HashScroll() {
  useEffect(() => {
    const scrollToHash = (hash: string) => {
      if (!hash || hash.length < 2) return false;
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!el) return false;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    // Case 2: initial load with a hash — retry until the target exists & layout settles.
    if (window.location.hash) {
      let tries = 0;
      const id = setInterval(() => {
        if (scrollToHash(window.location.hash) || ++tries > 10) {
          clearInterval(id);
        }
      }, 120);
    }

    // Case 1: intercept clicks on same-page hash links before Next's router handles them.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.(
        "a[href*='#']",
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.origin);
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;

      event.preventDefault();
      event.stopPropagation();
      window.history.pushState(null, "", url.hash);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
