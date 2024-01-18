import { useRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from "react-share";

import { BsFacebook, BsTwitterX, BsLinkedin, BsReddit } from "react-icons/bs";

const ShareBtns = () => {
  const { asPath, pathname } = useRouter();
  const route = asPath
    .split("/")
    .filter((part) => part.trim() !== "")
    .map((part) => decodeURIComponent(part));
  const url = `https://blog.brandonpeterson.dev${asPath}`;
  return (
    <div className="border-2 border-white rounded-lg p-5 mt-20 w-full text-center">
      <h4 className="text-2xl text-left ml-2">
        Know someone who might enjoy this?
      </h4>
      <div className="flex flex-row items-center justify-center w-full mt-5 max-lg:flex-col">
        <FacebookShareButton url={url} className="w-full">
          <motion.div className="bg-sky-800 p-2 flex flex-row items-center rounded-lg ml-2 mr-2 justify-center max-lg:m-2 hover:bg-sky-600 ease-in-out duration-300">
            <BsFacebook className="w-8 h-auto" />
            <div className="ml-2">Facebook</div>
          </motion.div>
        </FacebookShareButton>
        <LinkedinShareButton url={url} title={route[1]} className="w-full">
          <motion.div className="bg-cyan-600 p-2 flex flex-row items-center rounded-lg ml-2 mr-2  justify-center max-lg:m-2 hover:bg-cyan-800 ease-in-out duration-300">
            <BsLinkedin className="w-8 h-auto" />
            <div className="ml-2">LinkedIn</div>
          </motion.div>
        </LinkedinShareButton>
        <RedditShareButton url={url} className="w-full">
          <motion.div className="bg-orange-500 p-2 flex flex-row items-center rounded-lg ml-2 mr-2  justify-center max-lg:m-2 hover:bg-orange-700 ease-in-out duration-300">
            <BsReddit className="w-8 h-auto" />
            <div className="ml-2">Reddit</div>
          </motion.div>
        </RedditShareButton>
        <TwitterShareButton url={url} className="w-full">
          <motion.div className="bg-black p-2 flex flex-row items-center rounded-lg ml-2 mr-2  justify-center max-lg:m-2 hover:bg-slate-900 ease-in-out duration-300">
            <BsTwitterX className="w-8 h-auto" />
          </motion.div>
        </TwitterShareButton>
      </div>
    </div>
  );
};

export default ShareBtns;
