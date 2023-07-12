import Head from "next/head";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tag } from "@/components";
import Image from "next/image";

export default function About() {
  return (
    <>
      <Head>
        <title>About BitBytes</title>
        <meta name="description" content="About" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_new.ico" />
      </Head>
      <main className="w-full flex flex-col items-center mb-16 min-h-screen">
        <div className="w-4/5 flex flex-col items-center mt-16 pt-7">
          <div className="w-3/4 text-4xl pb-5 mb-6 flex flex-row justify-between">
            <h2>About BitBytes</h2>
          </div>
          <p className="w-3/4 text-xl">
            {`Welcome to my blog! I\'m `}
            <Link
              href="https://www.brandonpeterson.dev"
              className="underline hover:decoration-dashed text-orange-500"
            >
              Brandon Peterson
            </Link>
            , a full-stack developer specializing in web and React Native
            development. Here, I share my insights, discuss various developer
            topics, answer common developer questions, and document my ongoing
            learning journey. Join me as we explore the world of technology,
            learn together, and shape the future of software development.
          </p>
          <div className="w-3/4 text-4xl pb-5 mb-6 mt-16 flex flex-row justify-between">
            <h2>The Purpose of BitBytes</h2>
          </div>
          <p className="w-3/4 text-xl">
            {`BitBytes is a platform where I not only express my thoughts, conduct
            research, and share my ideas but also create a learning space for
            others. Through my writings, I aim to not only provide valuable
            literature but also enhance my own understanding by teaching others.
            My ultimate goal is to support fellow developers on their journey
            while ensuring an enjoyable experience for everyone involved. Let\'s
            embark on this enlightening and enjoyable developer adventure
            together!`}
          </p>
          <div className="flex flex-row items-center w-3/4 mt-16">
            <div className="w-36 h-36 rounded-full overflow-hidden m-3">
              <img
                src={
                  "https://firebasestorage.googleapis.com/v0/b/level-up-gt-479b6.appspot.com/o/Brandon%20Peterson.jpg?alt=media&token=4671c1de-aece-4de9-bb26-db18d3b02e8d"
                }
                alt={"Brandon Peterson"}
                // width={400}
                // height={400}
                className="object-cover h-full translate-y-0"
              />
            </div>
            <Link
              href="https://www.brandonpeterson.dev"
              className="underline hover:decoration-dashed hover:text-orange-500 text-3xl"
            >
              Brandon Peterson
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
