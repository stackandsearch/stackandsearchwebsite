import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("Technical SEO");

// Technical SEO (/technical-seo/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="Technical SEO" />;
}
