// Delivery process shown on the homepage, built from commitments in the SEO
// plan: a written timeline before signing, designs approved before
// development, pre-launch QA and monthly reporting.
// NEEDS OWNER CONFIRMATION before launch (docs/OWNER-INPUTS.md).

export interface ProcessStep {
  title: string;
  body: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Discover and plan",
    body: "A written scope, timeline and milestone plan, agreed before anything is signed.",
  },
  {
    title: "Design",
    body: "Wireframes and visual designs that you approve before development starts.",
  },
  {
    title: "Build",
    body: "Server-rendered, SEO-ready development against a clear performance budget.",
  },
  {
    title: "Test and launch",
    body: "Speed, mobile, accessibility, forms and tracking checked before the site goes live.",
  },
  {
    title: "Care and grow",
    body: "Monthly maintenance and reporting, then ads, social and search when you are ready.",
  },
];
