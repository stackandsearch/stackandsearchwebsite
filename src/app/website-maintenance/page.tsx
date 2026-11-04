import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("Website maintenance");

// Website maintenance (/website-maintenance/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="Website maintenance" />;
}
