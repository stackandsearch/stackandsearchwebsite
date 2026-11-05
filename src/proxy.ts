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
