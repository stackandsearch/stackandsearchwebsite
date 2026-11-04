import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("WordPress development");

// WordPress development (/wordpress-development/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="WordPress development" />;
}
