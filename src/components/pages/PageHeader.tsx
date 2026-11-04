import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/page/Breadcrumbs";
import styles from "./Pages.module.scss";

interface PageHeaderProps {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}

// A lighter hero for contact, article and legal pages.
export function PageHeader({ crumbs, eyebrow, title, lead, children }: PageHeaderProps) {
  return (
    <section className={styles.pageHeader} aria-labelledby="page-title" data-fx-parallax="">
      <span className={styles.headerGlow} aria-hidden="true" />
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 id="page-title" className={styles.pageTitle}>
          {title}
        </h1>
        {lead ? <p className={styles.pageLead}>{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
