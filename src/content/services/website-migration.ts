import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const websiteMigration: ServiceContent = {
  label: "Website migration",
  graphic: "migrate",
  seo: {
    title: `Website Migration Services in ${MARKET}: Move Without Losing SEO`,
    description: "Move your website to a new platform, domain or host without losing traffic: URL mapping, 301 redirects, content transfer, testing and post-launch monitoring.",
  },
  hero: {
    title: "Website migration without losing your search traffic",
    accent: "without losing your search traffic",
    lead: "Moving to a new platform, domain, host or design is when websites most often lose their rankings. We plan migrations so you don't: every URL mapped, every redirect tested, content and data moved accurately, and Search Console watched closely after launch.",
    points: ["URL mapping", "Tested redirects", "Post-launch monitoring"],
  },
  facts: [
    { label: "Best for", value: "Platform changes, domain moves, redesigns and host changes" },
    { label: "Typical timeline", value: "2–6 weeks, depending on size" },
    { label: "Pricing", value: "Fixed-fee project" },
    { label: "You keep", value: "Your rankings, links and data" },
  ],
  overview: {
    heading: "What is a website migration?",
    paragraphs: [
      "A migration is any significant change to where or how your website lives: a new domain, a new platform, a new site structure or a new host. Each one changes URLs or how pages are served, and search engines need clear signals to carry your rankings across.",
      "Most traffic losses after a migration come from avoidable mistakes: missing or chained redirects, pages left behind, changed content, crawling blocked on the new site, or lost tracking. A careful plan and thorough testing prevent most of them.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Planned, tested and monitored from first audit to weeks after launch.",
    items: [
      { icon: "search", title: "Pre-migration audit", text: "Every page, its traffic and its links recorded, so nothing valuable gets lost." },
      { icon: "layout", title: "URL mapping", text: "Every old URL matched to its new home, page by page." },
      { icon: "refresh", title: "301 redirects", text: "One-step permanent redirects, tested before launch." },
      { icon: "file", title: "Content and data transfer", text: "Pages, posts, products, media and metadata moved accurately." },
      { icon: "code", title: "Technical checks", text: "Canonicals, sitemaps, robots rules, structured data and tracking verified on staging." },
      { icon: "chart", title: "Analytics continuity", text: "Analytics and conversion tracking carried over, so reporting isn't broken." },
      { icon: "bell", title: "Launch-day support", text: "A checklist-driven launch, with fixes made on the spot." },
      { icon: "gauge", title: "Post-launch monitoring", text: "Search Console, crawl errors and rankings watched in the weeks after launch." },
    ],
  },
  process: {
    heading: "How a migration runs",
    steps: [
      { title: "Audit and inventory", when: "Week 1", text: "Every URL, its traffic, links and rankings recorded." },
      { title: "Map and plan", when: "Weeks 1–2", text: "A URL map, redirect plan and launch checklist." },
      { title: "Build and test on staging", when: "Weeks 2–5", text: "Content moved, redirects and technical SEO tested before launch." },
      { title: "Launch and monitor", when: "Launch, then 4–8 weeks", text: "A careful switch-over, then close monitoring and quick fixes." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "Every URL accounted for", text: "We don't redirect everything to the homepage. Each page goes to its closest equivalent, or is retired deliberately." },
      { title: "Test before, not after", text: "Redirects, tracking and technical SEO are checked on staging before anything goes live." },
      { title: "One change at a time", text: "Where possible, we avoid changing domain, design and content at once, so any problem is easy to trace." },
      { title: "Watch the aftermath", text: "Most issues show up in the first weeks. We monitor closely and fix them fast." },
    ],
  },
  fit: {
    heading: "Do you need a planned migration?",
    good: [
      "You're changing platform, domain or host",
      "You're redesigning a site that already gets search traffic",
      "You're merging several sites into one",
      "A previous migration lost traffic and you want to recover",
    ],
    notFor: [
      "Your site gets no search traffic and has no links worth keeping",
      "You're only renewing hosting with no technical changes",
      "You want to change everything at once without a plan",
    ],
  },
  pricing: {
    heading: "How migrations are priced",
    paragraphs: [
      "A migration is a fixed-fee project, sized by the number of pages, the platforms involved and how much content and data moves.",
      "If you're redesigning at the same time, the migration is quoted as part of the website project.",
    ],
    factors: ["Number of pages and products", "Source and destination platforms", "Content and data to transfer", "Domain or URL structure changes", "Integrations to reconnect"],
  },
  faqs: [
    { question: "Will I lose rankings when I migrate my website?", answer: "Some fluctuation is normal for a few weeks. With complete redirects and no loss of content, most sites recover quickly, and we monitor closely to catch problems." },
    { question: "What is a 301 redirect?", answer: "A permanent redirect that sends visitors and search engines from an old URL to its new one, and tells search engines the move is permanent." },
    { question: "How long does a migration take?", answer: "Small sites can move in a couple of weeks; larger sites with many products or integrations take longer. We give you a timeline after the audit." },
    { question: "Can you migrate from WordPress to another platform?", answer: "Yes, and between most common platforms. We plan the content and URL mapping first, so nothing is lost in the move." },
    { question: "Do I need to tell Google about a domain change?", answer: "Yes. Alongside redirects, Search Console's Change of Address tool tells Google about a domain move. We handle this as part of the migration." },
    { question: "What happens to my email when we change hosts?", answer: "Email often runs separately from your website. We check your DNS records so email keeps working during the move." },
  ],
  related: ["Website redesign", "Technical SEO", "Website maintenance"],
};
