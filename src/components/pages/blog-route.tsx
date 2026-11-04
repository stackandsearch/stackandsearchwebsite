import type { Metadata } from "next";
import { postBySlug } from "@/content/blog";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { BlogPostPage } from "./BlogPostPage";

// Each article has its own static route file calling these helpers.
function resolve(slug: string) {
  const post = postBySlug(slug);
  if (!post) throw new Error(`No blog post with slug "${slug}"`);
  return post;
}

export function blogMetadata(slug: string): Metadata {
  const post = resolve(slug);
  return pageMetadata({ title: post.title, description: post.description, path: `/blog/${post.slug}/` });
}

export function BlogRoute({ slug }: { slug: string }) {
  return <BlogPostPage post={resolve(slug)} />;
}
