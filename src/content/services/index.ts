import { footerGroups } from "@/content/footer";
import { serviceGroups } from "@/content/navigation";
import { aeoServices } from "./aeo-services";
import { businessWebsites } from "./business-websites";
import { ecommerceDevelopment } from "./ecommerce-development";
import { geoServices } from "./geo-services";
import { googleAds } from "./google-ads";
import { landingPageDesign } from "./landing-page-design";
import { localSeo } from "./local-seo";
import { metaAds } from "./meta-ads";
import { paidAds } from "./paid-ads";
import { seoServices } from "./seo-services";
import { shopifyDevelopment } from "./shopify-development";
import { socialMediaManagement } from "./social-media-management";
import { speedOptimisation } from "./speed-optimisation";
import { technicalSeo } from "./technical-seo";
import type { ServiceContent } from "./types";
import { uiUxDesign } from "./ui-ux-design";
import { websiteDevelopment } from "./website-development";
import { websiteIntegrations } from "./website-integrations";
import { websiteMaintenance } from "./website-maintenance";
import { websiteMigration } from "./website-migration";
import { websiteRedesign } from "./website-redesign";
import { websiteSecurity } from "./website-security";
import { wordpressDevelopment } from "./wordpress-development";

// Every service page with written content. Each also has a route file in
// src/app/<slug>/page.tsx; its URL comes from the navigation data (matched
// by label), so links and pages can't drift apart.
export const servicePages: ServiceContent[] = [
  websiteDevelopment,
  businessWebsites,
  ecommerceDevelopment,
  landingPageDesign,
  websiteRedesign,
  uiUxDesign,
  wordpressDevelopment,
  shopifyDevelopment,
  websiteMaintenance,
  speedOptimisation,
  websiteSecurity,
  websiteMigration,
  websiteIntegrations,
  paidAds,
  googleAds,
  metaAds,
  socialMediaManagement,
  seoServices,
  localSeo,
  technicalSeo,
  aeoServices,
  geoServices,
];

export interface ServiceLink {
  label: string;
  href: string;
  summary?: string;
}

// One-liners for sub-pages that are linked from the footer rather than the
// main menu, shown on related-service cards. Main-menu services use the
// summary from the navigation data.
const SUB_PAGE_SUMMARIES: Record<string, string> = {
  [businessWebsites.label]: "Fast, clear websites that explain what you do and win enquiries.",
  [ecommerceDevelopment.label]: "Online stores with smooth checkout, payments and product SEO.",
  [landingPageDesign.label]: "Focused campaign pages built to turn ad clicks into leads.",
  [websiteRedesign.label]: "A faster, clearer site, redesigned with your search rankings in mind.",
  [uiUxDesign.label]: "Layouts and user journeys people understand the first time.",
  [wordpressDevelopment.label]: "Custom WordPress sites that are fast, secure and easy to edit.",
  [shopifyDevelopment.label]: "Shopify stores set up, customised and built to sell.",
  [speedOptimisation.label]: "Faster pages and better Core Web Vitals on real phones.",
  [websiteSecurity.label]: "Hardening, monitoring and backups that help keep your site safe.",
  [websiteMigration.label]: "Move platforms or domains with every old URL redirected.",
  [websiteIntegrations.label]: "Connect your site to your CRM, payments, WhatsApp and bookings.",
  [googleAds.label]: "Search campaigns built around buyer keywords, tracked to real leads.",
  [metaAds.label]: "Facebook and Instagram campaigns with creative testing and lead tracking.",
  [localSeo.label]: "Google Business Profile and map rankings for nearby customers.",
  [technicalSeo.label]: "Crawling, indexing, speed and structured data, fixed at the source.",
};

const serviceLinks: ServiceLink[] = [
  ...serviceGroups.flatMap((group) =>
    group.items.map((item) => ({ label: item.label, href: item.href, summary: item.summary })),
  ),
  ...footerGroups.flatMap((group) =>
    group.links.map((link) => ({ label: link.label, href: link.href, summary: SUB_PAGE_SUMMARIES[link.label] })),
  ),
];

export function linkForLabel(label: string) {
  return serviceLinks.find((link) => link.label === label);
}

export function groupForHref(href: string) {
  const primary = serviceGroups.find((group) => group.items.some((item) => item.href === href));
  if (primary) return primary;
  const footerGroup = footerGroups.find((group) => group.links.some((link) => link.href === href));
  return footerGroup ? serviceGroups.find((group) => group.id === footerGroup.id) : undefined;
}

export interface ResolvedService {
  content: ServiceContent;
  href: string;
}

export function resolvedServices(): ResolvedService[] {
  return servicePages.flatMap((content) => {
    const href = linkForLabel(content.label)?.href;
    return href ? [{ content, href }] : [];
  });
}

export function serviceByLabel(label: string) {
  return resolvedServices().find((service) => service.content.label === label);
}
