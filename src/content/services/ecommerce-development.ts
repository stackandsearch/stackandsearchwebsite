import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const ecommerceDevelopment: ServiceContent = {
  label: "E-commerce development",
  parent: "Website development",
  graphic: "commerce",
  seo: {
    title: `E-commerce Website Development in ${MARKET}`,
    description: "Online stores built to sell: fast product pages, smooth checkout, secure payments, shipping set up properly and SEO-ready product and category pages.",
  },
  hero: {
    title: "E-commerce development for online stores that sell",
    accent: "online stores that sell",
    lead: "We build online stores that load fast, make products easy to find and turn browsers into buyers: clear product pages, a smooth checkout, secure payments and shipping that just works. We recommend the right platform for your catalogue and team, and set it up so you can run it day to day.",
    points: ["Fast product pages", "Smooth checkout", "SEO-ready catalogue"],
  },
  facts: [
    { label: "Best for", value: "Brands and retailers selling online" },
    { label: "Typical timeline", value: "6–12 weeks" },
    { label: "Pricing", value: "Fixed-fee project" },
    { label: "You own", value: "The store, product data and customer data" },
  ],
  overview: {
    heading: "What does e-commerce development include?",
    paragraphs: [
      "E-commerce development covers everything between your products and a completed order: the platform, catalogue structure, product and category pages, search and filters, cart and checkout, payments, taxes, shipping, emails and the integrations that connect your store to inventory, accounting and marketing.",
      "Small details decide sales: how fast a product page loads on a phone, whether shipping costs appear early, how many steps checkout takes, and whether people trust you with their card. We design and test those details, not just the look.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Everything from catalogue structure to the first test order.",
    items: [
      { icon: "layout", title: "Catalogue structure", text: "Categories, filters and product attributes planned so customers find things fast." },
      { icon: "image", title: "Product pages", text: "Large images, clear pricing, variants, delivery information and reviews where available." },
      { icon: "key", title: "Checkout and payments", text: "A short, mobile-friendly checkout with secure payment gateways." },
      { icon: "refresh", title: "Shipping and taxes", text: "Shipping zones, rates and taxes configured for where you sell." },
      { icon: "search", title: "E-commerce SEO", text: "Clean URLs, product structured data and indexable category pages." },
      { icon: "message", title: "Order emails", text: "Order, shipping and abandoned-cart emails that match your brand." },
      { icon: "link", title: "Integrations", text: "Inventory, accounting, couriers, CRM and marketing tools connected." },
      { icon: "chart", title: "Sales tracking", text: "E-commerce analytics and ad conversion tracking set up from day one." },
    ],
  },
  process: {
    heading: "How an e-commerce project runs",
    steps: [
      { title: "Discovery", when: "Weeks 1–2", text: "Catalogue, operations, platform choice and a written scope." },
      { title: "Design", when: "Weeks 2–5", text: "Home, category, product, cart and checkout designs for your approval." },
      { title: "Build and integrate", when: "Weeks 4–10", text: "Store build, product import, payments, shipping and integrations." },
      { title: "Test and launch", when: "Weeks 9–12", text: "Test orders, speed checks and a controlled launch." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "Platform by fit, not habit", text: "Shopify, WooCommerce or custom: we recommend what suits your catalogue, team and budget." },
      { title: "Checkout tested on phones", text: "Checkout is where carts get abandoned, so we design and test it on phones first." },
      { title: "Product data done right", text: "Clean titles, attributes and images help shoppers and search engines alike." },
      { title: "Run it yourself", text: "You'll be able to add products, run offers and manage orders without calling us." },
    ],
  },
  fit: {
    heading: "Is e-commerce development right for you?",
    good: [
      "You sell physical or digital products online",
      "You're moving from marketplaces to your own store",
      "Your current store is slow or hard to manage",
      "You want product pages that rank in search",
    ],
    notFor: [
      "You only sell a few items occasionally: payment links may be enough",
      "You need a multi-vendor marketplace",
      "You need it live within a week",
    ],
  },
  pricing: {
    heading: "How e-commerce projects are priced",
    paragraphs: [
      "Every store is a fixed-fee project, quoted from a written scope after a discovery call.",
      "Platform subscriptions, apps and payment fees are paid directly by you to those providers, so you can see every running cost.",
    ],
    factors: ["Number of products and variants", "Platform choice", "Payment, shipping and tax setup", "Inventory or accounting integrations", "Product data migration"],
  },
  faqs: [
    { question: "Which e-commerce platform should I use?", answer: "It depends on your catalogue, budget and team. Shopify suits most brands that want a managed platform; WooCommerce suits WordPress users who want flexibility; custom builds suit unusual requirements. We recommend one after discovery." },
    { question: "Can you migrate my existing store?", answer: "Yes. We move products, customers and orders where the platforms allow, and redirect old URLs so you keep your search traffic." },
    { question: "Which payment gateways can you set up?", answer: "Popular gateways such as Razorpay, Stripe and PayPal, and most others your platform supports." },
    { question: "Will my products show up in Google?", answer: "We build the foundations: indexable category and product pages with structured data. Growing visibility over time takes ongoing SEO." },
    { question: "Can I manage products and orders myself?", answer: "Yes. We set up the admin for your team and walk you through it at launch." },
    { question: "How long does it take to build an online store?", answer: "Usually 6–12 weeks, depending on catalogue size, integrations and how ready your product data is." },
  ],
  related: ["Shopify development", "Paid ads", "SEO services"],
};
