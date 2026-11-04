import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const businessWebsites: ServiceContent = {
  label: "Business websites",
  parent: "Website development",
  graphic: "development",
  seo: {
    title: `Business Website Design & Development in ${MARKET}`,
    description: "Professional websites for service firms, clinics, consultancies and local businesses: fast, SEO-ready, easy to update and built on a fixed-fee quote.",
  },
  hero: {
    title: "Business websites that win trust and enquiries",
    accent: "win trust and enquiries",
    lead: "We design and build websites for service businesses, professional firms and local companies: clear about what you do, fast on every phone, and set up to turn visitors into calls, forms and WhatsApp enquiries. You get a fixed-fee quote, a written scope and full ownership.",
    points: ["Built for enquiries", "Easy to update", "Fixed-fee quote"],
  },
  facts: [
    { label: "Best for", value: "Service firms, clinics, consultancies and local businesses" },
    { label: "Typical timeline", value: "4–6 weeks" },
    { label: "Pricing", value: "Fixed-fee project" },
    { label: "You own", value: "The code, content and domain" },
  ],
  overview: {
    heading: "What makes a good business website?",
    paragraphs: [
      "A business website has one job: convince the right visitor to get in touch. That means saying clearly who you help and how, showing proof that you're good at it, answering the questions people have before they call, and making the next step obvious on every page.",
      "We plan the pages around those questions and around what your customers search for, then design and build them to load fast on mid-range phones, which is how many of your visitors will see the site.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Everything a service business needs to look credible and get enquiries.",
    items: [
      { icon: "layout", title: "Page plan and sitemap", text: "Home, services, about, contact and the pages your customers actually look for, planned before design." },
      { icon: "pen", title: "Copywriting support", text: "Clear, specific copy written with you, so every page answers real customer questions." },
      { icon: "image", title: "Custom design", text: "A design built around your brand, using real photos where possible instead of generic stock." },
      { icon: "message", title: "Enquiry paths", text: "Forms, click-to-call and WhatsApp buttons placed where visitors decide to get in touch." },
      { icon: "search", title: "SEO foundations", text: "Titles, descriptions, structured data, a sitemap and fast, clean code from day one." },
      { icon: "mapPin", title: "Local details", text: "Address, service areas, opening hours and a map, matching your Google Business Profile." },
      { icon: "code", title: "Easy editing", text: "An editor for the pages you'll update, such as services, team and news." },
      { icon: "chart", title: "Enquiry tracking", text: "Forms, calls and WhatsApp clicks tracked, so you know which pages bring in business." },
    ],
  },
  process: {
    heading: "How a business website project runs",
    steps: [
      { title: "Plan", when: "Week 1", text: "Goals, audience, competitors and a page-by-page plan with a fixed fee." },
      { title: "Write and design", when: "Weeks 1–3", text: "Copy and designs for the key pages, shared for your feedback." },
      { title: "Build", when: "Weeks 3–5", text: "Development, content entry and testing on real phones and browsers." },
      { title: "Launch", when: "Weeks 4–6", text: "Go-live checks, tracking, Search Console and a handover session." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "Clarity beats cleverness", text: "Visitors decide in seconds. Plain words about what you do and who it's for outperform clever slogans." },
      { title: "Proof where doubts arise", text: "Your reviews, examples and credentials placed next to the claims they support, not hidden on one page." },
      { title: "One clear next step", text: "Every page ends with the obvious way to get in touch." },
      { title: "Built to grow", text: "Adding services, locations or a blog later shouldn't need a rebuild." },
    ],
  },
  fit: {
    heading: "Is a business website what you need?",
    good: [
      "You sell services and need enquiries",
      "Your current site is dated, slow or unclear",
      "You want to edit basic content yourself",
      "You plan to add SEO or ads later",
    ],
    notFor: [
      "You need an online store: see e-commerce development",
      "You only need a single campaign page: see landing page design",
      "You need it live within a few days",
    ],
  },
  pricing: {
    heading: "How business websites are priced",
    paragraphs: [
      "Every business website is a fixed-fee project. After a free audit and a short call, we send a written scope listing every page and feature, with one price.",
      "The biggest factors are the number of pages, how much copy we write and any integrations, such as booking or a CRM.",
    ],
    factors: ["Number of pages", "Copywriting needs", "Photography or illustration", "Booking, CRM or WhatsApp integrations", "Languages"],
  },
  faqs: [
    { question: "How many pages does a business website need?", answer: "Enough to answer what customers ask: usually a home page, a page per main service, about, contact and supporting pages such as FAQs or locations. We plan the exact list with you." },
    { question: "Can you write the content?", answer: "Yes. We write or edit the copy with you, using your knowledge and your customers' questions, so it sounds like your business." },
    { question: "Will I be able to update the site myself?", answer: "Yes. We set up an editor for the content you'll change often, and show you how to use it at launch." },
    { question: "Is SEO included?", answer: "SEO foundations are part of every build. Ongoing ranking work, such as new content and local SEO, is a separate service you can add later." },
    { question: "How long does it take?", answer: "Most business websites take 4–6 weeks from the signed scope, depending mostly on how quickly content and feedback come back." },
    { question: "Who owns the hosting account?", answer: "You do. Hosting, domain and code are in your name, and we hand over every login at launch." },
  ],
  related: ["Website development", "Landing page design", "Local SEO"],
};
