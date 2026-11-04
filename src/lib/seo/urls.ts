// Canonical origin for absolute URLs (canonical links, structured data).
// Override with NEXT_PUBLIC_SITE_URL for staging previews.
export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://stackandsearch.com").replace(/\/+$/, "");

export function absoluteUrl(path: string) {
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
