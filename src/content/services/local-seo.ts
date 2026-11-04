import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const localSeo: ServiceContent = {
  label: "Local SEO",
  parent: "SEO services",
  graphic: "seo",
  seo: {
    title: `Local SEO Services in ${MARKET}: Google Maps & Business Profile`,
    description:
      "Get found in Google Maps and 'near me' searches: Google Business Profile optimisation, location pages, a genuine reviews routine and consistent listings, reported monthly.",
  },
  hero: {
    title: "Local SEO services that put you on the map",
    accent: "on the map",
    lead: "We help local businesses show up when nearby customers search: in Google Maps, the local pack and 'near me' results. That means a complete Google Business Profile, location pages that answer local questions, a steady flow of genuine reviews and business details that match everywhere.",
    points: ["Google Business Profile", "Location pages", "Genuine reviews"],
  },
  facts: [
    { label: "Best for", value: "Businesses serving customers in specific cities or areas" },
    { label: "Results usually show", value: "2–4 months" },
    { label: "Pricing", value: "Monthly retainer, priced per location" },
    { label: "You own", value: "Your profile, listings and reviews" },
  ],
  overview: {
    heading: "What is local SEO?",
    paragraphs: [
      "Local SEO is the work of making your business the obvious choice when people nearby search for what you offer. It focuses on the map results and local pack that appear for searches like 'plumber near me' or 'bakery in [your city]', where your Google Business Profile, reviews and local relevance decide who appears.",
      "Google says local results are based mainly on relevance, distance and prominence. You can't move your shop closer to every customer, but you can make your profile complete and accurate, show clearly what you offer in each area, and earn the reviews and mentions that build prominence.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Everything that shapes how you appear in local and map results.",
    items: [
      { icon: "mapPin", title: "Google Business Profile optimisation", text: "Categories, services, hours, attributes, photos and descriptions completed and kept accurate." },
      { icon: "layout", title: "Location and service-area pages", text: "Useful pages for each area you serve, with real local detail rather than copied text." },
      { icon: "users", title: "Reviews routine", text: "A simple process for asking every customer for a review, and guidance on replying to each one." },
      { icon: "file", title: "Consistent business listings", text: "Name, address and phone number matched across directories, maps and social profiles." },
      { icon: "megaphone", title: "Profile posts and updates", text: "Offers, news and photos posted regularly, so your listing stays active and useful." },
      { icon: "code", title: "Local structured data", text: "LocalBusiness markup on your site that matches your profile details exactly." },
      { icon: "chart", title: "Local rank tracking", text: "Map and local-pack visibility checked across your service area, not just from one spot." },
      { icon: "link", title: "Local mentions and links", text: "Partnerships, local directories and community sites that build local prominence." },
    ],
  },
  process: {
    heading: "How local SEO works with us",
    steps: [
      { title: "Local audit", when: "Month 1", text: "Your profile, listings, reviews and competitors in each area you serve." },
      { title: "Fix and complete", when: "Months 1–2", text: "Profile, listings and website details corrected and made consistent." },
      { title: "Build local relevance", when: "Months 2–3", text: "Location pages, local content and a reviews routine your team can keep up." },
      { title: "Grow and track", when: "Every month", text: "Posts, mentions and reports on calls, direction requests and visibility." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "Real places only", text: "We never create listings at addresses you don't operate from. Google's guidelines don't allow them, and they get suspended." },
      { title: "Genuine reviews, never bought", text: "Buying reviews or only asking happy customers breaks platform rules. We help you ask everyone, and reply to every review, good or bad." },
      { title: "Pages people would read", text: "Location pages that only swap the city name help nobody. Each page we write includes real local detail." },
      { title: "Measured in calls", text: "We report calls, direction requests and website visits from your profile, because that's what brings in business." },
    ],
  },
  fit: {
    heading: "Is local SEO right for you?",
    good: [
      "Customers find you by searching for a service near them",
      "You serve one or more specific cities or areas",
      "You have a real address or a defined service area",
      "Your team can ask customers for reviews",
    ],
    notFor: [
      "You only sell online and have no local customers",
      "You want listings at addresses you don't operate from",
      "You want reviews bought or written for you",
    ],
  },
  pricing: {
    heading: "How local SEO is priced",
    paragraphs: [
      "Local SEO is a monthly retainer, priced mainly by the number of locations and how competitive each area is. The first month's audit sets the scope.",
      "Businesses with several branches can start with their most important location and add others as results come in.",
    ],
    factors: [
      "Number of locations or service areas",
      "Competition in each area",
      "Location pages to write",
      "Listings to clean up",
      "Review volume and reply support",
    ],
  },
  faqs: [
    { question: "How long does local SEO take?", answer: "Profile fixes can show results within weeks; stronger map visibility usually builds over 2–4 months, depending on competition and reviews." },
    { question: "Do I need a physical address?", answer: "You need either a real location customers can visit or a defined area you travel to. Google's guidelines don't allow listings at addresses you don't operate from, such as unstaffed virtual offices." },
    { question: "How do I get more Google reviews?", answer: "Ask every customer, at the right moment, with a direct link. We set up a simple routine for this. We never buy reviews or filter who gets asked." },
    { question: "Can you rank us in cities where we don't have an office?", answer: "Your map listing appears around your real location. For other areas you serve, helpful service-area pages and wider SEO can still bring in local searches." },
    { question: "What's the difference between local SEO and SEO?", answer: "Local SEO focuses on map results and searches with local intent, driven largely by your Google Business Profile. General SEO covers your whole website and non-local searches. Most local businesses benefit from both." },
    { question: "Will you manage our Google Business Profile?", answer: "Yes, with access you grant. The profile always stays owned by your business." },
  ],
  related: ["SEO services", "Technical SEO", "Google Ads"],
};
