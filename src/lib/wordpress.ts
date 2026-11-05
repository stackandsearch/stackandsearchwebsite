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
