import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const websiteMaintenance: ServiceContent = {
  label: "Website maintenance",
  graphic: "maintenance",
  seo: {
    title: `Website Maintenance Services in ${MARKET}`,
    description:
      "Monthly website care: tested updates, backups, uptime and security monitoring, speed checks and small content changes, with a written scope and a monthly report.",
  },
  hero: {
    title: "Website maintenance that keeps your site fast and safe",
    lead: "We look after your website every month: software updates, backups, uptime and security monitoring, speed checks and small content changes. You get a written scope of exactly what's included, and a short report each month showing what we did.",
    points: ["Written scope", "Tested updates", "Monthly report"],
  },
  facts: [
    { label: "Best for", value: "Business sites that must stay online, secure and current" },
    { label: "Starts working", value: "Right after onboarding" },
    { label: "Pricing", value: "Fixed monthly plan, sized to your site" },
    { label: "You get", value: "A plain-English report every month" },
  ],
  overview: {
    heading: "What is website maintenance, and why does it matter?",
    paragraphs: [
      "A website is software. Its framework, plugins and server all receive security and bug fixes, browsers change, and content goes out of date. Maintenance is the routine work that keeps all of that current, so the site keeps loading quickly, stays secure and doesn't break on the day you need it most.",
      "Common website emergencies, such as a hacked site, a contact form that silently stopped sending, or an expired SSL certificate, usually follow months without anyone checking. Regular care costs far less than an emergency fix.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Your plan lists exactly which of these apply to your site, and how often.",
    items: [
      {
        icon: "refresh",
        title: "Software updates",
        text: "Framework, CMS, plugin and dependency updates, tested on a staging copy before they reach your live site.",
      },
      {
        icon: "cloud",
        title: "Backups and test restores",
        text: "Scheduled off-site backups, with periodic test restores so we know they actually work.",
      },
      {
        icon: "bell",
        title: "Uptime monitoring",
        text: "Automated checks around the clock. If the site goes down, we're alerted and start investigating.",
      },
      {
        icon: "shield",
        title: "Security monitoring",
        text: "Malware and vulnerability scans, login protection and prompt patching of known issues.",
      },
      {
        icon: "gauge",
        title: "Speed checks",
        text: "Regular Core Web Vitals checks, so the site stays fast as content and features grow.",
      },
      {
        icon: "pen",
        title: "Small content changes",
        text: "An agreed number of hours each month for text, image and page updates.",
      },
      {
        icon: "lock",
        title: "SSL, domain and hosting care",
        text: "Certificate, domain and hosting renewals tracked, so nothing expires unnoticed.",
      },
      {
        icon: "file",
        title: "Monthly report",
        text: "A short summary of updates, incidents, speed and anything that needs your decision.",
      },
    ],
  },
  process: {
    heading: "How maintenance works",
    steps: [
      {
        title: "Onboarding audit",
        when: "Week 1",
        text: "We review your site, hosting, access and backups, and fix anything urgent first.",
      },
      {
        title: "Written scope",
        when: "Week 1",
        text: "A plan listing what's included, agreed response times and what's billed separately.",
      },
      {
        title: "Monthly care",
        when: "Every month",
        text: "Updates, monitoring, backups and your content changes, done on a regular schedule.",
      },
      {
        title: "Report and review",
        when: "Every month",
        text: "Your monthly report, plus a quick look at what to improve next.",
      },
    ],
  },
  approach: {
    heading: "What makes our maintenance different",
    points: [
      {
        title: "Everything in writing",
        text: "Many plans promise 'full support' and leave the details vague. We list the included hours, response times and exclusions up front.",
      },
      {
        title: "Test before we update",
        text: "Updates go to a staging copy first, so a broken plugin or dependency never reaches your customers.",
      },
      {
        title: "Backups you can trust",
        text: "A backup only counts if it restores. We test restores, not just the backup job.",
      },
      {
        title: "No surprise invoices",
        text: "We flag issues early in your report, with a clear recommendation and cost, before they turn into emergencies.",
      },
    ],
  },
  fit: {
    heading: "Do you need a maintenance plan?",
    good: [
      "Your website brings in enquiries or sales",
      "Nobody on your team has time to manage updates",
      "Your site runs on a CMS or a modern framework",
      "You want one team responsible when something breaks",
    ],
    notFor: [
      "Your site is a placeholder you rarely use",
      "You need a full redesign: start with website development",
      "You need large new features every month: that's development work",
    ],
  },
  pricing: {
    heading: "How maintenance plans are priced",
    paragraphs: [
      "Maintenance is a fixed monthly fee, sized after we review your site. The written scope lists what's included each month and the rate for anything outside it.",
      "If your needs change, for example more content hours or faster response times, we adjust the plan in writing.",
    ],
    factors: [
      "Size and complexity of the site",
      "Platform, plugins and integrations",
      "Content-change hours you need each month",
      "Response times you need",
      "Online store or member features",
    ],
  },
  faqs: [
    {
      question: "What does a website maintenance plan include?",
      answer:
        "Software updates tested on staging, backups with test restores, uptime and security monitoring, speed checks, an agreed amount of content changes and a monthly report. The exact list is written into your plan.",
    },
    {
      question: "How much does website maintenance cost?",
      answer:
        "It's a fixed monthly fee based on your site's size, platform and how much change and support you need. We quote it after a free review of your site.",
    },
    {
      question: "Can you maintain a website you didn't build?",
      answer:
        "Yes. We start with an onboarding audit of the code, hosting, access and backups, and fix anything urgent before regular care begins.",
    },
    {
      question: "What happens if my website goes down or gets hacked?",
      answer:
        "Monitoring alerts us, and we investigate, restore from a clean backup if needed and fix the cause. Response times are agreed in your plan.",
    },
    {
      question: "Do I need maintenance if my website is new?",
      answer:
        "Yes. New sites still need software and security updates, and the months after launch are when small fixes and content changes are most frequent.",
    },
    {
      question: "Will maintenance improve my SEO?",
      answer:
        "It protects it. A fast, secure site without errors is the foundation search engines expect. Active ranking work, such as new content and links, is part of our SEO services.",
    },
    {
      question: "How do I request changes?",
      answer:
        "Send them to us in writing; we confirm, schedule and log every change, and you'll see it in your monthly report.",
    },
  ],
  related: ["Website development", "SEO services", "Paid ads"],
};
