import { useRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from "react-share";

import { BsFacebook, BsTwitter, BsLinkedin, BsReddit } from "react-icons/bs";

const ShareBtns = () => {
  const { asPath, pathname } = useRouter();
  const url = `blog.brandonpeterson.dev${asPath}`;
  return (
    <div className="border-2 border-white rounded-lg p-5 mt-20 w-full text-center">
      <h4 className="text-lg">Share this article</h4>
      <div className="flex flex-row items-center justify-center w-full mt-5">
        <FacebookShareButton url={url}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-sky-800 p-2 flex flex-row items-center rounded-lg ml-2 mr-2"
          >
            <BsFacebook className="w-8 h-auto" />
            <div className="ml-2">Facebook</div>
          </motion.div>
        </FacebookShareButton>
        <LinkedinShareButton url={url}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-cyan-600 p-2 flex flex-row items-center rounded-lg ml-2 mr-2"
          >
            <BsLinkedin className="w-8 h-auto" />
            <div className="ml-2">LinkedIn</div>
          </motion.div>
        </LinkedinShareButton>
        <RedditShareButton url={url}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-orange-500 p-2 flex flex-row items-center rounded-lg ml-2 mr-2"
          >
            <BsReddit className="w-8 h-auto" />
            <div className="ml-2">Reddit</div>
          </motion.div>
        </RedditShareButton>
        <TwitterShareButton url={url}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-cyan-500 p-2 flex flex-row items-center rounded-lg ml-2 mr-2"
          >
            <BsTwitter className="w-8 h-auto" />
            <div className="ml-2">Twitter</div>
          </motion.div>
        </TwitterShareButton>
      </div>
    </div>
  );
};

export default ShareBtns;
