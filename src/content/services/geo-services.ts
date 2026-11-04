import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const geoServices: ServiceContent = {
  label: "GEO services",
  graphic: "geo",
  seo: {
    title: `GEO Services: Generative Engine Optimisation in ${MARKET}`,
    description:
      "Help AI assistants like ChatGPT, Gemini, Perplexity and Google's AI Mode understand, trust and mention your business. Built on real SEO and measured honestly.",
  },
  hero: {
    title: "GEO services: get mentioned by AI assistants",
    lead: "Generative engine optimisation (GEO) helps AI assistants such as ChatGPT, Gemini, Perplexity and Google's AI Mode understand your business, trust it and mention it when people ask for recommendations. We do it the durable way: clear facts about your business, expert content, a consistent reputation across the web and a technically sound site.",
    points: ["Built on real SEO", "Consistent facts", "Honest tracking"],
  },
  facts: [
    { label: "Best for", value: "Brands people research with AI before choosing" },
    { label: "Results usually show", value: "4–6+ months" },
    { label: "Pricing", value: "Monthly retainer, alongside SEO" },
    { label: "Covers", value: "ChatGPT, Gemini, Perplexity, Copilot and Google AI Mode" },
  ],
  overview: {
    heading: "What is generative engine optimisation (GEO)?",
    paragraphs: [
      "When someone asks an AI assistant which agency, product or provider to choose, the answer is generated from what the model has learned and what it finds on the web. GEO is the work of making sure your business is described accurately and favourably in the sources those systems use.",
      "Each AI platform works a little differently, and none of them sell placement. For Google's AI features, Google says the work is simply SEO. For other assistants, the same principles carry the most weight: being findable, being clearly described, and being talked about by others. GEO turns those principles into a plan.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "The audit decides where the effort goes: facts, content or reputation.",
    items: [
      { icon: "sparkles", title: "AI visibility audit", text: "How ChatGPT, Gemini, Perplexity and Google's AI Mode describe you and your competitors today, across a set of real prompts." },
      { icon: "file", title: "Clear business facts", text: "Consistent, factual descriptions of what you do, where and for whom, on your site and key profiles." },
      { icon: "pen", title: "Citable expert content", text: "Original guides, comparisons and insights from your experience: the material AI tools reference." },
      { icon: "users", title: "Reputation and mentions", text: "Reviews, listings, partnerships and PR that put your name in trusted places. No fake mentions." },
      { icon: "search", title: "Crawlable content", text: "Important content in plain HTML, not blocked by mistake, with an AI crawler policy you've agreed." },
      { icon: "code", title: "Structured data", text: "Organisation, service and product markup that accurately describes your business." },
      { icon: "chart", title: "Prompt tracking", text: "A monthly check of your visibility across tracked prompts, reported as trends." },
      { icon: "refresh", title: "Ongoing updates", text: "Facts, content and profiles kept current as your business and the platforms change." },
    ],
  },
  process: {
    heading: "How GEO works with us",
    steps: [
      { title: "Prompt and visibility audit", when: "Month 1", text: "We test real customer prompts across the major assistants and record who gets mentioned, and why." },
      { title: "Fix the facts", when: "Months 1–2", text: "Consistent business information on your site, profiles and listings, plus crawlability fixes." },
      { title: "Create citable content", when: "Months 2–4", text: "Expert pages and resources that answer the questions behind those prompts." },
      { title: "Build reputation and track", when: "Every month", text: "Earned mentions and reviews, with monthly prompt tracking and adjustments." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "No 'number one in ChatGPT' promises", text: "AI answers vary by person, wording and time. Anyone promising fixed positions is guessing. We report trends across many prompts." },
      { title: "Facts before fluff", text: "Assistants repeat what's consistent across the web. Getting your basic facts right everywhere often matters more than new content." },
      { title: "No fake mentions", text: "Planting reviews or forum posts is easy to spot and against platform rules. We earn mentions through real partnerships, PR and useful work." },
      { title: "SEO underneath", text: "Assistants that browse the web rely on search indexes, so strong SEO is still the most reliable way to be found by them." },
    ],
  },
  fit: {
    heading: "Is GEO right for you?",
    good: [
      "Your customers ask AI tools for recommendations in your category",
      "You have a clear specialism or point of view",
      "Your business details are inconsistent across the web",
      "You're investing, or ready to invest, in SEO",
    ],
    notFor: [
      "You want guaranteed mentions in ChatGPT",
      "You have no website content or reviews yet: start with the website and SEO",
      "You need results this month",
    ],
  },
  pricing: {
    heading: "How GEO is priced",
    paragraphs: [
      "GEO is a monthly retainer, normally alongside SEO. The prompt audit in the first month sets the scope and the prompts we'll track.",
      "Work is weighted toward whatever the audit shows is holding you back: inconsistent facts, thin content or a lack of mentions.",
    ],
    factors: [
      "Number of products, services and markets",
      "Number of prompts and platforms tracked",
      "Content and digital PR needed each month",
      "Profiles and listings to correct",
      "Languages",
    ],
  },
  faqs: [
    { question: "What's the difference between GEO and AEO?", answer: "They overlap. AEO focuses on being the direct answer to a question; GEO focuses on how generative AI assistants describe and recommend your brand. Both rest on SEO." },
    { question: "Can you guarantee my business will appear in ChatGPT?", answer: "No. No one controls what AI assistants say, and answers change between users and over time. We improve the signals they rely on and track your visibility honestly." },
    { question: "Which AI platforms do you cover?", answer: "We track ChatGPT, Gemini, Perplexity, Microsoft Copilot and Google's AI Overviews and AI Mode, focusing on the ones your customers use." },
    { question: "Should I block AI crawlers?", answer: "It's a business decision. Blocking AI crawlers can protect content but may reduce how often assistants can find and mention you. We explain the trade-offs and set a policy you're comfortable with." },
    { question: "How do you measure GEO?", answer: "We run a fixed set of real customer prompts each month across the major assistants and report how often and how accurately your business is mentioned, alongside traffic from AI referrals." },
    { question: "How long does GEO take?", answer: "Fixing inconsistent facts can show up within weeks as assistants refresh their sources; building enough reputation to be recommended usually takes several months." },
  ],
  related: ["AEO services", "SEO services", "Social media management"],
};
