import Link from "next/link";
import { notFound } from "next/navigation";
import { PageMain } from "@/components/page/PageMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogIndex } from "@/content/blog";
import { POSTS_PER_PAGE } from "@/content/blog/settings";
import { site } from "@/content/site";
import { getWpPosts } from "@/lib/wordpress";
import { absoluteUrl } from "@/lib/seo/urls";
import { breadcrumbSchema, graph, organizationRef } from "@/lib/seo/structured-data";
import { BlogCard } from "./BlogCard";
import { PageHeader } from "./PageHeader";
import { CtaBand } from "./parts";
import styles from "./Pages.module.scss";

const pageHref = (page: number) => (page === 1 ? "/blog/" : `/blog/page/${page}/`);

function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages < 2) return null;
  return (
    <nav className={styles.pagination} aria-label="Blog pages">
      {page > 1 ? (
        <Link href={pageHref(page - 1)} className={styles.pageStep} rel="prev">
          ← Previous
        </Link>
      ) : null}
      <ol>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <li key={number}>
            {number === page ? (
              <span className={styles.pageCurrent} aria-current="page">
                {number}
              </span>
            ) : (
              <Link href={pageHref(number)} className={styles.pageLink} aria-label={`Page ${number}`}>
                {number}
              </Link>
            )}
          </li>
        ))}
      </ol>
      {page < totalPages ? (
        <Link href={pageHref(page + 1)} className={styles.pageStep} rel="next">
          Next →
        </Link>
      ) : null}
    </nav>
  );
}

export async function BlogIndex({ page = 1 }: { page?: number }) {
  const posts = await getWpPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  if (page < 1 || page > totalPages) notFound();

  const pagePosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const showCategory = new Set(posts.map((post) => post.category?.slug).filter(Boolean)).size > 1;
  const path = pageHref(page);
  const crumbs =
    page === 1
      ? [{ label: "Home", href: "/" }, { label: "Blog" }]
      : [{ label: "Home", href: "/" }, { label: "Blog", href: "/blog/" }, { label: `Page ${page}` }];

  return (
    <PageMain>
      <JsonLd
        data={graph([
          breadcrumbSchema(crumbs, path),
          {
            "@type": "Blog",
            "@id": `${absoluteUrl("/blog/")}#blog`,
            name: `${site.name} blog`,
            description: blogIndex.seo.description,
            url: absoluteUrl("/blog/"),
            publisher: organizationRef(),
            blogPost: pagePosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: absoluteUrl(`/blog/${post.slug}/`),
              datePublished: post.publishedAt,
            })),
          },
        ])}
      />

      <PageHeader
        crumbs={crumbs}
        eyebrow={page === 1 ? "Blog" : `Blog · Page ${page} of ${totalPages}`}
        title={page === 1 ? blogIndex.hero.title : `More guides, page ${page}`}
        lead={page === 1 ? blogIndex.hero.lead : undefined}
      />

      <section className={styles.sectionTight} aria-label="Articles">
        <div className="container">
          {pagePosts.length === 0 ? (
            <p className={styles.muted}>New articles are on their way. Check back soon.</p>
          ) : (
            <ul className={styles.cardGrid}>
              {pagePosts.map((post, index) => (
                <li key={post.slug}>
                  <BlogCard post={post} showCategory={showCategory} level={2} index={index} />
                </li>
              ))}
            </ul>
          )}
          <Pagination page={page} totalPages={totalPages} />
        </div>
      </section>

      <CtaBand title="Want help putting this into practice?" text="Start with a free audit of your current website." />
    </PageMain>
  );
}
