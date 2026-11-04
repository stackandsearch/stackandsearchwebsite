import { BlogRoute, blogMetadata } from "@/components/pages/blog-route";

export const metadata = blogMetadata("aeo-geo-what-google-says");

// Article: /blog/aeo-geo-what-google-says/. Content: src/content/blog/.
export default function Page() {
  return <BlogRoute slug="aeo-geo-what-google-says" />;
}
