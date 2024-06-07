import fs from "fs";
import { Feed } from "feed";
import matter from "gray-matter";
import path from "path";

const getArticlesForRSS = async () => {
  const postsDirectory = path.join(process.cwd(), "posts", "Articles");

  const posts = [];

  const folderItems = fs.readdirSync(postsDirectory);

  for (const item of folderItems) {
    const itemPath = path.join(postsDirectory, item);
    const fileContents = fs.readFileSync(itemPath, "utf8");
    const { data } = matter(fileContents);

    posts.push({
      slug: path.basename(item, path.extname(item)),
      parent: "Articles",
      title: data.title,
      subtitle: data.subtitle,
      tags: data.tags,
      date: data.date,
      author: data.author,
      author_image: data.author_image,
      image: data.image !== undefined ? data.image : null,
    });
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
};

export default async function generateRssFeed() {
  const allPosts = await getArticlesForRSS();
  const site_url = "blog.brandonpeterson.dev";
  const date = new Date();
  const author = {
    name: "Brandon Peterson",
  };

  const feedOptions = {
    title: "Stash Developer Blog",
    description: "",
    id: site_url,
    link: site_url,
    image: `${site_url}/logo.png`,
    favicon: `${site_url}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Ibas`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${site_url}/rss.xml`,
    },
  };

  const feed = new Feed(feedOptions);

  allPosts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${site_url}/Articles/${post.slug}`,
      link: `${site_url}/Articles/${post.slug}`,
      date: new Date(post.date),
      author: [author],
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.rss2());
}
