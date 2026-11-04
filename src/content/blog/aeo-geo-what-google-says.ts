import type { BlogPost } from "./types";

export const aeoGeoWhatGoogleSays: BlogPost = {
  slug: "aeo-geo-what-google-says",
  title: "AEO and GEO in 2026: what Google actually says matters",
  description:
    "Google's May 2026 guide to generative AI search says AEO and GEO are still SEO. Here's what it tells site owners to focus on, and which popular tactics it says to skip.",
  date: "2026-11-04",
  readingMinutes: 7,
  tags: ["AEO", "GEO", "SEO"],
  intro:
    "Answer engine optimisation (AEO) and generative engine optimisation (GEO) are in almost every agency pitch. In May 2026, Google published its own guide to optimising for generative AI features in Search, including AI Overviews and AI Mode. It's the clearest official statement yet, and it cuts through a lot of noise.",
  sections: [
    {
      heading: "Google's position: it's still SEO",
      paragraphs: [
        "Google's guide, Optimizing your website for generative AI features on Google Search, explains that its AI features are rooted in the same core ranking and quality systems as regular Search. Its view is that optimising for generative AI search is part of optimising for the search experience, and so it is still SEO.",
        "That doesn't mean nothing has changed. It means the foundations haven't: useful content, a technically sound website and a trustworthy reputation.",
      ],
    },
    {
      heading: "What Google says you don't need to do",
      list: [
        "Create llms.txt or other special AI files or markup",
        "Break content into small chunks for AI systems",
        "Rewrite pages to target every long-tail phrasing",
        "Chase mentions that aren't genuine",
        "Add special schema for AI features: structured data isn't required for them, though it still matters for rich results",
      ],
      after: ["Many of these tactics are sold as AEO and GEO services. For Google's generative AI features, the guide says they aren't necessary."],
    },
    {
      heading: "What Google says to focus on",
      list: [
        "Original, non-commodity content that adds insight beyond common knowledge",
        "Pages that are indexed and eligible to appear with a snippet",
        "Crawlable pages, semantic HTML and sound JavaScript SEO",
        "A good page experience",
        "Less duplicate content",
      ],
      after: [
        "The non-commodity point matters most. Google contrasts generic advice with specific, first-hand content. A page explaining exactly how you solved a customer's problem, with real details, is far harder to replace with an AI summary than another generic list of tips.",
      ],
    },
    {
      heading: "Local businesses and online stores",
      paragraphs: [
        "For local and product searches, the guide points to Google Business Profile and Merchant Center feeds. If you serve a local area or sell products, keeping those accurate and complete is part of appearing in AI answers.",
      ],
    },
    {
      heading: "What about ChatGPT, Perplexity and other assistants?",
      paragraphs: [
        "Google's guide only covers Google Search. Other assistants may weigh signals differently, and none of them sell placement. In practice the same foundations help everywhere: being crawlable, clearly described, consistent across the web and genuinely useful.",
        "Be wary of anyone promising guaranteed mentions in any AI tool. Answers vary by person, wording and time.",
      ],
    },
    {
      heading: "AI agents are coming, slowly",
      paragraphs: [
        "The guide also includes early advice on AI agents: systems that act on someone's behalf, such as booking a table or comparing products. Google notes that browser agents may read pages through screenshots, the page structure and the accessibility tree.",
        "Google frames this as an emerging area. Sites built with clear structure and good accessibility are already in a strong position.",
      ],
    },
    {
      heading: "A note on FAQ markup",
      paragraphs: [
        "Separately, Google stopped showing FAQ rich results in Search on 7 May 2026. FAQPage markup is still valid and still describes your page; it just no longer creates the expandable FAQ display. FAQs remain worth writing when they answer real questions.",
      ],
    },
    {
      heading: "A practical checklist",
      list: [
        "Check in Search Console that your important pages are indexed",
        "Fix crawl blocks, slow templates and duplicate pages",
        "Rewrite generic pages with your own data, examples and opinions",
        "Keep your Google Business Profile and product feeds accurate",
        "Use structured data where it accurately describes the page",
        "Measure visibility across a set of real questions over time, not single screenshots",
      ],
    },
  ],
  sources: [
    {
      label: "Google Search Central: Optimizing your website for generative AI features on Google Search",
      href: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide",
    },
    {
      label: "Google Search Central: AI features and your website",
      href: "https://developers.google.com/search/docs/appearance/ai-features",
    },
  ],
  related: ["AEO services", "GEO services", "SEO services"],
};
