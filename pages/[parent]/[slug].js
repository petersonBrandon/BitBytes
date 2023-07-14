import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { MDXProvider } from "@mdx-js/react";
import { ShareBtns, SideBtns, Tag } from "@/components";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiChevronsRight } from "react-icons/bi";
import { BsFillClipboardFill, BsFillClipboardCheckFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import Head from "next/head";
import { useScroll, motion } from "framer-motion";

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const folders = fs.readdirSync(postsDirectory);

  let paths = [];

  for (const folder of folders) {
    const folderPath = path.join(postsDirectory, folder);
    const filenames = fs.readdirSync(folderPath);

    const folderPaths = filenames.map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      return {
        params: {
          parent: folder,
          slug,
        },
      };
    });

    paths = paths.concat(folderPaths);
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug, parent } = params;
  const filePath = path.join(process.cwd(), "posts", parent, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContents);

  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      frontmatter: data,
      mdxSource,
    },
  };
}

const PreComponent = (props) => {
  const language = props.children.props.className?.replace("language-", "");
  const code = props.children.props.children;
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  useEffect(() => {
    Prism.highlightElement(codeRef.current);
  }, []);

  return (
    <>
      <Head>
        <title>{props.frontmatter.title}</title>
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
          content={
            props.frontmatter.image != undefined ? props.frontmatter.image : ""
          }
        />
        {/* <meta
          name="description"
          property="og:description"
          content="BitBytes Developer Blog"
        /> */}
        <meta name="author" content={props.frontmatter.author} />
      </Head>
      <div className="mt-5 mb-5">
        <div className="flex items-center justify-between bg-gray-800 p-3 rounded-t-lg border-2 border-white border-b-0">
          <span className="text-white font-semibold">
            {language ? language : "Code Block"}
          </span>
          <button
            className="text-white font-semibold py-2 px-2 rounded"
            onClick={() => {
              const codeToCopy = props.children.props.children;

              const textarea = document.createElement("textarea");
              textarea.value = codeToCopy;

              document.body.appendChild(textarea);

              textarea.select();
              document.execCommand("copy");

              document.body.removeChild(textarea);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 5000);
            }}
          >
            {!copied ? (
              <BsFillClipboardFill />
            ) : (
              <BsFillClipboardCheckFill className="text-lime-500" />
            )}
          </button>
        </div>
        <pre
          className={`language-${language} bg-slate-900 w-full !border-2 !border-white !border-t-0 rounded-b-lg p-3 font-mono !m-0`}
          ref={codeRef}
        >
          <code>{code}</code>
        </pre>
      </div>
    </>
  );
};

export default function BlogPost({ frontmatter, mdxSource }) {
  const components = {
    h2: (props) => <h1 className="text-4xl mt-5 mb-2 font-bold" {...props} />,
    h3: (props) => <h1 className="text-xl mt-5 mb-2 font-bold" {...props} />,
    ul: (props) => <ul className="m-6 list-disc" {...props} />,
    ol: (props) => <ol className="m-6 list-decimal" {...props} />,
    li: (props) => <li className="mt-2 h-auto text-xl" {...props} />,
    p: (props) => <p className="mt-2 h-auto text-xl" {...props} />,
    pre: (props) => <PreComponent {...props} frontmatter={frontmatter} />,
    img: (props) => <img className="mb-10" {...props} />,
    strong: (props) => (
      <strong className="text-2xl text-orange-500" {...props} />
    ),
    hr: (props) => <hr className="mt-10" {...props} />,
    a: (props) => (
      <a
        className="underline decoration-dashed hover:text-orange-500"
        {...props}
      />
    ),
  };

  const { asPath, pathname } = useRouter();
  const { scrollYProgress } = useScroll();

  const pathParts = asPath
    .split("/")
    .filter((part) => part.trim() !== "")
    .map((part) => decodeURIComponent(part));

  return (
    <main className="w-full flex flex-col items-center mb-16">
      <div className="mt-16 left-0 h-3 fixed w-screen flex flex-col justify-start items-start max-lg:mt-20">
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="w-full h-full bg-gradient-to-r to-orange-600 from-amber-600 origin-left"
        />
      </div>
      <div className="w-2/4 flex flex-col mt-20 pt-5 max-lg:w-11/12 max-lg:pt-9">
        <div className="w-full flex flex-row items-center mb-5 justify-start max-lg:text-sm">
          <Link
            href="/"
            className="hover:text-orange-500 line-clamp-1 min-w-fit"
          >
            Home
          </Link>
          <BiChevronsRight className="h-6 w-6 ml-2 mr-2 max-lg:w-7" />
          <Link
            href={`/${pathParts[0]}`}
            className="hover:text-orange-500 line-clamp-1 min-w-fit"
          >
            {pathParts[0]}
          </Link>
          <BiChevronsRight className="h-6 w-6 ml-2 mr-2 max-lg:w-7 max" />
          <Link
            href={`/${pathParts[0]}/${pathParts[1]}`}
            className="hover:text-orange-500 line-clamp-1 min-w-fit max-lg:min-w-0"
          >
            {pathParts[1]}
          </Link>
        </div>
        <div>
          <h1 className="text-6xl max-lg:text-4xl">{frontmatter.title}</h1>
          <h2 className="text-3xl mt-2 max-lg:text-xl">
            {frontmatter.subtitle}
          </h2>
          <div className="flex flex-row m-2 items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden m-3 max-lg:w-16 max-lg:h-16">
              <img
                src={frontmatter.author_image}
                alt={frontmatter.author}
                className="object-cover h-full w-full scale-125"
              />
            </div>
            <div>
              <h2 className="m-2 ml-0 text-2xl max-lg:text-lg">
                {frontmatter.author}
              </h2>
              <h2 className="m-2 ml-0">{`Last updated ${frontmatter.date}`}</h2>
              {frontmatter.read_time != undefined ? (
                <h3>{`${frontmatter.read_time} read`}</h3>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex flex-row items-start p-5">
            {frontmatter.tags.map((tag) => (
              <Tag title={tag} key={tag} />
            ))}
          </div>
        </div>
        <div className="ml-2 mt-5">
          <MDXProvider components={components}>
            <MDXRemote {...mdxSource} />
          </MDXProvider>
        </div>
        <ShareBtns />
      </div>
    </main>
  );
}
