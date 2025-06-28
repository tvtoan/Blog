"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { ImInstagram } from "react-icons/im";
import { AiFillTikTok } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { postsData } from "../data";
import { montserrat } from "../lib/font"; // Assuming you have a montserrat font import

const Header = () => {
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  const categories = Array.from(
    new Set(postsData.flatMap((post) => post.categories || []))
  );

  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path || (path !== "/" && pathname.startsWith(path));
  };

  const handleMouseEnter = () => {
    clearTimeout(closeTimeoutRef.current);
    setIsBlogOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsBlogOpen(false);
    }, 500);
  };

  return (
    <header
      className={`bg-[#ececec] px-[100px] py-[18px] flex justify-between items-center font-sans text-[12px] border-b border-gray-200 ${montserrat.className}`}
    >
      {/* Left menu */}
      <nav className="flex items-center space-x-6 relative">
        <Link
          href="/"
          className={`font-[400] transition-colors ${
            isActive("/")
              ? "text-[#e1c680]"
              : "text-[#585656] hover:text-[#e1c680]"
          }`}
        >
          HOME
        </Link>

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href="/category"
            className={`font-[400] transition-colors ${
              isActive("/category")
                ? "text-[#e1c680]"
                : "text-[#585656] hover:text-[#e1c680]"
            }`}
          >
            BLOG <MdKeyboardArrowDown className="inline-block w-5 h-5" />
          </Link>

          {isBlogOpen && (
            <div className="absolute top-full -left-[70px] mt-4 text-center bg-white border border-[#e1c680] shadow-md min-w-[200px] z-50 dropdown-menu  before:content-[''] before:absolute before:top-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-[14px] before:h-[14px] before:bg-white before:border-l before:border-t before:border-[#e1c680] before:rotate-45">
              {categories.map((item, index) => (
                <Link
                  key={index}
                  href={`/category/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block px-4 py-2 text-[#585656] hover:bg-gray-100 hover:text-[#e1c680] transition-colors relative"
                >
                  <span
                    className={`relative ${
                      index !== categories.length - 1
                        ? "after:content-[''] after:block after:mt-1 after:mx-auto after:w-[80%] after:border-b after:border-[#e1c680] after:transition-all group-hover:after:w-full"
                        : ""
                    }`}
                  >
                    {item}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link
          href="/youtube"
          className={`font-[400] transition-colors ${
            isActive("/youtube")
              ? "text-[#e1c680]"
              : "text-[#585656] hover:text-[#e1c680]"
          }`}
        >
          YOUTUBE
        </Link>

        <Link
          href="/about"
          className={`font-[400] transition-colors ${
            isActive("/about")
              ? "text-[#e1c680]"
              : "text-[#585656] hover:text-[#e1c680]"
          }`}
        >
          ABOUT ME
        </Link>

        <Link
          href="/jp"
          className={`font-[400] transition-colors ${
            isActive("/jp")
              ? "text-[#e1c680]"
              : "text-[#585656] hover:text-[#e1c680]"
          }`}
        >
          日本語
        </Link>
      </nav>

      {/* Right social icons */}
      <div className="flex space-x-3">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-[#e1c680] transition-colors"
        >
          <IoLogoFacebook className="w-4 h-4" />
        </a>
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-[#e1c680] transition-colors"
        >
          <AiFillTikTok className="w-4 h-4" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-[#e1c680] transition-colors"
        >
          <ImInstagram className="mt-0.5" />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-[#e1c680] transition-colors"
        >
          <FaYoutube className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
};

export default Header;
