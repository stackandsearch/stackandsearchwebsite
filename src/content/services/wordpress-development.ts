import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const wordpressDevelopment: ServiceContent = {
  label: "WordPress development",
  parent: "Website development",
  graphic: "development",
  seo: {
    title: `WordPress Development Services in ${MARKET}`,
    description: "Custom WordPress websites that are fast, secure and easy to edit: block-based themes, lean plugins, SEO-ready setup, WooCommerce stores and ongoing care.",
  },
  hero: {
    title: "WordPress development without the bloat",
    accent: "without the bloat",
    lead: "We build WordPress websites your team can update with confidence: custom themes using the block editor, only the plugins you really need, and a setup that stays fast and secure. It's a strong choice when you publish often or want the flexibility of the web's most widely used CMS.",
    points: ["Block editor", "Lean plugins", "Fast and secure"],
  },
  facts: [
    { label: "Best for", value: "Content-heavy sites and teams who publish often" },
    { label: "Typical timeline", value: "4–8 weeks" },
    { label: "Pricing", value: "Fixed-fee project" },
    { label: "You own", value: "The theme, content and hosting account" },
  ],
  overview: {
    heading: "When is WordPress the right choice?",
    paragraphs: [
      "WordPress works well when your team publishes often, needs flexible page layouts, or wants a wide choice of integrations and hosting. Its block editor lets non-technical editors build and update pages visually, within the design rules we set.",
      "Its reputation for being slow and insecure usually comes from heavy themes and stacks of plugins. We build custom, lightweight themes, keep plugins to a vetted minimum and harden the setup, so you get WordPress's flexibility without the usual problems.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "A properly built WordPress site, ready for your team.",
    items: [
      { icon: "code", title: "Custom block theme", text: "A theme built for your design, with no bloated multipurpose framework." },
      { icon: "layout", title: "Custom blocks and patterns", text: "Reusable sections your editors can add without breaking the design." },
      { icon: "shield", title: "Lean, vetted plugins", text: "Only well-maintained plugins you actually need, nothing unused." },
      { icon: "gauge", title: "Performance setup", text: "Caching, image optimisation and clean code for good Core Web Vitals." },
      { icon: "lock", title: "Security hardening", text: "Login protection, user roles, an update strategy and backups configured." },
      { icon: "search", title: "SEO setup", text: "Titles, metadata, structured data, sitemaps and clean URLs." },
      { icon: "key", title: "WooCommerce (optional)", text: "A full online store on WordPress when you need one." },
      { icon: "users", title: "Editor training", text: "A walkthrough and written notes so your team can update content safely." },
    ],
  },
  process: {
    heading: "How a WordPress project runs",
    steps: [
      { title: "Plan", when: "Week 1", text: "Pages, templates, editing needs and a fixed-fee scope." },
      { title: "Design", when: "Weeks 1–3", text: "Designs for key templates and the block library." },
      { title: "Build theme and blocks", when: "Weeks 3–6", text: "Custom theme, blocks, plugins and integrations, built on staging." },
      { title: "Content, test and launch", when: "Weeks 5–8", text: "Content entry, speed and security checks, launch and training." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "Custom over multipurpose", text: "Do-everything themes load code for features you'll never use. A custom theme loads only what you need." },
      { title: "Fewer plugins, better plugins", text: "Every plugin is a dependency to update and secure, so each one has to earn its place." },
      { title: "Editing with guardrails", text: "Editors get flexibility within the design system, so pages stay consistent." },
      { title: "Care after launch", text: "WordPress needs regular updates. Our maintenance plans keep it fast and safe." },
    ],
  },
  fit: {
    heading: "Is WordPress right for you?",
    good: [
      "Your team publishes content often",
      "You want to edit pages visually",
      "You need specific plugins or integrations",
      "You're on WordPress and want it rebuilt properly",
    ],
    notFor: [
      "You want no ongoing updates or maintenance at all",
      "You need a highly custom web application",
      "Your store would suit Shopify's managed simplicity better",
    ],
  },
  pricing: {
    heading: "How WordPress projects are priced",
    paragraphs: [
      "Every WordPress build is a fixed-fee project, based on the number of templates, custom blocks and integrations.",
      "Premium plugin licences and hosting are paid directly by you, so you own every account.",
    ],
    factors: ["Number of page templates", "Custom blocks needed", "WooCommerce or not", "Content migration", "Integrations and premium plugins"],
  },
  faqs: [
    { question: "Is WordPress secure?", answer: "WordPress core is well maintained. Most problems come from outdated or poorly built plugins and themes, which is why we keep plugins minimal and recommend regular maintenance." },
    { question: "Will my WordPress site be fast?", answer: "Yes, when it's built properly. We use a lightweight custom theme, optimise images and set up caching to meet Core Web Vitals." },
    { question: "Can I edit the website myself?", answer: "Yes. The block editor lets you update text, images and sections, and we provide training at launch." },
    { question: "Can you fix or speed up my existing WordPress site?", answer: "Yes. We can audit it, clean up plugins and optimise speed, or rebuild the theme if the current one is the problem." },
    { question: "Do you use page builders like Elementor?", answer: "We prefer the native block editor with custom blocks because it's lighter and more consistent. If your team relies on a builder, we'll discuss the trade-offs." },
    { question: "Do you offer WordPress maintenance?", answer: "Yes. Our maintenance plans cover updates tested on staging, backups, security and speed checks." },
  ],
  related: ["Website maintenance", "Website development", "Website security"],
};
