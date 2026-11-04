import type { ReactNode } from "react";
import { Interactions } from "@/components/motion/Interactions";

// The root layout already provides <main>. Mounts the interaction engine
// (reveals, spotlight, tilt, magnetic, parallax) for inner pages.
export function PageMain({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Interactions />
    </>
  );
}
