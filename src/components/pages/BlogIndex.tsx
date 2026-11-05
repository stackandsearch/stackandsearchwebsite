import Link from "next/link";
import { PageMain } from "@/components/page/PageMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceGraphic } from "@/components/service/ServiceGraphic";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ArrowIcon } from "@/components/service/ServicePage";
import { blogIndex, formatDate } from "@/content/blog";
import { site } from "@/content/site";
import { getWpPosts } from "@/lib/wordpress";
import { absoluteUrl } from "@/lib/seo/urls";
import { breadcrumbSchema, graph, organizationRef } from "@/lib/seo/structured-data";
import { CtaBand, order, SectionHead } from "./parts";
import styles from "./Pages.module.scss";

const PATH = "/blog/";

export async function BlogIndex() {
  const posts = await getWpPosts();
  const crumbs = [{ label: "Home", href: "/" }, { label: "Blog" }];

  return (
    <PageMain>
      <JsonLd
        data={graph([
          breadcrumbSchema(crumbs, PATH),
          {
            "@type": "Blog",
            "@id": `${absoluteUrl(PATH)}#blog`,
            name: `${site.name} blog`,
            description: blogIndex.seo.description,
            url: absoluteUrl(PATH),
            publisher: organizationRef(),
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: absoluteUrl(`/blog/${post.slug}/`),
              datePublished: post.date,
            })),
          },
        ])}
      />

      <ServiceHero
        eyebrow="Blog"
        title={blogIndex.hero.title}
        accent={blogIndex.hero.accent}
        lead={blogIndex.hero.lead}
        points={blogIndex.hero.points}
        crumbs={crumbs}
        graphic={<ServiceGraphic kind="aeo" />}
        secondaryHref="#articles"
        secondaryLabel="Read the articles"
      />

      <section id="articles" className={styles.section} aria-labelledby="articles-title">
        <div className="container">
          <SectionHead id="articles-title" kicker="Latest" title="Latest articles" />
          {posts.length === 0 ? (
            <p className={styles.muted}>New articles are on their way. Check back soon.</p>
          ) : (
            <ul className={styles.postGrid}>
              {posts.map((post, index) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}/`}
                    className={styles.postCard}
                    data-fx-reveal=""
                    data-fx-spot=""
                    data-fx-tilt="4"
                    style={order(index)}
                  >
                    {post.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.image} alt="" className={styles.postImage} loading="lazy" />
                    ) : null}
                    {post.tags.length > 0 ? (
                      <span className={styles.tags}>
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </span>
                    ) : null}
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <span className={styles.postFoot}>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span>{post.readingMinutes} min read</span>
                      <span className={styles.readMore}>
                        Read article <ArrowIcon />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaBand title="Want this done for your website?" text="Start with a free audit of your current site." />
    </PageMain>
  );
}
