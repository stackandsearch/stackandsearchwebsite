import Link from "next/link";
import styles from "./Pages.module.scss";

export interface BlogRowPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
  readingMinutes: number;
  category: { name: string; slug: string } | null;
}

// One article in a list: date and reading time, title, excerpt, "Read article".
export function BlogRow({ post, showCategory, level }: { post: BlogRowPost; showCategory: boolean; level: 2 | 3 }) {
  const Heading = level === 3 ? "h3" : "h2";
  return (
    <Link href={`/blog/${post.slug}/`} className={styles.postRow}>
      <span className={styles.postMeta}>
        {showCategory && post.category ? <span className={styles.postCategory}>{post.category.name}</span> : null}
        <time dateTime={post.date}>{post.dateLabel}</time>
        <span>{post.readingMinutes} min read</span>
      </span>
      <span className={styles.postText}>
        <Heading className={styles.postTitle}>{post.title}</Heading>
        <span className={styles.postExcerpt}>{post.description}</span>
        <span className={styles.readMore}>
          Read article
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    </Link>
  );
}
