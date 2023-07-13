import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const NavBtn = (props) => {
  const spinHover = {
    hover: { rotateZ: 360 },
  };
  const textHover = {
    hover: { translateX: 10 },
  };
  return (
    <motion.div
      whileHover="hover"
      className="h-full max-lg:w-full max-lg:h-auto max-lg:border-b-2 border-dashed"
    >
      <Link
        href={`/${props.title}`}
        className="h-full w-full flex flex-row items-center justify-center p-5 max-lg:h-auto max-lg:p-2 max-lg:justify-start"
      >
        <motion.div variants={spinHover}>{props.icon}</motion.div>
        <motion.div variants={textHover} className="ml-3">
          {props.title}
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default NavBtn;
