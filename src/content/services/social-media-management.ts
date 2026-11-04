import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const socialMediaManagement: ServiceContent = {
  label: "Social media management",
  graphic: "social",
  seo: {
    title: `Social Media Management Services in ${MARKET}`,
    description:
      "Content calendars, design, captions and community management for Instagram, Facebook and LinkedIn, planned around your goals and reported every month.",
  },
  hero: {
    title: "Social media management that builds trust",
    accent: "builds trust",
    lead: "We plan, create and publish content on the platforms your customers use, such as Instagram, Facebook and LinkedIn. Each month starts with a content calendar you approve and ends with a report on what grew, so your profiles stay active and on-brand without taking up your time.",
    points: ["Approved content calendar", "On-brand design", "Monthly report"],
  },
  facts: [
    { label: "Best for", value: "Businesses customers check out on social media before buying" },
    { label: "Results usually show", value: "2–3 months of consistent posting" },
    { label: "Pricing", value: "Monthly retainer" },
    { label: "You approve", value: "Every month's calendar before anything posts" },
  ],
  overview: {
    heading: "What does social media management include?",
    paragraphs: [
      "Social media management covers planning what to post, creating it (graphics, short videos and captions), publishing on a schedule, replying to comments and messages, and reviewing what works. For most businesses its job is trust: when someone finds you on Google or sees an ad, they check your profiles before getting in touch.",
      "Organic social media is a slow build. A steady, useful presence earns attention over months rather than days, so we plan for consistency first and promote the best-performing posts with paid ads when it makes sense.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Your plan sets the platforms and the number of posts each month.",
    items: [
      { icon: "calendar", title: "Monthly content calendar", text: "Topics, formats and dates planned a month ahead and approved by you before anything goes live." },
      { icon: "image", title: "Graphics and short videos", text: "On-brand designs, carousels and simple reels made from your photos, products and know-how." },
      { icon: "pen", title: "Captions and hashtags", text: "Captions written in your voice, with the hashtags and keywords people search on each platform." },
      { icon: "users", title: "Profile setup and optimisation", text: "Bios, highlights, links and contact buttons set up so visitors know what to do next." },
      { icon: "message", title: "Community management", text: "Replies to comments and messages within agreed hours, with anything needing your decision passed on quickly." },
      { icon: "layout", title: "Platform-specific content", text: "Formats suited to each platform, rather than one post copied everywhere." },
      { icon: "megaphone", title: "Boosted posts (optional)", text: "Your best posts promoted with a small ad budget, coordinated with our paid ads team." },
      { icon: "chart", title: "Monthly report", text: "Reach, engagement, profile visits and enquiries, with what we'll change next month." },
    ],
  },
  process: {
    heading: "How social media management works",
    steps: [
      { title: "Brand and audience kickoff", when: "Week 1", text: "Your goals, audience, tone of voice, competitors and the platforms worth your time." },
      { title: "Content plan", when: "Week 2", text: "A monthly calendar of topics and formats, sent to you for approval." },
      { title: "Create and publish", when: "Every month", text: "We design, write and schedule, and handle comments and messages." },
      { title: "Review and refine", when: "Every month", text: "A report on what worked, and adjustments to the next month's plan." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "Fewer platforms, done well", text: "Being consistent on two platforms beats being invisible on five. We focus on where your customers actually spend time." },
      { title: "Useful over viral", text: "Posts that answer real customer questions build trust and enquiries more reliably than chasing trends." },
      { title: "Nothing posts without approval", text: "You see and approve each month's calendar, so nothing goes live that you haven't seen." },
      { title: "Connected to everything else", text: "Your best posts become ads, blog topics and website content, so the work pays off more than once." },
    ],
  },
  fit: {
    heading: "Is social media management right for you?",
    good: [
      "Customers look you up on Instagram, Facebook or LinkedIn before buying",
      "Your profiles are inactive or inconsistent",
      "You can share photos, products or know-how with us regularly",
      "You want a steady presence without doing it yourself",
    ],
    notFor: [
      "You expect sales within weeks from organic posts alone",
      "You can't provide any photos, input or approvals",
      "Your customers don't use social media to choose suppliers",
    ],
  },
  pricing: {
    heading: "How social media management is priced",
    paragraphs: [
      "Social media management is a monthly retainer based on the platforms, the number and type of posts, and how much community management you need. You'll see exactly what each month includes before you start.",
      "Any budget for boosting posts is separate and paid directly to the platform.",
    ],
    factors: [
      "Number of platforms",
      "Posts per month and formats (images, carousels, reels)",
      "Photo or video shoots",
      "Community management hours",
      "Boosted-post budget and management",
    ],
  },
  faqs: [
    { question: "Which platforms should my business be on?", answer: "The ones your customers use to choose suppliers. For most local and consumer businesses that's Instagram and Facebook; for B2B services it's usually LinkedIn. We recommend a focus after the kickoff." },
    { question: "How often will you post?", answer: "It depends on your plan and platforms. Consistency matters more than volume, so we agree a frequency that can be sustained and stick to it." },
    { question: "How long until social media shows results?", answer: "Expect two to three months of consistent posting before engagement and enquiries pick up noticeably. Boosting your best posts can speed up reach." },
    { question: "Do I need to provide photos?", answer: "Real photos of your work, team or products perform best, so we'll ask for some. We can also design graphics, use licensed stock or arrange a shoot." },
    { question: "Will you reply to comments and messages?", answer: "Yes, within the hours agreed in your plan. Anything that needs your decision, such as pricing or bookings, we pass to you quickly." },
    { question: "Do I keep my accounts?", answer: "Yes. The profiles stay owned by your business; we work through access you grant and can remove at any time." },
  ],
  related: ["Meta Ads", "Paid ads", "SEO services"],
};
