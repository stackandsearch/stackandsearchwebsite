import type { Metadata } from "next";
import { site } from "@/content/site";
import { absoluteUrl } from "./urls";

// Default sharing image (1200x630), used by every page without its own.
export const SHARE_IMAGE = { url: "/images/brand/og.png", width: 1200, height: 630, alt: `${site.name}: fast websites, built to be found` };

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
}

// Title, description, canonical and social tags for one page. Robots
// (noindex until launch) stay with the root layout.
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = `${title} | ${site.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: fullTitle, description, siteName: site.name, locale: "en_IN", images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [SHARE_IMAGE.url] },
  };
}
