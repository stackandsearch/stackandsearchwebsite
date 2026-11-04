import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("Website migration");

// Website migration (/website-migration/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="Website migration" />;
}
