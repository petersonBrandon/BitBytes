import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { BiLogoPatreon } from "react-icons/bi";

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
        <div className="z-0 w-4/5 flex flex-col items-center max-lg:w-full max-lg:pt-8">
          <div className="w-3/4 text-4xl pb-5 mb-6 flex flex-row justify-between max-lg:w-11/12">
            <h2>About BitBytes</h2>
          </div>
          <p className="w-3/4 text-xl max-lg:w-11/12">
            {`Welcome to my blog! I\'m `}
            <Link
              href="https://www.brandonpeterson.dev"
              className="underline text-orange-500"
            >
              Brandon Peterson
            </Link>
            , a full-stack developer specializing in web and React Native
            development. Here, I share my insights, discuss various developer
            topics, answer common developer questions, and document my ongoing
            learning journey. Join me as we explore the world of technology,
            learn together, and shape the future of software development.
          </p>
          <div className="w-3/4 text-4xl pb-5 mb-6 mt-16 flex flex-row justify-between max-lg:w-11/12">
            <h2>The Purpose of BitBytes</h2>
          </div>
          <p className="w-3/4 text-xl max-lg:w-11/12">
            {`BitBytes is a platform where I not only express my thoughts, conduct
            research, and share my ideas but also create a learning space for
            others. Through my writings, I aim to not only provide valuable
            literature but also enhance my own understanding by teaching others.
            My ultimate goal is to support fellow developers on their journey
            while ensuring an enjoyable experience for everyone involved. Let\'s
            embark on this enlightening and enjoyable developer adventure
            together!`}
          </p>
          <div className="flex flex-row items-center w-3/4 mt-16 max-lg:w-11/12">
            <div className="w-36 h-36 rounded-full overflow-hidden m-3 max-lg:w-24 max-lg:h-24">
              <Image
                src={"/Brandon.webp"}
                alt={"Brandon Peterson"}
                width={400}
                height={400}
                className="object-cover h-full scale-125"
              />
            </div>
            <div>
              <Link
                href="https://www.brandonpeterson.dev"
                className="underline hover:text-orange-500 text-3xl max-lg:text-lg"
              >
                Brandon Peterson
              </Link>
              <Link
                target="_blank"
                href="https://www.patreon.com/BrandonPeterson/membership"
                className={`flex flex-row items-center justify-start 
                bg-white text-[#FF424D] p-4 text-lg mt-3 
                rounded-xl ring-4 ring-[#FF424D] ring-inset 
                hover:bg-[#FF424D] hover:ring-white hover:text-white 
                ease-in-out duration-200`}
              >
                <BiLogoPatreon className="mr-3 w-10 h-full" />
                Support me on Patreon
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
