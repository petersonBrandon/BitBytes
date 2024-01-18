import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tile } from "../components";
import { getNews } from "../utils/getPosts";

const News = ({ posts }) => {
  return (
    <>
      <Head>
        <title>News</title>
        <meta name="description" content="About" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_new.ico" />
      </Head>
      <main className="w-full flex flex-col items-center mb-16 min-h-screen">
        <div className="z-0 w-4/5 flex flex-col items-center max-lg:w-full max-lg:pt-8">
          <div className="w-1/2 text-3xl border-b-2 border-white pb-5 mb-6 flex flex-row justify-between items-end max-lg:w-11/12">
            <h2 className="flex flex-row items-center justify-center mr-3">
              {/* <HiOutlineNewspaper className="mr-4 max-lg:w-9 max-lg:h-auto" /> */}
              All News
            </h2>
            {/* <h3 className="text-2xl mr-5">{`${posts.length}`}</h3> */}
          </div>
          {posts != undefined ? (
            posts.map((post) => (
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
            ))
          ) : (
            <div>No News Currently</div>
          )}
        </div>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const news = (await getNews(true)).news;

  return {
    props: {
      posts: news,
    },
  };
}

export default News;
