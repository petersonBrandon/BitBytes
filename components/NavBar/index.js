import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

const NavBar = () => {
  return (
    <div className="w-full bg-gray-700 shadow-2xl h-16 flex flex-row justify-center items-center">
      <div className="w-4/5 flex flex-row justify-between items-center">
        <motion.div whileHover={{ rotateZ: 180 }}>
          <Link href="/">
            <Image
              src={"/ByteBits Icon.png"}
              width={400}
              height={400}
              className="w-14"
            />
          </Link>
        </motion.div>
        <div className="w-full flex flex-row justify-end items-center">
          {/* <h1 className="m-3 text-white">Today</h1> */}
          {/* <h1 className="m-3 text-white">Today</h1> */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
