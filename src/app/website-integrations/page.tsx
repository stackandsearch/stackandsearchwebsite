import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("Website integrations");

// Website integrations (/website-integrations/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="Website integrations" />;
}
