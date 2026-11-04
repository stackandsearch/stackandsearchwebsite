import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const landingPageDesign: ServiceContent = {
  label: "Landing page design",
  parent: "Website development",
  graphic: "ads",
  seo: {
    title: `Landing Page Design for Ads & Campaigns in ${MARKET}`,
    description: "High-converting landing pages for Google and Meta ads, launches and offers: one message, one action, fast on phones, with tracking and A/B testing built in.",
  },
  hero: {
    title: "Landing page design that turns clicks into leads",
    accent: "turns clicks into leads",
    lead: "We design and build focused landing pages for ad campaigns, launches and offers. One audience, one message, one action, loading fast on the phones your ads reach, with tracking and testing built in so you can see what each page earns.",
    points: ["One page, one goal", "Fast on mobile", "Tracking built in"],
  },
  facts: [
    { label: "Best for", value: "Ad campaigns, launches, offers and events" },
    { label: "Typical timeline", value: "1–2 weeks per page" },
    { label: "Pricing", value: "Fixed fee per page" },
    { label: "You get", value: "Tracking and a testing plan" },
  ],
  overview: {
    heading: "What makes a landing page convert?",
    paragraphs: [
      "A landing page is built for one visitor arriving with one intention, usually from an ad, email or social post. Unlike a homepage, it removes distractions and keeps everything focused on a single action: call, book, buy or fill in a form.",
      "The pages that convert best match the ad that sent the visitor, answer their doubts quickly, show proof and make the action easy on a phone. We design for that, then use testing to find what works best for your audience.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Each page is designed, built, tracked and ready to test.",
    items: [
      { icon: "target", title: "Message match", text: "Headline and offer that continue exactly what the ad or email promised." },
      { icon: "pen", title: "Conversion copywriting", text: "Benefit-led copy, objection handling and clear calls to action." },
      { icon: "layout", title: "Focused layout", text: "No menus or exits that lead visitors away from the goal." },
      { icon: "message", title: "Short forms and quick contact", text: "Forms with only the fields you need, plus click-to-call or WhatsApp." },
      { icon: "gauge", title: "Fast loading", text: "Lightweight pages that load quickly on mobile connections." },
      { icon: "chart", title: "Conversion tracking", text: "Conversions sent to analytics, Google Ads and Meta, tested before launch." },
      { icon: "refresh", title: "A/B testing", text: "Headline, offer or layout variations tested to improve results over time." },
      { icon: "users", title: "Proof sections", text: "Your real reviews, client logos and results, placed where doubts arise." },
    ],
  },
  process: {
    heading: "How a landing page project runs",
    steps: [
      { title: "Brief", when: "Days 1–2", text: "Audience, offer, traffic source and the single action you want." },
      { title: "Copy and wireframe", when: "Days 2–5", text: "The message and structure, agreed before visual design." },
      { title: "Design and build", when: "Week 2", text: "Visual design, build, tracking and checks on real phones." },
      { title: "Launch and test", when: "Ongoing", text: "Live with your campaign, then tested and improved with real traffic." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "One page per audience", text: "Different ads deserve different pages. A tailored page beats a generic one." },
      { title: "Speed is conversion", text: "Every extra second of loading loses visitors you've already paid for." },
      { title: "Test, don't guess", text: "We test the elements that matter most, such as the headline and offer, before polishing details." },
      { title: "Honest proof only", text: "We use real reviews and results you can verify, never invented numbers." },
    ],
  },
  fit: {
    heading: "Do you need a landing page?",
    good: [
      "You run or plan Google or Meta ads",
      "You're launching a product, offer or event",
      "Your ads currently send traffic to the homepage",
      "You want to test messages quickly",
    ],
    notFor: [
      "You need a full website with many pages",
      "You have no traffic source planned",
      "Your offer isn't defined yet",
    ],
  },
  pricing: {
    heading: "How landing pages are priced",
    paragraphs: [
      "Each landing page is a fixed-fee project. Variations for testing, and extra pages for other audiences, are quoted per page.",
      "Pages can be built on your existing site or as standalone pages, whichever suits your campaign.",
    ],
    factors: ["Number of pages and variations", "Copywriting needs", "Forms and integrations", "Tracking setup", "Design assets such as photos or video"],
  },
  faqs: [
    { question: "What's the difference between a landing page and a homepage?", answer: "A homepage serves every visitor and links everywhere. A landing page serves one audience with one goal and removes distractions, which is why it usually converts better for campaigns." },
    { question: "Do I need a separate landing page for each ad?", answer: "Not for every ad, but usually for each distinct audience or offer. Matching the page to the ad's message is one of the biggest levers on conversion." },
    { question: "Can you build it on my existing website?", answer: "Yes, or as a standalone page. We choose based on speed, tracking and how often you'll create new pages." },
    { question: "How do you measure success?", answer: "By the conversion rate and cost per lead from your campaigns, tracked in analytics and the ad platforms." },
    { question: "Do you run A/B tests?", answer: "Yes. Once a page has enough traffic, we test variations of the headline, offer or layout to improve results." },
    { question: "How quickly can a landing page go live?", answer: "Usually within 1–2 weeks of the brief, once copy and assets are approved." },
  ],
  related: ["Paid ads", "Google Ads", "Meta Ads"],
};
