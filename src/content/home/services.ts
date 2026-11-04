// Extra homepage detail per service. Timelines are the plan's typical ranges
// (service ladder); "includes" items come from its development catalogue.

export interface ServiceHighlight {
  timeline: string;
  includes?: string[];
}

export const serviceHighlights: Record<string, ServiceHighlight> = {
  "/website-development/": {
    timeline: "4–8 weeks to launch",
    includes: ["Business websites", "E-commerce stores", "Landing pages", "Website redesigns"],
  },
  "/website-maintenance/": {
    timeline: "monthly, from day one",
    includes: ["Updates and backups", "Uptime monitoring", "Security checks", "Monthly health report"],
  },
  "/paid-ads/": { timeline: "results usually in 2–4 weeks" },
  "/social-media-management/": { timeline: "results usually in 2–3 months" },
  "/seo-services/": { timeline: "results usually in 4–6+ months" },
  "/aeo-services/": { timeline: "results usually in 4–6+ months" },
  "/geo-services/": { timeline: "results usually in 4–6+ months" },
};
