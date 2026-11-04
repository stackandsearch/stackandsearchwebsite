import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const metaAds: ServiceContent = {
  label: "Meta Ads",
  parent: "Paid ads",
  graphic: "social",
  seo: {
    title: `Meta Ads Management: Facebook & Instagram Ads in ${MARKET}`,
    description:
      "Facebook and Instagram ad campaigns that create demand and capture leads: audience strategy, scroll-stopping creative, pixel and Conversions API tracking, honest reporting.",
  },
  hero: {
    title: "Meta Ads management for Facebook and Instagram",
    accent: "Facebook and Instagram",
    lead: "We plan, create and run Facebook and Instagram ad campaigns that put your business in front of the right people, often before they've started searching. Creative is built for the feed, tracking is set up properly, and you see what each lead or sale costs.",
    points: ["Creative for the feed", "Pixel and Conversions API", "Your ad account"],
  },
  facts: [
    { label: "Best for", value: "Visual products, offers and brands building demand" },
    { label: "Results usually show", value: "2–4 weeks after launch" },
    { label: "Pricing", value: "Management fee plus your ad budget" },
    { label: "You own", value: "The ad account, pixel and audiences" },
  ],
  overview: {
    heading: "What does Meta Ads management include?",
    paragraphs: [
      "Meta Ads covers paid campaigns on Facebook, Instagram, Messenger and Meta's audience network. Unlike search ads, they reach people based on who they are and what interests them, which makes them ideal for creating demand, launching offers and re-engaging past visitors.",
      "On Meta, creative does much of the targeting: the platform shows each ad to the people most likely to respond to it. So we focus on ads people stop for, test several angles at once, and keep tracking accurate so the system learns from real results.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Strategy, creative, tracking and optimisation in one plan.",
    items: [
      { icon: "users", title: "Audience strategy", text: "Broad, interest, lookalike and retargeting audiences planned around your real customers." },
      { icon: "image", title: "Scroll-stopping creative", text: "Images, carousels and short videos designed for feeds, stories and reels." },
      { icon: "pen", title: "Copy and offers", text: "Hooks, headlines and offers tested to find the angle that converts." },
      { icon: "chart", title: "Pixel and Conversions API", text: "Browser and server-side tracking set up so results are measured reliably." },
      { icon: "refresh", title: "Creative testing", text: "New ad variations tested regularly, so performance doesn't fade." },
      { icon: "target", title: "Retargeting", text: "Ads that bring back people who visited your site or engaged with your content." },
      { icon: "message", title: "Lead and message campaigns", text: "Instant forms and WhatsApp or Messenger campaigns where they suit your sales process." },
      { icon: "file", title: "Monthly reporting", text: "Spend, leads or sales and cost per result, with what we'll test next." },
    ],
  },
  process: {
    heading: "How Meta Ads management runs",
    steps: [
      { title: "Audit and goals", when: "Week 1", text: "Your account, audience and offer, and the cost per result worth aiming for." },
      { title: "Tracking setup", when: "Week 1", text: "Pixel, Conversions API and key events, tested before launch." },
      { title: "Creative and campaigns", when: "Weeks 1–2", text: "Ad concepts, copy and campaign structure, ready for your approval." },
      { title: "Launch and test", when: "Weeks 2–4", text: "Several creative angles run side by side; we keep the winners." },
      { title: "Scale what works", when: "Ongoing", text: "Budget moves to the best performers, with fresh creative every month." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "Creative is the targeting", text: "Meta's system decides who sees each ad based on how people respond, so better creative reaches better people." },
      { title: "Test angles, not just colours", text: "We test different messages and offers, not tiny design tweaks, so every test teaches something useful." },
      { title: "Lead quality over lead count", text: "Cheap leads that never answer the phone aren't a win. Where possible, we track which leads become customers and optimise for those." },
      { title: "Your data stays yours", text: "Everything runs in your own business account, so your audiences, pixel data and history stay with you." },
    ],
  },
  fit: {
    heading: "Is Meta Ads right for you?",
    good: [
      "Your product or offer works visually",
      "You want to create demand, not just capture searches",
      "You can provide photos or short videos",
      "You have a steady monthly ad budget",
    ],
    notFor: [
      "Customers only buy when they search for you: start with Google Ads",
      "You can't provide any product photos or visuals",
      "You need guaranteed sales",
    ],
  },
  pricing: {
    heading: "How Meta Ads management is priced",
    paragraphs: [
      "Your ad budget is paid directly to Meta from your own account. Our monthly fee covers strategy, creative, campaign management and reporting.",
      "Creative production, such as photo or video shoots, is quoted separately when needed.",
    ],
    factors: [
      "Number of campaigns and audiences",
      "Creative volume each month",
      "Video production needs",
      "Tracking and Conversions API setup",
      "Product catalogue or shop integration",
    ],
  },
  faqs: [
    { question: "Is Facebook advertising still worth it?", answer: "For many businesses, yes. Facebook and Instagram reach a very large audience and let you show ads to people who match your customers, even before they search. Results depend heavily on creative and offer." },
    { question: "How much should I spend on Meta Ads?", answer: "Enough for each campaign to get regular results so the system can learn. We recommend a starting budget after the audit and adjust it based on results." },
    { question: "What is the Conversions API?", answer: "Meta's server-side tracking. It sends conversion events from your website's server alongside the browser pixel, which makes results more reliable when browsers block tracking." },
    { question: "Do I need video?", answer: "It helps, especially for reels and stories, but it doesn't have to be expensive. Simple, authentic videos often outperform polished ones." },
    { question: "How quickly will I see results?", answer: "Campaigns can bring results within days, but expect 2–4 weeks of testing before costs stabilise." },
    { question: "Do I own the ad account?", answer: "Yes. Campaigns run in your business's own account, and we work through access you grant." },
  ],
  related: ["Paid ads", "Google Ads", "Social media management"],
};
