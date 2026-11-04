// The service ladder from the SEO plan (section 2), worded for clients.
// "results" are the plan's typical ranges, shown with its own disclaimer.
// barScale (0-1) only sets the length of the decorative timeline bar.

export interface LadderStep {
  order: number;
  service: string;
  role: string;
  pricing: string;
  results: string;
  barScale: number;
}

export const serviceLadder: LadderStep[] = [
  {
    order: 1,
    service: "Website development",
    role: "Where every engagement starts",
    pricing: "Fixed-fee project",
    results: "4–8 weeks (launch)",
    barScale: 0.4,
  },
  {
    order: 2,
    service: "Website maintenance",
    role: "Ongoing care after launch",
    pricing: "Monthly plan",
    results: "Immediately (uptime, speed, security)",
    barScale: 0.08,
  },
  {
    order: 3,
    service: "Paid ads",
    role: "Fast leads while organic grows",
    pricing: "Management fee plus ad budget",
    results: "2–4 weeks",
    barScale: 0.25,
  },
  {
    order: 4,
    service: "Social media management",
    role: "Brand presence and content",
    pricing: "Monthly retainer",
    results: "2–3 months",
    barScale: 0.6,
  },
  {
    order: 5,
    service: "SEO, AEO and GEO",
    role: "Long-term visibility",
    pricing: "Retainer with a minimum term",
    results: "4–6+ months",
    barScale: 1,
  },
];
