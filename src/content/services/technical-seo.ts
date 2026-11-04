import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const technicalSeo: ServiceContent = {
  label: "Technical SEO",
  parent: "SEO services",
  graphic: "development",
  seo: {
    title: `Technical SEO Services in ${MARKET}: Audits & Fixes`,
    description:
      "Technical SEO audits and fixes: crawling, indexing, Core Web Vitals, structured data, redirects and site architecture, explained in plain English and fixed by developers.",
  },
  hero: {
    title: "Technical SEO services that fix what's holding you back",
    accent: "what's holding you back",
    lead: "Technical SEO makes sure search engines can find, crawl, render and understand every important page on your site, quickly. We audit the foundations, prioritise what actually matters and, because we're developers, fix the issues ourselves instead of handing you a spreadsheet.",
    points: ["Audit and fixes", "Core Web Vitals", "Developer-led"],
  },
  facts: [
    { label: "Best for", value: "Traffic drops, migrations and pages that won't index" },
    { label: "Results usually show", value: "Weeks to a few months after fixes" },
    { label: "Pricing", value: "Fixed-fee audit; fixes quoted or on retainer" },
    { label: "You get", value: "A prioritised plan in plain English" },
  ],
  overview: {
    heading: "What is technical SEO?",
    paragraphs: [
      "Technical SEO covers everything that affects how search engines access and process your site: crawlability, indexing, page speed, mobile rendering, JavaScript, structured data, redirects, duplicate content and site architecture. If these foundations are broken, even excellent content struggles to rank.",
      "Google's guidance for both classic results and its AI features starts in the same place: pages must be crawlable, indexed and eligible to be shown with a snippet. Technical SEO is how we make sure yours are.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Every issue is ranked by its likely impact on your traffic.",
    items: [
      { icon: "search", title: "Crawl and index audit", text: "Which pages search engines can reach, which are indexed, and why others aren't." },
      { icon: "gauge", title: "Core Web Vitals", text: "Loading, responsiveness and visual stability measured on real devices and improved in code." },
      { icon: "code", title: "JavaScript and rendering", text: "Checks that important content and links work for search engines, not just for browsers." },
      { icon: "refresh", title: "Redirects and migrations", text: "Clean redirect maps, broken-link fixes and safe domain or platform moves." },
      { icon: "file", title: "Duplicates and canonicals", text: "Canonical tags, URL parameters and thin pages handled so the right URL ranks." },
      { icon: "layout", title: "Site architecture", text: "URL structure and internal links that make important pages easy to reach." },
      { icon: "sparkles", title: "Structured data", text: "Accurate schema, validated and kept in step with what each page shows." },
      { icon: "chart", title: "Monitoring", text: "Search Console checks after fixes, so regressions are caught early." },
    ],
  },
  process: {
    heading: "How technical SEO works with us",
    steps: [
      { title: "Technical audit", when: "Weeks 1–2", text: "Crawl, Search Console, speed and code review, with every issue ranked by impact." },
      { title: "Prioritised plan", when: "Week 2", text: "A short plan in plain English: what to fix first, why, and the expected effect." },
      { title: "Fix", when: "Weeks 2–6", text: "Our developers fix the issues, or work alongside your team." },
      { title: "Verify and monitor", when: "Ongoing", text: "Re-crawls and Search Console checks confirm the fixes stuck." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "Fixes, not just findings", text: "Many audits end as a spreadsheet nobody acts on. We fix the issues ourselves, in code." },
      { title: "Ranked by impact", text: "Tools flag hundreds of minor warnings. We tell you the handful that actually affect your traffic." },
      { title: "Real users over lab scores", text: "We judge speed by how real visitors experience your site, not by a one-off test score." },
      { title: "Safe migrations", text: "Moving domain or platform? We map every URL and test redirects before launch, so your rankings come with you." },
    ],
  },
  fit: {
    heading: "Is technical SEO what you need?",
    good: [
      "Traffic dropped after a redesign, migration or update",
      "Important pages aren't indexed or ranking",
      "Your site is slow on phones",
      "You're planning a redesign or platform move",
    ],
    notFor: [
      "You need content or links rather than technical work: see SEO services",
      "You want a report with no plan to act on it",
      "Your site is small and has no technical problems",
    ],
  },
  pricing: {
    heading: "How technical SEO is priced",
    paragraphs: [
      "The audit is a fixed-fee project, sized by the number of pages and templates. Fixes are quoted from the audit, or covered by an ongoing SEO retainer.",
      "For migrations, we quote the planning, redirect mapping and post-launch monitoring as one project.",
    ],
    factors: [
      "Number of pages and page templates",
      "Platform and how the site is built",
      "Number of issues to fix in code",
      "Migration or redesign in progress",
      "Ongoing monitoring needs",
    ],
  },
  faqs: [
    { question: "What does a technical SEO audit include?", answer: "Crawling and indexing, page speed and Core Web Vitals, mobile rendering, JavaScript, redirects, duplicate content, structured data and site architecture, delivered as a prioritised plan." },
    { question: "Do you fix the issues or just report them?", answer: "We fix them. As a development team we can change templates, code and server settings directly, or work with your developers." },
    { question: "How quickly do technical fixes show results?", answer: "Some fixes, such as unblocking pages or correcting redirects, can show results within weeks once pages are re-crawled. Others support rankings more gradually." },
    { question: "Can you help with a website migration?", answer: "Yes. We map old URLs to new ones, test redirects before launch and monitor Search Console afterwards to catch problems early." },
    { question: "What are Core Web Vitals?", answer: "Google's measures of real-user experience: how fast the main content loads (LCP), how quickly the page responds to input (INP) and how stable the layout stays (CLS)." },
    { question: "Do I need llms.txt or special markup for AI search?", answer: "Not for Google: its guidance says AI features need no special files. We focus on crawlability, indexing and accurate structured data, which serve both search and AI features." },
  ],
  related: ["SEO services", "Local SEO", "Speed optimisation"],
};
