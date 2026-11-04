import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("Paid ads");

// Paid ads (/paid-ads/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="Paid ads" />;
}
