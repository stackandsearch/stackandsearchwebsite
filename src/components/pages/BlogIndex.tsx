import { PageMain } from "@/components/page/PageMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogIndex, formatDate } from "@/content/blog";
import { site } from "@/content/site";
import { getWpPosts } from "@/lib/wordpress";
import { absoluteUrl } from "@/lib/seo/urls";
import { breadcrumbSchema, graph, organizationRef } from "@/lib/seo/structured-data";
import { BlogList } from "./BlogList";
import { PageHeader } from "./PageHeader";
import { CtaBand } from "./parts";
import styles from "./Pages.module.scss";

const PATH = "/blog/";

export async function BlogIndex() {
  const posts = await getWpPosts();
  const crumbs = [{ label: "Home", href: "/" }, { label: "Blog" }];

  const counts = new Map<string, { name: string; slug: string; count: number }>();
  for (const post of posts) {
    if (!post.category) continue;
    const entry = counts.get(post.category.slug) ?? { ...post.category, count: 0 };
    entry.count += 1;
    counts.set(post.category.slug, entry);
  }
  const categories = Array.from(counts.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  const rows = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    dateLabel: formatDate(post.date),
    readingMinutes: post.readingMinutes,
    category: post.category,
  }));

  return (
    <PageMain>
      <JsonLd
        data={graph([
          breadcrumbSchema(crumbs, PATH),
          {
            "@type": "Blog",
            "@id": `${absoluteUrl(PATH)}#blog`,
            name: `${site.name} blog`,
            description: blogIndex.seo.description,
            url: absoluteUrl(PATH),
            publisher: organizationRef(),
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: absoluteUrl(`/blog/${post.slug}/`),
              datePublished: post.publishedAt,
            })),
          },
        ])}
      />

      <PageHeader crumbs={crumbs} eyebrow="Blog" title={blogIndex.hero.title} lead={blogIndex.hero.lead} />

      <section className={styles.sectionTight} aria-label="Articles">
        <div className="container">
          {rows.length === 0 ? (
            <p className={styles.muted}>New articles are on their way. Check back soon.</p>
          ) : (
            <BlogList posts={rows} categories={categories} />
          )}
        </div>
      </section>

      <CtaBand title="Want help putting this into practice?" text="Start with a free audit of your current website." />
    </PageMain>
  );
}
