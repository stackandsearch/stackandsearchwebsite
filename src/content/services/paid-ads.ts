import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const paidAds: ServiceContent = {
  label: "Paid ads",
  graphic: "ads",
  seo: {
    title: `Paid Ads Management: Google & Meta Ads in ${MARKET}`,
    description:
      "Google and Meta ad campaigns built around leads, not clicks: tracking set up before any spend, landing pages that convert, and plain-English reports on cost per lead.",
  },
  hero: {
    title: "Paid ads management that brings in leads, not just clicks",
    accent: "brings in leads,",
    lead: "We plan, run and improve Google and Meta ad campaigns for businesses that need enquiries now, while SEO builds up. Tracking is set up before any budget is spent, and you see what every campaign costs per lead in a plain-English report.",
    points: ["Tracking before spend", "Your ad accounts", "Plain-English reports"],
  },
  facts: [
    { label: "Best for", value: "Businesses that need enquiries while organic search grows" },
    { label: "Results usually show", value: "2–4 weeks after launch" },
    { label: "Pricing", value: "Management fee, plus your ad budget paid to Google or Meta" },
    { label: "You own", value: "The ad accounts, data and audiences" },
  ],
  overview: {
    heading: "What does paid ads management include?",
    paragraphs: [
      "Paid ads put your business in front of people at the moment they're searching (Google Ads) or scrolling (Meta's Facebook and Instagram ads). Management is the work of choosing who sees your ads, writing them, setting budgets and bids, and continually improving them based on which ones bring in enquiries.",
      "Ads are the fastest way to test demand and fill your pipeline, but they stop the day you stop paying. That's why we pair them with a landing page that converts and, over time, with SEO that lowers your cost per lead.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Everything needed to turn ad spend into measurable enquiries.",
    items: [
      { icon: "chart", title: "Conversion tracking first", text: "Calls, forms and WhatsApp clicks tracked in the ad platforms and analytics before launch, so spend is measured against real enquiries." },
      { icon: "search", title: "Keyword and audience research", text: "Search terms with buying intent, negative keywords that block waste, and audiences based on who actually buys from you." },
      { icon: "pen", title: "Ad copy and creative", text: "Search ads, image and video creative written and designed for your offer, tested in variations." },
      { icon: "layout", title: "Landing pages that convert", text: "A focused page for each campaign, so the ad's promise and the page match. Built by our development team." },
      { icon: "target", title: "Budget and bid management", text: "Budget moved toward the campaigns, keywords and audiences that bring enquiries at the lowest cost." },
      { icon: "refresh", title: "Ongoing optimisation", text: "Search-term reviews, ad testing, and audience and placement pruning on a regular schedule." },
      { icon: "shield", title: "Wasted-spend controls", text: "Location, schedule, device and placement limits, so your budget only reaches people who can become customers." },
      { icon: "file", title: "Plain-English reports", text: "Spend, leads and cost per lead by campaign, with what we changed and what we'll test next." },
    ],
  },
  process: {
    heading: "How a paid ads engagement runs",
    steps: [
      { title: "Audit and goals", when: "Week 1", text: "We review any existing accounts and agree the goal (calls, forms or sales) and a realistic cost per lead to aim for." },
      { title: "Tracking setup", when: "Week 1", text: "Conversion tracking, analytics and consent-ready tags, tested before any budget is spent." },
      { title: "Campaign build", when: "Weeks 1–2", text: "Structure, keywords or audiences, ads and landing pages, ready for your approval." },
      { title: "Launch and learn", when: "Weeks 2–4", text: "Campaigns go live with controlled budgets while the platforms learn and we cut what doesn't work." },
      { title: "Optimise and scale", when: "Ongoing", text: "We shift budget to what's working, test new ads, and scale spend when the cost per lead holds." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "Leads, not clicks", text: "Clicks and impressions are easy to inflate. We report what matters to you: enquiries, cost per enquiry and, where we can track it, revenue." },
      { title: "Your accounts, your data", text: "Campaigns run in ad accounts your business owns. If we ever part ways, your history, audiences and learnings stay with you." },
      { title: "The page matters as much as the ad", text: "Much wasted ad spend lands on a page that doesn't match the ad. We build or fix the landing page alongside the campaign." },
      { title: "Honest budgets", text: "If your budget is too small to learn from in your market, we'll say so before you spend it, and suggest where to start instead." },
    ],
  },
  fit: {
    heading: "Are paid ads right for you?",
    good: [
      "You need enquiries in weeks, not months",
      "You have a clear offer and can follow up new leads quickly",
      "You want to test demand before investing in SEO",
      "You can commit a steady monthly ad budget",
    ],
    notFor: [
      "You want results without any ongoing ad budget",
      "Your website can't take enquiries yet: fix that first",
      "Nobody can respond to new leads within a working day",
    ],
  },
  pricing: {
    heading: "How paid ads management is priced",
    paragraphs: [
      "You pay two separate things: your ad budget, paid directly to Google or Meta from your own account, and our monthly management fee for planning, building and improving the campaigns.",
      "We quote the management fee after an audit, based on the platforms, campaigns and creative you need. One-off setup work, such as tracking and landing pages, is quoted up front.",
    ],
    factors: [
      "Platforms: Google, Meta or both",
      "Number of campaigns, locations and languages",
      "Ad creative and video needs",
      "Landing pages to build or improve",
      "Reporting and call-tracking requirements",
    ],
  },
  faqs: [
    { question: "How much should I spend on ads?", answer: "It depends on your market and the cost of a click in your industry. We recommend a budget large enough to produce meaningful data within a few weeks, and we'll tell you if a proposed budget is too small to learn from." },
    { question: "How quickly will I see leads?", answer: "Search campaigns can bring enquiries within days of launch. Allow 2–4 weeks for the platforms to learn and for us to cut waste before the cost per lead settles." },
    { question: "Google Ads or Meta Ads: which is better?", answer: "Google Ads reaches people already searching for what you sell, so it usually comes first for service businesses. Meta Ads creates demand among people who match your customer profile and works well for visual products, offers and retargeting. Many businesses use both." },
    { question: "Do I own the ad accounts?", answer: "Yes. Campaigns run in accounts owned by your business, and we work in them with access you grant. Your data and history stay with you." },
    { question: "Do you guarantee results?", answer: "No honest agency can guarantee a number of leads, because results depend on your market, offer and budget. We do commit to transparent reporting and to telling you early if something isn't working." },
    { question: "Do I need a new landing page?", answer: "Often, yes. A page built for one offer and one action usually converts far better than a general homepage. We check your current pages first." },
    { question: "Can you take over campaigns we already run?", answer: "Yes. We start with an audit of your existing accounts, keep what works and restructure what wastes budget." },
  ],
  related: ["Google Ads", "Meta Ads", "SEO services"],
};
