// "Built in layers" showcase content. Deliverables come from the SEO plan's
// development catalogue and on-page/technical checklists.

export interface BuildLayer {
  id: 1 | 2 | 3 | 4;
  name: string;
  title: string;
  body: string;
  points: string[];
}

export const buildLayers: BuildLayer[] = [
  {
    id: 1,
    name: "Architecture",
    title: "A structure people and crawlers can follow.",
    body: "We plan the sitemap and URLs first, keep every important page within three clicks of the homepage, and render pages on the server so the content is in the HTML from the start.",
    points: ["Sitemap and URL plan", "Page templates", "Performance budget"],
  },
  {
    id: 2,
    name: "Interface",
    title: "Design that works on every screen.",
    body: "Mobile-first layouts, clear calls to action and accessible components, approved in design before development starts.",
    points: ["Responsive UI design", "Accessibility (WCAG) checks", "Conversion-focused calls to action"],
  },
  {
    id: 3,
    name: "Content",
    title: "Pages that answer real questions.",
    body: "Answer-first copy, one clear main heading per page, honest FAQs and internal links that guide visitors to the next step.",
    points: ["Answer-first page copy", "FAQs and internal links", "On-page SEO basics"],
  },
  {
    id: 4,
    name: "Search-readiness",
    title: "Ready for search and AI engines from day one.",
    body: "Unique titles and descriptions, structured data, an XML sitemap and analytics set up before launch, so results can be measured from the first day.",
    points: ["Metadata and schema markup", "XML sitemap and robots.txt", "Analytics and conversion tracking"],
  },
];
