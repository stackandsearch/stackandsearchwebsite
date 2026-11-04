import Link from "next/link";
import { PageMain } from "@/components/page/PageMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDate } from "@/content/blog";
import type { BlogPost } from "@/content/blog/types";
import { linkForLabel, type ServiceLink } from "@/content/services";
import { site } from "@/content/site";
import { blogPostingSchema, breadcrumbSchema, graph } from "@/lib/seo/structured-data";
import { PageHeader } from "./PageHeader";
import { CtaBand } from "./parts";
import styles from "./Pages.module.scss";

const anchor = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function BlogPostPage({ post }: { post: BlogPost }) {
  const path = `/blog/${post.slug}/`;
  const crumbs = [{ label: "Home", href: "/" }, { label: "Blog", href: "/blog/" }, { label: post.title }];
  const related = post.related.map((label) => linkForLabel(label)).filter((link): link is ServiceLink => Boolean(link));

  return (
    <PageMain>
      <JsonLd
        data={graph([
          breadcrumbSchema(crumbs, path),
          blogPostingSchema({ title: post.title, description: post.description, path, date: post.date }),
        ])}
      />

      <PageHeader crumbs={crumbs} eyebrow={post.tags.join(" · ")} title={post.title} lead={post.intro}>
        <p className={styles.meta}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingMinutes} min read</span>
          <span>By the {site.name} team</span>
        </p>
      </PageHeader>

      <section className={styles.sectionTight} aria-label="Article">
        <div className={`container ${styles.articleLayout}`}>
          <article className={styles.prose}>
            {post.sections.map((section) => (
              <section key={section.heading} aria-labelledby={anchor(section.heading)}>
                <h2 id={anchor(section.heading)}>{section.heading}</h2>
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
                {section.after?.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </section>
            ))}
            {post.sources && post.sources.length > 0 ? (
              <aside className={styles.sources} aria-label="Sources">
                <h2>Sources</h2>
                <ul>
                  {post.sources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href} target="_blank" rel="noopener noreferrer">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </article>

          <aside className={styles.aside}>
            <nav className={styles.toc} aria-label="On this page">
              <h2>On this page</h2>
              <ol>
                {post.sections.map((section) => (
                  <li key={section.heading}>
                    <a href={`#${anchor(section.heading)}`}>{section.heading}</a>
                  </li>
                ))}
              </ol>
            </nav>
            {related.length > 0 ? (
              <div className={styles.panel}>
                <p className={styles.kicker}>Related services</p>
                <ul className={styles.cardLinks}>
                  {related.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <CtaBand title="Want this done for your website?" text="Start with a free audit of your current site." />
    </PageMain>
  );
}
