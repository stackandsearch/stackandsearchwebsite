import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("Google Ads");

// Google Ads (/google-ads/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="Google Ads" />;
}
