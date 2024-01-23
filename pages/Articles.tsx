import Head from "next/head";
import { Tile } from "../components";
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
        <div className="z-0 w-full flex flex-col items-center pt-8 max-lg:w-11/12">
          <div className="w-full flex flex-col items-center">
            <div className="w-full text-3xl border-b-2 border-white pb-5 mb-6 flex flex-row justify-between items-end max-lg:w-11/12">
              <h2 className="flex flex-row items-center justify-center mr-3">
                <HiOutlineNewspaper className="mr-4 max-lg:w-9 max-lg:h-auto" />
                All Articles
              </h2>
              <h3 className="text-2xl mr-5">{`${posts.length}`}</h3>
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
