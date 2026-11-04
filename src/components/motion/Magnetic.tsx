import type { ReactNode } from "react";

// Wraps a button or link so it drifts slightly toward a mouse pointer
// (driven by PointerEffects). Wrapping keeps the button's own hover
// transitions intact.
export function Magnetic({ children }: { children: ReactNode }) {
  return <span data-magnetic="">{children}</span>;
}
