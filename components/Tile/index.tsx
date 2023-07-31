import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Tag from "../Tag";

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
      whileHover={{
        boxShadow: " 0px 0px 18px 4px rgba(237, 231, 227, 0.5)",
      }}
      key={slug}
      className="w-2/4 border-2 bg-gray-800 border-white m-4 rounded-lg max-lg:w-full overflow-hidden"
    >
      <Link href={`/${parent}/${slug}`}>
        {image != null ? (
          <div className="h-full max-h-96 w-full overflow-hidden flex flex-col items-center justify-center">
            <img
              src={image}
              alt="showcase_image"
              className="object-cover w-full"
            />
          </div>
        ) : (
          <></>
        )}
        {image_credits_link != null ? (
          <div
            className="w-full pl-5 pr-5 text-right text-xs pt-1"
            onClick={() => window.open(image_credits_link)}
          >
            {image_credits_text}
          </div>
        ) : (
          <></>
        )}
        <section className="flex flex-row justify-between items-start p-5 pb-0 max-lg:flex-col-reverse">
          <div>
            <h1 className="text-3xl mr-4">{title}</h1>
            <h2 className="text-xl mr-4">{subtitle}</h2>
            <p className="mt-2">{`${read_time}`}</p>
          </div>
          <div>{date}</div>
        </section>
        <section className="flex flex-row items-start p-5 flex-wrap w-full">
          {tags.map((tag) => (
            <Tag title={tag} key={tag} />
          ))}
        </section>
      </Link>
    </motion.div>
  );
};

export default Tile;
