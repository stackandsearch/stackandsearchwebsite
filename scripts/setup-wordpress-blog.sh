#!/usr/bin/env bash
# =============================================================================
# setup-wordpress-blog.sh - blog posts from WordPress.com (headless).
#  1. Connect the WordPress.com site.
#  2. Export the two current articles to a WordPress import file.
#  3. /blog/ and /blog/<slug>/ read posts from WordPress.com (refreshed every
#     15 minutes), sitemap and 404 search included.
#  4. Real 404s for unknown articles; blog.stackandsearch.com redirect.
#  5. lint -> build -> type-check -> browser checks.
# Safe to re-run.
# =============================================================================
set -Eeuo pipefail

BACKUP_DIR=".setup-backup/wordpress-blog"
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

# Create, or replace with a backup of the previous version.
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
  if [ -e "$1" ]; then backup_once "$1"; rm -rf "$1"; ok "removed $1 (copy in $BACKUP_DIR)"; fi
}

say "Checking the project"
if ! grep -q '"name": "stackandsearch"' package.json 2>/dev/null; then die "Run this from the stackandsearch project folder."; fi
[ -f netlify.toml ] || die "netlify.toml is missing."
[ -f src/components/notfound/NotFoundPage.tsx ] || die "The 404 page setup hasn't run yet."
ok "project matches"

# -----------------------------------------------------------------------------
say "1/6  Connect your WordPress.com site"

CURRENT_SITE="$(sed -n 's/.*WORDPRESS_SITE = "\(.*\)".*/\1/p' src/content/blog/source.ts 2>/dev/null || true)"
PROMPT="    Your WordPress.com address (for example stackandsearchblog.wordpress.com)"
[ -n "$CURRENT_SITE" ] && PROMPT="$PROMPT [$CURRENT_SITE]"
read -r -p "$PROMPT: " WP_INPUT
WP_INPUT="${WP_INPUT:-$CURRENT_SITE}"
WP_SITE="$(printf '%s' "$WP_INPUT" | sed -E 's#^https?://##; s#/.*$##' | tr '[:upper:]' '[:lower:]' | tr -d ' ')"
[ -n "$WP_SITE" ] || die "No address entered."
API="https://public-api.wordpress.com/wp/v2/sites/$WP_SITE"

REPLY_JSON="$(curl -sS --max-time 25 "$API/posts?per_page=1&_fields=slug" 2>&1 || true)"
case "$REPLY_JSON" in
  \[*) ok "WordPress.com site found: $WP_SITE" ;;
  *) die "WordPress.com didn't return posts for $WP_SITE. Check the address, and that the site is launched and Public (not Coming soon or Private). Reply: $(printf '%s' "$REPLY_JSON" | head -c 200)" ;;
esac

printf '// The WordPress.com site that holds the blog posts. Posts are written there\n// and shown on stackandsearch.com/blog/ in this site'"'"'s own design.\nexport const WORDPRESS_SITE = "%s";\n' "$WP_SITE" | put_file src/content/blog/source.ts

# -----------------------------------------------------------------------------
say "2/6  Move the two current articles into WordPress"

wp_slugs() { (curl -sS --max-time 25 "$API/posts?per_page=100&_fields=slug" 2>/dev/null || true) | node -e '
  let s = ""; process.stdin.on("data", (d) => (s += d)).on("end", () => {
    try { console.log(JSON.parse(s).map((p) => p.slug).join(" ")); } catch { console.log(""); }
  });'; }

LOCAL_POSTS=()
for f in src/content/blog/aeo-geo-what-google-says.ts src/content/blog/website-redesign-seo-checklist.ts; do
  [ -f "$f" ] && LOCAL_POSTS+=("$f")
done

if [ "${#LOCAL_POSTS[@]}" -eq 0 ]; then
  ok "articles already moved"
else
  mkdir -p docs
  node - "${LOCAL_POSTS[@]}" <<'NODE'
const fs = require("fs");
const ts = require("typescript");
const load = (file) => {
  const js = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} };
  new Function("module", "exports", "require", js)(mod, mod.exports, require);
  return Object.values(mod.exports)[0];
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const p = (t) => `<!-- wp:paragraph -->\n<p>${esc(t)}</p>\n<!-- /wp:paragraph -->`;
const h2 = (t) => `<!-- wp:heading -->\n<h2 class="wp-block-heading">${esc(t)}</h2>\n<!-- /wp:heading -->`;
const list = (items) =>
  `<!-- wp:list -->\n<ul class="wp-block-list">${items
    .map((i) => `<!-- wp:list-item -->\n<li>${i}</li>\n<!-- /wp:list-item -->`)
    .join("\n")}</ul>\n<!-- /wp:list -->`;
const body = (post) => {
  const parts = [p(post.intro)];
  for (const s of post.sections) {
    parts.push(h2(s.heading));
    for (const t of s.paragraphs || []) parts.push(p(t));
    if (s.list) parts.push(list(s.list.map(esc)));
    for (const t of s.after || []) parts.push(p(t));
  }
  if (post.sources && post.sources.length) {
    parts.push(h2("Sources"));
    parts.push(list(post.sources.map((src) => `<a href="${esc(src.href)}">${esc(src.label)}</a>`)));
  }
  return parts.join("\n\n");
};
const nice = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const posts = process.argv.slice(2).map(load);
const items = posts
  .map((post, i) => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <dc:creator><![CDATA[stackandsearch]]></dc:creator>
    <content:encoded><![CDATA[${body(post)}]]></content:encoded>
    <excerpt:encoded><![CDATA[${post.description}]]></excerpt:encoded>
    <wp:post_id>${i + 1}</wp:post_id>
    <wp:post_date><![CDATA[${post.date} 10:00:00]]></wp:post_date>
    <wp:post_date_gmt><![CDATA[${post.date} 04:30:00]]></wp:post_date_gmt>
    <wp:comment_status><![CDATA[closed]]></wp:comment_status>
    <wp:ping_status><![CDATA[closed]]></wp:ping_status>
    <wp:post_name><![CDATA[${post.slug}]]></wp:post_name>
    <wp:status><![CDATA[publish]]></wp:status>
    <wp:post_parent>0</wp:post_parent>
    <wp:menu_order>0</wp:menu_order>
    <wp:post_type><![CDATA[post]]></wp:post_type>
    <wp:post_password><![CDATA[]]></wp:post_password>
    <wp:is_sticky>0</wp:is_sticky>
    <category domain="category" nicename="guides"><![CDATA[Guides]]></category>
${post.tags.map((t) => `    <category domain="post_tag" nicename="${nice(t)}"><![CDATA[${t}]]></category>`).join("\n")}
  </item>`)
  .join("\n");
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/">
<channel>
  <title>Stack &amp; Search</title>
  <link>https://stackandsearch.com</link>
  <description>Stack &amp; Search blog</description>
  <language>en-IN</language>
  <wp:wxr_version>1.2</wp:wxr_version>
${items}
</channel>
</rss>
`;
fs.writeFileSync("docs/wordpress-import.xml", xml);
console.log(`    \x1b[32mok\x1b[0m  docs/wordpress-import.xml written (${posts.length} articles)`);
NODE

  NEEDED="aeo-geo-what-google-says website-redesign-seo-checklist"
  have_all() { local slugs; slugs=" $(wp_slugs) "; for s in $NEEDED; do case "$slugs" in *" $s "*) ;; *) return 1 ;; esac; done; return 0; }

  if have_all; then
    ok "both articles are already on WordPress.com"
  else
    open -R docs/wordpress-import.xml 2>/dev/null || true
    cat <<EOF

    Import the two articles into WordPress.com (Finder has the file selected):
      1. Open https://wordpress.com/import/$WP_SITE
         (or My Site -> Tools -> Import), and choose WordPress.
      2. Upload docs/wordpress-import.xml from your project folder.
      3. When asked about the author, assign the posts to your account.
      4. Wait for "Import complete".

EOF
    for attempt in 1 2 3; do
      read -r -p "    Press Enter once the import is complete... " _
      if have_all; then ok "both articles are on WordPress.com"; break; fi
      [ "$attempt" = 3 ] && die "The two articles aren't on WordPress.com yet (found: $(wp_slugs)). Finish the import, then run this script again."
      warn "not there yet; give it a few seconds and press Enter again"
    done
  fi
fi

# -----------------------------------------------------------------------------
say "3/6  Blog pages read from WordPress.com"

put_file src/lib/wordpress.ts <<'EOF'
import { cacheLife, cacheTag } from "next/cache";
import { WORDPRESS_SITE } from "@/content/blog/source";

// Blog posts from the WordPress.com site (headless): written in WordPress,
// shown on /blog/ in this site's design. Cached, refreshed every 15 minutes.

const API = `https://public-api.wordpress.com/wp/v2/sites/${WORDPRESS_SITE}`;

export interface WpPost {
  slug: string;
  title: string;
  description: string;
  contentHtml: string;
  date: string;
  modified: string;
  tags: string[];
  image: string;
  readingMinutes: number;
}

interface RawPost {
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  tags?: number[];
  jetpack_featured_media_url?: string;
}

interface RawTag {
  id: number;
  name: string;
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

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`WordPress.com API returned ${response.status} for ${path}`);
  return (await response.json()) as T;
}

export async function getWpPosts(): Promise<WpPost[]> {
  "use cache";
  cacheTag("wordpress");
  try {
    const [posts, tags] = await Promise.all([
      getJson<RawPost[]>(
        "/posts?per_page=100&_fields=slug,date,modified,title,excerpt,content,tags,jetpack_featured_media_url",
      ),
      getJson<RawTag[]>("/tags?per_page=100&_fields=id,name"),
    ]);
    cacheLife({ stale: 300, revalidate: 900, expire: 86400 });
    const tagNames = new Map(tags.map((tag) => [tag.id, decodeEntities(tag.name)]));
    return posts.map((post) => {
      const words = stripTags(post.content.rendered).split(" ").filter(Boolean).length;
      return {
        slug: post.slug,
        title: stripTags(post.title.rendered),
        description: summary(post.excerpt.rendered),
        contentHtml: post.content.rendered,
        date: post.date.slice(0, 10),
        modified: post.modified.slice(0, 10),
        tags: (post.tags ?? []).map((id) => tagNames.get(id)).filter((name): name is string => Boolean(name)),
        image: post.jetpack_featured_media_url ?? "",
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

put_file src/content/blog/index.ts <<'EOF'
// Blog page copy and helpers. The posts themselves come from WordPress.com
// (src/lib/wordpress.ts).

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// "2026-11-04" -> "4 November 2026" (no Date object needed).
export function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export const blogIndex = {
  seo: {
    title: "Blog: Guides to Websites, SEO and Growth",
    description: "Practical, honest guides on building websites that get found: SEO, AEO, GEO, redesigns, speed and paid ads, with sources linked.",
  },
  hero: {
    title: "Practical guides to websites, search and growth",
    accent: "websites, search and growth",
    lead: "Honest, specific guides on building websites that get found, written from the work we do every day, with sources linked so you can check them.",
    points: ["No fluff", "Sources linked", "Updated as search changes"],
  },
};
EOF

put_file src/components/pages/BlogIndex.tsx <<'EOF'
import Link from "next/link";
import { PageMain } from "@/components/page/PageMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceGraphic } from "@/components/service/ServiceGraphic";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ArrowIcon } from "@/components/service/ServicePage";
import { blogIndex, formatDate } from "@/content/blog";
import { site } from "@/content/site";
import { getWpPosts } from "@/lib/wordpress";
import { absoluteUrl } from "@/lib/seo/urls";
import { breadcrumbSchema, graph, organizationRef } from "@/lib/seo/structured-data";
import { CtaBand, order, SectionHead } from "./parts";
import styles from "./Pages.module.scss";

const PATH = "/blog/";

export async function BlogIndex() {
  const posts = await getWpPosts();
  const crumbs = [{ label: "Home", href: "/" }, { label: "Blog" }];

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
              datePublished: post.date,
            })),
          },
        ])}
      />

      <ServiceHero
        eyebrow="Blog"
        title={blogIndex.hero.title}
        accent={blogIndex.hero.accent}
        lead={blogIndex.hero.lead}
        points={blogIndex.hero.points}
        crumbs={crumbs}
        graphic={<ServiceGraphic kind="aeo" />}
        secondaryHref="#articles"
        secondaryLabel="Read the articles"
      />

      <section id="articles" className={styles.section} aria-labelledby="articles-title">
        <div className="container">
          <SectionHead id="articles-title" kicker="Latest" title="Latest articles" />
          {posts.length === 0 ? (
            <p className={styles.muted}>New articles are on their way. Check back soon.</p>
          ) : (
            <ul className={styles.postGrid}>
              {posts.map((post, index) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}/`}
                    className={styles.postCard}
                    data-fx-reveal=""
                    data-fx-spot=""
                    data-fx-tilt="4"
                    style={order(index)}
                  >
                    {post.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.image} alt="" className={styles.postImage} loading="lazy" />
                    ) : null}
                    {post.tags.length > 0 ? (
                      <span className={styles.tags}>
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </span>
                    ) : null}
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <span className={styles.postFoot}>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span>{post.readingMinutes} min read</span>
                      <span className={styles.readMore}>
                        Read article <ArrowIcon />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaBand title="Want this done for your website?" text="Start with a free audit of your current site." />
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
EOF

put_file "src/app/blog/[slug]/page.tsx" <<'EOF'
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
EOF

remove_path src/app/blog/aeo-geo-what-google-says
remove_path src/app/blog/website-redesign-seo-checklist
remove_path src/components/pages/blog-route.tsx
remove_path src/content/blog/aeo-geo-what-google-says.ts
remove_path src/content/blog/website-redesign-seo-checklist.ts
remove_path src/content/blog/types.ts

append_once src/components/pages/Pages.module.scss "WordPress post content" <<'EOF'

// --- WordPress post content --------------------------------------------------

.prose > * + * {
  margin-top: 1em;
}

.prose > h2 {
  margin-top: 2em;
}

.prose > h2:first-child {
  margin-top: 0;
}

.prose h3 {
  margin: 1.8em 0 0.5em;
  font-size: clamp(1.15rem, 1.05rem + 0.4vw, 1.35rem);
  line-height: 1.3;
  scroll-margin-top: calc(var(--header-h) + 1rem);
}

.prose ol {
  display: grid;
  gap: 0.5em;
  padding-left: 1.25rem;
}

.prose img,
.prose video,
.prose iframe {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-l);
}

.prose figure {
  margin: 1.6em 0;
}

.prose figcaption {
  margin-top: 0.5em;
  color: var(--color-text-muted);
  font-size: var(--step-small);
  text-align: center;
}

.prose blockquote {
  margin: 1.6em 0;
  padding: 0.4em 0 0.4em 1.25em;
  border-left: 3px solid var(--color-accent-ink);
  color: var(--color-text-muted);
  font-style: italic;
}

.prose pre {
  overflow-x: auto;
  padding: 1em 1.25em;
  border-radius: var(--radius-l);
  background: var(--color-surface-sunken);
  font-size: 0.9em;
}

.prose code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.9em;
}

.prose table {
  display: block;
  overflow-x: auto;
  width: 100%;
  border-collapse: collapse;
  font-size: var(--step-small);
}

.prose th,
.prose td {
  padding: 0.6em 0.8em;
  border: 1px solid var(--color-border);
  text-align: left;
}

.featureImage {
  display: block;
  width: 100%;
  max-height: 30rem;
  margin-bottom: var(--space-l);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-l);
  object-fit: cover;
}

.postImage {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 0.85rem;
  object-fit: cover;
}
EOF

put_file src/app/sitemap.ts <<'EOF'
import type { MetadataRoute } from "next";
import { resolvedServices } from "@/content/services";
import { getWpPosts } from "@/lib/wordpress";
import { absoluteUrl } from "@/lib/seo/urls";

const PAGES = [
  "/",
  "/services/",
  "/about/",
  "/case-studies/",
  "/pricing/",
  "/contact/",
  "/blog/",
  "/privacy-policy/",
  "/terms/",
  "/cookie-policy/",
];

// Every public page: company pages, all service pages and every blog post.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getWpPosts();
  return [
    ...PAGES.map((path) => ({ url: absoluteUrl(path) })),
    ...resolvedServices().map((service) => ({ url: absoluteUrl(service.href) })),
    ...posts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}/`), lastModified: post.modified })),
  ];
}
EOF

put_file src/components/notfound/NotFoundPage.tsx <<'EOF'
import Link from "next/link";
import { PageMain } from "@/components/page/PageMain";
import { primaryNav } from "@/content/navigation";
import { linkForLabel, resolvedServices } from "@/content/services";
import { getWpPosts } from "@/lib/wordpress";
import { NotFoundScene } from "./NotFoundScene";
import { NotFoundSearch, type SearchItem } from "./NotFoundSearch";
import styles from "./NotFound.module.scss";

const PAGE_HINTS: Record<string, string> = {
  Work: "Case studies, portfolio and projects",
  Pricing: "Prices, quotes, packages and cost",
  About: "Who we are and how we work",
  Blog: "Articles and guides",
  Contact: "Email, enquiry, free audit, book a call",
};

const POPULAR = ["/services/", "/website-development/", "/seo-services/", "/pricing/", "/case-studies/", "/contact/"];

// Every page a lost visitor might want, for the search box.
async function searchIndex(): Promise<SearchItem[]> {
  const posts = await getWpPosts();
  const items: SearchItem[] = [
    { label: "Home", href: "/", group: "Page" },
    { label: "All services", href: "/services/", group: "Page", hint: "Everything we build, run and grow" },
    ...primaryNav.map((link) => ({ label: link.label, href: link.href, group: "Page", hint: PAGE_HINTS[link.label] })),
    ...resolvedServices().map(({ content, href }) => ({
      label: content.label,
      href,
      group: "Service",
      hint: linkForLabel(content.label)?.summary,
    })),
    ...posts.map((post) => ({ label: post.title, href: `/blog/${post.slug}/`, group: "Article", hint: post.tags.join(", ") })),
    { label: "Privacy policy", href: "/privacy-policy/", group: "Page" },
    { label: "Terms of use", href: "/terms/", group: "Page" },
    { label: "Cookie policy", href: "/cookie-policy/", group: "Page" },
  ];
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
}

export async function NotFoundPage() {
  const index = await searchIndex();
  const popular = POPULAR.flatMap((href) => index.filter((item) => item.href === href));

  return (
    <PageMain>
      <section className={styles.wrap} aria-labelledby="nf-title" data-fx-parallax="">
        <div className={`container ${styles.inner}`}>
          <NotFoundScene />
          <p className={styles.eyebrow}>Error 404</p>
          <h1 id="nf-title" className={styles.title}>
            This page slipped out of the stack
          </h1>
          <p className={styles.lead}>
            The link might be old, or the page may have moved. Search the site, or start from one of our most visited
            pages.
          </p>
          <NotFoundSearch items={index} popular={popular} />
          <div className={styles.actions}>
            <Link href="/" className={styles.primary}>
              Back to home
            </Link>
            <Link href="/contact/" className={styles.ghost}>
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </PageMain>
  );
}
EOF

# -----------------------------------------------------------------------------
say "4/6  Real 404s for article addresses that don't exist"

EXISTING_PROXY=""
for f in src/proxy.ts src/middleware.ts proxy.ts middleware.ts; do
  if [ -e "$f" ] && ! grep -q "Unknown article addresses" "$f"; then EXISTING_PROXY="$f"; fi
done
if [ -n "$EXISTING_PROXY" ]; then
  warn "$EXISTING_PROXY already exists, so the article 404 check wasn't added; tell me if the 404 test fails"
else
  put_file src/proxy.ts <<'EOF'
import { NextResponse, type NextRequest } from "next/server";
import { WORDPRESS_SITE } from "@/content/blog/source";

// Unknown article addresses (/blog/<slug>/ with no WordPress post) get a real
// 404 status instead of a 200 page that says "not found".

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

export async function proxy(request: NextRequest) {
  const match = /^\/blog\/([^/]+)\/?$/.exec(request.nextUrl.pathname);
  if (!match) return NextResponse.next();
  const slugs = await knownSlugs();
  if (slugs && !slugs.has(decodeURIComponent(match[1]))) {
    return NextResponse.rewrite(new URL("/__no-such-article__/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/:slug", "/blog/:slug/"],
};
EOF
fi

if grep -q "Content-Security-Policy" next.config.ts 2>/dev/null; then
  warn "next.config.ts sets a Content-Security-Policy; if WordPress images don't show, tell me"
fi

# -----------------------------------------------------------------------------
say "5/6  blog.stackandsearch.com redirect, checks and notes"

append_once netlify.toml "blog.stackandsearch.com" <<'EOF'

# blog.stackandsearch.com -> the blog on the main site (same path).
[[redirects]]
  from = "https://blog.stackandsearch.com/*"
  to = "https://stackandsearch.com/blog/:splat"
  status = 301
  force = true

[[redirects]]
  from = "http://blog.stackandsearch.com/*"
  to = "https://stackandsearch.com/blog/:splat"
  status = 301
  force = true
EOF

if grep -q '"/blog/this-post-does-not-exist/"' tests/e2e/pages.spec.ts; then
  ok "404 check already covers unknown articles"
else
  backup_once tests/e2e/pages.spec.ts
  perl -0pi -e 's#\["/this-page-does-not-exist/", "/services/website-development/"\]#["/this-page-does-not-exist/", "/services/website-development/", "/blog/this-post-does-not-exist/"]#' tests/e2e/pages.spec.ts
  grep -q '"/blog/this-post-does-not-exist/"' tests/e2e/pages.spec.ts || die "Couldn't update tests/e2e/pages.spec.ts."
  ok "404 check covers unknown articles"
fi

append_once docs/OWNER-INPUTS.md "Blog (WordPress.com)" <<'EOF'

## Blog (WordPress.com)

- Posts are written on the WordPress.com site in `src/content/blog/source.ts` and appear on stackandsearch.com/blog/ within about 15 minutes. No deploy needed.
- The post's slug becomes its address: /blog/<slug>/. Don't change slugs after publishing.
- The excerpt is the meta description (aim for 120 to 155 characters).
- Tags show as labels; tags matching a service ("SEO", "AEO", "GEO", "Paid ads"...) add related-service links.
- The featured image shows on the blog list and at the top of the article.
- Keep the WordPress.com site set to "Discourage search engines" so only stackandsearch.com is indexed.
- blog.stackandsearch.com redirects to /blog/ (Netlify domain alias + CNAME `blog` at Hostinger).
EOF

# -----------------------------------------------------------------------------
say "6/6  lint -> build -> type-check -> browser checks"
npm run lint
npm run build
npm run typecheck

trap - ERR
TESTS_OK=""
if npm run test:ui; then TESTS_OK="yes"; fi

say "WordPress blog connected"
if [ -z "$TESTS_OK" ]; then
  printf '\n  \033[33mSome checks failed.\033[0m Paste everything from "Running" down into the chat.\n'
fi
cat <<'EOF'

  1. See it locally: npm run dev, then open http://localhost:3000/blog/
  2. Publish it:     git add -A && git commit -m "Blog: posts from WordPress.com" && git push
  3. Then set up blog.stackandsearch.com (steps in the chat).

EOF
# END OF SCRIPT