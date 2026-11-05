import { Analytics } from "@/components/analytics/Analytics";
import "./globals.scss";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PointerEffects } from "@/components/motion/PointerEffects";
import { PreferenceScript } from "@/components/theme/PreferenceScript";
import { site } from "@/content/site";
import { displayFont, logoFont, textFont } from "./fonts";

// Site-wide defaults. Each page sets its own title and canonical URL; the
// canonical is never set here, or every page would point at the homepage.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  // noindex everywhere until launch: SITE_INDEXING=on is set in Phase 7.
  robots: { index: site.indexable, follow: site.indexable },
  openGraph: { type: "website", siteName: site.name, locale: site.ogLocale },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070a1f" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7ff" },
  ],
};

// suppressHydrationWarning applies to <html> only: the head script adds
// data-theme, data-motion and data-js before React hydrates.
// data-scroll-behavior lets Next.js pause smooth scrolling during navigation.
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang={site.locale}
      className={`${displayFont.variable} ${textFont.variable} ${logoFont.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <PreferenceScript />
      </head>
      <body>
        <Analytics />
        <div className="scroll-progress" aria-hidden="true" />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <PointerEffects />
      </body>
    </html>
  );
}
