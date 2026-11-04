import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const shopifyDevelopment: ServiceContent = {
  label: "Shopify development",
  parent: "Website development",
  graphic: "commerce",
  seo: {
    title: `Shopify Development & Store Setup in ${MARKET}`,
    description: "Shopify stores designed and built to convert: custom themes, products and collections, payments, shipping, apps and integrations, with an SEO-ready structure.",
  },
  hero: {
    title: "Shopify development for stores built to grow",
    accent: "built to grow",
    lead: "We design and build Shopify stores that look like your brand, not a template, and are set up properly behind the scenes: products and collections, payments, shipping, taxes, apps and tracking. You get a store your team can run day to day without a developer.",
    points: ["Custom theme", "Set up properly", "Easy to run"],
  },
  facts: [
    { label: "Best for", value: "Brands that want a managed, reliable store" },
    { label: "Typical timeline", value: "4–10 weeks" },
    { label: "Pricing", value: "Fixed-fee project" },
    { label: "You own", value: "Your Shopify store and its data" },
  ],
  overview: {
    heading: "Why choose Shopify?",
    paragraphs: [
      "Shopify is a hosted e-commerce platform: hosting, security, checkout and platform updates are handled for you, so you can focus on products and customers. It suits most brands, from first stores to growing catalogues, and has a large ecosystem of apps and payment options.",
      "The difference between an average and a great Shopify store is in the details: a theme that loads fast, collections that make sense, product pages that answer questions, and only the apps you need. That's where we focus.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Design, setup and handover for a store your team can run.",
    items: [
      { icon: "image", title: "Custom theme design", text: "A theme designed for your brand and built on Shopify's modern theme architecture." },
      { icon: "layout", title: "Products and collections", text: "Catalogue structure, variants, metafields and filters set up for easy browsing." },
      { icon: "key", title: "Payments and checkout", text: "Payment providers, checkout settings and trust details configured." },
      { icon: "refresh", title: "Shipping and taxes", text: "Shipping zones, rates and taxes set up for where you sell." },
      { icon: "link", title: "Apps and integrations", text: "Carefully chosen apps for reviews, subscriptions, inventory or marketing." },
      { icon: "search", title: "Shopify SEO", text: "A clean collection structure, metadata and product structured data." },
      { icon: "chart", title: "Analytics and pixels", text: "Google Analytics and Google and Meta tracking connected properly." },
      { icon: "users", title: "Training and handover", text: "A walkthrough of orders, products and discounts for your team." },
    ],
  },
  process: {
    heading: "How a Shopify project runs",
    steps: [
      { title: "Discovery", when: "Week 1", text: "Products, operations, apps and a fixed-fee scope." },
      { title: "Design", when: "Weeks 1–3", text: "Home, collection, product and cart designs for your approval." },
      { title: "Build and set up", when: "Weeks 3–8", text: "Theme build, product import, payments, shipping and apps." },
      { title: "Test and launch", when: "Weeks 7–10", text: "Test orders, speed checks, launch and team training." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "Fewer apps, faster store", text: "Each app can add scripts and monthly cost. We use built-in features first and add apps only when they earn their place." },
      { title: "Designed, not defaulted", text: "We customise or build themes so your store doesn't look like everyone else's." },
      { title: "Data you can trust", text: "Tracking is tested end to end, so ad platforms optimise on real orders." },
      { title: "Built for your team", text: "We set things up so you can run sales, add products and manage orders yourself." },
    ],
  },
  fit: {
    heading: "Is Shopify right for you?",
    good: [
      "You want a managed platform without server worries",
      "You sell physical or digital products",
      "You're moving from another platform or a marketplace",
      "Your team will run the store day to day",
    ],
    notFor: [
      "You need deep custom functionality Shopify can't support",
      "You want to avoid monthly platform fees entirely",
      "You sell only one or two items occasionally",
    ],
  },
  pricing: {
    heading: "How Shopify projects are priced",
    paragraphs: [
      "Every Shopify build is a fixed-fee project, quoted from a written scope.",
      "Your Shopify plan, any theme licence, apps and payment fees are paid directly to those providers, so you can see every running cost.",
    ],
    factors: ["Custom or adapted theme", "Number of products and variants", "Apps and integrations", "Product and customer migration", "Markets, languages and currencies"],
  },
  faqs: [
    { question: "Do I need a custom Shopify theme?", answer: "Not always. A well-chosen theme adapted to your brand can work well; a custom theme suits brands that need a distinctive design or special features. We recommend one after discovery." },
    { question: "Can you migrate my store to Shopify?", answer: "Yes. We migrate products, customers and orders where possible and redirect old URLs to protect your search traffic." },
    { question: "Is Shopify good for SEO?", answer: "Yes, when it's set up well. We structure collections, write metadata and add product structured data; ongoing growth comes from SEO work." },
    { question: "How much does Shopify cost to run?", answer: "You pay Shopify's monthly plan, plus any apps, theme licence and payment fees. We list these during discovery so there are no surprises." },
    { question: "Can I manage the store myself?", answer: "Yes. Shopify's admin is designed for that, and we train your team at launch." },
    { question: "Which payment methods can I offer?", answer: "That depends on your country and the providers Shopify supports there. We set up the options available to you, including cards, wallets and local methods where supported." },
  ],
  related: ["E-commerce development", "Meta Ads", "Website maintenance"],
};
