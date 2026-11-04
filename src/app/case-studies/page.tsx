import { WorkPage } from "@/components/pages/WorkPage";
import { work } from "@/content/work";
import { pageMetadata } from "@/lib/seo/page-metadata";

export const metadata = pageMetadata({ ...work.seo, path: "/case-studies/" });

export default function Page() {
  return <WorkPage />;
}
