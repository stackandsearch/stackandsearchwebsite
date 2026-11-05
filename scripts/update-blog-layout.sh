#!/usr/bin/env bash
# =============================================================================
# update-blog-layout.sh - Echobyte-style blog list and article pages.
#  - Categories instead of tags (labels/filters only when there are several).
#  - Article: numbered "On this page", featured image with alt text, in-article
#    call to action, "Keep reading", article metadata for sharing.
# Safe to re-run.
# =============================================================================
set -Eeuo pipefail

BACKUP_DIR=".setup-backup/blog-layout"
say() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()  { printf '    \033[32mok\033[0m  %s\n' "$*"; }
die() { printf '\n\033[31mSTOPPED:\033[0m %s\n' "$*" >&2; exit 1; }
trap 'printf "\n\033[31mSTOPPED at line %s.\033[0m Paste the output above into the chat.\n" "$LINENO" >&2' ERR

if ! tail -n 1 "$0" | grep -q "^# END OF SCRIPT$"; then
  die "This script file is incomplete. Copy the whole code block again and re-run the pbpaste command."
fi

backup_once() {
  local backup="$BACKUP_DIR/$1.bak"
  mkdir -p "$(dirname "$backup")"
  if [ ! -e "$backup" ]; then cp -R "$1" "$backup"; fi
}

put_file() {
  local tmp; tmp="$(mktemp)"; cat > "$tmp"
  if [ -e "$1" ]; then
    if cmp -s "$tmp" "$1"; then rm -f "$tmp"; ok "unchanged $1"; return 0; fi
    backup_once "$1"; cat "$tmp" > "$1"; rm -f "$tmp"; ok "updated $1"; return 0
  fi
  mkdir -p "$(dirname "$1")"; cat "$tmp" > "$1"; rm -f "$tmp"; ok "created $1"
}

append_once() {
  local tmp; tmp="$(mktemp)"; cat > "$tmp"
  if [ ! -e "$1" ]; then rm -f "$tmp"; die "$1 is missing."; fi
  if grep -q "$2" "$1"; then rm -f "$tmp"; ok "already extended $1"; return 0; fi
  backup_once "$1"
  cat "$tmp" >> "$1"; rm -f "$tmp"; ok "extended $1"
}

say "Checking the project"
if ! grep -q '"name": "stackandsearch"' package.json 2>/dev/null; then die "Run this from the stackandsearch project folder."; fi
[ -f src/lib/wordpress.ts ] || die "The WordPress blog setup hasn't run yet."
ok "project matches"

# -----------------------------------------------------------------------------
say "1/4  WordPress data: categories, featured images, no tags"

put_file src/lib/wordpress.ts <<'EOF'
import { cacheLife, cacheTag } from "next/cache";
import { WORDPRESS_SITE } from "@/content/blog/source";

// Blog posts from the WordPress.com site (headless): written in WordPress,
// shown on /blog/ in this site's design. Cached, refreshed every 15 minutes.

const API = `https://public-api.wordpress.com/wp/v2/sites/${WORDPRESS_SITE}`;

export interface WpCategory {
  name: string;
  slug: string;
}

export interface WpImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface WpPost {
  slug: string;
  title: string;
  description: string;
  contentHtml: string;
  date: string;
  modified: string;
  publishedAt: string;
  modifiedAt: string;
  category: WpCategory | null;
  image: WpImage | null;
  readingMinutes: number;
}

interface RawPost {
  slug: string;
  date: string;
  date_gmt?: string;
  modified: string;
  modified_gmt?: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories?: number[];
  featured_media?: number;
  jetpack_featured_media_url?: string;
}

interface RawCategory {
  id: number;
  name: string;
  slug: string;
}

interface RawMedia {
  id: number;
  alt_text?: string;
  source_url?: string;
  media_details?: { width?: number; height?: number };
}

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
};

export function decodeEntities(text: string) {
  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, code: string) => {
    if (code.startsWith("#")) {
      const value = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(value) ? String.fromCodePoint(value) : match;
    }
    return ENTITIES[code.toLowerCase()] ?? match;
  });
}

export function stripTags(html: string) {
  return decodeEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

// A meta-description-length summary from the WordPress excerpt.
function summary(html: string) {
  const text = stripTags(html)
    .replace(/\s*\[(…|\.\.\.)\]\s*$/, "")
    .replace(/\s*Continue reading.*$/i, "")
    .trim();
  if (text.length <= 160) return text;
  const cut = text.slice(0, 157);
  const space = cut.lastIndexOf(" ");
  return `${cut.slice(0, space > 100 ? space : 157)}…`;
}

const iso = (gmt: string | undefined, local: string) => (gmt ? `${gmt.replace(/Z$/, "")}Z` : local);

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`WordPress.com API returned ${response.status} for ${path}`);
  return (await response.json()) as T;
}

async function featuredImages(ids: number[]) {
  const images = new Map<number, RawMedia>();
  if (ids.length === 0) return images;
  try {
    const media = await getJson<RawMedia[]>(
      `/media?include=${ids.join(",")}&per_page=100&_fields=id,alt_text,source_url,media_details`,
    );
    for (const item of media) images.set(item.id, item);
  } catch (error) {
    console.error("[blog] couldn't load featured images:", error);
  }
  return images;
}

export async function getWpPosts(): Promise<WpPost[]> {
  "use cache";
  cacheTag("wordpress");
  try {
    const [posts, categories] = await Promise.all([
      getJson<RawPost[]>(
        "/posts?per_page=100&_fields=slug,date,date_gmt,modified,modified_gmt,title,excerpt,content,categories,featured_media,jetpack_featured_media_url",
      ),
      getJson<RawCategory[]>("/categories?per_page=100&_fields=id,name,slug"),
    ]);
    const media = await featuredImages(posts.map((post) => post.featured_media ?? 0).filter((id) => id > 0));
    cacheLife({ stale: 300, revalidate: 900, expire: 86400 });

    const categoryById = new Map(categories.map((item) => [item.id, { name: decodeEntities(item.name), slug: item.slug }]));
    return posts.map((post) => {
      const words = stripTags(post.content.rendered).split(" ").filter(Boolean).length;
      const category =
        (post.categories ?? [])
          .map((id) => categoryById.get(id))
          .find((item): item is WpCategory => item !== undefined && item.slug !== "uncategorized") ?? null;
      const file = post.featured_media ? media.get(post.featured_media) : undefined;
      const url = file?.source_url || post.jetpack_featured_media_url || "";
      return {
        slug: post.slug,
        title: stripTags(post.title.rendered),
        description: summary(post.excerpt.rendered),
        contentHtml: post.content.rendered,
        date: post.date.slice(0, 10),
        modified: post.modified.slice(0, 10),
        publishedAt: iso(post.date_gmt, post.date),
        modifiedAt: iso(post.modified_gmt, post.modified),
        category,
        image: url
          ? {
              url,
              alt: decodeEntities(file?.alt_text ?? ""),
              width: file?.media_details?.width ?? 0,
              height: file?.media_details?.height ?? 0,
            }
          : null,
        readingMinutes: Math.max(1, Math.round(words / 200)),
      };
    });
  } catch (error) {
    console.error("[blog] couldn't load posts from WordPress.com:", error);
    cacheLife("minutes");
    return [];
  }
}

export async function getWpPost(slug: string) {
  const posts = await getWpPosts();
  const wanted = decodeURIComponent(slug);
  return posts.find((post) => post.slug === wanted) ?? null;
}
EOF

# -----------------------------------------------------------------------------
say "2/4  Blog list and article pages"

put_file src/components/pages/BlogRow.tsx <<'EOF'
import Link from "next/link";
import styles from "./Pages.module.scss";

export interface BlogRowPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
  readingMinutes: number;
  category: { name: string; slug: string } | null;
}

// One article in a list: date and reading time, title, excerpt, "Read article".
export function BlogRow({ post, showCategory, level }: { post: BlogRowPost; showCategory: boolean; level: 2 | 3 }) {
  const Heading = level === 3 ? "h3" : "h2";
  return (
    <Link href={`/blog/${post.slug}/`} className={styles.postRow}>
      <span className={styles.postMeta}>
        {showCategory && post.category ? <span className={styles.postCategory}>{post.category.name}</span> : null}
        <time dateTime={post.date}>{post.dateLabel}</time>
        <span>{post.readingMinutes} min read</span>
      </span>
      <span className={styles.postText}>
        <Heading className={styles.postTitle}>{post.title}</Heading>
        <span className={styles.postExcerpt}>{post.description}</span>
        <span className={styles.readMore}>
          Read article
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    </Link>
  );
}
EOF

put_file src/components/pages/BlogList.tsx <<'EOF'
"use client";

import { useState } from "react";
import { BlogRow, type BlogRowPost } from "./BlogRow";
import styles from "./Pages.module.scss";

const PAGE_SIZE = 9;

interface CategoryCount {
  name: string;
  slug: string;
  count: number;
}

// Every article is in the HTML (for search engines); 9 show at first, with
// category filters when posts span more than one category.
export function BlogList({ posts, categories }: { posts: BlogRowPost[]; categories: CategoryCount[] }) {
  const [active, setActive] = useState("all");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const showCategory = categories.length > 1;
  const filtered = posts.filter((post) => active === "all" || post.category?.slug === active);
  const choose = (slug: string) => {
    setActive(slug);
    setLimit(PAGE_SIZE);
  };

  return (
    <div>
      {showCategory ? (
        <div className={styles.chips} role="group" aria-label="Filter articles by category">
          <button type="button" className={styles.chip} aria-pressed={active === "all"} onClick={() => choose("all")}>
            All <span>{posts.length}</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              className={styles.chip}
              aria-pressed={active === category.slug}
              onClick={() => choose(category.slug)}
            >
              {category.name} <span>{category.count}</span>
            </button>
          ))}
        </div>
      ) : null}

      <ol className={styles.postList}>
        {posts.map((post) => {
          const position = filtered.indexOf(post);
          return (
            <li key={post.slug} hidden={position === -1 || position >= limit}>
              <BlogRow post={post} showCategory={showCategory} level={2} />
            </li>
          );
        })}
      </ol>

      {filtered.length > limit ? (
        <button type="button" className={styles.moreButton} onClick={() => setLimit((value) => value + PAGE_SIZE)}>
          Show more articles
        </button>
      ) : null}
    </div>
  );
}
EOF

put_file src/components/pages/BlogIndex.tsx <<'EOF'
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
EOF

put_file src/components/pages/BlogPostPage.tsx <<'EOF'
import Link from "next/link";
import { PageMain } from "@/components/page/PageMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDate } from "@/content/blog";
import { linkForLabel, type ServiceLink } from "@/content/services";
import { stripTags, type WpCategory, type WpPost } from "@/lib/wordpress";
import { blogPostingSchema, breadcrumbSchema, graph } from "@/lib/seo/structured-data";
import { BlogRow } from "./BlogRow";
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
  const toRow = (item: WpPost) => ({
    slug: item.slug,
    title: item.title,
    description: item.description,
    date: item.date,
    dateLabel: formatDate(item.date),
    readingMinutes: item.readingMinutes,
    category: item.category,
  });

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
        lead={post.description}
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
            <ol className={styles.postList}>
              {related.map((item) => (
                <li key={item.slug}>
                  <BlogRow post={toRow(item)} showCategory={showCategory} level={3} />
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}
    </PageMain>
  );
}
EOF

put_file "src/app/blog/[slug]/page.tsx" <<'EOF'
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
EOF

if grep -q "post.tags" src/components/notfound/NotFoundPage.tsx; then
  backup_once src/components/notfound/NotFoundPage.tsx
  perl -pi -e 's/hint: post\.tags\.join\(", "\)/hint: post.category?.name/' src/components/notfound/NotFoundPage.tsx
  grep -q "post.tags" src/components/notfound/NotFoundPage.tsx && die "Couldn't update NotFoundPage.tsx."
  ok "404 search uses categories"
else
  ok "404 search already uses categories"
fi

# -----------------------------------------------------------------------------
say "3/4  Styles"

append_once src/components/pages/Pages.module.scss "Blog list and article layout" <<'EOF'

// --- Blog list and article layout --------------------------------------------

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: var(--space-m);
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.5rem;
  padding: 0 1rem;
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  background: transparent;
  color: var(--color-text-muted);
  font: inherit;
  font-size: var(--step-small);
  font-weight: 600;
  cursor: pointer;

  @include motion-ok {
    transition:
      background-color 250ms var(--ease-out),
      color 250ms var(--ease-out),
      border-color 250ms var(--ease-out);
  }

  span {
    padding: 0.05rem 0.45rem;
    border-radius: 999px;
    background: var(--color-surface-sunken);
    font-size: var(--step-label);
  }

  &:hover {
    border-color: var(--color-accent-ink);
    color: var(--color-text);
  }

  &[aria-pressed="true"] {
    border-color: transparent;
    background: var(--color-accent);
    color: #fff;

    span {
      background: rgb(255 255 255 / 0.2);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent-ink);
    outline-offset: 3px;
  }
}

.postList {
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--color-border);
  list-style: none;

  > li {
    border-bottom: 1px solid var(--color-border);
  }

  > li:not([hidden]) {
    @include motion-ok {
      animation: rise-in 500ms var(--ease-out) backwards;
    }
  }
}

.postRow {
  position: relative;
  display: grid;
  gap: 0.6rem;
  padding: clamp(1.25rem, 3vw, 1.85rem) clamp(0.75rem, 2vw, 1.25rem);
  border-radius: var(--radius-l);
  color: var(--color-text);
  text-decoration: none;

  @include motion-ok {
    transition: background-color 300ms var(--ease-out);
  }

  @include up(md) {
    grid-template-columns: 11rem minmax(0, 1fr);
    gap: var(--space-m);
  }

  &:hover {
    background: var(--color-surface);
    text-decoration: none;
  }

  &:hover .postTitle {
    color: var(--color-accent-ink);
  }

  &:hover .readMore svg {
    transform: translateX(4px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent-ink);
    outline-offset: 2px;
  }
}

.postMeta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem 0.9rem;
  color: var(--color-text-muted);
  font-size: var(--step-small);

  @include up(md) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
    padding-top: 0.3rem;
  }
}

.postCategory {
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  background: rgb(var(--accent-ink-rgb) / 0.12);
  color: var(--color-accent-ink);
  font-size: var(--step-label);
  font-weight: 700;
}

.postText {
  display: grid;
  gap: 0.5rem;
}

.postTitle {
  margin: 0;
  font-size: clamp(1.25rem, 1.05rem + 0.8vw, 1.65rem);
  letter-spacing: -0.01em;
  line-height: 1.25;
  text-wrap: balance;

  @include motion-ok {
    transition: color 250ms var(--ease-out);
  }
}

.postExcerpt {
  max-width: 52rem;
  color: var(--color-text-muted);
}

.moreButton {
  display: flex;
  align-items: center;
  min-height: 3rem;
  margin: var(--space-l) auto 0;
  padding: 0 1.5rem;
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: var(--color-accent-ink);
    color: var(--color-accent-ink);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent-ink);
    outline-offset: 3px;
  }
}

.postLayout {
  display: grid;
  gap: clamp(2rem, 5vw, 3.5rem);

  @include up(lg) {
    grid-template-columns: 16rem minmax(0, 1fr);
    align-items: start;
  }
}

.postBody {
  min-width: 0;
}

.postAside {
  display: grid;
  gap: var(--space-s);

  .toc {
    display: none;
  }

  @include up(lg) {
    position: sticky;
    top: calc(var(--header-offset, var(--header-h)) + 2rem);
    order: -1;
    max-height: calc(100vh - var(--header-h) - 4rem);
    overflow-y: auto;

    .toc {
      display: block;
    }
  }
}

.tocSub a {
  padding-left: 1.4rem;
}

.tocMobile {
  margin-bottom: var(--space-l);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-l);
  background: var(--color-surface);

  @include up(lg) {
    display: none;
  }

  summary {
    padding: 0.9rem 1.1rem;
    font-weight: 700;
    cursor: pointer;
  }

  ol {
    display: grid;
    gap: 0.15rem;
    margin: 0;
    padding: 0 0.6rem 0.8rem;
    list-style: none;
    counter-reset: toc;
  }

  a {
    display: grid;
    grid-template-columns: 1.75rem minmax(0, 1fr);
    gap: 0.25rem;
    padding: 0.4rem 0.5rem;
    border-radius: var(--radius-s);
    color: var(--color-text-muted);
    font-size: var(--step-small);
    line-height: 1.4;
    text-decoration: none;
    counter-increment: toc;

    &::before {
      content: counter(toc, decimal-leading-zero);
      color: var(--color-accent-ink);
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: var(--step-label);
    }
  }
}

.postCta {
  position: relative;
  isolation: isolate;
  display: grid;
  gap: var(--space-s);
  max-width: 44rem;
  margin-top: clamp(2.5rem, 5vw, 3.5rem);
  padding: clamp(1.5rem, 4vw, 2.25rem);
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-l);
  background:
    radial-gradient(90% 100% at 100% 0%, rgb(var(--accent-rgb) / 0.22), transparent 60%),
    var(--color-surface);

  @include fx.spotlight;
  @include fx.reveal;

  h2 {
    margin: 0;
    font-size: clamp(1.3rem, 1.1rem + 0.7vw, 1.7rem);
  }

  p {
    color: var(--color-text-muted);
  }

  .actions {
    margin-top: var(--space-xs);
  }
}

.ghostButton {
  display: inline-flex;
  align-items: center;
  min-height: 3.25rem;
  padding: 0 1.5rem;
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  color: var(--color-text);
  font-weight: 600;
  text-decoration: none;

  &:hover {
    border-color: var(--color-accent-ink);
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent-ink);
    outline-offset: 3px;
  }
}
EOF

# -----------------------------------------------------------------------------
say "4/4  lint -> build -> type-check -> browser checks"
rm -rf .next
npm run lint
npm run build
npm run typecheck

trap - ERR
TESTS_OK=""
if npm run test:ui; then TESTS_OK="yes"; fi

say "Blog layout updated"
if [ -z "$TESTS_OK" ]; then
  printf '\n  \033[33mSome checks failed.\033[0m Paste everything from "Running" down into the chat.\n'
fi
cat <<'EOF'

  1. See it: npm run dev, then open http://localhost:3000/blog/ and an article
  2. Publish: git add -A && git commit -m "Blog: Echobyte-style list and article pages" && git push

EOF
# END OF SCRIPT