import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content Security Policy (blueprint section 6.10). Inline scripts are allowed
// because the App Router puts small inline scripts in static pages, and nonces
// would force every page to render on each request. Everything else is strict.
// HSTS and upgrade-insecure-requests are added at deployment (Phase 7)
// because they break local http testing. Dev mode also allows eval and the
// hot-reload websocket.
// A directive may appear only once: browsers ignore every repeat, so each
// source list (the site itself, analytics, blog images) is written in full.
const GOOGLE_TAG = "https://*.googletagmanager.com";
const GOOGLE_ANALYTICS = "https://*.google-analytics.com https://*.analytics.google.com";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${GOOGLE_TAG}${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://*.wp.com https://*.wordpress.com ${GOOGLE_ANALYTICS} ${GOOGLE_TAG}`,
  `connect-src 'self' ${GOOGLE_ANALYTICS} ${GOOGLE_TAG}${isDev ? " ws: wss:" : ""}`,
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Every URL ends with "/" to match the SEO plan, e.g. /services/website-development/
  trailingSlash: true,
  // Do not advertise the framework in a response header.
  poweredByHeader: false,
  // Next.js 16.4 create-next-app defaults, kept: Cache Components + Partial Prefetching.
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Page 1 of the blog list lives at /blog/.
  async redirects() {
    return [{ source: "/blog/page/1", destination: "/blog/", permanent: true }];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
