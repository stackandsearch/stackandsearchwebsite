// Starting prices for every service, in Indian rupees, before GST.
//
// PROPOSED FIGURES, to be confirmed by the owner before launch. They were set
// in November 2026 from published Indian agency price guides (see
// docs/PRICING-RESEARCH.md) and sit in the small-to-mid business band.
// Change a number here and it updates the service page, the pricing page,
// the homepage packages and the structured data together.
//
// Keys are service labels, exactly as in the navigation data.

export const CURRENCY = "INR";

export type PriceUnit = "project" | "month" | "page" | "integration" | "audit";

export interface PricePlan {
  name: string;
  price: number;
  unit: PriceUnit;
  bestFor: string;
  includes: string[];
  featured?: boolean;
}

export interface ServicePrice {
  // The lowest plan: shown as "From ₹…".
  from: number;
  unit: PriceUnit;
  plans: PricePlan[];
  // Short, plain notes under the plans (what is billed separately, and so on).
  notes: string[];
}

const AD_BUDGET_NOTE = "Your ad budget is separate and paid directly to the platform from your own account.";
const THIRD_PARTY_NOTE = "Domain, hosting, paid plugins or apps and stock media are billed at cost, or paid by you directly.";
const TERM_NOTE = "Results build over months, so these plans have a minimum term. It is stated in your plan before you start.";

type PlanInput = Omit<PricePlan, "unit"> & { unit?: PriceUnit };

// `unit` is how the service is normally billed. A plan billed differently
// (a monthly option on a one-off service) sets its own unit and is left out
// of the "from" price.
function service(unit: PriceUnit, plans: PlanInput[], notes: string[]): ServicePrice {
  const withUnit = plans.map((plan) => ({ ...plan, unit: plan.unit ?? unit }));
  const usual = withUnit.filter((plan) => plan.unit === unit);
  return { from: Math.min(...usual.map((plan) => plan.price)), unit, plans: withUnit, notes };
}

export const servicePrices: Record<string, ServicePrice> = {
  // --- Build -------------------------------------------------------------------
  "Website development": service(
    "project",
    [
      {
        name: "Starter",
        price: 25000,
        bestFor: "New and small businesses",
        includes: ["Up to 5 pages, mobile-first", "Contact form and WhatsApp link", "SSL and hosting setup", "Basic on-page SEO"],
      },
      {
        name: "Business",
        price: 50000,
        featured: true,
        bestFor: "Growing businesses",
        includes: ["Up to 12 pages plus a blog", "CRM, WhatsApp and analytics set up", "Schema markup", "Speed optimisation"],
      },
      {
        name: "Pro",
        price: 100000,
        bestFor: "Online stores and custom needs",
        includes: ["E-commerce or custom features", "Payment gateway", "Booking or membership", "Advanced integrations"],
      },
    ],
    [THIRD_PARTY_NOTE, "Paid in stages: a deposit to start, the balance at launch."],
  ),
  "Business websites": service(
    "project",
    [
      {
        name: "Starter",
        price: 25000,
        bestFor: "A first professional website",
        includes: ["Up to 5 pages", "Enquiry form and WhatsApp link", "Basic on-page SEO", "Hosting and SSL setup"],
      },
      {
        name: "Business",
        price: 50000,
        featured: true,
        bestFor: "Service businesses that want enquiries",
        includes: ["Up to 12 pages plus a blog", "A page for each service", "Schema markup and analytics", "CRM or email integration"],
      },
      {
        name: "Plus",
        price: 80000,
        bestFor: "Multi-service or multi-location firms",
        includes: ["Up to 25 pages", "Location and service page templates", "Copywriting for key pages", "Lead tracking set up"],
      },
    ],
    [THIRD_PARTY_NOTE],
  ),
  "E-commerce development": service(
    "project",
    [
      {
        name: "Launch",
        price: 60000,
        bestFor: "A first online store",
        includes: ["Up to 50 products", "Payment gateway and shipping rules", "Order emails and tax setup", "Product page SEO"],
      },
      {
        name: "Growth",
        price: 120000,
        featured: true,
        bestFor: "Stores ready to scale",
        includes: ["Up to 500 products", "Filters, search and collections", "Product schema and feeds", "Abandoned-cart emails"],
      },
      {
        name: "Custom",
        price: 200000,
        bestFor: "Complex catalogues and integrations",
        includes: ["Custom features and checkout logic", "Inventory or ERP integration", "Multi-currency or B2B pricing", "Data migration"],
      },
    ],
    [THIRD_PARTY_NOTE, "Payment gateway and platform fees are charged by those providers."],
  ),
  "Landing page design": service(
    "page",
    [
      {
        name: "Single page",
        price: 12000,
        bestFor: "One offer or campaign",
        includes: ["One landing page, designed and built", "Lead form with spam protection", "Conversion tracking", "Mobile and speed checks"],
      },
      {
        name: "Campaign set",
        price: 30000,
        featured: true,
        bestFor: "Testing messages against each other",
        includes: ["Three pages or variants", "A/B test setup", "Thank-you page", "Tracking for each variant"],
      },
      {
        name: "Funnel",
        price: 50000,
        bestFor: "A full lead funnel",
        includes: ["Up to five pages", "CRM and email automation", "WhatsApp hand-off", "A month of test changes"],
      },
    ],
    ["Ad management is a separate service.", THIRD_PARTY_NOTE],
  ),
  "Website redesign": service(
    "project",
    [
      {
        name: "Refresh",
        price: 35000,
        bestFor: "A dated site with a sound structure",
        includes: ["New design on the same structure", "Up to 8 pages", "Speed and mobile fixes", "Redirects checked"],
      },
      {
        name: "Rebuild",
        price: 70000,
        featured: true,
        bestFor: "Sites that no longer win enquiries",
        includes: ["New structure and design", "Up to 20 pages", "Full redirect map", "Content tidy-up and on-page SEO"],
      },
      {
        name: "Replatform",
        price: 120000,
        bestFor: "Moving to a new platform",
        includes: ["Rebuild on a new platform", "Content and data migration", "Ranking checks before and after", "Team training"],
      },
    ],
    [THIRD_PARTY_NOTE],
  ),
  "UI/UX design": service(
    "project",
    [
      {
        name: "UX review",
        price: 20000,
        bestFor: "Finding what stops visitors converting",
        includes: ["Review of your key pages", "A prioritised list of fixes", "Annotated screens", "A walkthrough call"],
      },
      {
        name: "Design",
        price: 45000,
        featured: true,
        bestFor: "A new site or a redesign",
        includes: ["Wireframes and visual design", "Up to 8 screens", "Mobile and desktop layouts", "Developer-ready files"],
      },
      {
        name: "Product",
        price: 90000,
        bestFor: "Apps and larger sites",
        includes: ["Full user journeys", "Up to 20 screens", "Clickable prototype", "A small design system"],
      },
    ],
    ["Design only. Building the designs is quoted with website development."],
  ),
  "WordPress development": service(
    "project",
    [
      {
        name: "Starter",
        price: 30000,
        bestFor: "A simple, editable site",
        includes: ["Up to 6 pages", "Block-editor theme", "Essential plugins only", "Editor training"],
      },
      {
        name: "Business",
        price: 55000,
        featured: true,
        bestFor: "Teams who publish often",
        includes: ["Up to 15 pages plus a blog", "Custom blocks and templates", "Forms, CRM and analytics", "Speed and security setup"],
      },
      {
        name: "WooCommerce",
        price: 75000,
        bestFor: "Selling from WordPress",
        includes: ["Store with up to 100 products", "Payment gateway and shipping", "Product SEO", "Order emails"],
      },
    ],
    [THIRD_PARTY_NOTE],
  ),
  "Shopify development": service(
    "project",
    [
      {
        name: "Launch",
        price: 35000,
        bestFor: "Getting a store live quickly",
        includes: ["Theme set up and customised", "Up to 30 products", "Payments, shipping and taxes", "Core pages and policies"],
      },
      {
        name: "Growth",
        price: 70000,
        featured: true,
        bestFor: "Brands improving conversion",
        includes: ["Custom sections and templates", "Up to 200 products", "Apps chosen and configured", "Email flows set up"],
      },
      {
        name: "Custom",
        price: 125000,
        bestFor: "A bespoke store or a migration",
        includes: ["Custom theme", "Migration from another platform", "Custom integrations", "Launch support"],
      },
    ],
    ["Shopify's plan and app fees are charged by Shopify and the app makers."],
  ),

  // --- Run ---------------------------------------------------------------------
  "Website maintenance": service(
    "month",
    [
      {
        name: "Essential",
        price: 4000,
        bestFor: "Small business sites",
        includes: ["Updates and security patches", "Daily backups", "Uptime monitoring", "1 hour of edits a month"],
      },
      {
        name: "Growth",
        price: 9000,
        featured: true,
        bestFor: "Sites that change every month",
        includes: ["Everything in Essential", "4 hours of edits a month", "Speed checks and fixes", "Monthly report"],
      },
      {
        name: "Pro",
        price: 18000,
        bestFor: "Online stores and busy sites",
        includes: ["Everything in Growth", "10 hours of edits a month", "Staging site for changes", "Same-day response"],
      },
    ],
    ["Extra work beyond your monthly hours is quoted before it starts.", "Hosting and licence renewals are billed at cost."],
  ),
  "Speed optimisation": service(
    "project",
    [
      {
        name: "Tune-up",
        price: 15000,
        bestFor: "A site that is a little slow",
        includes: ["Speed audit", "Image, font and caching fixes", "Up to 5 page templates", "Before and after report"],
      },
      {
        name: "Core Web Vitals",
        price: 30000,
        featured: true,
        bestFor: "Failing Core Web Vitals",
        includes: ["Full-site audit", "Script and layout-shift fixes", "Hosting and CDN tuning", "Field data tracking"],
      },
      {
        name: "Deep rebuild",
        price: 55000,
        bestFor: "Heavy themes and page builders",
        includes: ["Theme or template refactor", "Third-party script strategy", "All key templates", "30 days of monitoring"],
      },
    ],
    ["If a faster host is needed, its cost is paid to the host."],
  ),
  "Website security": service(
    "project",
    [
      {
        name: "Hardening",
        price: 10000,
        featured: true,
        bestFor: "Preventing problems",
        includes: ["Security audit", "Firewall and login protection", "Backup setup", "Software and plugin clean-up"],
      },
      {
        name: "Clean-up",
        price: 15000,
        bestFor: "A hacked or flagged site",
        includes: ["Malware removal", "Blocklist review requests", "Hardening after the fix", "A report on what happened"],
      },
      {
        name: "Managed",
        price: 5000,
        unit: "month",
        bestFor: "Ongoing protection",
        includes: ["Monitoring and alerts", "Patching every month", "Monthly scan and report", "Help if anything goes wrong"],
      },
    ],
    ["Managed is a monthly plan; Hardening and Clean-up are one-off projects.", "Security helps reduce risk; no service can promise a site will never be attacked."],
  ),
  "Website migration": service(
    "project",
    [
      {
        name: "Small",
        price: 20000,
        bestFor: "Up to 25 pages",
        includes: ["Content moved across", "Redirect for every old URL", "Analytics and forms checked", "Launch-day monitoring"],
      },
      {
        name: "Standard",
        price: 45000,
        featured: true,
        bestFor: "Up to 150 pages or a new domain",
        includes: ["Full redirect map", "Metadata and schema carried over", "Search Console change of address", "Ranking checks for 30 days"],
      },
      {
        name: "Large",
        price: 90000,
        bestFor: "Stores and platform changes",
        includes: ["Products, customers and orders", "500+ URLs", "Staged launch plan", "Ranking checks for 60 days"],
      },
    ],
    [THIRD_PARTY_NOTE],
  ),
  "Website integrations": service(
    "integration",
    [
      {
        name: "Simple",
        price: 8000,
        bestFor: "Ready-made connections",
        includes: ["WhatsApp, chat or call tracking", "Forms to a sheet or email tool", "Analytics and tag setup", "Tested end to end"],
      },
      {
        name: "Standard",
        price: 20000,
        featured: true,
        bestFor: "Business tools",
        includes: ["CRM or email marketing", "Payment gateway", "Booking or scheduling", "Error alerts"],
      },
      {
        name: "Custom",
        price: 45000,
        bestFor: "No ready-made connector",
        includes: ["Custom API work", "ERP or inventory sync", "Data mapping and logs", "Written documentation"],
      },
    ],
    ["Subscription fees for the tools themselves are paid to their providers."],
  ),

  // --- Grow --------------------------------------------------------------------
  "Paid ads": service(
    "month",
    [
      {
        name: "Starter",
        price: 15000,
        bestFor: "One platform, ad budget up to ₹1,00,000 a month",
        includes: ["Google or Meta", "Campaign build and tracking", "Weekly optimisation", "Monthly report"],
      },
      {
        name: "Growth",
        price: 30000,
        featured: true,
        bestFor: "Both platforms, ad budget up to ₹3,00,000 a month",
        includes: ["Google and Meta together", "Remarketing", "Ad creative testing", "Fortnightly review call"],
      },
      {
        name: "Scale",
        price: 50000,
        bestFor: "Ad budget above ₹3,00,000 a month",
        includes: ["12% of ad spend, from ₹50,000", "Full-funnel campaigns", "Landing page test ideas", "Weekly reporting"],
      },
    ],
    [AD_BUDGET_NOTE, "One-off setup of accounts and conversion tracking: ₹10,000."],
  ),
  "Google Ads": service(
    "month",
    [
      {
        name: "Starter",
        price: 15000,
        bestFor: "Ad budget up to ₹1,00,000 a month",
        includes: ["Search campaigns", "Keyword and negative lists", "Conversion tracking", "Monthly report"],
      },
      {
        name: "Growth",
        price: 25000,
        featured: true,
        bestFor: "Ad budget up to ₹3,00,000 a month",
        includes: ["Search and Performance Max", "Remarketing", "Ad and landing page tests", "Fortnightly review call"],
      },
      {
        name: "Scale",
        price: 40000,
        bestFor: "Ad budget above ₹3,00,000 a month",
        includes: ["12% of ad spend, from ₹40,000", "Search, PMax, YouTube and Display", "Offline conversion import", "Weekly reporting"],
      },
    ],
    [AD_BUDGET_NOTE, "One-off account and tracking setup: ₹10,000."],
  ),
  "Meta Ads": service(
    "month",
    [
      {
        name: "Starter",
        price: 12000,
        bestFor: "Ad budget up to ₹75,000 a month",
        includes: ["Facebook and Instagram campaigns", "4 ad creatives a month", "Pixel and event setup", "Monthly report"],
      },
      {
        name: "Growth",
        price: 22000,
        featured: true,
        bestFor: "Ad budget up to ₹2,50,000 a month",
        includes: ["8 ad creatives a month", "Retargeting and lookalikes", "Lead form or WhatsApp campaigns", "Fortnightly review call"],
      },
      {
        name: "Scale",
        price: 40000,
        bestFor: "Ad budget above ₹2,50,000 a month",
        includes: ["12% of ad spend, from ₹40,000", "Creative testing plan", "Catalogue and Conversions API", "Weekly reporting"],
      },
    ],
    [AD_BUDGET_NOTE, "One-off account, pixel and tracking setup: ₹8,000."],
  ),
  "Social media management": service(
    "month",
    [
      {
        name: "Starter",
        price: 12000,
        bestFor: "Staying active and consistent",
        includes: ["2 platforms", "12 posts a month", "Content calendar for approval", "Monthly report"],
      },
      {
        name: "Growth",
        price: 22000,
        featured: true,
        bestFor: "Building an audience",
        includes: ["3 platforms", "20 posts a month, 4 short videos", "Comments and messages handled", "Monthly review call"],
      },
      {
        name: "Pro",
        price: 40000,
        bestFor: "Brands that post most days",
        includes: ["4 platforms", "30 posts a month, 8 short videos", "Campaign and festival planning", "Fortnightly review call"],
      },
    ],
    ["Paid promotion is managed under Meta Ads; ad budget is separate.", "Photo and video shoots are quoted separately."],
  ),
  "SEO services": service(
    "month",
    [
      {
        name: "Starter",
        price: 18000,
        bestFor: "Small sites in a local or niche market",
        includes: ["Technical fixes", "Up to 15 target keywords", "2 pieces of content a month", "Monthly report"],
      },
      {
        name: "Growth",
        price: 35000,
        featured: true,
        bestFor: "Businesses competing across a region",
        includes: ["Up to 40 target keywords", "4 pieces of content a month", "Authority and link building", "Google Business Profile care"],
      },
      {
        name: "Scale",
        price: 65000,
        bestFor: "E-commerce and multi-location sites",
        includes: ["Category and location page programme", "8 pieces of content a month", "Digital PR", "Fortnightly review call"],
      },
    ],
    [TERM_NOTE, "No ranking guarantees: nobody can honestly promise a position on Google."],
  ),
  "Local SEO": service(
    "month",
    [
      {
        name: "Single location",
        price: 12000,
        bestFor: "One shop, clinic or office",
        includes: ["Google Business Profile optimisation", "Local listings cleaned up", "Review request process", "Local landing page"],
      },
      {
        name: "Multi-location",
        price: 20000,
        featured: true,
        bestFor: "Up to 3 locations",
        includes: ["A profile and page for each location", "Posts and photos every month", "Review replies drafted", "Map ranking report"],
      },
      {
        name: "Regional",
        price: 35000,
        bestFor: "Up to 8 locations",
        includes: ["Location page programme", "Local link building", "Listings managed at scale", "Monthly review call"],
      },
    ],
    [TERM_NOTE],
  ),
  "Technical SEO": service(
    "audit",
    [
      {
        name: "Audit",
        price: 20000,
        bestFor: "Knowing exactly what is wrong",
        includes: ["Full crawl and indexing review", "Speed and Core Web Vitals", "Structured data check", "A prioritised fix list"],
      },
      {
        name: "Audit and fixes",
        price: 45000,
        featured: true,
        bestFor: "Getting it fixed, not just listed",
        includes: ["Everything in Audit", "We make the fixes", "Redirects, canonicals and sitemaps", "Re-test and report"],
      },
      {
        name: "Ongoing",
        price: 15000,
        unit: "month",
        bestFor: "Large or fast-changing sites",
        includes: ["Monthly crawl and monitoring", "Fixes as issues appear", "Release checks", "Monthly report"],
      },
    ],
    ["Audit prices are for sites of up to about 200 pages; larger sites are quoted.", "Ongoing is a monthly plan; the other two are one-off projects."],
  ),
  "AEO services": service(
    "month",
    [
      {
        name: "Add-on",
        price: 12000,
        bestFor: "Added to an SEO plan",
        includes: ["Question research", "FAQ and answer content", "FAQ and how-to schema", "Answer visibility report"],
      },
      {
        name: "Core",
        price: 22000,
        featured: true,
        bestFor: "A standalone answer programme",
        includes: ["Answer-first rewrites of key pages", "4 answer pieces a month", "Schema across the site", "Featured snippet tracking"],
      },
      {
        name: "Authority",
        price: 40000,
        bestFor: "Competitive, research-heavy markets",
        includes: ["8 answer pieces a month", "Expert and source citations", "Voice and AI answer checks", "Monthly review call"],
      },
    ],
    [TERM_NOTE, "Where answers appear is decided by the search and AI platforms; we can improve your chances, not guarantee a placement."],
  ),
  "GEO services": service(
    "month",
    [
      {
        name: "Add-on",
        price: 15000,
        bestFor: "Added to an SEO plan",
        includes: ["AI visibility baseline", "Entity and brand fact clean-up", "Citation-ready content edits", "Quarterly AI visibility check"],
      },
      {
        name: "Core",
        price: 28000,
        featured: true,
        bestFor: "A standalone AI-search programme",
        includes: ["Tracking across 3 AI platforms", "4 citation-ready pieces a month", "Structured data and llms.txt", "Monthly visibility report"],
      },
      {
        name: "Authority",
        price: 50000,
        bestFor: "Brands that want to be the cited source",
        includes: ["Tracking across 5 AI platforms", "Original data or research pieces", "Digital PR for mentions", "Monthly review call"],
      },
    ],
    [TERM_NOTE, "AI tools choose their own sources; we can improve how often you are cited, not guarantee it."],
  ),
};

export const PRICE_FOOTNOTE =
  "Prices are starting points in Indian rupees and exclude GST. Your written quote is fixed once the scope is agreed.";

const UNIT_SUFFIX: Record<PriceUnit, string> = {
  project: "",
  month: "/month",
  page: " per page",
  integration: " per integration",
  audit: "",
};

const UNIT_WORDS: Record<PriceUnit, string> = {
  project: "One-off project",
  month: "Billed monthly",
  page: "Per page",
  integration: "Per integration",
  audit: "One-off project",
};

// 100000 -> "₹1,00,000" (Indian digit grouping).
export function formatRupees(amount: number) {
  const digits = String(Math.round(amount));
  if (digits.length <= 3) return `₹${digits}`;
  const head = digits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `₹${head},${digits.slice(-3)}`;
}

// "₹4,000/month", "₹12,000 per page", "₹25,000".
export function priceLabel(amount: number, unit: PriceUnit) {
  return `${formatRupees(amount)}${UNIT_SUFFIX[unit]}`;
}

export const unitWords = (unit: PriceUnit) => UNIT_WORDS[unit];

export function priceFor(label: string): ServicePrice | undefined {
  return servicePrices[label];
}
