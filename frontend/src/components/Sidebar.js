"use client";

import { useState, useRef, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { montserrat } from "../lib/font";
import { slugifyCategory } from "../lib/slugifyCategory";
import { getPosts } from "@/app/services/postService";
import { getAdminInfo } from "@/app/services/authService";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchContainerRef = useRef(null);

  const [categories, setCategories] = useState({});
  const [archives, setArchives] = useState({});
  const [admin, setAdmin] = useState(null); // ⬅️ admin info
  const [loadingAdmin, setLoadingAdmin] = useState(true); // ⬅️ trạng thái loading
  const router = useRouter();

  // Click outside search input
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

  // Fetch post để tính category và archive
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const posts = await getPosts();

        const categoryMap = {};
        const archiveMap = {};

        posts.forEach((post) => {
          (post.categories || []).forEach((cat) => {
            categoryMap[cat] = (categoryMap[cat] || 0) + 1;
          });

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

  // Fetch admin info
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await getAdminInfo();
        setAdmin(data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin admin:", error);
      } finally {
        setLoadingAdmin(false);
      }
    };

    fetchAdmin();
  }, []);

  // Xử lý submit search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsFocused(false);
    }
  };

  return (
    <aside className={`w-[300px] p-5 bg-white ${montserrat.className}`}>
      {/* SEARCH */}
      <div ref={searchContainerRef} className="mb-5 relative">
        <form onSubmit={handleSearchSubmit} className="relative flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 px-4 border border-gray-300 focus:outline-none"
            placeholder="Search..."
            onFocus={() => setIsFocused(true)}
          />
          <button
            type="submit"
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
        </form>
      </div>

      {/* ABOUT ME */}
      <div className="text-center mb-5">
        <div className="relative w-full mt-2 inline-block mx-auto mb-10">
          <h2 className="text-sm text-black text-center bg-[#eeeeee] px-6 py-3">
            ABOUT ME
          </h2>
          <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#eeeeee]" />
        </div>

        {loadingAdmin ? (
          <div className="text-center text-gray-500 text-sm">Đang tải...</div>
        ) : admin ? (
          <div className="text-left">
            <img
              src={admin.avatar || "/default-avatar.jpg"}
              alt={admin.name}
              className="w-full h-auto object-cover mx-auto"
            />
            <p className="my-4 font-[600]">{admin.job || "Blogger"}</p>
            <p className="text-sm">{admin.bio || "Chưa có mô tả."}</p>
          </div>
        ) : (
          <div className="text-sm text-gray-500 text-center">
            Không có thông tin admin.
          </div>
        )}
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
