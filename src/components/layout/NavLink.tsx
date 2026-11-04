import Link from "next/link";
import type { ReactNode } from "react";
import type { NavLinkItem } from "@/content/navigation";

interface NavLinkProps {
  item: NavLinkItem;
  className?: string;
  children?: ReactNode;
}

// Planned routes stay clickable during development but are never prefetched,
// so pages that don't exist yet can't cause background 404 requests.
// The data-route-status attribute lets tests check this.
export function NavLink({ item, className, children }: NavLinkProps) {
  const planned = item.status === "planned";
  return (
    <Link
      href={item.href}
      className={className}
      prefetch={planned ? false : undefined}
      data-route-status={item.status}
    >
      {children ?? item.label}
    </Link>
  );
}
