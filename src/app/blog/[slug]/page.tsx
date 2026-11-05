import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/pages/BlogPostPage";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { getWpPost, getWpPosts } from "@/lib/wordpress";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Every published WordPress.com post. New posts appear within ~15 minutes.
export async function generateStaticParams() {
  const posts = await getWpPosts();
  return posts.length > 0 ? posts.map((post) => ({ slug: post.slug })) : [{ slug: "no-posts-yet" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getWpPost(slug);
  if (!post) return { title: "Page not found", robots: { index: false, follow: true } };
  return pageMetadata({ title: post.title, description: post.description, path: `/blog/${post.slug}/` });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getWpPost(slug);
  if (!post) notFound();
  return <BlogPostPage post={post} />;
}
