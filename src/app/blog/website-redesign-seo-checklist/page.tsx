import { BlogRoute, blogMetadata } from "@/components/pages/blog-route";

export const metadata = blogMetadata("website-redesign-seo-checklist");

// Article: /blog/website-redesign-seo-checklist/. Content: src/content/blog/.
export default function Page() {
  return <BlogRoute slug="website-redesign-seo-checklist" />;
}
