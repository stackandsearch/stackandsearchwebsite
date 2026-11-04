import { LegalPage } from "@/components/pages/LegalPage";
import { privacyPolicy } from "@/content/legal";
import { pageMetadata } from "@/lib/seo/page-metadata";

export const metadata = pageMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  path: "/privacy-policy/",
});

export default function Page() {
  return <LegalPage doc={privacyPolicy} path="/privacy-policy/" />;
}
