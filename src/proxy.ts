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
