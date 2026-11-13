import type { NavLinkItem } from "@/content/navigation";

// Website packages. Their starting prices live with the other prices in
// src/content/services/prices.ts ("Website development" plans, same names).

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

export const maintenanceNote = "Every package can add a monthly maintenance plan, from ₹4,000/month.";

// Keep the status in sync with navigation.ts until the route registry (Phase 4).
export const pricingLink: NavLinkItem = {
  label: "Compare packages in detail",
  href: "/pricing/",
  status: "planned",
};
