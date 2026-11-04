// Navigation data. Every internal URL ends with "/" (trailingSlash: true).
// "planned" routes are linked but never prefetched until their page exists.
// Phase 6 requires every linked route to be "published".

export type RouteStatus = "published" | "planned";
export type InternalHref = "/" | `/${string}/`;

export interface NavLinkItem {
  label: string;
  href: InternalHref;
  status: RouteStatus;
}

export interface ServiceNavItem extends NavLinkItem {
  summary: string;
}

export interface ServiceGroup {
  id: "build" | "run" | "grow";
  label: string;
  intro: string;
  items: ServiceNavItem[];
}

export const websiteDevelopmentLink: ServiceNavItem = {
  label: "Website development",
  href: "/website-development/",
  status: "planned",
  summary: "Business sites, online stores and landing pages, built fast and SEO-ready.",
};

// Funnel order from the plan's service ladder: Build -> Run -> Grow.
export const serviceGroups: ServiceGroup[] = [
  {
    id: "build",
    label: "Build",
    intro: "Every engagement starts with a fast, SEO-ready website.",
    items: [websiteDevelopmentLink],
  },
  {
    id: "run",
    label: "Run",
    intro: "Keep the site secure, fast and up to date after launch.",
    items: [
      {
        label: "Website maintenance",
        href: "/website-maintenance/",
        status: "planned",
        summary: "Updates, backups, uptime monitoring and security checks every month.",
      },
    ],
  },
  {
    id: "grow",
    label: "Grow",
    intro: "Paid ads for leads now, search visibility for the long term.",
    items: [
      {
        label: "Paid ads",
        href: "/paid-ads/",
        status: "planned",
        summary: "Google Ads and Meta Ads management while organic traffic builds.",
      },
      {
        label: "Social media management",
        href: "/social-media-management/",
        status: "planned",
        summary: "Content calendars and profile management for a steady brand presence.",
      },
      {
        label: "SEO services",
        href: "/seo-services/",
        status: "planned",
        summary: "Technical, on-page and local SEO, reported as trends over months.",
      },
      {
        label: "AEO services",
        href: "/aeo-services/",
        status: "planned",
        summary: "Answer-first content and schema that answer engines can read.",
      },
      {
        label: "GEO services",
        href: "/geo-services/",
        status: "planned",
        summary: "Entity, content and citation work for AI-generated answers.",
      },
    ],
  },
];

export const allServicesLink: NavLinkItem = {
  label: "All services",
  href: "/services/",
  status: "planned",
};

export const ctaLink: NavLinkItem = {
  label: "Get a free audit",
  href: "/contact/",
  status: "planned",
};

export const primaryNav: NavLinkItem[] = [
  { label: "Work", href: "/case-studies/", status: "planned" },
  { label: "Pricing", href: "/pricing/", status: "planned" },
  { label: "About", href: "/about/", status: "planned" },
  { label: "Blog", href: "/blog/", status: "planned" },
  { label: "Contact", href: "/contact/", status: "planned" },
];

export const legalNav: NavLinkItem[] = [
  { label: "Privacy policy", href: "/privacy-policy/", status: "planned" },
  { label: "Terms", href: "/terms/", status: "planned" },
  { label: "Cookie policy", href: "/cookie-policy/", status: "planned" },
];
