import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import { BiChevronsRight } from "react-icons/bi";
import {
  HiOutlineNewspaper,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";
import React from "react";
import { Tile } from "../components";
import { getArticles, getQuestions } from "../utils/getPosts";

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
          content="BitBytes Developer Blog"
        />
        <meta property="og:type" content="Website" />
        <meta
          name="image"
          property="og:image"
          content="https://blog.brandonpeterson.dev/Logo Solid Wide.png"
        />
        {/* <meta
          name="description"
          property="og:description"
          content="BitBytes Developer Blog"
        /> */}
        <meta name="author" content="Brandon Peterson" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@DevBrandon318" />
        <meta name="twitter:title" content="BitBytes Developer Blog" />
        {/* <meta name="twitter:description" content="View the album on Flickr." /> */}
        <meta
          name="twitter:image"
          content="https://blog.brandonpeterson.dev/Logo Solid Wide.png"
        />
      </Head>
      <main className="w-full flex flex-col items-center mb-16 min-h-screen">
        <div className="z-0 w-4/5 flex flex-col items-center max-lg:w-11/12">
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
              <Tile
                key={post.slug}
                slug={post.slug}
                title={post.title}
                subtitle={post.subtitle}
                parent={post.parent}
                date={post.date}
                image={post.image}
                tags={post.tags}
                read_time={post.read_time}
                image_credits_link={post.image_credits_link}
                image_credits_text={post.image_credits_text}
              />
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
              <Tile
                key={post.slug}
                slug={post.slug}
                title={post.title}
                parent={post.parent}
                date={post.date}
                image={post.image}
                tags={post.tags}
                read_time={post.read_time}
                image_credits_link={post.image_credits_link}
                image_credits_text={post.image_credits_text}
              />
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  // await generateRssFeed();

  const articles = (await getArticles(false)).articles;
  const questions = (await getQuestions(false)).questions;
  return {
    props: {
      articles: articles,
      questions: questions,
    },
  };
}
