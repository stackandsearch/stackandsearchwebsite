import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const speedOptimisation: ServiceContent = {
  label: "Speed optimisation",
  graphic: "speed",
  seo: {
    title: `Website Speed Optimisation Services in ${MARKET}`,
    description: "Make your website fast on real phones: Core Web Vitals audits and fixes for images, code, fonts, hosting and third-party scripts, measured with real-user data.",
  },
  hero: {
    title: "Website speed optimisation for real-world phones",
    accent: "real-world phones",
    lead: "We find what's slowing your website down and fix it in code: oversized images, render-blocking scripts, heavy fonts, slow hosting and third-party tags. Success is measured the way Google measures it, with Core Web Vitals from real visitors, not a one-off lab score.",
    points: ["Core Web Vitals", "Fixed in code", "Real-user data"],
  },
  facts: [
    { label: "Best for", value: "Sites that feel slow on phones or fail Core Web Vitals" },
    { label: "Typical project", value: "2–4 weeks" },
    { label: "Pricing", value: "Fixed-fee project" },
    { label: "You get", value: "Before-and-after measurements" },
  ],
  overview: {
    heading: "Why does website speed matter?",
    paragraphs: [
      "Slow pages lose visitors before they've seen what you offer, especially on mid-range phones and patchy mobile connections. Speed is also part of how Google assesses page experience, through Core Web Vitals: how quickly the main content loads, how fast the page responds and how stable it stays while loading.",
      "Most slow sites share the same handful of problems: images far larger than needed, too much JavaScript, fonts and scripts that block rendering, and tags added over the years that nobody removed. Fixing them properly usually needs code changes, not another plugin.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Every fix is chosen for its measured impact on real visitors.",
    items: [
      { icon: "gauge", title: "Speed audit", text: "Lab tests plus real-user Core Web Vitals data, template by template." },
      { icon: "image", title: "Image optimisation", text: "Modern formats, correct sizes and lazy loading, so images stop dominating load time." },
      { icon: "code", title: "JavaScript and CSS clean-up", text: "Unused code removed, critical styles prioritised and scripts deferred." },
      { icon: "file", title: "Font loading", text: "Fewer font files, subsetting and loading strategies that avoid invisible or jumping text." },
      { icon: "shield", title: "Third-party scripts", text: "Chat widgets, trackers and embeds audited, delayed or removed." },
      { icon: "cloud", title: "Hosting and caching", text: "Caching, compression and a CDN set up, and hosting reviewed if it's the bottleneck." },
      { icon: "layout", title: "Layout stability", text: "Space reserved for images, ads and embeds, so the page stops jumping." },
      { icon: "chart", title: "Before-and-after report", text: "What we changed, and how loading and responsiveness improved for real visitors." },
    ],
  },
  process: {
    heading: "How speed optimisation runs",
    steps: [
      { title: "Measure", when: "Week 1", text: "Real-user data and lab tests to find the slowest templates and the biggest causes." },
      { title: "Plan", when: "Week 1", text: "A ranked list of fixes, each with its expected impact." },
      { title: "Fix", when: "Weeks 1–3", text: "Code, image, font, script and hosting changes, tested on staging." },
      { title: "Verify", when: "Weeks 3–4+", text: "Lab re-tests straight away; real-user data confirms it over the following weeks." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "Real users over lab scores", text: "A perfect lab score on a fast laptop means little. We optimise for what visitors on real phones experience." },
      { title: "Fix causes, not symptoms", text: "Stacking speed plugins rarely helps for long. We remove the causes in code." },
      { title: "Keep the features you need", text: "Speed shouldn't cost you your chat widget or analytics. We load them smarter instead of cutting them blindly." },
      { title: "Prove it", text: "Every project ends with before-and-after measurements you can check yourself." },
    ],
  },
  fit: {
    heading: "Do you need speed optimisation?",
    good: [
      "Your site feels slow on phones",
      "Search Console reports poor Core Web Vitals",
      "You pay for ad clicks that leave before the page loads",
      "Your site has grown heavy over the years",
    ],
    notFor: [
      "Your site already passes Core Web Vitals comfortably",
      "You want a guaranteed score of 100",
      "The site needs rebuilding anyway: see website redesign",
    ],
  },
  pricing: {
    heading: "How speed optimisation is priced",
    paragraphs: [
      "Speed optimisation is a fixed-fee project, quoted after a short audit of your site. The quote lists the fixes and the pages they cover.",
      "Ongoing speed checks are part of our website maintenance plans, so improvements don't slowly wear away.",
    ],
    factors: ["Number of page templates", "Platform and theme or framework", "Number of third-party scripts", "Hosting setup", "Image and media volume"],
  },
  faqs: [
    { question: "What are Core Web Vitals?", answer: "Google's measures of real-user experience: how fast the main content loads (LCP), how quickly the page responds to input (INP) and how stable the layout stays (CLS)." },
    { question: "Will a faster site rank higher?", answer: "Speed is one of many signals and rarely outweighs relevance. But faster pages keep more visitors, convert better and support your SEO and ads." },
    { question: "Can you get my site a score of 100?", answer: "Lab scores vary between tests and devices, so we don't chase a number. We aim to pass Core Web Vitals for real visitors, which is what matters." },
    { question: "Will you need access to my hosting?", answer: "Usually, yes, for caching and server settings. We work on a staging copy where possible." },
    { question: "When will Search Console show the improvement?", answer: "Lab tests show it immediately. Google's real-user data covers a rolling 28-day period, so Search Console catches up over the following weeks." },
    { question: "Do you work on WordPress and Shopify sites?", answer: "Yes, as well as custom-built sites. The fixes differ by platform, so we confirm the approach in the audit." },
  ],
  related: ["Website maintenance", "Technical SEO", "Website redesign"],
};
