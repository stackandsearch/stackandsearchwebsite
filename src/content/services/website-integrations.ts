import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const websiteIntegrations: ServiceContent = {
  label: "Website integrations",
  graphic: "connect",
  seo: {
    title: `Website Integrations: CRM, Payments & WhatsApp in ${MARKET}`,
    description: "Connect your website to the tools you run on: CRM, payments, WhatsApp, booking, email marketing and analytics, built reliably with error handling and documentation.",
  },
  hero: {
    title: "Website integrations that connect your tools",
    accent: "connect your tools",
    lead: "We connect your website to the systems your business runs on: your CRM, payment gateway, WhatsApp, booking calendar, email marketing and analytics. Leads, orders and data then flow where they need to go automatically, without copy-paste and without silently failing.",
    points: ["CRM and payments", "WhatsApp and booking", "Reliable by design"],
  },
  facts: [
    { label: "Best for", value: "Businesses re-typing website data into other tools" },
    { label: "Typical timeline", value: "1–4 weeks per integration" },
    { label: "Pricing", value: "Fixed fee per integration" },
    { label: "You get", value: "Documentation for every connection" },
  ],
  overview: {
    heading: "What are website integrations?",
    paragraphs: [
      "An integration connects your website to another system so information moves between them automatically: a contact form that creates a lead in your CRM, a checkout that takes payment through your gateway, a booking that lands in your calendar, or a button that opens a WhatsApp chat with the details already filled in.",
      "Integrations save hours of manual work, but only if they're reliable. Connections built without error handling fail quietly, and you discover lost leads weeks later. We build ours to log, retry and alert, so nothing goes missing.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Built with the tools you already use wherever possible.",
    items: [
      { icon: "users", title: "CRM integration", text: "Leads from forms and chats created in your CRM, with the right fields and source." },
      { icon: "key", title: "Payment gateways", text: "Secure checkout and payment links through the gateway you use." },
      { icon: "message", title: "WhatsApp and chat", text: "Click-to-chat buttons, pre-filled messages and chat widgets that don't slow the site." },
      { icon: "calendar", title: "Booking and scheduling", text: "Appointment booking connected to your calendar or booking system." },
      { icon: "megaphone", title: "Email marketing", text: "Newsletter and lead lists synced to your email platform, with consent recorded." },
      { icon: "chart", title: "Analytics and tracking", text: "Events, conversions and campaign data flowing into analytics and ad platforms." },
      { icon: "code", title: "APIs and custom connections", text: "Custom connections to your own systems where off-the-shelf tools don't fit." },
      { icon: "shield", title: "Error handling and logs", text: "Failures logged and alerted, with retries, so data isn't lost silently." },
    ],
  },
  process: {
    heading: "How an integration project runs",
    steps: [
      { title: "Discovery", when: "Week 1", text: "Which systems, what data, and what should happen when something fails." },
      { title: "Design", when: "Week 1", text: "A short spec of each data flow, field by field." },
      { title: "Build and test", when: "Weeks 1–3", text: "Built on staging and tested with real scenarios, including failures." },
      { title: "Launch and document", when: "Weeks 2–4", text: "Go-live, monitoring and written documentation for your team." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "Design for failure", text: "Every external service goes down sometimes. We plan what happens then, so leads and orders aren't lost." },
      { title: "Use what you have", text: "We work with the CRM, gateway and tools you already pay for, rather than pushing new ones." },
      { title: "Respect privacy", text: "Only the data that's needed moves between systems, with consent captured where required." },
      { title: "Documented, not mysterious", text: "You get notes on how each integration works, so it never becomes a black box." },
    ],
  },
  fit: {
    heading: "Do you need website integrations?",
    good: [
      "You copy website data into other tools by hand",
      "Leads or bookings have gone missing",
      "You're adding payments, booking or a CRM",
      "You want WhatsApp enquiries linked to your site",
    ],
    notFor: [
      "You need a full custom software platform built",
      "Your tools offer no API or export options at all",
      "You need it live in a day without testing",
    ],
  },
  pricing: {
    heading: "How integrations are priced",
    paragraphs: [
      "Each integration is a fixed-fee project, based on the systems involved and how complex the data flow is.",
      "Ongoing monitoring and updates can be added to a maintenance plan, because third-party services change their APIs over time.",
    ],
    factors: ["Number of systems connected", "Off-the-shelf connector or custom API work", "Data volume and fields", "One-way or two-way sync", "Error handling and reporting needs"],
  },
  faqs: [
    { question: "Which CRMs can you connect my website to?", answer: "Most CRMs with an API or form integration, including popular options such as HubSpot, Zoho and Salesforce. We confirm the approach after seeing your setup." },
    { question: "Can you add WhatsApp to my website?", answer: "Yes, from simple click-to-chat buttons with pre-filled messages to integrations with the WhatsApp Business Platform, depending on your needs." },
    { question: "Which payment gateways do you work with?", answer: "Popular gateways such as Razorpay, Stripe and PayPal, and most others with a documented API." },
    { question: "What happens if an integration fails?", answer: "We build in logging, retries and alerts, so failures are caught and data can be recovered rather than lost." },
    { question: "Can you integrate with our own internal systems?", answer: "Usually, if they offer an API, a database connection or file exports. We assess this during discovery." },
    { question: "Will integrations slow down my website?", answer: "They shouldn't. We load third-party scripts carefully and do heavy work on the server where possible." },
  ],
  related: ["Website development", "Website maintenance", "Paid ads"],
};
