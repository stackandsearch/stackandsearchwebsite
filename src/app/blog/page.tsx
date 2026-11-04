import { BlogIndex } from "@/components/pages/BlogIndex";
import { blogIndex } from "@/content/blog";
import { pageMetadata } from "@/lib/seo/page-metadata";

export const metadata = pageMetadata({ ...blogIndex.seo, path: "/blog/" });

export default function Page() {
  return <BlogIndex />;
}
