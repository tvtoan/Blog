import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { ImInstagram } from "react-icons/im";
import { AiFillTikTok } from "react-icons/ai";

import DividerIcon from "./DividerIcon";
import { montserrat } from "@/lib/font";

const Title = () => {
  return (
    <div
      className={`text-center mt-10  bg-white text-black p-5 ${montserrat.className}`}
    >
      <h1 className="text-[4rem]  m-0 -mb-2">
        <Link href="/" className="text-black no-underline">
          LEMONARI
        </Link>
      </h1>
      <DividerIcon size={300} />

      <div className="flex justify-center space-x-4 mb-8 mt-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoLogoFacebook className="text-black  hover:text-[#f1c40f] transition-colors text-xl" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <AiFillTikTok className="text-black hover:text-[#f1c40f] transition-colors text-xl" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImInstagram className="text-black hover:text-[#f1c40f] transition-colors text-xl scale-[0.8]" />{" "}
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="text-black hover:text-[#f1c40f] transition-colors text-xl" />
        </a>
      </div>
    </div>
  );
};

export default Title;
