import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("Website development");

// Website development (/website-development/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="Website development" />;
}
