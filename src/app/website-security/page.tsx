import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("Website security");

// Website security (/website-security/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="Website security" />;
}
