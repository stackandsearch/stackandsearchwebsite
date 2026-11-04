import { ContactPage } from "@/components/pages/ContactPage";
import { contact } from "@/content/contact";
import { pageMetadata } from "@/lib/seo/page-metadata";

export const metadata = pageMetadata({ ...contact.seo, path: "/contact/" });

export default function Page() {
  return <ContactPage />;
}
