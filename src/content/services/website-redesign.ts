import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const websiteRedesign: ServiceContent = {
  label: "Website redesign",
  parent: "Website development",
  graphic: "design",
  seo: {
    title: `Website Redesign Services in ${MARKET}: Keep Your SEO`,
    description: "Redesign your website without losing what works: audit first, protect rankings with careful redirects, improve speed and conversions, and launch on a written scope.",
  },
  hero: {
    title: "Website redesign that keeps what works",
    accent: "keeps what works",
    lead: "A redesign should make your website faster, clearer and better at converting, without losing the search traffic and enquiries you already have. We start by auditing what works today, keep or redirect every valuable URL, and rebuild everything else to a higher standard.",
    points: ["Audit first", "Rankings protected", "Faster, clearer site"],
  },
  facts: [
    { label: "Best for", value: "Sites that look dated, load slowly or don't convert" },
    { label: "Typical timeline", value: "5–10 weeks" },
    { label: "Pricing", value: "Fixed-fee project" },
    { label: "You keep", value: "Your rankings, links and content that works" },
  ],
  overview: {
    heading: "When is it time to redesign your website?",
    paragraphs: [
      "Common signs: the site looks dated next to competitors, it's slow or awkward on phones, it's hard to update, your services have changed, or visitors arrive but don't get in touch. Each of these costs you enquiries every month.",
      "The risk is that a redesign throws away what's working. Pages that rank, links from other sites and content customers rely on can vanish in a rebuild. We treat your current site as evidence: we measure it, keep its strengths and fix its weaknesses.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Everything needed to improve the site without losing what it has earned.",
    items: [
      { icon: "search", title: "Current site audit", text: "Traffic, rankings, conversions and links per page, so we know what to protect." },
      { icon: "layout", title: "New structure", text: "Pages and navigation reorganised around what customers look for." },
      { icon: "pen", title: "Content refresh", text: "Copy rewritten or tightened where it's unclear, outdated or thin." },
      { icon: "image", title: "New design", text: "A modern design that reflects your brand today, tested on real phones." },
      { icon: "gauge", title: "Speed improvements", text: "A faster build that meets Core Web Vitals on mobile." },
      { icon: "refresh", title: "Redirect plan", text: "Every changed URL redirected to its closest new page, tested before launch." },
      { icon: "chart", title: "Tracking continuity", text: "Analytics and conversions carried over, so you can compare before and after." },
      { icon: "bell", title: "Post-launch monitoring", text: "Search Console and rankings watched closely in the weeks after launch." },
    ],
  },
  process: {
    heading: "How a redesign runs",
    steps: [
      { title: "Audit", when: "Weeks 1–2", text: "Data on every page: traffic, rankings, conversions and links." },
      { title: "Plan and design", when: "Weeks 2–5", text: "New structure, content plan and designs, with a URL map." },
      { title: "Build and migrate", when: "Weeks 4–9", text: "Build, content migration, redirects and testing on staging." },
      { title: "Launch and monitor", when: "Weeks 8–10+", text: "A checked launch, then close monitoring of search and conversions." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "Evidence before opinions", text: "We decide what to change based on your data, not on trends." },
      { title: "Protect the winners", text: "Pages that rank or convert keep their URLs, or get carefully redirected." },
      { title: "Improve, don't just restyle", text: "A new look alone rarely fixes results. We fix structure, speed and messaging too." },
      { title: "Compare honestly", text: "We track the same measures before and after, so you can see the real impact." },
    ],
  },
  fit: {
    heading: "Is a redesign the right move?",
    good: [
      "Your site looks dated or works poorly on phones",
      "Your services or positioning have changed",
      "Visitors arrive but don't get in touch",
      "Your site gets search traffic you can't afford to lose",
    ],
    notFor: [
      "Only a few pages need small edits: maintenance may be enough",
      "You want a new look with no change to content or structure",
      "You need it live in under two weeks",
    ],
  },
  pricing: {
    heading: "How redesigns are priced",
    paragraphs: [
      "A redesign is a fixed-fee project, quoted after an audit of your current site. The scope lists every page, what changes and how URLs are handled.",
      "Content migration and redirects are included in the quote, not added later.",
    ],
    factors: ["Size of the current site", "How much content changes", "Platform change or not", "Integrations to rebuild", "Redirects and data to migrate"],
  },
  faqs: [
    { question: "Will a redesign hurt my Google rankings?", answer: "It can if URLs, content or redirects are handled carelessly. We audit first, keep or redirect every valuable URL and monitor Search Console after launch to catch problems early." },
    { question: "Can you keep my existing content?", answer: "Yes. We keep what works, improve what's weak and only rewrite where it helps visitors." },
    { question: "Do I need to change platforms?", answer: "Not necessarily. We recommend staying or moving based on speed, editing needs and running costs." },
    { question: "How long does a redesign take?", answer: "Usually 5–10 weeks, depending on the size of the site and how much content changes." },
    { question: "Will my site be down during the redesign?", answer: "No. We build the new site separately and switch over at launch, usually with no noticeable downtime." },
    { question: "What happens to old pages we don't need?", answer: "We redirect them to the closest relevant page, or retire them deliberately when nothing fits." },
  ],
  related: ["Website development", "Website migration", "Technical SEO"],
};
