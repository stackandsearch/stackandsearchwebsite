import type { NavLinkItem } from "@/content/navigation";

// The six service cards that fill in during the "built in four layers"
// storyboard. AEO and GEO share a card here; each has its own page.
// Keep link statuses in sync with navigation.ts until the route registry.

export interface StoryCard {
  item: NavLinkItem;
  iconHref: string;
  summary: string;
}

export const storyCards: StoryCard[] = [
  {
    item: { label: "Website development", href: "/website-development/", status: "planned" },
    iconHref: "/website-development/",
    summary: "Fast, SEO-ready business sites, online stores and landing pages.",
  },
  {
    item: { label: "Website maintenance", href: "/website-maintenance/", status: "planned" },
    iconHref: "/website-maintenance/",
    summary: "Updates, backups, uptime and security checks every month.",
  },
  {
    item: { label: "SEO services", href: "/seo-services/", status: "planned" },
    iconHref: "/seo-services/",
    summary: "Technical, on-page and local SEO for lasting visibility.",
  },
  {
    item: { label: "Paid ads", href: "/paid-ads/", status: "planned" },
    iconHref: "/paid-ads/",
    summary: "Google and Meta campaigns for leads while organic grows.",
  },
  {
    item: { label: "Social media", href: "/social-media-management/", status: "planned" },
    iconHref: "/social-media-management/",
    summary: "Content calendars and profiles that build trust.",
  },
  {
    item: { label: "AEO & GEO", href: "/aeo-services/", status: "planned" },
    iconHref: "/geo-services/",
    summary: "Answer-ready content that search engines and AI tools understand.",
  },
];
