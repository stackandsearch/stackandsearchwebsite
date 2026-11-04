import { allServicesLink, serviceGroups } from "@/content/navigation";

export interface WebsiteFirstStep {
  title: string;
  tagline: string;
  pricing: string;
  results: string;
  href: string;
  badge?: string;
}

const serviceHref = (label: string) =>
  serviceGroups.flatMap((group) => group.items).find((item) => item.label === label)?.href ?? allServicesLink.href;

export const websiteFirst = {
  title: "Why we start with the website",
  intro:
    "A new website is fast, visible and easy to judge, so it is where we earn your trust first. Search, answer-engine and AI visibility take months to build, so we add them once there is a solid site to grow from.",
  note: "Timelines are typical ranges, not promises.",
};

export const websiteFirstSteps: WebsiteFirstStep[] = [
  {
    title: "Website development",
    tagline: "Where every engagement starts",
    pricing: "Fixed-fee project",
    results: "4–8 weeks (launch)",
    href: serviceHref("Website development"),
    badge: "Start here",
  },
  {
    title: "Website maintenance",
    tagline: "Ongoing care after launch",
    pricing: "Monthly plan",
    results: "Immediately (uptime, speed, security)",
    href: serviceHref("Website maintenance"),
  },
  {
    title: "Paid ads",
    tagline: "Fast leads while organic grows",
    pricing: "Management fee plus ad budget",
    results: "2–4 weeks",
    href: serviceHref("Paid ads"),
  },
  {
    title: "Social media management",
    tagline: "Brand presence and content",
    pricing: "Monthly retainer",
    results: "2–3 months",
    href: serviceHref("Social media management"),
  },
  {
    title: "SEO, AEO and GEO",
    tagline: "Long-term visibility",
    pricing: "Retainer with a minimum term",
    results: "4–6+ months",
    href: serviceHref("SEO services"),
  },
];
