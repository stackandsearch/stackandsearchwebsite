import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/urls";

// Closed to crawlers until launch (SITE_INDEXING=on), matching the site-wide
// noindex. At launch, crawlers may read everything and find the sitemap.
// Rules for specific AI crawlers can be added here once the policy is set.
export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_INDEXING !== "on") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: absoluteUrl("/sitemap.xml") };
}
