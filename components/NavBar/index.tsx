import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useState } from "react";
import NavBtn from "./NavBtn";
import {
  HiOutlineNewspaper,
  HiOutlineQuestionMarkCircle,
  HiOutlineInformationCircle,
  HiOutlineSpeakerphone,
} from "react-icons/hi";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { AiOutlineGithub } from "react-icons/ai";

const NavBar = () => {
  const spinHover = {
    hover: { rotateZ: 180 },
  };
  const textHover = {
    hover: { translateX: 10 },
  };

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <div className="bg-moonstone text-white t-0 w-full h-20 z-50 max-lg:flex flex-row-reverse justify-center items-center hidden max-lg:fixed">
        <div className="w-11/12 h-20 z-50 flex flex-row-reverse justify-between items-center">
          <div
            className="p-3 text-white"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            {mobileNavOpen ? (
              <IoMdClose className="h-8 w-auto" />
            ) : (
              <IoMdMenu className="h-8 w-auto" />
            )}
          </div>
          <Link href="/" className="flex flex-row items-center">
            <motion.div variants={spinHover}>
              <Image
                src={"/Logo Icon White.png"}
                alt="Logo Icon"
                width={400}
                height={400}
                className="w-14"
              />
            </motion.div>
          </Link>
        </div>
      </div>
      <motion.div
        transition={{ bounce: false }}
        className={`w-full bg-moonstone drop-shadow-xl h-16 flex 
        flex-row justify-center items-center fixed z-40 max-lg:h-screen max-lg:pt-16 ${
          mobileNavOpen
            ? "max-lg:-translate-y-0"
            : "max-lg:-translate-y-y-complete"
        } ease-in-out duration-300`}
      >
        <div className="h-full w-4/5 flex flex-row justify-between items-center max-lg:flex-col ">
          <motion.div
            // whileHover="hover"
            className="max-lg:hidden"
          >
            <Link href="/" className="flex flex-row items-center">
              <motion.div variants={spinHover}>
                <Image
                  src={"/Logo White.png"}
                  alt="Logo Icon"
                  width={400}
                  height={400}
                  className="w-24"
                />
              </motion.div>
            </Link>
          </motion.div>
          <div
            onClick={() => setMobileNavOpen(false)}
            className="h-full w-full flex flex-row justify-end items-center max-lg:flex-col max-lg:justify-start max-lg:mt-6"
          >
            <NavBtn
              title="Articles"
              icon={<HiOutlineNewspaper className="h-16 w-8" />}
            />
            <NavBtn
              title="News"
              icon={<HiOutlineSpeakerphone className="h-16 w-8" />}
            />
            <NavBtn
              title="Questions"
              icon={<HiOutlineQuestionMarkCircle className="h-16 w-8" />}
            />
            <NavBtn
              title="About"
              icon={<HiOutlineInformationCircle className="h-16 w-8" />}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default NavBar;
