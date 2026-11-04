import type { BlogPost } from "./types";

export const websiteRedesignSeoChecklist: BlogPost = {
  slug: "website-redesign-seo-checklist",
  title: "Website redesign without losing SEO: a step-by-step checklist",
  description:
    "Redesigns are when websites most often lose search traffic. Use this checklist to benchmark, map redirects, test on staging and monitor after launch.",
  date: "2026-11-04",
  readingMinutes: 8,
  tags: ["SEO", "Web development"],
  intro:
    "A redesign is a chance to fix a slow, dated website. It's also the moment many businesses lose rankings they spent years building. Almost every loss comes from avoidable mistakes, so here's the checklist we work through on every redesign.",
  sections: [
    {
      heading: "1. Benchmark before you change anything",
      paragraphs: [
        "Export what you have: every URL, its organic traffic and conversions from analytics, its clicks and queries from Search Console, and the pages other websites link to. This is your before picture, and your list of pages that must survive the move.",
      ],
    },
    {
      heading: "2. Build a complete URL inventory",
      paragraphs: [
        "List every URL that exists today, including blog posts, PDFs and old campaign pages that are still linked from elsewhere. Crawl the site and combine the crawl with your analytics and Search Console exports, so nothing is missed.",
      ],
    },
    {
      heading: "3. Decide what happens to each page",
      list: [
        "Keep: same URL, improved content",
        "Move: new URL, with a redirect",
        "Merge: several thin pages combined into one stronger page",
        "Retire: removed deliberately, redirected to the closest relevant page where one exists",
      ],
    },
    {
      heading: "4. Map one-step 301 redirects",
      paragraphs: [
        "Every moved or merged URL needs a permanent (301) redirect to its closest equivalent. Avoid sending everything to the homepage, and avoid chains where one redirect leads to another. Update internal links to point straight at the new URLs.",
      ],
    },
    {
      heading: "5. Protect the content that ranks",
      paragraphs: [
        "Pages that bring in search traffic rank because of what they say. Keep their main topics, headings and depth. Improve them, but don't cut them down just to fit a new design.",
      ],
    },
    {
      heading: "6. Test everything on staging",
      list: [
        "Every redirect resolves in one step to the right page",
        "Titles, descriptions and headings are in place",
        "Canonical tags point to the new URLs",
        "Structured data is valid and matches what the page shows",
        "Analytics and conversion tracking fire correctly",
        "Pages are fast on a mid-range phone",
      ],
      after: [
        "Keep the staging site out of search results, for example with password protection, and make sure that protection doesn't come with you to the live site.",
      ],
    },
    {
      heading: "7. Run launch-day checks",
      list: [
        "robots.txt allows crawling and no page carries a stray noindex",
        "The XML sitemap lists the new URLs",
        "A sample of old URLs redirects correctly on the live domain",
        "Forms, payments and tracking work end to end",
        "If the domain changed, use Search Console's Change of Address tool",
      ],
    },
    {
      heading: "8. Monitor for the next four to eight weeks",
      paragraphs: [
        "Some ranking movement is normal after a big change. Watch Search Console for crawl errors, pages that drop out of the index and queries that lose clicks, and compare traffic and conversions with your benchmark. Problems caught in the first weeks are usually quick to fix.",
      ],
    },
  ],
  sources: [
    {
      label: "Google Search Central: Site moves with URL changes",
      href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
    },
  ],
  related: ["Website redesign", "Website migration", "Technical SEO"],
};
