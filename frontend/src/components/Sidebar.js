"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { postsData } from "../data";
import { montserrat } from "../lib/font";
import { slugifyCategory } from "../lib/slugifyCategory"; // ✅ import hàm slugify

const Sidebar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const archives = postsData.reduce((acc, post) => {
    const date = new Date(post.createdAt);
    const monthYear = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {});

  const categories = postsData.reduce((acc, post) => {
    post.categories.forEach((category) => {
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {});

  return (
    <aside className={`w-[300px] p-5 bg-white ${montserrat.className}`}>
      <div ref={searchContainerRef} className="mb-5">
        <div className="relative flex">
          <input
            type="text"
            className="w-full h-10 px-4 border border-gray-300 focus:outline-none"
            placeholder="Search..."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <button
            type="button"
            className={`
        h-10 flex items-center justify-end overflow-hidden
        transition-all duration-500 ease-in-out origin-left group
        ${
          isFocused
            ? "w-[60px] bg-[#cfac1e] text-white"
            : "w-[250px] bg-black text-white hover:bg-[#cfac1e]"
        }
      `}
          >
            <span
              className={`text-[12px] mr-2 transition-all duration-300 ${
                isFocused ? "opacity-0 w-0" : "opacity-100 w-auto"
              }`}
            >
              SEARCH
            </span>

            <FaArrowRight
              className={`
          w-[14px] h-[14px] mr-4 transition-colors duration-300
          ${isFocused ? "text-white" : "text-[#f1c40f] group-hover:text-white"}
        `}
            />
          </button>
        </div>
      </div>

      <div className="text-center mb-5">
        <div className="relative w-full mt-2 inline-block mx-auto mb-10">
          <h2 className="text-sm  text-black text-center bg-[#eeeeee] px-6 py-3">
            ABOUT ME
          </h2>
          <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#eeeeee]" />
        </div>
      </div>
      <div className="text-left">
        <img
          src="/cv.jpg"
          alt="Profile"
          className="w-full h-full object-cover mx-auto"
        />
        <p className=" my-4 font-[600]">Blogger & Youtuber</p>
        <p className=" text-sm">
          Hi, Mình là Nam Anh. Chào mừng bạn đến với blog của mình. Ngày nào
          mình cũng thử nghiệm những cách sống tối giản và chia sẻ lại kinh
          nghiệm đó với bạn.
        </p>
      </div>

      <div className="mt-16">
        <div className="relative w-full inline-block mx-auto mb-10">
          <h2 className="text-sm  text-black text-center bg-[#eeeeee] px-6 py-3">
            ARCHIVES
          </h2>
          <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#eeeeee]" />
        </div>{" "}
        {Object.entries(archives)
          .sort(([a], [b]) => new Date(b) - new Date(a))
          .map(([monthYear, count]) => (
            <p
              key={monthYear}
              className="block text-sm mb-5 font-[500] group transition-colors duration-300 hover:text-[#f1c40f]"
            >
              <span className="text-black group-hover:text-[#f1c40f]">
                {monthYear}
              </span>{" "}
              <span className="text-[#f1c40f] group-hover:text-[#f1c40f]">
                ({count})
              </span>
            </p>
          ))}
      </div>

      <div className="mt-14">
        <div className="relative w-full inline-block mx-auto mb-10">
          <h2 className="text-sm  text-black text-center bg-[#eeeeee] px-6 py-3">
            CATEGORIES
          </h2>
          <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#eeeeee]" />
        </div>
        {Object.entries(categories)
          .sort(([a, _], [b, __]) => b.localeCompare(a))
          .map(([category, count]) => (
            <Link
              key={category}
              href={`/category/${slugifyCategory(category)}`}
              className="block text-sm mb-5 font-[500] group transition-colors duration-300 hover:text-[#f1c40f]"
            >
              <span className="text-black group-hover:text-[#f1c40f]">
                {category}
              </span>{" "}
              <span className="text-[#f1c40f] group-hover:text-[#f1c40f]">
                ({count})
              </span>
            </Link>
          ))}
      </div>
    </aside>
  );
};

export default Sidebar;
