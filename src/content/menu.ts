import { footerGroups } from "./footer";
import { serviceGroups } from "./navigation";

const primaryHrefs = new Set(serviceGroups.flatMap((group) => group.items.map((item) => item.href)));

// Sub-pages for a Build / Run / Grow group: the footer's links for that group
// minus the primary service pages (which the menus show with icons).
export function moreLinksFor(groupId: string) {
  return footerGroups.find((group) => group.id === groupId)?.links.filter((link) => !primaryHrefs.has(link.href)) ?? [];
}
