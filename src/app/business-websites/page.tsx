import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("Business websites");

// Business websites (/business-websites/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="Business websites" />;
}
