import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("Meta Ads");

// Meta Ads (/meta-ads/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="Meta Ads" />;
}
