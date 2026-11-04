import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("Speed optimisation");

// Speed optimisation (/website-speed-optimization/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="Speed optimisation" />;
}
