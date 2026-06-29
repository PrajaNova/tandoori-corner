import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const crawlableRules = {
    allow: "/",
    disallow: ["/checkout"],
  };

  return {
    rules: [
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Bingbot",
        ],
        ...crawlableRules,
      },
      {
        userAgent: "*",
        ...crawlableRules,
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
