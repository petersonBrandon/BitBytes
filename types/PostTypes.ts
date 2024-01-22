interface PostType {
  slug: string;
  parent: string;
  title: string;
  subtitle?: string;
  tags: string[];
  date: string;
  author: string;
  read_time: string;
  author_image: string;
  image: string;
  image_credits_text?: string;
  image_credits_link?: string;
  category: string;
}
