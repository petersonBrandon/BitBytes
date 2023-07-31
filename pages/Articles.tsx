import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tag, Tile } from "../components";
import { HiOutlineNewspaper } from "react-icons/hi";
import React from "react";
import { getArticles } from "../utils/getPosts";

export default function Articles({ posts }) {
  return (
    <>
      <Head>
        <title>Articles</title>
        <meta name="description" content="Articles" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_new.ico" />
      </Head>
      <main className="w-full flex flex-col items-center mb-16 min-h-screen">
        <div className="z-0 w-4/5 flex flex-col items-center max-lg:pt-8 max-lg:w-11/12">
          <div className="w-1/2 text-3xl border-b-2 border-white pb-5 mb-6 flex flex-row justify-between max-lg:w-11/12">
            <h2 className="flex flex-row items-center justify-center mr-3">
              <HiOutlineNewspaper className="mr-4 max-lg:w-9 max-lg:h-auto" />
              All Articles
            </h2>
          </div>
          {posts.map((post) => (
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
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const articles = (await getArticles(true)).articles;

  return {
    props: {
      posts: articles,
    },
  };
}
