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
  HiOutlineSpeakerphone,
} from "react-icons/hi";
import React from "react";
import { Tile } from "../components";
import { getArticles, getNews, getQuestions } from "../utils/getPosts";

export default function Home({ articles, questions, news }) {
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
      <main className="w-full flex flex-col items-center mb-16 min-h-screen text-black">
        <div className="z-0 w-full flex flex-col items-center max-lg:w-11/12">
          <div>
            <Image
              src={"/Logo.png"}
              alt="logo"
              width={400}
              height={400}
              className="w-30 my-32"
            />
          </div>
          <section className="w-full flex flex-col items-center pt-5">
            <div className="w-full text-3xl border-b-2 border-oxford-blue pb-5 mb-6 flex flex-row max-lg:flex-col max-lg:space-y-3 justify-between max-lg:w-11/12 max-lg:text-xl items-center">
              <h2 className="flex flex-row items-center justify-center mr-3">
                <HiOutlineNewspaper className="mr-4 max-lg:w-14 max-lg:h-auto" />
                Recent Articles
              </h2>
              <Link
                href="Articles"
                className="flex flex-row w-1/5 bg-dark-green text-white max-lg:w-full justify-center items-center p-3 rounded-lg hover:bg-dark-green-light ease-in-out duration-300 group"
              >
                <h3 className="text-lg">All Articles</h3>
                <BiChevronsRight className="max-lg:hidden group-hover:translate-x-3 ease-in-out duration-300" />
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
          <section className="w-full flex flex-col items-center pt-5">
            <div className="w-full text-3xl border-b-2 border-oxford-blue pb-5 mb-6 flex flex-row max-lg:flex-col max-lg:space-y-3 justify-between max-lg:w-11/12 max-lg:text-xl items-center">
              <h2 className="flex flex-row items-center justify-center mr-3">
                <HiOutlineSpeakerphone className="mr-4 max-lg:w-14 max-lg:h-auto" />
                Recent News
              </h2>
              <Link
                href="News"
                className="flex flex-row w-1/5 bg-dark-green text-white max-lg:w-full justify-center items-center p-3 rounded-lg hover:bg-dark-green-light ease-in-out duration-300 group"
              >
                <h3 className="text-lg">All News</h3>
                <BiChevronsRight className="max-lg:hidden group-hover:translate-x-3 ease-in-out duration-300" />
              </Link>
            </div>
            {news.map((post) => (
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
            <div className="w-full text-3xl border-b-2 border-oxford-blue pb-5 mb-6 flex flex-row max-lg:flex-col max-lg:space-y-3 justify-between max-lg:w-11/12 max-lg:text-xl items-center">
              <h2 className="flex flex-row items-center justify-center mr-3">
                <HiOutlineQuestionMarkCircle className="mr-4 max-lg:w-14 max-lg:h-auto" />
                Recent Questions
              </h2>
              <Link
                href="Questions"
                className="flex flex-row w-1/5 bg-dark-green text-white max-lg:w-full justify-center items-center p-3 rounded-lg hover:bg-dark-green-light ease-in-out duration-300 group"
              >
                <h3 className="text-lg">All Questions</h3>
                <BiChevronsRight className="max-lg:hidden group-hover:translate-x-3 ease-in-out duration-300" />
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
  const news = (await getNews(false)).news;
  return {
    props: {
      articles: articles,
      questions: questions,
      news: news,
    },
  };
}
