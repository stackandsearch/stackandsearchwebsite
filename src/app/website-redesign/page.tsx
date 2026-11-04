import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("Website redesign");

// Website redesign (/website-redesign/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="Website redesign" />;
}
