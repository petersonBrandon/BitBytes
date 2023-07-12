import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import NavBtn from "./NavBtn";
import {
  HiOutlineNewspaper,
  HiOutlineQuestionMarkCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi";

const NavBar = () => {
  const spinHover = {
    hover: { rotateZ: 180 },
  };
  const textHover = {
    hover: { translateX: 10 },
  };
  return (
    <div className="w-full bg-gray-700 drop-shadow-xl h-16 flex flex-row justify-center items-center fixed z-50">
      <div className="h-full w-4/5 flex flex-row justify-between items-center">
        <motion.div whileHover="hover">
          <Link href="/" className="flex flex-row items-center">
            <motion.div variants={spinHover}>
              <Image
                src={"/ByteBits Icon.png"}
                alt="Logo Icon"
                width={400}
                height={400}
                className="w-14"
              />
            </motion.div>
            <motion.h1 variants={textHover} className="ml-3 text-xl">
              ByteBits
            </motion.h1>
          </Link>
        </motion.div>
        <div className="h-full w-full flex flex-row justify-end items-center">
          <NavBtn
            title="Articles"
            icon={<HiOutlineNewspaper className="h-16 w-8" />}
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
    </div>
  );
};

export default NavBar;
