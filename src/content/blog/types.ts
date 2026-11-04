export interface BlogSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  after?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  intro: string;
  sections: BlogSection[];
  sources?: { label: string; href: string }[];
  related: string[];
}
