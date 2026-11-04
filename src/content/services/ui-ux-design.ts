import { MARKET } from "./market";
import type { ServiceContent } from "./types";

export const uiUxDesign: ServiceContent = {
  label: "UI/UX design",
  parent: "Website development",
  graphic: "design",
  seo: {
    title: `UI/UX Design Services in ${MARKET}: Websites & Web Apps`,
    description: "User research, wireframes, clickable prototypes and polished interface design for websites and web apps, with a design system developers can build from accurately.",
  },
  hero: {
    title: "UI/UX design that makes it easy to say yes",
    accent: "easy to say yes",
    lead: "We design website and web app interfaces that feel obvious to use: clear paths, readable layouts and accessible components. Research and wireframes come first, then clickable prototypes you can test, then a polished design system your developers can build accurately.",
    points: ["Research-led", "Clickable prototypes", "Accessible by design"],
  },
  facts: [
    { label: "Best for", value: "New sites, web apps and products that confuse users" },
    { label: "Typical timeline", value: "2–6 weeks" },
    { label: "Pricing", value: "Fixed-fee project" },
    { label: "You get", value: "A prototype and organised design files" },
  ],
  overview: {
    heading: "What is UI/UX design?",
    paragraphs: [
      "UX (user experience) design decides how something works: what people need, the paths they take and where they get stuck. UI (user interface) design decides how it looks and feels: layout, typography, colour, components and states. Good products need both.",
      "We keep the process practical. We learn from your users and data, sketch the simplest flows, test them as clickable prototypes, and only then polish the visuals, so design time goes into what actually changes outcomes.",
    ],
  },
  included: {
    heading: "What's included",
    intro: "Scaled to your project: from a few key screens to a full design system.",
    items: [
      { icon: "users", title: "User research", text: "Interviews, analytics and competitor reviews to understand what users need." },
      { icon: "layout", title: "Information architecture", text: "Site maps and navigation that match how people think about your offer." },
      { icon: "pen", title: "Wireframes", text: "Low-fidelity layouts that settle structure before visual design." },
      { icon: "image", title: "Visual design", text: "A polished interface that reflects your brand, for desktop and mobile." },
      { icon: "refresh", title: "Clickable prototypes", text: "Interactive prototypes to test flows with real users before building." },
      { icon: "accessibility", title: "Accessibility", text: "Contrast, focus states, keyboard paths and readable type, to WCAG 2.2 AA guidelines." },
      { icon: "code", title: "Design system", text: "Reusable components, colours and type styles your developers can build from." },
      { icon: "file", title: "Developer handover", text: "Specs, states and assets organised so nothing is lost in the build." },
    ],
  },
  process: {
    heading: "How a design project runs",
    steps: [
      { title: "Research", when: "Week 1", text: "Users, goals, data and competitors, summarised in a short brief." },
      { title: "Structure and wireframes", when: "Weeks 1–2", text: "Flows and layouts agreed before any visual polish." },
      { title: "Visual design and prototype", when: "Weeks 2–5", text: "Polished screens linked into a clickable prototype." },
      { title: "Test and hand over", when: "Weeks 4–6", text: "Usability checks, refinements and an organised handover." },
    ],
  },
  approach: {
    heading: "How we work differently",
    points: [
      { title: "Flows before pixels", text: "We fix how things work before deciding how they look." },
      { title: "Test early and cheaply", text: "A clickable prototype reveals problems in days that would take weeks to fix in code." },
      { title: "Accessible by default", text: "Designs that work for everyone usually work better for everyone." },
      { title: "Designed to be built", text: "As a development team, we design components that are practical to build and maintain." },
    ],
  },
  fit: {
    heading: "Is UI/UX design what you need?",
    good: [
      "You're building a new website or web app",
      "Users struggle with your current interface",
      "You need a design system for consistency",
      "You want to test ideas before building",
    ],
    notFor: [
      "You only need a logo or brand identity",
      "You only need print or packaging design",
      "You want design with no user input or feedback",
    ],
  },
  pricing: {
    heading: "How UI/UX design is priced",
    paragraphs: [
      "Design is a fixed-fee project, sized by the number of screens or page templates and how much research and testing you need.",
      "If we also build the product, design and development are quoted together in one scope.",
    ],
    factors: ["Number of screens or templates", "Research and testing depth", "Design system scope", "Number of user flows", "Prototype complexity"],
  },
  faqs: [
    { question: "What's the difference between UI and UX?", answer: "UX is how it works: flows, structure and usability. UI is how it looks: layout, type, colour and components. We design both together." },
    { question: "Do you do user research?", answer: "Yes, scaled to your budget: from analytics reviews and quick interviews to usability tests with prototypes." },
    { question: "Which design tools do you use?", answer: "We typically design in Figma and share prototypes you can click through in your browser." },
    { question: "Can you improve an existing website or app?", answer: "Yes. We audit the current experience, prioritise the biggest problems and redesign those flows first." },
    { question: "Is accessibility included?", answer: "Yes. We design to WCAG 2.2 AA guidelines: contrast, focus states, keyboard access and readable text." },
    { question: "Can you also build the design?", answer: "Yes. Our development team builds what we design, which keeps the final product faithful to the design." },
  ],
  related: ["Website development", "Website redesign", "Landing page design"],
};
