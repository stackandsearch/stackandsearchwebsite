// Brand facts used across the site (metadata, header, footer, schema later).
// Only confirmed facts belong here. Open items: docs/OWNER-INPUTS.md

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://stackandsearch.com").replace(/\/+$/, "");

export const site = {
  name: "Stack & Search",
  alternateName: "StackandSearch",
  url: siteUrl,
  locale: "en-IN",
  ogLocale: "en_IN",
  description:
    "Web design and development agency building fast, conversion-ready websites, plus maintenance, paid ads, social media, SEO, AEO and GEO.",
  // Search engines may index the site only when SITE_INDEXING=on (set at launch, Phase 7).
  indexable: process.env.SITE_INDEXING === "on",
} as const;
