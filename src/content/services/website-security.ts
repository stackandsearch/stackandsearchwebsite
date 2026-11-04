import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const websiteSecurity: ServiceContent = {
  label: "Website security",
  graphic: "maintenance",
  seo: {
    title: `Website Security Services in ${MARKET}: Hardening & Malware Cleanup`,
    description: "Keep your website safe: security audits, hardening, patching, malware scanning and cleanup, tested backups and monitoring, with a clear plan if something goes wrong.",
  },
  hero: {
    title: "Website security that keeps attackers out",
    accent: "keeps attackers out",
    lead: "We secure business websites against the attacks they actually face: outdated plugins, weak logins, vulnerable code and malware. That means a security audit, hardening, monitoring and tested backups, plus cleanup and recovery if your site has already been hacked.",
    points: ["Audit and hardening", "Malware cleanup", "Tested backups"],
  },
  facts: [
    { label: "Best for", value: "Sites that handle enquiries, logins or payments" },
    { label: "Audit and hardening", value: "Usually 1–2 weeks" },
    { label: "Pricing", value: "Fixed-fee project; ongoing care monthly" },
    { label: "You get", value: "A plain-English security report" },
  ],
  overview: {
    heading: "Why do business websites get hacked?",
    paragraphs: [
      "Most website attacks aren't personal. Automated bots scan huge numbers of sites for known weaknesses: outdated plugins and themes, default or reused passwords, exposed admin pages and unpatched servers. A small business site is just as likely to be found as a large one.",
      "The consequences are real: spam injected into your pages, visitors redirected to scams, browser and search warnings that scare customers away, or stolen form data. Good security is mostly consistent basics done well, which is exactly what we put in place.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Layered protection, in plain English.",
    items: [
      { icon: "search", title: "Security audit", text: "Software versions, plugins, user accounts, server settings and code checked for known weaknesses." },
      { icon: "lock", title: "Login protection", text: "Strong authentication, two-factor login, rate limiting and least-privilege user roles." },
      { icon: "shield", title: "Hardening", text: "Security headers, file permissions and configuration tightened at server and app level." },
      { icon: "refresh", title: "Patching and updates", text: "Known vulnerabilities fixed promptly, with updates tested before they go live." },
      { icon: "bell", title: "Monitoring and scanning", text: "Malware, file-change and uptime monitoring with alerts." },
      { icon: "cloud", title: "Tested backups", text: "Off-site backups with regular test restores, so recovery is always possible." },
      { icon: "key", title: "Malware cleanup", text: "Infected sites cleaned, backdoors removed and the entry point closed." },
      { icon: "file", title: "Recovery support", text: "Help getting browser and search warnings removed once the site is clean." },
    ],
  },
  process: {
    heading: "How website security works",
    steps: [
      { title: "Audit", when: "Week 1", text: "A full review of software, access, server settings and existing infections." },
      { title: "Fix and harden", when: "Weeks 1–2", text: "Vulnerabilities patched, logins secured and configuration tightened." },
      { title: "Monitor", when: "Ongoing", text: "Scanning, updates and backups on a regular schedule, usually as part of maintenance." },
      { title: "Respond", when: "When needed", text: "If something gets through, we contain it, clean up and close the gap." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "Basics first, done properly", text: "Most breaches exploit simple weaknesses. We fix those thoroughly before anything exotic." },
      { title: "Clean means clean", text: "Restoring a backup isn't enough if the hole attackers used is still open. We find and close the entry point." },
      { title: "Least privilege", text: "Every user, plugin and integration gets only the access it needs, which limits the damage if one is compromised." },
      { title: "Plain-English reporting", text: "You'll know what we found, what we fixed and what risk remains, without jargon." },
    ],
  },
  fit: {
    heading: "Do you need website security work?",
    good: [
      "Your site takes enquiries, logins or payments",
      "It runs on a CMS with plugins",
      "Nobody is responsible for updates and security",
      "Your site has been hacked or flagged",
    ],
    notFor: [
      "You need certified penetration testing for compliance: that needs a specialist security firm",
      "You want a guarantee that nothing can ever go wrong",
      "The site is being replaced soon: secure the new one instead",
    ],
  },
  pricing: {
    heading: "How website security is priced",
    paragraphs: [
      "The audit and hardening is a fixed-fee project. Ongoing monitoring, updates and backups are part of our monthly maintenance plans.",
      "Malware cleanup is quoted after assessment, because the effort depends on how deep the infection goes.",
    ],
    factors: ["Platform, plugins and integrations", "Number of sites or environments", "User accounts and roles", "Whether the site is already infected", "Hosting and server access"],
  },
  faqs: [
    { question: "How do I know if my website has been hacked?", answer: "Common signs include unexpected redirects, spam pages or links appearing in search results, browser warnings, new admin users or a sudden drop in traffic. Search Console may also flag security issues." },
    { question: "Can you clean a hacked website?", answer: "Yes. We remove the malware and backdoors, close the entry point, restore clean files where needed and help you request removal of any warnings." },
    { question: "Is a security plugin enough?", answer: "A plugin helps, but it can't fix weak passwords, outdated code or poor server settings. Good security works in layers." },
    { question: "Do I need an SSL certificate?", answer: "Yes. HTTPS protects data between visitors and your site, and browsers mark sites without it as not secure. Most hosts provide free certificates." },
    { question: "How often should my website be updated?", answer: "Security updates should be applied soon after release, once tested. Most other updates can follow a regular schedule, such as weekly or monthly." },
    { question: "Do you offer penetration testing?", answer: "We cover the security needs of typical business websites. For formal penetration testing or compliance audits, a specialist security firm is the right choice." },
  ],
  related: ["Website maintenance", "Website migration", "Speed optimisation"],
};
