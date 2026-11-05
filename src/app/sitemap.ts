import type { MetadataRoute } from "next";
import { resolvedServices } from "@/content/services";
import { getWpPosts } from "@/lib/wordpress";
import { absoluteUrl } from "@/lib/seo/urls";

const PAGES = [
  "/",
  "/services/",
  "/about/",
  "/case-studies/",
  "/pricing/",
  "/contact/",
  "/blog/",
  "/privacy-policy/",
  "/terms/",
  "/cookie-policy/",
];

// Every public page: company pages, all service pages and every blog post.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getWpPosts();
  return [
    ...PAGES.map((path) => ({ url: absoluteUrl(path) })),
    ...resolvedServices().map((service) => ({ url: absoluteUrl(service.href) })),
    ...posts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}/`), lastModified: post.modified })),
  ];
}
