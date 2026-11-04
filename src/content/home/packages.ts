import type { NavLinkItem } from "@/content/navigation";

// Packages from the SEO plan. Prices are intentionally absent until the owner
// sets them (docs/OWNER-INPUTS.md); each card asks for a quote instead.

export interface WebsitePackage {
  name: string;
  bestFor: string;
  includes: string[];
  featured?: boolean;
}

export const websitePackages: WebsitePackage[] = [
  {
    name: "Starter",
    bestFor: "New and small businesses",
    includes: ["5-page responsive business website", "Contact form", "SSL and hosting setup", "Basic on-page SEO"],
  },
  {
    name: "Business",
    bestFor: "Growing businesses",
    featured: true,
    includes: [
      "Everything in Starter",
      "Blog",
      "WhatsApp, CRM and analytics integrations",
      "Schema markup",
      "Speed optimisation",
    ],
  },
  {
    name: "Pro",
    bestFor: "Online stores and custom needs",
    includes: [
      "Everything in Business",
      "E-commerce or custom features",
      "Payment gateway",
      "Booking or membership",
      "Advanced integrations",
    ],
  },
];

export const maintenanceNote = "Every package can add an optional monthly maintenance plan.";

// Keep the status in sync with navigation.ts until the route registry (Phase 4).
export const pricingLink: NavLinkItem = {
  label: "Compare packages in detail",
  href: "/pricing/",
  status: "planned",
};
