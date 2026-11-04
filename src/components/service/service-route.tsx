import type { Metadata } from "next";
import { serviceByLabel } from "@/content/services";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { ServicePage } from "./ServicePage";

// Each service has its own small, fully static route file
// (src/app/<slug>/page.tsx) calling these helpers, so any unknown URL is a
// real 404. A label without content or a navigation link fails the build.
function resolve(label: string) {
  const service = serviceByLabel(label);
  if (!service) throw new Error(`No service content or navigation link for "${label}"`);
  return service;
}

export function serviceMetadata(label: string): Metadata {
  const { content, href } = resolve(label);
  return pageMetadata({ title: content.seo.title, description: content.seo.description, path: href });
}

export function ServiceRoute({ label }: { label: string }) {
  return <ServicePage service={resolve(label)} />;
}
