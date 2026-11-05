import Link from "next/link";
import { PageMain } from "@/components/page/PageMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDate } from "@/content/blog";
import { linkForLabel, type ServiceLink } from "@/content/services";
import { site } from "@/content/site";
import { stripTags, type WpPost } from "@/lib/wordpress";
import { blogPostingSchema, breadcrumbSchema, graph } from "@/lib/seo/structured-data";
import { PageHeader } from "./PageHeader";
import { CtaBand } from "./parts";
import styles from "./Pages.module.scss";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Gives every h2 in the WordPress content an id, for the "On this page" list.
function withHeadingIds(html: string) {
  const headings: { id: string; text: string }[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs: string, inner: string) => {
    const text = stripTags(inner);
    if (!text) return match;
    const base = slugify(text) || "section";
    let id = base;
    for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`;
    used.add(id);
    headings.push({ id, text });
    return `<h2${attrs.replace(/\sid="[^"]*"/i, "")} id="${id}">${inner}</h2>`;
  });
  return { html: out, headings };
}

// Services whose names match the post's tags ("SEO" -> "SEO services").
function relatedServices(tags: string[]) {
  const labels = Array.from(new Set(tags.flatMap((tag) => [tag, `${tag} services`])));
  return labels
    .map((label) => linkForLabel(label))
    .filter((link): link is ServiceLink => Boolean(link))
    .slice(0, 4);
}

export function BlogPostPage({ post }: { post: WpPost }) {
  const path = `/blog/${post.slug}/`;
  const crumbs = [{ label: "Home", href: "/" }, { label: "Blog", href: "/blog/" }, { label: post.title }];
  const { html, headings } = withHeadingIds(post.contentHtml);
  const related = relatedServices(post.tags);

  return (
    <PageMain>
      <JsonLd
        data={graph([
          breadcrumbSchema(crumbs, path),
          {
            ...blogPostingSchema({ title: post.title, description: post.description, path, date: post.date }),
            dateModified: post.modified,
            ...(post.image ? { image: post.image } : {}),
          },
        ])}
      />

      <PageHeader crumbs={crumbs} eyebrow={post.tags.slice(0, 3).join(" · ") || "Blog"} title={post.title} lead={post.description}>
        <p className={styles.meta}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingMinutes} min read</span>
          <span>By the {site.name} team</span>
        </p>
      </PageHeader>

      <section className={styles.sectionTight} aria-label="Article">
        <div className={`container ${styles.articleLayout}`}>
          <div>
            {post.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.image} alt="" className={styles.featureImage} />
            ) : null}
            <article className={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />
          </div>

          <aside className={styles.aside}>
            {headings.length > 1 ? (
              <nav className={styles.toc} aria-label="On this page">
                <h2>On this page</h2>
                <ol>
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`}>{heading.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
            {related.length > 0 ? (
              <div className={styles.panel}>
                <p className={styles.kicker}>Related services</p>
                <ul className={styles.cardLinks}>
                  {related.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <CtaBand title="Want this done for your website?" text="Start with a free audit of your current site." />
    </PageMain>
  );
}
