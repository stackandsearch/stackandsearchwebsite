import type { ReactNode } from "react";
import { NavLink } from "@/components/layout/NavLink";
import type { NavLinkItem } from "@/content/navigation";
import styles from "./Button.module.scss";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonLinkProps {
  item: NavLinkItem;
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
}

// A link styled as a button. Primary is the one main action on a screen.
export function ButtonLink({ item, variant = "primary", size = "md", className, children }: ButtonLinkProps) {
  const classes = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ");
  return (
    <NavLink item={item} className={classes}>
      {children ?? item.label}
    </NavLink>
  );
}
