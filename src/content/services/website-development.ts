import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const websiteDevelopment: ServiceContent = {
  label: "Website development",
  graphic: "development",
  seo: {
    title: `Website Development Services in ${MARKET}`,
    description:
      "Fast, SEO-ready business websites, online stores and landing pages, built from a written scope on a fixed-fee quote. You own the code, content and domain.",
  },
  hero: {
    title: "Website development services, built to be found",
    lead: "We plan, design and build fast, SEO-ready websites for businesses: company sites, online stores and landing pages. Every project starts with a written scope and a fixed-fee quote, launches in about 4–8 weeks, and leaves you owning the code, content and domain.",
    points: ["Fixed-fee quote", "Written scope", "You own everything"],
  },
  facts: [
    { label: "Best for", value: "New businesses, dated sites and teams outgrowing a template" },
    { label: "Typical timeline", value: "4–8 weeks to launch" },
    { label: "Pricing", value: "Fixed-fee project, quoted after a free audit" },
    { label: "You own", value: "The code, content, domain and analytics" },
  ],
  overview: {
    heading: "What does website development include?",
    paragraphs: [
      "Website development is everything between an idea and a live site that brings in customers: planning the pages, writing and organising the content, designing the look, building it to load fast on any phone, and launching it with search and analytics set up correctly.",
      "We build business websites, online stores and landing pages. Each one is planned around the questions your customers actually search for, so the site works as a sales tool from the first day, not an online brochure you have to promote separately.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "What every website project covers, from the first plan to the handover.",
    items: [
      {
        icon: "layout",
        title: "Content and page plan",
        text: "We map every page, its purpose and the search questions it should answer before any design starts.",
      },
      {
        icon: "pen",
        title: "Custom design",
        text: "A design built around your brand and your customers, not a reused theme, reviewed as a clickable preview.",
      },
      {
        icon: "code",
        title: "Clean, modern build",
        text: "Hand-built, mobile-first pages without bloated page builders, so the site stays fast and easy to change.",
      },
      {
        icon: "gauge",
        title: "Speed and Core Web Vitals",
        text: "We agree a performance budget and test against Google's Core Web Vitals before launch.",
      },
      {
        icon: "search",
        title: "Search-ready foundations",
        text: "Clean URLs, titles and descriptions, structured data, an XML sitemap and redirects from your old site.",
      },
      {
        icon: "accessibility",
        title: "Accessible by default",
        text: "Readable contrast, keyboard navigation and screen-reader labels, built to WCAG 2.2 AA guidelines.",
      },
      {
        icon: "chart",
        title: "Analytics and lead tracking",
        text: "Analytics, Search Console and form or call tracking, so you can see what's working from day one.",
      },
      {
        icon: "key",
        title: "Handover and ownership",
        text: "Everything registered in your name, with a short training session and written notes for your team.",
      },
    ],
  },
  process: {
    heading: "How a website project runs",
    steps: [
      {
        title: "Discovery and audit",
        when: "Week 1",
        text: "We review your current site, competitors and goals, then agree a written scope and a fixed fee.",
      },
      {
        title: "Content and structure",
        when: "Weeks 1–2",
        text: "Sitemap, page outlines and search targets. We write or edit the copy with you.",
      },
      {
        title: "Design",
        when: "Weeks 2–4",
        text: "Homepage and key templates first, then the rest, shared as clickable previews for your feedback.",
      },
      {
        title: "Build and test",
        when: "Weeks 3–7",
        text: "Development, content entry, speed and accessibility checks, and testing on real phones and browsers.",
      },
      {
        title: "Launch and handover",
        when: "Weeks 4–8",
        text: "Redirects, analytics and Search Console, go-live checks, then training and a handover pack.",
      },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      {
        title: "Content before colours",
        text: "Most redesigns disappoint because the pages say the wrong things. We agree what each page must say, and who it's for, before we design how it looks.",
      },
      {
        title: "One page, one job",
        text: "Every page targets one clear search intent and one next step. That focus is what both visitors and search engines reward.",
      },
      {
        title: "Speed is a requirement",
        text: "We set a performance budget at the start and check it on a mid-range phone, because that's how most of your visitors will see the site.",
      },
      {
        title: "No lock-in",
        text: "You get the code, the logins and the documentation. If you ever move on, you leave with everything.",
      },
    ],
  },
  fit: {
    heading: "Is website development the right place to start?",
    good: [
      "You're launching a new business, product or location",
      "Your current site is slow, dated or hard to update",
      "You need a site that brings in enquiries, not just a brochure",
      "You want search built in from the start rather than bolted on",
    ],
    notFor: [
      "You need a site live within a few days",
      "You only need a single link-in-bio page",
      "You're looking for the cheapest possible template",
    ],
  },
  pricing: {
    heading: "How website projects are priced",
    paragraphs: [
      "Every website is a fixed-fee project. After a free audit and a short call, we send a written scope listing every page and feature, with one price.",
      "If the scope changes along the way, we agree the change and its cost in writing before any extra work starts, so the invoice always matches what you approved.",
    ],
    factors: [
      "Number of pages and templates",
      "Copywriting, or content you supply",
      "Online store, booking or member features",
      "Integrations such as a CRM, payments or WhatsApp",
      "Migration from an existing website",
    ],
  },
  faqs: [
    {
      question: "How long does it take to build a website?",
      answer:
        "Most business websites take 4–8 weeks from the signed scope to launch. A focused landing page can be quicker; online stores and sites with many templates or integrations take longer. The biggest factor is usually how quickly content and feedback come back.",
    },
    {
      question: "How much does a website cost?",
      answer:
        "Every project is quoted as a fixed fee after a free audit, because the price depends on the number of pages, the features and how much content we write. You see the full scope and price in writing before you commit.",
    },
    {
      question: "Will my website be SEO-friendly?",
      answer:
        "Yes. Search foundations are part of every build: page structure, titles and descriptions, structured data, sitemaps, speed and redirects from your old URLs. Ongoing ranking work, such as new content and links, is a separate SEO service.",
    },
    {
      question: "Do I own the website?",
      answer:
        "Yes. The domain, hosting account, code and content are in your name, and we hand over every login and the documentation at launch.",
    },
    {
      question: "Can I update the website myself?",
      answer:
        "Yes. We set up an editor for the content you'll change often, such as blog posts, team pages or products, and show you how to use it.",
    },
    {
      question: "Do you redesign existing websites?",
      answer:
        "Yes. We first audit what already works, especially pages that rank or convert, and keep or redirect their URLs so you don't lose search traffic in the move.",
    },
    {
      question: "What happens after launch?",
      answer:
        "You can run the site yourself, or add a monthly maintenance plan that covers updates, backups, security, speed checks and small content changes.",
    },
  ],
  related: ["Website maintenance", "SEO services", "AEO services"],
};
