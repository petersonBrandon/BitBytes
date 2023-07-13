import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tag } from "@/components";

export default function Questions({ posts }) {
  return (
    <>
      <Head>
        <title>Quesitons</title>
        <meta name="description" content="Questions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_new.ico" />
      </Head>
      <main className="w-full flex flex-col items-center mb-16 min-h-screen">
        <div className="w-4/5 flex flex-col items-center mt-16 pt-5 max-lg:pt-7">
          <div className="w-1/2 text-3xl border-b-2 border-white pb-5 mb-6 flex flex-row justify-between max-lg:w-11/12">
            <h2>All Questions</h2>
          </div>
          {posts.length <= 0 ? (
            <h3 className="text-slate-400">No Questions Currently</h3>
          ) : (
            posts.map((post) => (
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
                      <h1 className="text-3xl">{post.title}</h1>
                      {post.subtitle != null ? (
                        <h2 className="text-xl">{post.subtitle}</h2>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>{post.date}</div>
                  </section>
                  <section className="flex flex-row items-start p-5">
                    {post.tags.map((tag) => (
                      <Tag title={tag} key={tag} />
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
            ))
          )}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "posts", "Questions");

  const posts = [];

  const folderItems = fs.readdirSync(postsDirectory);

  for (const item of folderItems) {
    const itemPath = path.join(postsDirectory, item);
    const fileContents = fs.readFileSync(itemPath, "utf8");
    const { data } = matter(fileContents);

    posts.push({
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

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    props: {
      posts: posts,
    },
  };
}
