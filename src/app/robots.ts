import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/urls";

// AI search and assistant crawlers, welcomed explicitly (good for AEO/GEO).
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

// Closed until launch (SITE_INDEXING=on in Netlify). At launch: every
// crawler may read the whole site, and the sitemap is listed.
export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_INDEXING !== "on") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
