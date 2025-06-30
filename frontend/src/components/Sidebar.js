"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { montserrat } from "../lib/font";
import { slugifyCategory } from "../lib/slugifyCategory";
import { getPostByTitle, getPosts } from "@/app/services/postService";

const Sidebar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchContainerRef = useRef(null);

  const [categories, setCategories] = useState({});
  const [archives, setArchives] = useState({});

  // Handle click outside to close search results
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search logic
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const results = await getPostByTitle(searchQuery);
        setSearchResults(results || []);
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra khi tìm kiếm.");
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSearchResults, 300); // debounce
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Fetch posts and compute categories & archives
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const posts = await getPosts();

        const categoryMap = {};
        const archiveMap = {};

        posts.forEach((post) => {
          // Tính categories
          (post.categories || []).forEach((cat) => {
            categoryMap[cat] = (categoryMap[cat] || 0) + 1;
          });

          // Tính archives theo MM/YYYY
          const date = new Date(post.createdAt);
          const key = `${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}/${date.getFullYear()}`;
          archiveMap[key] = (archiveMap[key] || 0) + 1;
        });

        setCategories(categoryMap);
        setArchives(archiveMap);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu bài viết:", err);
      }
    };

    fetchPostData();
  }, []);

  return (
    <aside className={`w-[300px] p-5 bg-white ${montserrat.className}`}>
      {/* SEARCH */}
      <div ref={searchContainerRef} className="mb-5 relative">
        <div className="relative flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 px-4 border border-gray-300 focus:outline-none"
            placeholder="Search..."
            onFocus={() => setIsFocused(true)}
          />
          <button
            type="button"
            className={`h-10 flex items-center justify-end overflow-hidden transition-all duration-500 ease-in-out origin-left group ${
              isFocused
                ? "w-[60px] bg-[#cfac1e] text-white"
                : "w-[250px] bg-black text-white hover:bg-[#cfac1e]"
            }`}
          >
            <span
              className={`text-[12px] mr-2 transition-all duration-300 ${
                isFocused ? "opacity-0 w-0" : "opacity-100 w-auto"
              }`}
            >
              SEARCH
            </span>
            <FaArrowRight
              className={`w-[14px] h-[14px] mr-4 transition-colors duration-300 ${
                isFocused
                  ? "text-white"
                  : "text-[#f1c40f] group-hover:text-white"
              }`}
            />
          </button>
        </div>

        {isFocused && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded shadow-lg max-h-60 overflow-y-auto">
            {loading && <div className="p-2 text-center">Đang tải...</div>}
            {error && <div className="p-2 text-red-500">{error}</div>}
            {searchResults.length > 0
              ? searchResults.map((post) => (
                  <Link
                    key={post._id}
                    href={`/posts/${post._id}`}
                    className="block p-2 hover:bg-gray-100"
                    onClick={() => setIsFocused(false)}
                  >
                    {post.title}
                  </Link>
                ))
              : !loading &&
                !error &&
                searchQuery.trim() !== "" && (
                  <div className="p-2 text-center text-gray-500">
                    Không tìm thấy bài viết.
                  </div>
                )}
          </div>
        )}
      </div>

      {/* ABOUT ME */}
      <div className="text-center mb-5">
        <div className="relative w-full mt-2 inline-block mx-auto mb-10">
          <h2 className="text-sm text-black text-center bg-[#eeeeee] px-6 py-3">
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
        <p className="my-4 font-[600]">Blogger & Youtuber</p>
        <p className="text-sm">
          Hi, Mình là Nam Anh. Chào mừng bạn đến với blog của mình. Ngày nào
          mình cũng thử nghiệm những cách sống tối giản và chia sẻ lại kinh
          nghiệm đó với bạn.
        </p>
      </div>

      {/* ARCHIVES */}
      <div className="mt-16">
        <div className="relative w-full inline-block mx-auto mb-10">
          <h2 className="text-sm text-black text-center bg-[#eeeeee] px-6 py-3">
            ARCHIVES
          </h2>
          <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#eeeeee]" />
        </div>
        {Object.entries(archives)
          .sort(([a], [b]) => {
            const [ma, ya] = a.split("/").map(Number);
            const [mb, yb] = b.split("/").map(Number);
            return new Date(yb, mb - 1) - new Date(ya, ma - 1);
          })
          .map(([monthYear, count]) => (
            <p
              key={monthYear}
              className="block cursor-pointer text-sm mb-5 font-[500] group transition-colors duration-300 hover:text-[#f1c40f]"
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

      {/* CATEGORIES */}
      <div className="mt-14">
        <div className="relative w-full inline-block mx-auto mb-10">
          <h2 className="text-sm text-black text-center bg-[#eeeeee] px-6 py-3">
            CATEGORIES
          </h2>
          <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#eeeeee]" />
        </div>
        {Object.entries(categories)
          .sort(([a], [b]) => b.localeCompare(a))
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
