import { aeoGeoWhatGoogleSays } from "./aeo-geo-what-google-says";
import type { BlogPost } from "./types";
import { websiteRedesignSeoChecklist } from "./website-redesign-seo-checklist";

// Every article. Each also has a route file in src/app/blog/<slug>/page.tsx.
export const posts: BlogPost[] = [aeoGeoWhatGoogleSays, websiteRedesignSeoChecklist].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function postBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// "2026-11-04" -> "4 November 2026" (no Date object needed).
export function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export const blogIndex = {
  seo: {
    title: "Blog: Guides to Websites, SEO and Growth",
    description: "Practical, honest guides on building websites that get found: SEO, AEO, GEO, redesigns, speed and paid ads, with sources linked.",
  },
  hero: {
    title: "Practical guides to websites, search and growth",
    accent: "websites, search and growth",
    lead: "Honest, specific guides on building websites that get found, written from the work we do every day, with sources linked so you can check them.",
    points: ["No fluff", "Sources linked", "Updated as search changes"],
  },
};
