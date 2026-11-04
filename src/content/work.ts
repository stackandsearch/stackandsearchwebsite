export interface Project {
  name: string;
  url: string;
  domain: string;
  summary: string;
  facts: { label: string; value: string }[];
  highlights: string[];
}

export const work = {
  seo: {
    title: "Our Work: Website Design & Development Projects",
    description:
      "Websites we've designed and built, starting with Echobyte Global, a development and digital marketing studio. Live projects only, with no invented results.",
  },
  hero: {
    title: "Our work: websites built to be found",
    accent: "built to be found",
    lead: "A closer look at websites we've designed and built. We're a young studio, so we'd rather show one live project properly than pad this page. More case studies will follow as projects launch.",
    points: ["Live projects only", "No invented results", "More coming soon"],
  },
  projects: [
    {
      name: "Echobyte Global",
      url: "https://echobyteglobal.com/",
      domain: "echobyteglobal.com",
      summary:
        "A website for Echobyte Global, a development and digital marketing studio that designs, builds and grows websites, apps and SaaS products for clients worldwide. The site presents both halves of their offer, building and growing, and gives every visitor a clear path to booking a call.",
      facts: [
        { label: "Client", value: "Echobyte Global" },
        { label: "Industry", value: "Development and digital marketing studio" },
        { label: "Audience", value: "Founders and growing businesses worldwide" },
        { label: "Our role", value: "Website design and development" },
        { label: "Built with", value: "Next.js" },
      ],
      highlights: [
        "Service pages for each Build and Grow offering",
        "Pricing, work, blog and about pages",
        "A contact flow that starts from the service a visitor needs",
        "Process and FAQ sections that answer common questions",
        "Search metadata and social sharing images on every page",
      ],
    },
  ] as Project[],
  focus: [
    { title: "Speed on real phones", text: "Pages built to load fast on mid-range phones, checked against Core Web Vitals." },
    { title: "Search-ready structure", text: "Clean URLs, metadata and structured data from the first day." },
    { title: "Accessible by default", text: "Readable contrast, keyboard paths and screen-reader labels throughout." },
    { title: "Clear paths to enquiry", text: "Every page ends with an obvious next step for the visitor." },
  ],
};
