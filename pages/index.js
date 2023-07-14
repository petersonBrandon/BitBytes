import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tag } from "@/components";
import Image from "next/image";
import { BiChevronsRight } from "react-icons/bi";
import {
  HiOutlineNewspaper,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";
// import generateRssFeed from "@/utils/generateRSSFeed";

export default function Home({ articles, questions }) {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_new.ico" />
        <meta
          name="title"
          property="og:title"
          content="BitByte Developer Blog"
        />
        <meta property="og:type" content="Website" />
        <meta
          name="image"
          property="og:image"
          content="../public/Logo Solid Wide.png"
        />
        {/* <meta
          name="description"
          property="og:description"
          content=""
        /> */}
        <meta name="author" content="Brandon Peterson" />
      </Head>
      <main className="w-full flex flex-col items-center mb-16 min-h-screen">
        <div className="w-4/5 flex flex-col items-center mt-16 pt-5 max-lg:w-11/12">
          <div>
            <Image
              src={"/BitBytes Logo.png"}
              alt="logo"
              width={400}
              height={400}
              className="h-96 w-full max-lg:h-72"
            />
          </div>
          <section className="w-full flex flex-col items-center pt-5">
            <div className="w-1/2 text-3xl border-b-2 border-white pb-5 mb-6 flex flex-row justify-between max-lg:w-11/12 max-lg:text-xl items-center">
              <h2 className="flex flex-row items-center justify-center mr-3">
                <HiOutlineNewspaper className="mr-4 max-lg:w-9 max-lg:h-auto" />
                Recent Articles
              </h2>
              <Link
                href="Articles"
                className="flex flex-row w-1/2 bg-orange-500 justify-center items-center p-3 rounded-lg hover:scale-110 ease-in-out duration-200"
              >
                <h3 className="text-lg">All Articles</h3>
                <BiChevronsRight className="max-lg:hidden" />
              </Link>
            </div>
            {articles.map((post) => (
              <motion.div
                whileHover={{
                  boxShadow: " 0px 0px 18px 4px rgba(237, 231, 227, 0.5)",
                }}
                key={post.slug}
                className="w-2/4 border-2 border-white m-4 rounded-lg max-lg:w-full overflow-hidden"
              >
                <Link href={`/${post.parent}/${post.slug}`}>
                  {post.image != null ? (
                    <div className="h-full max-h-96 w-full overflow-hidden flex flex-col items-center justify-center">
                      <img
                        src={post.image}
                        alt="showcase_image"
                        className="object-cover w-full"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  <section className="flex flex-row justify-between items-start p-5 pb-0 max-lg:flex-col-reverse">
                    <div>
                      <h1 className="text-3xl mr-4">{post.title}</h1>
                      <h2 className="text-xl mr-4">{post.subtitle}</h2>
                    </div>
                    <div>{post.date}</div>
                  </section>
                  <section className="flex flex-row items-start p-5 flex-wrap w-full">
                    {post.tags.map((tag) => (
                      <Tag title={tag} key={tag} />
                    ))}
                  </section>
                </Link>
              </motion.div>
            ))}
          </section>
          <section className="w-full flex flex-col items-center pt-5 mt-10">
            <div className="w-1/2 text-3xl border-b-2 border-white pb-5 mb-6 flex flex-row justify-between max-lg:w-11/12 max-lg:text-xl items-center">
              <h2 className="flex flex-row items-center justify-center mr-3">
                <HiOutlineQuestionMarkCircle className="mr-4 max-lg:w-9 max-lg:h-auto" />
                Recent Questions
              </h2>
              <Link
                href="Questions"
                className="flex flex-row w-1/2 bg-orange-500 justify-center items-center p-3 rounded-lg hover:scale-110 ease-in-out duration-200"
              >
                <h3 className="text-lg">All Questions</h3>
                <BiChevronsRight className="max-lg:hidden" />
              </Link>
            </div>
            {questions.map((post) => (
              <motion.div
                whileHover={{
                  boxShadow: " 0px 0px 18px 4px rgba(237, 231, 227, 0.5)",
                }}
                key={post.slug}
                className="w-2/4 border-2 border-white m-4 rounded-lg max-lg:w-full"
              >
                <Link href={`/${post.parent}/${post.slug}`}>
                  {post.image != null ? (
                    <div className="h-full max-h-96 w-full overflow-hidden flex flex-col items-center justify-center">
                      <img
                        src={post.image}
                        alt="showcase_image"
                        className="object-cover w-full"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  <section className="flex flex-row justify-between items-start p-5 pb-0 max-lg:flex-col-reverse">
                    <div>
                      <h1 className="text-3xl mr-4">{post.title}</h1>
                      <h2 className="text-xl">{post.subtitle}</h2>
                    </div>
                    <div>{post.date}</div>
                  </section>
                  <section className="flex flex-row items-start p-5 flex-wrap w-full">
                    {post.tags.map((tag) => (
                      <Tag title={tag} key={tag} />
                    ))}
                  </section>
                </Link>
              </motion.div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  // await generateRssFeed();

  const articlesDirectory = path.join(process.cwd(), "posts", "Articles");
  const questionsDirectory = path.join(process.cwd(), "posts", "Questions");

  const articles = [];
  const questions = [];

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
      author: data.author,
      author_image: data.author_image,
      image: data.image !== undefined ? data.image : null,
    });
  }

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
      author_image: data.author_image,
      image: data.image != undefined ? data.image : null,
    });
  }

  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  questions.sort((a, b) => new Date(b.date) - new Date(a.date));

  let recentArticles = articles;
  let recentQuestions = questions;

  if (articles.length > 5) {
    recentArticles = recentArticles.slice(0, 5);
  }
  if (questions.length > 5) {
    recentQuestions = recentQuestions.slice(0, 5);
  }
  return {
    props: {
      articles: recentArticles,
      questions: recentQuestions,
    },
  };
}
