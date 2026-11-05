import Link from "next/link";
import type { CSSProperties } from "react";
import { formatDate } from "@/content/blog";
import type { WpPost } from "@/lib/wordpress";
import styles from "./Pages.module.scss";

// One article card: featured image (or placeholder), date and reading time,
// title, excerpt, "Read article".
export function BlogCard({
  post,
  showCategory,
  level,
  index,
}: {
  post: WpPost;
  showCategory: boolean;
  level: 2 | 3;
  index: number;
}) {
  const Heading = level === 3 ? "h3" : "h2";
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className={styles.postCard}
      data-fx-reveal=""
      data-fx-spot=""
      data-fx-tilt="3"
      style={{ "--i": index } as CSSProperties}
    >
      {post.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image.url}
          alt=""
          width={post.image.width || undefined}
          height={post.image.height || undefined}
          loading={index < 3 ? "eager" : "lazy"}
          className={styles.postImage}
        />
      ) : (
        <span className={styles.postPlaceholder} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" />
            <path d="M3 12l9 4.5 9-4.5" />
            <path d="M3 16.5L12 21l9-4.5" />
          </svg>
        </span>
      )}
      <span className={styles.cardMeta}>
        {showCategory && post.category ? <span className={styles.postCategory}>{post.category.name}</span> : null}
        <time dateTime={post.publishedAt}>{formatDate(post.date)}</time>
        <span aria-hidden="true">•</span>
        <span>{post.readingMinutes} min read</span>
      </span>
      <Heading className={styles.cardTitle}>{post.title}</Heading>
      <span className={styles.cardExcerpt}>{post.excerpt}</span>
      <span className={styles.readMore}>
        Read article
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
