import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="z-10 relative w-full text-white bg-moonstone shadow-inner flex flex-col items-center p-9 max-lg:p-3 justify-center">
      <div className="z-0 w-4/5 flex flex-row justify-between max-lg:w-11/12 items-end max-lg:text-sm">
        <div className="flex flex-row justify-center items-center h-full">
          <Image
            src={"/Logo Icon White.png"}
            alt="Logo Icon"
            width={100}
            height={100}
            className="w-16 mr-2"
          />
          <p className="max-lg:mr-1">© 2024 by Stash. All rights reserved.</p>
        </div>
        <div className="flex flex-col justify-center items-end space-y-3">
          <Link
            href="https://github.com/petersonBrandon/BitBytes"
            target="_blank"
            className="hover:opacity-100 ease-in-out duration-300 opacity-70"
          >
            <AiOutlineGithub className="h-8 w-8" />
          </Link>

          <p className="max-lg:text-right max-lg:ml-1">
            Website Crafted by{" "}
            <Link
              href="https://www.brandonpeterson.dev"
              target="_blank"
              className="underline hover:text-orange-500"
            >
              Brandon Peterson
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
