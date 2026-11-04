import { PricingPage } from "@/components/pages/PricingPage";
import { pricing } from "@/content/pricing";
import { pageMetadata } from "@/lib/seo/page-metadata";

export const metadata = pageMetadata({ ...pricing.seo, path: "/pricing/" });

export default function Page() {
  return <PricingPage />;
}
