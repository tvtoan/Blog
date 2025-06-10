"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const Header = () => {
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  return (
    <header className="bg-[#ececec] px-[100px] py-5 flex justify-between items-center font-sans text-sm border-b border-gray-200">
      {/* Left menu */}
      <nav className="flex items-center space-x-6 relative">
        <Link
          href="/"
          className="text-[#585656] font-medium hover:text-[#e1c680] transition-colors"
        >
          HOME
        </Link>

        {/* BLOG dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsBlogOpen(true)}
          onMouseLeave={() => setIsBlogOpen(false)}
        >
          <Link
            href="/blog"
            className="text-[#e1c680] font-medium hover:text-[#e1c680] transition-colors"
          >
            BLOG <MdKeyboardArrowDown className="inline-block  w-5 h-5" />
          </Link>

          {isBlogOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-md min-w-[200px] z-50">
              {[
                "Minimalism",
                "Lifestyle",
                "Nhật ký",
                "Cuộc sống ở Nhật Bản",
                "Cuộc sống ở Hà Nội",
                "Hành trình của mình",
                "Học ngôn ngữ",
                "Productivity",
                "Đọc sách",
                "Nấu ăn",
                "Khám phá & Du lịch",
              ].map((item, index) => (
                <Link
                  key={index}
                  href={`/blog/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block px-4 py-2 text-[#585656] hover:bg-gray-100 hover:text-[#e1c680] transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/youtube"
          className="text-[#585656] font-medium hover:text-[#e1c680] transition-colors"
        >
          YOUTUBE
        </Link>
        <Link
          href="/about"
          className="text-[#585656] font-medium hover:text-[#e1c680] transition-colors"
        >
          ABOUT ME
        </Link>
        <Link
          href="/jp"
          className="text-[#585656] font-medium hover:text-[#e1c680] transition-colors"
        >
          日本語
        </Link>
      </nav>
      {/* Right social icons */}
      <div className="flex space-x-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-[#e1c680] transition-colors"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-[#e1c680] transition-colors"
        >
          <FaInstagram />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-[#e1c680] transition-colors"
        >
          <FaYoutube />
        </a>
      </div>
    </header>
  );
};

export default Header;
