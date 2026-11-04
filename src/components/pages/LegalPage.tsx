import { PageMain } from "@/components/page/PageMain";
import { JsonLd } from "@/components/seo/JsonLd";
import type { LegalDoc } from "@/content/legal";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/seo/structured-data";
import { PageHeader } from "./PageHeader";
import styles from "./Pages.module.scss";

export function LegalPage({ doc, path }: { doc: LegalDoc; path: string }) {
  const crumbs = [{ label: "Home", href: "/" }, { label: doc.title }];

  return (
    <PageMain>
      <JsonLd
        data={graph([breadcrumbSchema(crumbs, path), webPageSchema("WebPage", { name: doc.title, description: doc.description, path })])}
      />
      <PageHeader crumbs={crumbs} eyebrow="Legal" title={doc.title} lead={doc.intro}>
        <p className={styles.meta}>Last updated {doc.updated}</p>
      </PageHeader>
      <section className={styles.sectionTight} aria-label={doc.title}>
        <div className="container">
          <article className={styles.prose}>
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>
        </div>
      </section>
    </PageMain>
  );
}
