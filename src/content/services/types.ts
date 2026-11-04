import type { PageIconName } from "@/components/service/PageIcon";

export type ServiceGraphicKind =
  | "development"
  | "maintenance"
  | "ads"
  | "social"
  | "seo"
  | "aeo"
  | "geo"
  | "commerce"
  | "speed"
  | "connect"
  | "design"
  | "migrate"
  | "services";

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

// Everything one service page says. `label` must match the service's label
// in the navigation data; its URL comes from there. `parent` (a label) adds
// a breadcrumb step for sub-pages. `hero.accent` is the highlighted phrase.
export interface ServiceContent {
  label: string;
  parent?: string;
  graphic: ServiceGraphicKind;
  seo: { title: string; description: string };
  hero: { title: string; accent?: string; lead: string; points: string[] };
  facts: { label: string; value: string }[];
  overview: { heading: string; paragraphs: string[] };
  included: { heading: string; intro?: string; items: { icon: PageIconName; title: string; text: string }[] };
  process: { heading: string; steps: { title: string; when: string; text: string }[] };
  approach: { heading: string; points: { title: string; text: string }[] };
  fit: { heading: string; good: string[]; notFor: string[] };
  pricing: { heading: string; paragraphs: string[]; factors: string[] };
  faqs: ServiceFaqItem[];
  related: string[];
}
