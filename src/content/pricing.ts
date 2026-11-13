import { site } from "./site";

export const pricing = {
  seo: {
    title: "Pricing: Websites from ₹25,000, SEO from ₹18,000/month",
    description: `${site.name} prices in rupees: websites from ₹25,000, maintenance from ₹4,000/month, SEO from ₹18,000/month and ad management from ₹12,000/month. Fixed written quotes.`,
  },
  hero: {
    title: "Clear prices, fixed before any work starts",
    accent: "fixed before any work starts",
    lead: "Every service has a published starting price in rupees. After a free audit we send a written quote for your exact scope, and that price is fixed before you commit.",
    points: ["Starting prices published", "Free audit", "Fixed written quote"],
  },
  models: [
    {
      title: "Fixed-fee projects",
      text: "One agreed price for a clearly defined scope.",
      services: ["Website development", "Business websites", "E-commerce development", "Website redesign", "Website migration", "Speed optimisation"],
    },
    {
      title: "Monthly plans",
      text: "A fixed monthly fee for ongoing work, with what's included written down.",
      services: ["Website maintenance", "SEO services", "AEO services", "GEO services", "Social media management", "Paid ads"],
    },
    {
      title: "Ad budgets",
      text: "Paid directly by you to Google or Meta, from your own accounts. Separate from our fees.",
      services: ["Google Ads", "Meta Ads"],
    },
  ],
  steps: [
    { title: "Free audit", text: "We review your current site, competitors and goals." },
    { title: "Short call", text: "We talk through what you need and answer your questions." },
    { title: "Written quote", text: "A scope listing every deliverable, with one fixed price or monthly fee." },
    { title: "Start", text: "Work begins only after you approve the scope." },
  ],
  factors: [
    "The number of pages, templates or products",
    "How much content we write",
    "Features and integrations, such as payments, booking or a CRM",
    "Migration from an existing site or platform",
    "For monthly plans: how much work each month includes",
    "Your market and how competitive it is",
  ],
  faqs: [
    { question: "Why are these 'from' prices?", answer: "Because two websites with the same number of pages can differ a lot in content, features and integrations. The starting price is what the plan costs at its listed scope; a free audit lets us quote one fixed price for exactly what you need." },
    { question: "Do the prices include GST?", answer: "No. Prices are shown before GST, which is added to the invoice at the rate that applies." },
    { question: "How do payments work?", answer: "Projects are paid in stages: a deposit to start and the balance at launch, with larger projects split into milestones. Monthly plans are billed at the start of each month. The schedule is written into your quote." },
    { question: "Is the audit really free?", answer: "Yes. We review your current site and goals and share what we find, with no charge and no obligation to work with us." },
    { question: "Are there any hidden costs?", answer: "No. Third-party costs such as hosting, domains, plugins, apps and ad budgets are listed in your quote and paid directly by you, so you can see every running cost." },
    { question: "What if the scope changes during a project?", answer: "We agree any change and its cost in writing before extra work starts, so the invoice always matches what you approved." },
    { question: "Do monthly plans have a minimum term?", answer: "Some do. SEO, AEO and GEO plans have a minimum term because results take months to build; the term is always stated in your plan before you start." },
    { question: "Can we start small?", answer: "Yes. Many businesses start with the website or a single service, and add more once they see results." },
  ],
};
