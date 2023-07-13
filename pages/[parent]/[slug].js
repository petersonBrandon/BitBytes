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
import Head from "next/head";

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

const useCodeHighlighting = (codeRef) => {
  useEffect(() => {
    Prism.highlightElement(codeRef.current);
  }, []);
};

const PreComponent = (props) => {
  const language = props.children.props.className?.replace("language-", "");
  const code = props.children.props.children;
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  useCodeHighlighting(codeRef);

  return (
    <>
      <Head>
        <title>{props.frontmatter.title}</title>
        <meta name="description" content={props.frontmatter.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_new.ico" />
      </Head>
      <div className="mt-5 mb-5">
        <div className="flex items-center justify-between bg-gray-800 p-3 rounded-t-lg border-2 border-white border-b-0">
          <span className="text-white font-semibold">
            {language ? language : "Code Block"}
          </span>
          <button
            className="hover:bg-cyan-600 text-white font-semibold py-2 px-2 rounded"
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
  const useCodeHighlighting = (codeRef) => {
    useEffect(() => {
      Prism.highlightElement(codeRef.current);
    }, []);
  };

  const components = {
    h2: (props) => <h1 className="text-3xl mt-5 mb-2" {...props} />,
    ul: (props) => <ul className="m-6 list-disc" {...props} />,
    ol: (props) => <ul className="m-6 list-decimal" {...props} />,
    p: (props) => <p className="indent-8 mt-2 h-auto" {...props} />,
    pre: (props) => <PreComponent {...props} frontmatter={frontmatter} />,
  };

  const { asPath, pathname } = useRouter();

  const pathParts = asPath
    .split("/")
    .filter((part) => part.trim() !== "")
    .map((part) => decodeURIComponent(part));

  return (
    <main className="w-full flex flex-col items-center mb-16">
      <div className="w-2/4 flex flex-col mt-16 pt-5 max-md:w-11/12 max-md:pt-9">
        <div className="flex flex-row items-center mb-5 justify-start max-w-md max-md:text-sm">
          <Link href="/" className="hover:text-orange-500 line-clamp-1">
            Home
          </Link>
          <BiChevronsRight className="h-6 w-16 max-md:w-7" />
          <Link
            href={`/${pathParts[0]}`}
            className="hover:text-orange-500 line-clamp-1"
          >
            {pathParts[0]}
          </Link>
          <BiChevronsRight className="h-6 w-16 max-md:w-7" />
          <Link
            href={`/${pathParts[0]}/${pathParts[1]}`}
            className="hover:text-orange-500 line-clamp-1"
          >
            {pathParts[1]}
          </Link>
        </div>
        <div>
          <h1 className="text-6xl max-md:text-4xl">{frontmatter.title}</h1>
          <h2 className="text-3xl mt-2 max-md:text-xl">
            {frontmatter.subtitle}
          </h2>
          <div className="flex flex-row m-2 items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden m-3 max-md:w-16 max-md:h-16">
              <img
                src={frontmatter.author_image}
                alt={frontmatter.author}
                className="object-cover h-full w-full scale-125"
              />
            </div>
            <div>
              <h2 className="m-2 ml-0 text-2xl max-md:text-lg">
                {frontmatter.author}
              </h2>
              <h2 className="m-2 ml-0">{frontmatter.date}</h2>
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
