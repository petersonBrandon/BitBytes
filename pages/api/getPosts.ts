import { getArticles, getNews, getQuestions } from "../../utils/getPosts";

export default async function GET(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://www.brandonpeterson.dev"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  try {
    const articles = await getArticles(true);
    const questions = await getQuestions(true);
    const news = await getNews(true);

    const allPosts = [
      ...articles.articles,
      ...questions.questions,
      ...news.news,
    ];

    allPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const query = req.query;
    const { count } = query;

    if (count != undefined) {
      const requestedPosts = [];
      for (let i = 0; i < count && i < allPosts.length; i++) {
        requestedPosts.push(allPosts[i]);
      }
      res.status(200).json({ posts: requestedPosts });
    } else {
      res.status(200).json({
        articles: articles.articles,
        questions: questions.questions,
        news: news.news,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
