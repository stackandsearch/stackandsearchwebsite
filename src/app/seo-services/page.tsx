import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("SEO services");

// SEO services (/seo-services/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="SEO services" />;
}
