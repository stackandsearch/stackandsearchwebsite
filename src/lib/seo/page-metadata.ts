import type { Metadata } from "next";
import { site } from "@/content/site";
import { absoluteUrl } from "./urls";

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
    openGraph: { type: "website", url, title: fullTitle, description, siteName: site.name, locale: "en_IN" },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
