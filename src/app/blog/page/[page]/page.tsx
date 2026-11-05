import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/pages/BlogIndex";
import { blogIndex } from "@/content/blog";
import { POSTS_PER_PAGE } from "@/content/blog/settings";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { getWpPosts } from "@/lib/wordpress";

interface PageProps {
  params: Promise<{ page: string }>;
}

// Page 2 onwards of the blog list (page 1 is /blog/).
async function pageNumber(value: string) {
  const posts = await getWpPosts();
  const total = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const page = /^\d+$/.test(value) ? Number(value) : NaN;
  return page >= 2 && page <= total ? page : null;
}

export async function generateStaticParams() {
  const posts = await getWpPosts();
  const total = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pages = Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ page: String(i + 2) }));
  return pages.length > 0 ? pages : [{ page: "2" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await pageNumber((await params).page);
  if (!page) return { title: "Page not found", robots: { index: false, follow: true } };
  return pageMetadata({
    title: `${blogIndex.seo.title} (page ${page})`,
    description: blogIndex.seo.description,
    path: `/blog/page/${page}/`,
  });
}

export default async function Page({ params }: PageProps) {
  const page = await pageNumber((await params).page);
  if (!page) notFound();
  return <BlogIndex page={page} />;
}
