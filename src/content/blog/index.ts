// Blog page copy and helpers. The posts themselves come from WordPress.com
// (src/lib/wordpress.ts).

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
