import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tag } from "@/components";
import Image from "next/image";
import { BiChevronsRight } from "react-icons/bi";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_new.ico" />
      </Head>
      <main className="w-full flex flex-col items-center mb-16 min-h-screen">
        <div className="w-4/5 flex flex-col items-center mt-16 pt-5">
          <div>
            <Image
              src={"/BitBytes Logo.png"}
              alt="logo"
              width={400}
              height={400}
              className="h-96 w-full"
            />
          </div>
          <section className="w-full flex flex-col items-center pt-5">
            <div className="w-1/2 text-3xl border-b-2 border-white pb-5 mb-6 flex flex-row justify-between">
              <h2>Recent Articles</h2>
              <Link
                href="Articles"
                className="flex flex-row bg-orange-500 p-3 rounded-lg hover:scale-110 ease-in-out duration-200"
              >
                <h3 className="text-lg">All Articles</h3> <BiChevronsRight />
              </Link>
            </div>
            {posts.map((post) => (
              <motion.div
                whileHover={{
                  boxShadow: " 0px 0px 18px 4px rgba(237, 231, 227, 0.5)",
                }}
                key={post.slug}
                className="w-2/4 border-2 border-white m-4 rounded-lg"
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
                  <section className="flex flex-row justify-between items-start p-5 pb-0">
                    <div>
                      <h1 className="text-3xl">{post.title}</h1>
                      <h2 className="text-xl">{post.subtitle}</h2>
                    </div>
                    <div>{post.date}</div>
                  </section>
                  <section className="flex flex-row items-start p-5">
                    {post.tags.map((tag) => (
                      <Tag title={tag} />
                    ))}
                  </section>
                  {/* <div className="flex flex-row items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden m-3">
                    <img
                      src={post.author_image}
                      alt={post.author}
                      className="object-cover h-full"
                    />
                  </div>
                  <div>{post.author}</div>
                </div> */}
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
  const postsDirectory = path.join(process.cwd(), "posts", "Articles");

  const posts = [];

  const folderItems = fs.readdirSync(postsDirectory);

  for (const item of folderItems) {
    const itemPath = path.join(postsDirectory, item);
    const fileContents = fs.readFileSync(itemPath, "utf8");
    const { data } = matter(fileContents);

    posts.push({
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

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (posts.length > 5) {
    const recentPosts = posts.slice(0, 5); // Get the 5 most recent posts
    return {
      props: {
        posts: recentPosts,
      },
    };
  } else {
    return {
      props: {
        posts: posts,
      },
    };
  }
}
