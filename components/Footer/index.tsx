import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="z-10 relative w-full bg-moonstone bg-opacity-50 backdrop-blur-sm shadow-inner flex flex-col items-center p-9 max-lg:p-3 justify-center">
      <div className="z-0 w-4/5 flex flex-row justify-between max-lg:w-11/12 items-center max-lg:text-sm">
        <div className="flex flex-row justify-center items-center">
          <Image
            src={"/ByteBits Icon.png"}
            alt="Logo Icon"
            width={100}
            height={100}
            className="w-14 mr-4"
          />
          <p className="max-lg:mr-1">
            © 2023 by BitBytes. All rights reserved.
          </p>
        </div>
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
  );
};

export default Footer;
