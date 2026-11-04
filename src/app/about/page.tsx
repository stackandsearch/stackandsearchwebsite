import { AboutPage } from "@/components/pages/AboutPage";
import { about } from "@/content/about";
import { pageMetadata } from "@/lib/seo/page-metadata";

export const metadata = pageMetadata({ ...about.seo, path: "/about/" });

export default function Page() {
  return <AboutPage />;
}
