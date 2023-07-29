/**
 * Article Types
 */
interface ArticleType {
  slug: string;
  parent: string;
  title: string;
  subtitle: string;
  tags: string[];
  date: string;
  author: string;
  author_image: string;
  image: string;
  image_credits_text?: string;
  image_credits_link?: string;
}

/**
 * Question Types
 */
interface QuestionType {
  slug: string;
  parent: string;
  title: string;
  subtitle?: string;
  tags: string[];
  date: string;
  author: string;
  author_image: string;
  image: string;
  image_credits_text?: string;
  image_credits_link?: string;
}
