#!/usr/bin/env bash
# =============================================================================
# update-blog-cards.sh - blog cards with pagination, launch-ready robots.txt,
# featured images. Checks locally; does NOT deploy.
# Safe to re-run.
# =============================================================================
set -Eeuo pipefail

BACKUP_DIR=".setup-backup/blog-cards"
say() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()  { printf '    \033[32mok\033[0m  %s\n' "$*"; }
warn(){ printf '    \033[33mnote\033[0m  %s\n' "$*"; }
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

remove_path() {
  if [ -e "$1" ]; then backup_once "$1"; rm -rf "$1"; ok "removed $1"; fi
}

say "Checking the project"
if ! grep -q '"name": "stackandsearch"' package.json 2>/dev/null; then die "Run this from the stackandsearch project folder."; fi
[ -f src/lib/wordpress.ts ] || die "The WordPress blog setup hasn't run yet."
[ -f src/proxy.ts ] || die "src/proxy.ts is missing."
ok "project matches"

# -----------------------------------------------------------------------------
say "1/6  Featured images saved in WordPress"

WP_SITE="$(sed -n 's/.*WORDPRESS_SITE = "\(.*\)".*/\1/p' src/content/blog/source.ts)"
(curl -sS --max-time 25 "https://public-api.wordpress.com/wp/v2/sites/$WP_SITE/posts?per_page=100&_fields=slug,featured_media,jetpack_featured_media_url" 2>/dev/null || true) | node -e '
let s = ""; process.stdin.on("data", (d) => (s += d)).on("end", () => {
  let posts; try { posts = JSON.parse(s); } catch { console.log("    could not read posts from WordPress.com"); return; }
  if (!Array.isArray(posts)) { console.log("    WordPress.com replied: " + s.slice(0, 160)); return; }
  for (const p of posts) {
    const url = p.jetpack_featured_media_url || "";
    console.log(p.featured_media || url
      ? `    \x1b[32mok\x1b[0m  ${p.slug}: featured image saved (${url || "media " + p.featured_media})`
      : `    \x1b[33mnote\x1b[0m  ${p.slug}: no featured image saved yet (set it, then click Save)`);
  }
});'

# -----------------------------------------------------------------------------
say "2/6  WordPress data: full excerpts, 5-minute refresh"

put_file src/content/blog/settings.ts <<'EOF'
// Articles per page on /blog/ and /blog/page/<n>/.
export const POSTS_PER_PAGE = 9;
EOF

put_file src/lib/wordpress.ts <<'EOF'
import { cacheLife, cacheTag } from "next/cache";
import { WORDPRESS_SITE } from "@/content/blog/source";

// Blog posts from the WordPress.com site (headless): written in WordPress,
// shown on /blog/ in this site's design. Cached, refreshed every 5 minutes.

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
  excerpt: string;
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

// The excerpt as plain text, without WordPress's "[…]" or "Continue reading".
function cleanExcerpt(html: string) {
  return stripTags(html)
    .replace(/\s*\[(…|\.\.\.)\]\s*$/, "")
    .replace(/\s*Continue reading.*$/i, "")
    .trim();
}

// Meta-description length (Google shows about 155 to 160 characters).
function metaDescription(text: string) {
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
    cacheLife({ stale: 60, revalidate: 300, expire: 86400 });

    const categoryById = new Map(categories.map((item) => [item.id, { name: decodeEntities(item.name), slug: item.slug }]));
    return posts.map((post) => {
      const words = stripTags(post.content.rendered).split(" ").filter(Boolean).length;
      const excerpt = cleanExcerpt(post.excerpt.rendered);
      const category =
        (post.categories ?? [])
          .map((id) => categoryById.get(id))
          .find((item): item is WpCategory => item !== undefined && item.slug !== "uncategorized") ?? null;
      const file = post.featured_media ? media.get(post.featured_media) : undefined;
      const url = file?.source_url || post.jetpack_featured_media_url || "";
      return {
        slug: post.slug,
        title: stripTags(post.title.rendered),
        excerpt,
        description: metaDescription(excerpt),
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
say "3/6  Blog cards and pagination"

put_file src/components/pages/BlogCard.tsx <<'EOF'
import Link from "next/link";
import type { CSSProperties } from "react";
import { formatDate } from "@/content/blog";
import type { WpPost } from "@/lib/wordpress";
import styles from "./Pages.module.scss";

// One article card: featured image (or placeholder), date and reading time,
// title, excerpt, "Read article".
export function BlogCard({
  post,
  showCategory,
  level,
  index,
}: {
  post: WpPost;
  showCategory: boolean;
  level: 2 | 3;
  index: number;
}) {
  const Heading = level === 3 ? "h3" : "h2";
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className={styles.postCard}
      data-fx-reveal=""
      data-fx-spot=""
      data-fx-tilt="3"
      style={{ "--i": index } as CSSProperties}
    >
      {post.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image.url}
          alt=""
          width={post.image.width || undefined}
          height={post.image.height || undefined}
          loading={index < 3 ? "eager" : "lazy"}
          className={styles.postImage}
        />
      ) : (
        <span className={styles.postPlaceholder} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" />
            <path d="M3 12l9 4.5 9-4.5" />
            <path d="M3 16.5L12 21l9-4.5" />
          </svg>
        </span>
      )}
      <span className={styles.cardMeta}>
        {showCategory && post.category ? <span className={styles.postCategory}>{post.category.name}</span> : null}
        <time dateTime={post.publishedAt}>{formatDate(post.date)}</time>
        <span aria-hidden="true">•</span>
        <span>{post.readingMinutes} min read</span>
      </span>
      <Heading className={styles.cardTitle}>{post.title}</Heading>
      <span className={styles.cardExcerpt}>{post.excerpt}</span>
      <span className={styles.readMore}>
        Read article
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
EOF

put_file src/components/pages/BlogIndex.tsx <<'EOF'
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
EOF

put_file "src/app/blog/page/[page]/page.tsx" <<'EOF'
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
EOF

backup_once src/components/pages/BlogPostPage.tsx
node <<'NODE'
const fs = require("fs");
const file = "src/components/pages/BlogPostPage.tsx";
let src = fs.readFileSync(file, "utf8");
const edits = [
  ['import { BlogRow } from "./BlogRow";', 'import { BlogCard } from "./BlogCard";'],
  ["lead={post.description}", "lead={post.excerpt}"],
  [
    `            <ol className={styles.postList}>
              {related.map((item) => (
                <li key={item.slug}>
                  <BlogRow post={toRow(item)} showCategory={showCategory} level={3} />
                </li>
              ))}
            </ol>`,
    `            <ul className={styles.cardGrid}>
              {related.map((item, index) => (
                <li key={item.slug}>
                  <BlogCard post={item} showCategory={showCategory} level={3} index={index} />
                </li>
              ))}
            </ul>`,
  ],
];
for (const [from, to] of edits) {
  if (src.includes(to)) continue;
  if (!src.includes(from)) throw new Error("BlogPostPage.tsx has changed; couldn't find: " + from.slice(0, 60));
  src = src.replace(from, to);
}
src = src.replace(/  const toRow = \(item: WpPost\) => \(\{[\s\S]*?\n  \}\);\n/, "");
fs.writeFileSync(file, src);
console.log("    \x1b[32mok\x1b[0m  article page: full excerpt, Keep reading cards");
NODE
remove_path src/components/pages/BlogList.tsx
remove_path src/components/pages/BlogRow.tsx

append_once src/components/pages/Pages.module.scss "Blog cards and pagination" <<'EOF'

// --- Blog cards and pagination -----------------------------------------------

.cardGrid {
  display: grid;
  gap: var(--space-s);
  margin: 0;
  padding: 0;
  list-style: none;

  @include up(md) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include up(lg) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-m);
  }
}

.postPlaceholder {
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 0.85rem;
  background:
    radial-gradient(80% 90% at 20% 10%, rgb(var(--accent-rgb) / 0.45), transparent 60%),
    radial-gradient(70% 80% at 90% 100%, rgb(var(--accent-ink-rgb) / 0.25), transparent 60%),
    var(--color-surface-sunken);

  svg {
    width: 2.75rem;
    height: 2.75rem;
    color: rgb(255 255 255 / 0.85);
  }
}

.cardMeta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem 0.6rem;
  color: var(--color-text-muted);
  font-size: var(--step-small);
}

.cardTitle {
  margin: 0;
  font-size: clamp(1.15rem, 1.02rem + 0.5vw, 1.4rem);
  letter-spacing: -0.01em;
  line-height: 1.3;
  text-wrap: balance;

  @include motion-ok {
    transition: color 250ms var(--ease-out);
  }
}

.postCard:hover .cardTitle {
  color: var(--color-accent-ink);
}

.cardExcerpt {
  display: -webkit-box;
  overflow: hidden;
  color: var(--color-text-muted);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.postCard .readMore {
  margin-top: auto;
}

.pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  margin-top: clamp(2rem, 5vw, 3rem);

  ol {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
}

.pageLink,
.pageCurrent,
.pageStep {
  display: inline-grid;
  place-items: center;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0 0.9rem;
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  color: var(--color-text);
  font-weight: 600;
  text-decoration: none;
}

.pageLink:hover,
.pageStep:hover {
  border-color: var(--color-accent-ink);
  color: var(--color-accent-ink);
  text-decoration: none;
}

.pageCurrent {
  border-color: transparent;
  background: var(--color-accent);
  color: #fff;
}
EOF

# -----------------------------------------------------------------------------
say "4/6  Real 404s for blog pages that don't exist"

put_file src/proxy.ts <<'EOF'
import { NextResponse, type NextRequest } from "next/server";
import { POSTS_PER_PAGE } from "@/content/blog/settings";
import { WORDPRESS_SITE } from "@/content/blog/source";

// Unknown article addresses (/blog/<slug>/) and blog pages past the last one
// (/blog/page/<n>/) get a real 404 status; /blog/page/1/ goes to /blog/.

const MAX_AGE = 5 * 60 * 1000;
let known: { slugs: Set<string>; at: number } | null = null;

async function knownSlugs() {
  if (known && Date.now() - known.at < MAX_AGE) return known.slugs;
  try {
    const response = await fetch(
      `https://public-api.wordpress.com/wp/v2/sites/${WORDPRESS_SITE}/posts?per_page=100&_fields=slug`,
      { headers: { accept: "application/json" }, signal: AbortSignal.timeout(5000) },
    );
    if (!response.ok) return known?.slugs ?? null;
    const posts = (await response.json()) as { slug: string }[];
    known = { slugs: new Set(posts.map((post) => post.slug)), at: Date.now() };
    return known.slugs;
  } catch {
    return known?.slugs ?? null;
  }
}

const notFound = (request: NextRequest) => NextResponse.rewrite(new URL("/__no-such-page__/", request.url));

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const pageMatch = /^\/blog\/page\/([^/]+)\/?$/.exec(path);
  if (pageMatch) {
    if (pageMatch[1] === "1") return NextResponse.redirect(new URL("/blog/", request.url), 308);
    const slugs = await knownSlugs();
    if (slugs) {
      const total = Math.max(1, Math.ceil(slugs.size / POSTS_PER_PAGE));
      const page = /^\d+$/.test(pageMatch[1]) ? Number(pageMatch[1]) : NaN;
      if (!(page >= 2 && page <= total)) return notFound(request);
    }
    return NextResponse.next();
  }

  const match = /^\/blog\/([^/]+)\/?$/.exec(path);
  if (!match) return NextResponse.next();
  const slugs = await knownSlugs();
  if (slugs && !slugs.has(decodeURIComponent(match[1]))) return notFound(request);
  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/:slug", "/blog/:slug/", "/blog/page/:page", "/blog/page/:page/"],
};
EOF

if grep -q '"/blog/page/99/"' tests/e2e/pages.spec.ts; then
  ok "404 check already covers blog pages"
else
  backup_once tests/e2e/pages.spec.ts
  perl -0pi -e 's#"/blog/this-post-does-not-exist/"\]#"/blog/this-post-does-not-exist/", "/blog/page/99/"]#' tests/e2e/pages.spec.ts
  grep -q '"/blog/page/99/"' tests/e2e/pages.spec.ts || die "Couldn't update tests/e2e/pages.spec.ts."
  ok "404 check covers blog pages"
fi

# -----------------------------------------------------------------------------
say "5/6  robots.txt for launch, one address for search engines"

if [ -f src/app/robots.ts ]; then
  put_file src/app/robots.ts <<'EOF'
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/urls";

// AI search and assistant crawlers, welcomed explicitly (good for AEO/GEO).
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

// Closed until launch (SITE_INDEXING=on in Netlify). At launch: every
// crawler may read the whole site, and the sitemap is listed.
export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_INDEXING !== "on") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
EOF
else
  warn "src/app/robots.ts not found; robots.txt left as is"
fi

append_once netlify.toml "stackandsearch.netlify.app" <<'EOF'

# The Netlify address -> the real domain, so search engines see one copy.
[[redirects]]
  from = "https://stackandsearch.netlify.app/*"
  to = "https://stackandsearch.com/:splat"
  status = 301
  force = true
EOF

# -----------------------------------------------------------------------------
say "6/6  lint -> build -> type-check -> browser checks (no deploy)"
rm -rf .next
npm run lint
npm run build
npm run typecheck

trap - ERR
TESTS_OK=""
if npm run test:ui; then TESTS_OK="yes"; fi

say "Blog cards, pagination and robots.txt ready (not deployed)"
if [ -z "$TESTS_OK" ]; then
  printf '\n  \033[33mSome checks failed.\033[0m Paste everything from "Running" down into the chat.\n'
fi
cat <<'EOF'

  Look locally: npm run dev, then open http://localhost:3000/blog/
  Nothing is deployed yet. Follow the final checklist in the chat before pushing.

EOF
# END OF SCRIPT