import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("GEO services");

// GEO services (/geo-services/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="GEO services" />;
}
