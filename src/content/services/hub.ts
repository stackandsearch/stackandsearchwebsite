import type { ServiceFaqItem } from "./types";
import { MARKET } from "./market";

export const servicesHub = {
  seo: {
    title: `Web Development, SEO & Marketing Services in ${MARKET}`,
    description:
      "Website development, maintenance, SEO, AEO, GEO, paid ads and social media. Start with a fast website, keep it healthy, then grow it. Fixed-fee quotes.",
  },
  hero: {
    title: "Website development, SEO and growth services",
    lead: "We build your website first, keep it fast and secure, then grow it through search, AI answers, ads and social media. Start with one service, or combine them as your business grows.",
    points: ["Fixed-fee quotes", "Written scopes", "No lock-in"],
  },
  flow: {
    heading: "How the services fit together",
    intro: "Each stage depends on the one before it, which is why we usually start with the website.",
    steps: [
      { label: "Build", text: "A fast, clear website that turns visitors into enquiries." },
      { label: "Run", text: "Updates, backups, security and speed, handled every month." },
      { label: "Grow", text: "SEO, AEO, GEO, ads and social media that bring the right people in." },
    ],
  },
  groupTitles: {
    build: "Build a website that earns its keep",
    run: "Run it without the worry",
    grow: "Grow how people find you",
  } as Record<string, string>,
  faqs: [
    {
      question: "Which service should I start with?",
      answer:
        "Usually the website. Ads, SEO and social media all send people to it, so it needs to be fast, clear and trustworthy first. If your site is already strong, we can start with search or ads instead.",
    },
    {
      question: "Can I hire you for just one service?",
      answer: "Yes. Every service works on its own, and they're designed to fit together if you add more later.",
    },
    {
      question: "Do you offer packages?",
      answer:
        "Yes. Our Starter, Business and Pro packages combine a website with ongoing care and growth work. Each one is quoted after a free audit.",
    },
    {
      question: "How do I get a quote?",
      answer:
        "Request a free audit using the form on this page. We review your current site and send a written scope with a fixed price.",
    },
  ] satisfies ServiceFaqItem[],
};
