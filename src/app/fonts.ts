import { Instrument_Sans, Plus_Jakarta_Sans } from "next/font/google";

// Downloaded once at build time and served from this site by next/font, so
// visitors never contact Google.

// Headings: the typeface of the StackandSearch wordmark.
export const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const textFont = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-text",
});
