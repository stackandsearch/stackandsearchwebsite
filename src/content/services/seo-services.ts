import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const seoServices: ServiceContent = {
  label: "SEO services",
  graphic: "seo",
  seo: {
    title: `SEO Services in ${MARKET}: Technical, Content & Local`,
    description:
      "SEO that earns lasting visibility: technical fixes, on-page optimisation, useful content and local SEO, with honest timelines and monthly reports. No ranking guarantees.",
  },
  hero: {
    title: "SEO services for lasting search visibility",
    lead: "We help your business show up when customers search for what you sell: fixing technical problems, improving the pages you have, creating content worth ranking and building your local presence. SEO takes months, not weeks, so we set honest expectations and report progress every month.",
    points: ["Honest timelines", "Technical and content", "Monthly reporting"],
  },
  facts: [
    { label: "Best for", value: "Businesses that want enquiries without paying for every click" },
    { label: "Results usually show", value: "4–6+ months" },
    { label: "Pricing", value: "Monthly retainer with a minimum term" },
    { label: "You own", value: "All content, data and accounts" },
  ],
  overview: {
    heading: "What do SEO services include?",
    paragraphs: [
      "Search engine optimisation is the work of making your website the most useful, trustworthy answer for the searches your customers make, and making sure search engines can find and understand it. It combines technical work (speed, crawling, structure), on-page work (titles, content, internal links), content creation and building your reputation across the web.",
      "Google's own guidance is clear that there are no shortcuts: helpful, original content on a technically sound site is what ranks, and the same now applies to appearing in AI Overviews and AI Mode. Our job is to do that work consistently and show you what it's achieving.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "The mix each month depends on what your audit shows will move the needle most.",
    items: [
      { icon: "search", title: "SEO audit and plan", text: "A technical, content and competitor review that becomes a prioritised plan, not a 100-page export." },
      { icon: "code", title: "Technical SEO", text: "Crawling, indexing, speed, Core Web Vitals, structured data, redirects and site architecture fixes." },
      { icon: "layout", title: "On-page optimisation", text: "Titles, headings, internal links and content improvements for the pages that can rank and convert." },
      { icon: "pen", title: "Content that earns rankings", text: "New pages and articles based on real customer questions and your expertise, not keyword stuffing." },
      { icon: "mapPin", title: "Local SEO", text: "Google Business Profile, local pages, a reviews strategy and consistent business listings." },
      { icon: "link", title: "Authority building", text: "Earning mentions and links through partnerships, PR and genuinely useful resources. No paid link schemes." },
      { icon: "chart", title: "Tracking and reporting", text: "Rankings, organic traffic and enquiries from search, reported monthly in plain English." },
      { icon: "refresh", title: "Ongoing improvement", text: "Updating what works, fixing what slips, and adapting as search changes." },
    ],
  },
  process: {
    heading: "How SEO works with us",
    steps: [
      { title: "Audit and strategy", when: "Month 1", text: "Technical audit, keyword and competitor research, and a prioritised 90-day plan." },
      { title: "Fix the foundations", when: "Months 1–2", text: "Technical issues, page structure and tracking, so new work isn't wasted." },
      { title: "Optimise key pages", when: "Months 2–3", text: "Your most valuable service and location pages improved first." },
      { title: "Create and earn", when: "Month 3 onward", text: "New content, local signals and authority building, every month." },
      { title: "Measure and adjust", when: "Every month", text: "A report on rankings, traffic and enquiries, and next month's priorities." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "No guarantees, no tricks", text: "Nobody can guarantee a number-one ranking, and anyone who does is selling risk. We follow search engine guidelines and focus on work that lasts." },
      { title: "Enquiries over vanity metrics", text: "Rankings for terms nobody searches don't pay the bills. We prioritise the searches that lead to enquiries." },
      { title: "Your expertise, written well", text: "The content that ranks best is specific and first-hand. We interview you and turn what you know into pages competitors can't copy." },
      { title: "Built on a fast site", text: "SEO works best on a site that's fast and well structured, which is why our development and SEO work is planned together." },
    ],
  },
  fit: {
    heading: "Is SEO right for you now?",
    good: [
      "You want a lasting source of enquiries that doesn't stop when ad spend does",
      "Customers search online for the services you offer",
      "You can commit to at least six months",
      "You're willing to share your expertise for content",
    ],
    notFor: [
      "You need leads this month: start with paid ads",
      "You're looking for guaranteed rankings",
      "Your website needs rebuilding first",
    ],
  },
  pricing: {
    heading: "How SEO is priced",
    paragraphs: [
      "SEO is a monthly retainer with a minimum term, because results build over months. The audit in the first month sets the plan and the scope.",
      "The retainer covers an agreed amount of technical work, content and authority building each month, written into your plan.",
    ],
    factors: [
      "Size and technical health of your site",
      "Competition in your market and locations",
      "Content needed each month",
      "Number of locations for local SEO",
      "Past penalties or migration problems",
    ],
  },
  faqs: [
    { question: "How long does SEO take to work?", answer: "Most sites see meaningful movement in 4–6 months, sometimes longer in competitive markets. Technical fixes can show results sooner; content and authority take time to build." },
    { question: "Can you guarantee first-page rankings?", answer: "No. Search engines don't sell rankings and no one controls them. We commit to doing the right work consistently and reporting honestly on progress." },
    { question: "What's the difference between SEO, AEO and GEO?", answer: "SEO is the foundation: being found in search results. AEO focuses on being the direct answer to a question, and GEO on being mentioned by AI assistants. Google treats optimising for its AI features as part of SEO, so all three build on the same work." },
    { question: "Do I need local SEO?", answer: "If customers find you by searching for a service near them, yes. Local SEO improves your Google Business Profile and map visibility, which often drives most calls for local businesses." },
    { question: "Will you write content for my website?", answer: "Yes. Content based on your expertise and your customers' real questions is a core part of SEO, and we write it with your input." },
    { question: "What reports will I get?", answer: "A monthly report covering rankings for your priority searches, organic traffic, enquiries from search, the work completed and what's next." },
    { question: "Is there a minimum contract?", answer: "Yes. SEO plans have a minimum term because results take months to build. The term is agreed in your plan before you start." },
  ],
  related: ["Local SEO", "Technical SEO", "AEO services"],
};
