import type { ReactNode } from "react";
import { RouteTransition } from "@/components/motion/RouteTransition";

// Next.js re-mounts this on every navigation, which drives the page-enter
// animation in RouteTransition.
export default function Template({ children }: { children: ReactNode }) {
  return <RouteTransition>{children}</RouteTransition>;
}
