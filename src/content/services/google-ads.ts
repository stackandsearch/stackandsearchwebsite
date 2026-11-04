import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const googleAds: ServiceContent = {
  label: "Google Ads",
  parent: "Paid ads",
  graphic: "ads",
  seo: {
    title: `Google Ads Management Services in ${MARKET}`,
    description:
      "Google Ads campaigns built around enquiries: Search, Performance Max and YouTube with conversion tracking, matching landing pages and honest cost-per-lead reporting.",
  },
  hero: {
    title: "Google Ads management that turns searches into enquiries",
    accent: "turns searches into enquiries",
    lead: "We build and run Google Ads campaigns that reach people at the moment they search for what you sell. Every campaign starts with conversion tracking and a landing page that matches the search, and you get plain-English reports on what each enquiry costs.",
    points: ["Search intent first", "Tracking before spend", "Your ad account"],
  },
  facts: [
    { label: "Best for", value: "Service businesses whose customers search on Google" },
    { label: "Results usually show", value: "2–4 weeks after launch" },
    { label: "Pricing", value: "Management fee plus your ad budget" },
    { label: "You own", value: "The Google Ads account and its data" },
  ],
  overview: {
    heading: "What does Google Ads management include?",
    paragraphs: [
      "Google Ads puts your business at the top of search results, on YouTube and across Google's partner sites when people look for what you offer. Management covers keyword research, campaign structure, ad writing, bidding, budgets, tracking and the constant pruning that stops money leaking into the wrong searches.",
      "Google's automated bidding and campaign types are powerful, but they optimise for whatever you tell them to. If tracking counts the wrong actions, automation spends efficiently on the wrong thing. That's why we start with tracking and landing pages, then let automation do what it's good at.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "From the first keyword to the monthly report.",
    items: [
      { icon: "search", title: "Keyword and intent research", text: "Searches with buying intent, grouped by what people want, with negative keywords to block waste." },
      { icon: "layout", title: "Campaign structure", text: "Search, Performance Max and local campaigns set up to match how your customers search." },
      { icon: "pen", title: "Ad copy and assets", text: "Headlines, descriptions, sitelinks, images and call assets written and tested for your offer." },
      { icon: "chart", title: "Conversion tracking", text: "Forms, calls and WhatsApp clicks tracked accurately, so bidding optimises for real enquiries." },
      { icon: "target", title: "Smart bidding and budgets", text: "Bid strategies and budgets matched to your goals and adjusted as data comes in." },
      { icon: "shield", title: "Search term pruning", text: "Regular reviews of the searches that triggered your ads, cutting the irrelevant ones." },
      { icon: "code", title: "Matching landing pages", text: "Pages built for each campaign's searches, so visitors find exactly what the ad promised." },
      { icon: "file", title: "Monthly reporting", text: "Spend, enquiries and cost per enquiry by campaign, with the next steps." },
    ],
  },
  process: {
    heading: "How Google Ads management runs",
    steps: [
      { title: "Audit and goals", when: "Week 1", text: "Your account (if you have one), competitors and the cost per enquiry worth aiming for." },
      { title: "Tracking setup", when: "Week 1", text: "Conversions, calls and analytics connected and tested before any spend." },
      { title: "Build campaigns", when: "Weeks 1–2", text: "Keywords, ads, assets and landing pages, ready for your approval." },
      { title: "Launch and learn", when: "Weeks 2–4", text: "Controlled budgets while bidding learns and we prune poor searches." },
      { title: "Optimise and scale", when: "Ongoing", text: "Budget moves to what works, with new ads and keywords tested every month." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "Intent over volume", text: "Ten clicks from people ready to buy beat a thousand from the merely curious. We bid hardest on searches that show intent." },
      { title: "Automation with guardrails", text: "We use Google's automation where it works, with clean tracking, negative keywords and budget limits to keep it honest." },
      { title: "Your account, always", text: "Campaigns run in an account your business owns, so your data and history stay with you." },
      { title: "No vanity metrics", text: "We report enquiries and cost per enquiry, not just impressions and clicks." },
    ],
  },
  fit: {
    heading: "Is Google Ads right for you?",
    good: [
      "Customers search on Google for what you sell",
      "You need enquiries soon",
      "You can follow up leads quickly",
      "You can sustain a monthly budget for a few months",
    ],
    notFor: [
      "Nobody searches for your product yet: Meta Ads can create demand",
      "You can't respond to enquiries promptly",
      "You want results without an ongoing ad budget",
    ],
  },
  pricing: {
    heading: "How Google Ads management is priced",
    paragraphs: [
      "Your ad budget is paid directly to Google from your own account. Our monthly management fee covers strategy, building, optimisation and reporting.",
      "We quote the fee after auditing your account or goals. Setup work such as tracking and landing pages is quoted up front.",
    ],
    factors: [
      "Number of campaigns and locations",
      "Campaign types (Search, Performance Max, YouTube)",
      "Landing pages to build",
      "Call and conversion tracking needs",
      "Reporting depth",
    ],
  },
  faqs: [
    { question: "How much should I spend on Google Ads?", answer: "Enough to get meaningful data within a few weeks, which depends on the cost per click in your industry and location. We estimate this during the audit and tell you if a budget is too small to learn from." },
    { question: "How quickly do Google Ads work?", answer: "Ads can appear the day campaigns go live. Expect a few weeks of learning and pruning before the cost per enquiry settles." },
    { question: "Should I use Performance Max?", answer: "Sometimes. It can work well with good conversion tracking and creative, but it gives less control over where ads appear. We decide campaign by campaign." },
    { question: "Do I own the Google Ads account?", answer: "Yes. It's your account; we manage it through access you grant." },
    { question: "Why not just follow Google's recommendations?", answer: "Many recommendations increase spend without improving results for your goals. We apply the ones that fit and decline the rest." },
    { question: "Do you guarantee results?", answer: "No one can guarantee leads from ads. We commit to clean tracking, regular optimisation and honest reporting." },
  ],
  related: ["Paid ads", "Meta Ads", "Landing page design"],
};
