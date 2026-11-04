import type { NavLinkItem } from "./navigation";

// Footer columns from the SEO plan's sitemap (section 5). Every route stays
// "planned" until its page exists; Phase 6 requires them all to be published.
// Contact email and social profiles are added once the owner confirms them.

export interface FooterGroup {
  id: string;
  label: string;
  links: NavLinkItem[];
}

export const bookCallLink: NavLinkItem = { label: "Book a call", href: "/contact/", status: "planned" };

export const footerGroups: FooterGroup[] = [
  {
    id: "build",
    label: "Build",
    links: [
      { label: "Website development", href: "/website-development/", status: "planned" },
      { label: "Business websites", href: "/business-websites/", status: "planned" },
      { label: "E-commerce development", href: "/ecommerce-development/", status: "planned" },
      { label: "Landing page design", href: "/landing-page-design/", status: "planned" },
      { label: "Website redesign", href: "/website-redesign/", status: "planned" },
      { label: "UI/UX design", href: "/ui-ux-design/", status: "planned" },
      { label: "WordPress development", href: "/wordpress-development/", status: "planned" },
      { label: "Shopify development", href: "/shopify-development/", status: "planned" },
    ],
  },
  {
    id: "run",
    label: "Run",
    links: [
      { label: "Website maintenance", href: "/website-maintenance/", status: "planned" },
      { label: "Speed optimisation", href: "/website-speed-optimization/", status: "planned" },
      { label: "Website security", href: "/website-security/", status: "planned" },
      { label: "Website migration", href: "/website-migration/", status: "planned" },
      { label: "Website integrations", href: "/website-integrations/", status: "planned" },
    ],
  },
  {
    id: "grow",
    label: "Grow",
    links: [
      { label: "SEO services", href: "/seo-services/", status: "planned" },
      { label: "Local SEO", href: "/local-seo/", status: "planned" },
      { label: "Technical SEO", href: "/technical-seo/", status: "planned" },
      { label: "AEO services", href: "/aeo-services/", status: "planned" },
      { label: "GEO services", href: "/geo-services/", status: "planned" },
      { label: "Paid ads", href: "/paid-ads/", status: "planned" },
      { label: "Google Ads", href: "/google-ads/", status: "planned" },
      { label: "Meta Ads", href: "/meta-ads/", status: "planned" },
      { label: "Social media management", href: "/social-media-management/", status: "planned" },
    ],
  },
  {
    id: "company",
    label: "Company",
    links: [
      { label: "About", href: "/about/", status: "planned" },
      { label: "Work", href: "/case-studies/", status: "planned" },
      { label: "Pricing", href: "/pricing/", status: "planned" },
      { label: "Blog", href: "/blog/", status: "planned" },
      { label: "Contact", href: "/contact/", status: "planned" },
      { label: "All services", href: "/services/", status: "planned" },
    ],
  },
];
