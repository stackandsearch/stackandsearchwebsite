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
