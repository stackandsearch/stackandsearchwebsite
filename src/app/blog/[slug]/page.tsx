import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/pages/BlogPostPage";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { absoluteUrl } from "@/lib/seo/urls";
import { getWpPosts } from "@/lib/wordpress";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function findPost(slug: string) {
  const posts = await getWpPosts();
  const wanted = decodeURIComponent(slug);
  return { posts, post: posts.find((item) => item.slug === wanted) ?? null };
}

// Every published WordPress.com post. New posts appear within ~15 minutes.
export async function generateStaticParams() {
  const posts = await getWpPosts();
  return posts.length > 0 ? posts.map((post) => ({ slug: post.slug })) : [{ slug: "no-posts-yet" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await findPost(slug);
  if (!post) return { title: "Page not found", robots: { index: false, follow: true } };

  const path = `/blog/${post.slug}/`;
  const images = post.image
    ? [
        {
          url: post.image.url,
          alt: post.image.alt || post.title,
          ...(post.image.width ? { width: post.image.width, height: post.image.height } : {}),
        },
      ]
    : undefined;

  return {
    ...pageMetadata({ title: post.title, description: post.description, path }),
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      title: post.title,
      description: post.description,
      siteName: site.name,
      locale: "en_IN",
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      ...(post.category ? { section: post.category.name } : {}),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(images ? { images: images.map((image) => image.url) } : {}),
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { posts, post } = await findPost(slug);
  if (!post) notFound();

  const others = posts.filter((item) => item.slug !== post.slug);
  const sameCategory = post.category ? others.filter((item) => item.category?.slug === post.category?.slug) : [];
  const related = [...sameCategory, ...others.filter((item) => !sameCategory.includes(item))].slice(0, 3);
  const showCategory = new Set(posts.map((item) => item.category?.slug).filter(Boolean)).size > 1;

  return <BlogPostPage post={post} related={related} showCategory={showCategory} />;
}
