import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { resolvedServices } from "@/content/services";
import { absoluteUrl } from "@/lib/seo/urls";

const PAGES = ["/", "/services/", "/about/", "/case-studies/", "/pricing/", "/contact/", "/blog/", "/privacy-policy/", "/terms/", "/cookie-policy/"];

// Every public page: company pages, all service pages and every article.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((path) => ({ url: absoluteUrl(path) })),
    ...resolvedServices().map((service) => ({ url: absoluteUrl(service.href) })),
    ...posts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}/`), lastModified: post.date })),
  ];
}
