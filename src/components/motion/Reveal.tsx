"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { watchIntersection } from "@/lib/motion/observer";

type RevealVariant = "up" | "left" | "right" | "scale" | "fade";
type RevealTag = "div" | "li" | "section" | "article" | "header" | "figure" | "span";

interface RevealProps {
  children: ReactNode;
  as?: RevealTag;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  id?: string;
}

// Slides or fades its content in the first time it scrolls into view.
// The content is server-rendered; it is only hidden while JavaScript runs and
// motion is allowed (src/styles/_motion.scss), so crawlers, no-JS visitors
// and reduced-motion users always see it. Don't wrap the page's <h1>.
export function Reveal({ children, as: tag = "div", variant = "up", delay = 0, className, id }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      element.setAttribute("data-visible", "");
      return;
    }
    return watchIntersection(element, (entry) => {
      if (!entry.isIntersecting) return false;
      element.setAttribute("data-visible", "");
      return true;
    });
  }, []);

  const Tag = tag as "div";
  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <Tag ref={ref} id={id} className={className} data-reveal={variant} style={style}>
      {children}
    </Tag>
  );
}
