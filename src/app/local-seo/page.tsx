import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("Local SEO");

// Local SEO (/local-seo/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="Local SEO" />;
}
