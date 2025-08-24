"use client";

import { useRef, useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { montserrat } from "../lib/font";
import { slugifyCategory } from "../lib/slugifyCategory";
import { getPosts } from "@/app/services/postService";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/app/context/AdminContext";
import { getLocalizedText } from "@/lib/getLocalizedText";
import useTranslation from "@/app/hooks/useTranslations";

const DEFAULT_IMAGE = "/default-image.jpg";
const BASE_URL = "http://localhost:5000";

const formatImage = (image) => {
  if (!image || typeof image !== "string") {
    return DEFAULT_IMAGE;
  }
  if (image.startsWith("/uploads/")) {
    return `${BASE_URL}${image}`;
  }
  if (image.startsWith("data:image/")) {
    return image;
  }
  try {
    const url = new URL(image);
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
    if (imageExtensions.test(url.pathname)) {
      return image;
    }
  } catch {
    // Không phải URL hợp lệ
  }
  return DEFAULT_IMAGE;
};

const Sidebar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchContainerRef = useRef(null);
  const [categories, setCategories] = useState({});
  const [archives, setArchives] = useState({});
  const { admin, loadingAdmin } = useAdmin();
  const router = useRouter();
  console.log("admin in sidebar:", admin);

  const translations = useTranslation();
  const t = translations?.Sidebar || {};

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsFocused(false);
    }
  };

  return (
    <aside
      className={`w-full md:w-[300px] p-5 bg-white ${montserrat.className}`}
    >
      {/* Search */}
      <div ref={searchContainerRef} className="mb-8 relative">
        <form onSubmit={handleSearchSubmit} className="relative flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 px-4 border border-gray-300 rounded focus:outline-none"
            placeholder={t.search}
            onFocus={() => setIsFocused(true)}
          />
          <button
            type="submit"
            className={`h-10 flex items-center justify-end overflow-hidden transition-all duration-500 origin-left group ${
              isFocused
                ? "w-[60px] bg-[#cfac1e] text-white"
                : "w-[250px] bg-black text-white hover:bg-[#cfac1e]"
            }`}
          >
            <span
              className={`text-xs mr-2 transition-all duration-300 ${
                isFocused ? "opacity-0 w-0" : "opacity-100 w-auto"
              }`}
            >
              SEARCH
            </span>
            <FaArrowRight className="w-[14px] h-[14px] mr-4" />
          </button>
        </form>
      </div>

      {/* About Me */}
      <div className="text-center mb-10">
        <div className="relative w-full mb-6 inline-block">
          <h2 className="text-sm text-black bg-[#eeeeee] px-6 py-3">
            {t.about}
          </h2>
          <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#eeeeee]" />
        </div>

        {loadingAdmin ? (
          <p className="text-sm text-gray-500">{t.loading}</p>
        ) : admin ? (
          <div className="text-left">
            <img
              src={formatImage(admin.avatar)}
              alt={getLocalizedText(
                admin.name,
                translations.language,
                "No Name"
              )}
              className="w-full h-auto object-cover mb-4 rounded"
            />
            <h3 className="font-semibold text-lg">
              {getLocalizedText(admin.name, translations.language, "No Name")}
            </h3>
            <p className="font-medium text-sm text-gray-700 mt-1 mb-2">
              {getLocalizedText(admin.job, translations.language, "No Job")}
            </p>
            <p className="text-sm text-gray-600">
              {getLocalizedText(admin.bio, translations.language, "No Bio")}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">{t.noAdmin}</p>
        )}
      </div>

      {/* Archives */}
      <div className="mt-12">
        <div className="relative w-full mb-6 inline-block">
          <h2 className="text-sm text-black bg-[#eeeeee] px-6 py-3">
            {t.archives}
          </h2>
          <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#eeeeee]" />
        </div>

        {Object.keys(archives).length === 0 ? (
          <p className="text-sm text-gray-500">{t.noPosts}</p>
        ) : (
          Object.entries(archives)
            .sort(([a], [b]) => {
              const [ma, ya] = a.split("/").map(Number);
              const [mb, yb] = b.split("/").map(Number);
              return new Date(yb, mb - 1) - new Date(ya, ma - 1);
            })
            .map(([monthYear, count]) => (
              <p
                key={monthYear}
                className="block cursor-pointer text-sm mb-4 font-medium group hover:text-[#f1c40f]"
              >
                {monthYear} <span className="text-[#f1c40f]">({count})</span>
              </p>
            ))
        )}
      </div>

      {/* Categories */}
      <div className="mt-12">
        <div className="relative w-full mb-6 inline-block">
          <h2 className="text-sm text-black bg-[#eeeeee] px-6 py-3">
            {t.categories}
          </h2>
          <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#eeeeee]" />
        </div>

        {Object.keys(categories).length === 0 ? (
          <p className="text-sm text-gray-500">{t.noCategories}</p>
        ) : (
          Object.entries(categories).map(([category, count]) => (
            <Link
              key={category}
              href={`/category/${slugifyCategory(category)}`}
              className="block text-sm mb-4 font-medium group hover:text-[#f1c40f]"
            >
              {category} <span className="text-[#f1c40f]">({count})</span>
            </Link>
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
