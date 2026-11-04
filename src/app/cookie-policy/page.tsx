import { LegalPage } from "@/components/pages/LegalPage";
import { cookiePolicy } from "@/content/legal";
import { pageMetadata } from "@/lib/seo/page-metadata";

export const metadata = pageMetadata({
  title: cookiePolicy.title,
  description: cookiePolicy.description,
  path: "/cookie-policy/",
});

export default function Page() {
  return <LegalPage doc={cookiePolicy} path="/cookie-policy/" />;
}
