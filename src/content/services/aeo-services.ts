import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const aeoServices: ServiceContent = {
  label: "AEO services",
  graphic: "aeo",
  seo: {
    title: `AEO Services: Answer Engine Optimisation in ${MARKET}`,
    description:
      "Become the answer people get from Google, voice assistants and AI tools: question research, answer-first content, structured data and technical SEO. No hype.",
  },
  hero: {
    title: "AEO services: become the answer, not just a link",
    accent: "become the answer,",
    lead: "Answer engine optimisation (AEO) helps your business become the answer people get when they ask a question: in Google's AI Overviews, featured answers, voice assistants and AI tools. We research the questions your customers ask, answer them clearly on your website, and make sure search engines can trust and understand those answers.",
    points: ["Built on real SEO", "Question research", "No hype"],
  },
  facts: [
    { label: "Best for", value: "Businesses whose customers research before they buy" },
    { label: "Results usually show", value: "4–6+ months" },
    { label: "Pricing", value: "Monthly retainer, usually alongside SEO" },
    { label: "Where answers appear", value: "Google, Bing, voice assistants and AI tools" },
  ],
  overview: {
    heading: "What is answer engine optimisation (AEO)?",
    paragraphs: [
      "AEO is the practice of presenting your expertise so search engines and AI assistants can pick out a clear answer and credit you for it. Instead of only ranking a page, the goal is to be the source behind the answer someone reads or hears.",
      "Here's the honest part. Google's May 2026 guidance on generative AI search says optimising for it is still SEO, and that special AI files, chopping content into chunks or extra markup aren't needed. AEO works when it's done as careful SEO: genuinely useful answers, a technically sound site and a trustworthy brand. That's how we do it.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Everything is built on the same foundations as SEO, focused on questions.",
    items: [
      { icon: "message", title: "Question research", text: "The real questions customers ask, from search data, sales calls, reviews and forums, mapped to your services." },
      { icon: "pen", title: "Answer-first content", text: "Clear, direct answers on the right pages, followed by the detail and proof that make them trustworthy." },
      { icon: "layout", title: "Readable page structure", text: "Descriptive headings and well-organised sections that help people, and machines, find the answer quickly." },
      { icon: "code", title: "Accurate structured data", text: "Schema for your organisation, services and FAQs, used where it genuinely describes the page." },
      { icon: "search", title: "Technical eligibility", text: "Pages indexed and eligible for snippets, fast and crawlable, without duplicate content: Google's stated requirements." },
      { icon: "users", title: "Brand and expertise signals", text: "Consistent business details, visible author expertise and mentions on trusted sites." },
      { icon: "chart", title: "Answer visibility tracking", text: "Monitoring where you appear in featured answers and AI Overviews for your priority questions." },
      { icon: "refresh", title: "Ongoing updates", text: "Answers kept current as your prices, services and customers' questions change." },
    ],
  },
  process: {
    heading: "How AEO works with us",
    steps: [
      { title: "Question audit", when: "Month 1", text: "Which questions matter, where you appear today, and which competitors are being quoted." },
      { title: "Fix eligibility", when: "Months 1–2", text: "Technical issues that keep your pages out of snippets and AI features." },
      { title: "Write and restructure", when: "Months 2–4", text: "Answer-first content on new and existing pages, with your expertise built in." },
      { title: "Track and refine", when: "Every month", text: "Answer visibility monitored, and content updated where competitors are winning." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "SEO first, labels second", text: "AEO isn't a replacement for SEO. It's what good SEO looks like when people ask questions, so we won't sell you a separate magic tactic." },
      { title: "No AI hacks", text: "We don't rely on special AI files, keyword-stuffed FAQs or fake mentions. Google has said plainly they aren't needed, and they can backfire." },
      { title: "Your expertise is the edge", text: "AI tools summarise what everyone says. To be quoted, your answers must add what only you know: real prices, processes, examples and opinions." },
      { title: "Honest measurement", text: "AI answers vary by person and change often, so we report trends across a set of questions, not cherry-picked screenshots." },
    ],
  },
  fit: {
    heading: "Is AEO right for you?",
    good: [
      "Customers ask many questions before choosing you",
      "You have expertise competitors don't share publicly",
      "Your site has solid SEO foundations, or you'll add them",
      "You want to be visible in AI Overviews and assistants",
    ],
    notFor: [
      "You want a quick trick to appear in ChatGPT",
      "Your site isn't indexed or has major technical problems: fix those first",
      "You can't share expert knowledge for content",
    ],
  },
  pricing: {
    heading: "How AEO is priced",
    paragraphs: [
      "AEO is a monthly retainer, usually combined with SEO because they share the same foundations. The question audit in the first month sets the scope.",
      "If you already work with us on SEO, AEO is added as an extension of that plan rather than a separate project.",
    ],
    factors: [
      "Number of services and topics to cover",
      "Content to write or restructure each month",
      "Technical fixes needed for eligibility",
      "Number of markets or languages",
      "Depth of tracking",
    ],
  },
  faqs: [
    { question: "What's the difference between AEO and SEO?", answer: "SEO helps your pages rank in search results. AEO focuses on being the direct answer to a question, in featured answers, AI Overviews and assistants. They share the same foundations, which is why we treat AEO as part of good SEO." },
    { question: "Can you get my business into ChatGPT or Google's AI Overviews?", answer: "No one can guarantee placement in AI answers. We make your content clear, trustworthy and eligible, which is what these systems draw on, and we track where you appear." },
    { question: "Do I need an llms.txt file or special schema for AI?", answer: "Not for Google: its guidance says AI features don't need special files or markup. We use structured data where it accurately describes your pages, as part of normal SEO." },
    { question: "How long does AEO take?", answer: "Usually several months, like SEO. Pages need to be indexed, trusted and clearly better than the alternatives before they're chosen as answers." },
    { question: "How do you measure AEO?", answer: "We track a set of priority questions over time: where you appear in featured answers and AI Overviews, plus traffic and enquiries from those pages." },
    { question: "Is AEO worth it for a small business?", answer: "If your customers ask questions before buying, yes. Clear answers on your site also help human visitors decide, so the work pays off beyond AI too." },
  ],
  related: ["SEO services", "GEO services", "Technical SEO"],
};
