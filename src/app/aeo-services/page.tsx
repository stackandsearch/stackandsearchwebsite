import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("AEO services");

// AEO services (/aeo-services/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="AEO services" />;
}
