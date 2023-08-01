import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getArticles = async (all: boolean) => {
  const articlesDirectory = path.join(process.cwd(), "posts", "Articles");

  const articles: ArticleType[] = [];

  const articleItems = fs.readdirSync(articlesDirectory);

  for (const item of articleItems) {
    const itemPath = path.join(articlesDirectory, item);
    const fileContents = fs.readFileSync(itemPath, "utf8");
    const { data } = matter(fileContents);

    articles.push({
      slug: path.basename(item, path.extname(item)),
      parent: "Articles",
      title: data.title,
      subtitle: data.subtitle,
      tags: data.tags,
      date: data.date,
      read_time: data.read_time,
      author: data.author,
      author_image: data.author_image,
      image: data.image != undefined ? data.image : null,
      image_credits_text:
        data.image_credits_text != undefined ? data.image_credits_text : null,
      image_credits_link:
        data.image_credits_link != undefined ? data.image_credits_link : null,
    });
  }

  articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let recentArticles = articles;

  if (articles.length > 3 && !all) {
    recentArticles = recentArticles.slice(0, 3);
  }

  return { articles: recentArticles };
};

export const getQuestions = async (all: boolean) => {
  const questionsDirectory = path.join(process.cwd(), "posts", "Questions");

  const questions: QuestionType[] = [];

  const questionItems = fs.readdirSync(questionsDirectory);

  for (const item of questionItems) {
    const itemPath = path.join(questionsDirectory, item);
    const fileContents = fs.readFileSync(itemPath, "utf8");
    const { data } = matter(fileContents);

    questions.push({
      slug: path.basename(item, path.extname(item)),
      parent: "Questions",
      title: data.title,
      subtitle: data.subtitle != undefined ? data.subtitle : null,
      tags: data.tags,
      date: data.date,
      author: data.author,
      read_time: data.read_time,
      author_image: data.author_image,
      image: data.image != undefined ? data.image : null,
      image_credits_text:
        data.image_credits_text != undefined ? data.image_credits_text : null,
      image_credits_link:
        data.image_credits_link != undefined ? data.image_credits_link : null,
    });
  }

  questions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let recentQuestions = questions;

  if (questions.length > 3 && !all) {
    recentQuestions = recentQuestions.slice(0, 3);
  }
  return { questions: recentQuestions };
};
