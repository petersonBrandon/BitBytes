import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-gray-700 shadow-inner flex flex-col items-center p-9 max-lg:p-3 justify-center">
      <div className="w-4/5 flex flex-row justify-between max-lg:w-11/12 items-center max-lg:text-sm">
        <p className="max-lg:mr-1">© 2023 by ByteBits. All rights reserved.</p>
        <p className="max-lg:text-right max-lg:ml-1">
          Website Crafted by{" "}
          <Link
            href="https://www.brandonpeterson.dev"
            target="_blank"
            className="underline hover:decoration-dashed hover:text-orange-500"
          >
            Brandon Peterson
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
