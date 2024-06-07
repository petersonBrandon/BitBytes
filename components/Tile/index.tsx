import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Tag from "../Tag";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

interface TileTypes {
  slug: string;
  parent: string;
  title: string;
  subtitle?: string;
  date: string;
  image: string;
  tags: string[];
  read_time: string;
  image_credits_link?: string;
  image_credits_text?: string;
}

const Tile: React.FC<TileTypes> = ({
  slug,
  parent,
  title,
  subtitle,
  image,
  date,
  tags,
  read_time,
  image_credits_link,
  image_credits_text,
  ...props
}) => {
  return (
    <motion.div
      // whileHover={{
      //   boxShadow: " 0px 0px 18px 4px rgba(237, 231, 227, 0.5)",
      // }}
      key={slug}
      className="w-full text-black m-4 max-lg:w-full overflow-hidden group"
    >
      <Link href={`/${parent}/${slug}`} className="flex max-lg:flex-col">
        {image != null ? (
          <div className="w-2/5 rounded-lg overflow-hidden flex flex-col items-center justify-center max-lg:w-full aspect-video">
            <img
              src={image}
              alt="showcase_image"
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <></>
        )}
        <section className="flex justify-between items-start p-5 w-full">
          <div className="space-y-3 flex flex-col justify-between items-start h-full">
            <div className="flex justify-between w-full max-lg:flex-col max-lg:space-y-3">
              <div className="space-y-2">
                <h1 className="text-2xl">{title}</h1>
                <p className="text-sm opacity-70">{`${read_time} - ${date}`}</p>
                <h2 className="text-md">{subtitle}</h2>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex flex-row items-start flex-wrap w-full max-lg:pt-5">
                {tags.map((tag) => (
                  <Tag title={tag} key={tag} />
                ))}
              </div>
              {image_credits_link != null ? (
                <div
                  className="w-2/5 pl-5 pr-5 text-right text-xs pt-1"
                  onClick={() => window.open(image_credits_link)}
                >
                  {image_credits_text}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="opacity-0 mr-5 -translate-x-12 group-hover:-translate-x-0 group-hover:opacity-100 ease-in-out duration-300 h-full flex justify-center items-center max-lg:hidden">
            <HiOutlineArrowNarrowRight className="w-10 h-10" />
          </div>
        </section>
      </Link>
    </motion.div>
  );
};

export default Tile;
