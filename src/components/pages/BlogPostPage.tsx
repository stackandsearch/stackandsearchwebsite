import Link from "next/link";
import { PageMain } from "@/components/page/PageMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDate } from "@/content/blog";
import { linkForLabel, type ServiceLink } from "@/content/services";
import { stripTags, type WpCategory, type WpPost } from "@/lib/wordpress";
import { blogPostingSchema, breadcrumbSchema, graph } from "@/lib/seo/structured-data";
import { BlogCard } from "./BlogCard";
import { PageHeader } from "./PageHeader";
import { SectionHead } from "./parts";
import styles from "./Pages.module.scss";

// Services linked from articles in a category (category slug -> service names).
const CATEGORY_SERVICES: Record<string, string[]> = {
  seo: ["SEO services", "Technical SEO", "Local SEO"],
  "aeo-geo": ["AEO services", "GEO services"],
  aeo: ["AEO services"],
  geo: ["GEO services"],
  "web-development": ["Website development", "Website redesign", "Website migration"],
  "paid-ads": ["Paid ads", "Google Ads", "Meta Ads"],
  "social-media": ["Social media management"],
  "website-care": ["Website maintenance", "Speed optimisation", "Website security"],
};

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Gives every h2 and h3 in the WordPress content an id, for "On this page".
function withHeadingIds(html: string) {
  const headings: Heading[] = [];
  const used = new Set<string>();
  const out = html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi, (match, tag: string, attrs: string, inner: string) => {
    const text = stripTags(inner);
    if (!text) return match;
    const base = slugify(text) || "section";
    let id = base;
    for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`;
    used.add(id);
    headings.push({ id, text, level: tag.toLowerCase() === "h3" ? 3 : 2 });
    return `<${tag}${attrs.replace(/\sid="[^"]*"/i, "")} id="${id}">${inner}</${tag}>`;
  });
  return { html: out, headings };
}

function relatedServices(category: WpCategory | null) {
  if (!category) return [];
  const labels = CATEGORY_SERVICES[category.slug] ?? [category.name, `${category.name} services`];
  return labels
    .map((label) => linkForLabel(label))
    .filter((link): link is ServiceLink => Boolean(link))
    .slice(0, 4);
}

function TocList({ headings }: { headings: Heading[] }) {
  return (
    <ol>
      {headings.map((heading) => (
        <li key={heading.id} className={heading.level === 3 ? styles.tocSub : undefined}>
          <a href={`#${heading.id}`}>{heading.text}</a>
        </li>
      ))}
    </ol>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BlogPostPage({ post, related, showCategory }: { post: WpPost; related: WpPost[]; showCategory: boolean }) {
  const path = `/blog/${post.slug}/`;
  const crumbs = [{ label: "Home", href: "/" }, { label: "Blog", href: "/blog/" }, { label: post.title }];
  const { html, headings } = withHeadingIds(post.contentHtml);
  const services = relatedServices(post.category);

  return (
    <PageMain>
      <JsonLd
        data={graph([
          breadcrumbSchema(crumbs, path),
          {
            ...blogPostingSchema({ title: post.title, description: post.description, path, date: post.publishedAt }),
            dateModified: post.modifiedAt,
            ...(post.category ? { articleSection: post.category.name } : {}),
            ...(post.image
              ? {
                  image: {
                    "@type": "ImageObject",
                    url: post.image.url,
                    ...(post.image.width ? { width: post.image.width, height: post.image.height } : {}),
                  },
                }
              : {}),
          },
        ])}
      />

      <PageHeader
        crumbs={crumbs}
        eyebrow={showCategory && post.category ? post.category.name : "Blog"}
        title={post.title}
        lead={post.excerpt}
      >
        <p className={styles.meta}>
          <time dateTime={post.publishedAt}>{formatDate(post.date)}</time>
          <span aria-hidden="true">•</span>
          <span>{post.readingMinutes} min read</span>
          {post.modified !== post.date ? (
            <>
              <span aria-hidden="true">•</span>
              <span>Updated {formatDate(post.modified)}</span>
            </>
          ) : null}
        </p>
      </PageHeader>

      <section className={styles.sectionTight} aria-label="Article">
        <div className={`container ${styles.postLayout}`}>
          <div className={styles.postBody}>
            {headings.length > 1 ? (
              <details className={styles.tocMobile}>
                <summary>On this page</summary>
                <TocList headings={headings} />
              </details>
            ) : null}

            {post.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.image.url}
                alt={post.image.alt}
                width={post.image.width || undefined}
                height={post.image.height || undefined}
                className={styles.featureImage}
              />
            ) : null}

            <article className={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />

            <div className={styles.postCta} data-fx-reveal="" data-fx-spot="">
              <h2>Planning a website, redesign or campaign?</h2>
              <p>
                Start with a free audit of your current site. Every project gets a written scope and a fixed quote before
                work begins.
              </p>
              <div className={styles.actions}>
                <Link href="/contact/" className={styles.button} data-fx-magnet="">
                  <span>Get a free audit</span>
                  <Arrow />
                </Link>
                <Link href="/pricing/" className={styles.ghostButton}>
                  See pricing
                </Link>
              </div>
            </div>
          </div>

          <aside className={styles.postAside}>
            {headings.length > 1 ? (
              <nav className={styles.toc} aria-label="On this page">
                <h2>On this page</h2>
                <TocList headings={headings} />
              </nav>
            ) : null}
            {services.length > 0 ? (
              <div className={styles.panel}>
                <p className={styles.kicker}>Related services</p>
                <ul className={styles.cardLinks}>
                  {services.map((link) => (
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

      {related.length > 0 ? (
        <section className={styles.section} aria-labelledby="keep-reading-title">
          <div className="container">
            <SectionHead id="keep-reading-title" kicker="Keep reading" title="More from the blog" />
            <ul className={styles.cardGrid}>
              {related.map((item, index) => (
                <li key={item.slug}>
                  <BlogCard post={item} showCategory={showCategory} level={3} index={index} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </PageMain>
  );
}
