import { Bricolage_Grotesque, Instrument_Sans, Plus_Jakarta_Sans } from "next/font/google";

// Downloaded once at build time and served from this site by next/font, so
// visitors never contact Google.
export const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
  variable: "--font-display",
});

export const textFont = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-text",
});

// The logo's typeface, bold weight only, so the wordmark renders as designed.
export const logoFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-logo",
});
