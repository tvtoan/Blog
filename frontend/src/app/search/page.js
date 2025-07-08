"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import DividerIcon from "@/components/DividerIcon";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { getPostByTitle } from "@/app/services/postService";
import { useLanguage } from "@/app/context/LanguageContext";

export default function SearchResultPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchResults, setSearchResults] = useState([]);
  const [displayCount, setDisplayCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { language } = useLanguage();

  const text = {
    vi: {
      searchTitle: "Kết quả tìm kiếm cho:",
      noResult: "Không có bài viết nào phù hợp.",
      readingTime: "phút đọc",
      readMore: "ĐỌC THÊM",
      olderPosts: "XEM THÊM",
      loading: "Đang tải...",
      error: "Có lỗi xảy ra khi tìm kiếm.",
    },
    jp: {
      searchTitle: "検索結果:",
      noResult: "該当する記事がありません。",
      readingTime: "分間の読書",
      readMore: "続きを読む",
      olderPosts: "さらに表示",
      loading: "読み込み中...",
      error: "検索中にエラーが発生しました。",
    },
  };

  const t = text[language] || text.vi;

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setSearchResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const results = await getPostByTitle(query);
        setSearchResults(results);
      } catch (err) {
        setError(err.message || t.error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 8);
  };

  const getLocalizedText = (textObj) => {
    if (typeof textObj === "object") {
      return textObj[language] || Object.values(textObj)[0] || "";
    }
    return textObj || "";
  };

  const displayedPosts = searchResults.slice(0, displayCount);

  if (loading) {
    return <div className="container mx-auto p-4 text-center">{t.loading}</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-[40px] text-center mb-14">
        {t.searchTitle} <span className="text-[#cfac1e]">{query}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => (
            <div
              key={post._id}
              className="mb-10 p-4 rounded flex flex-col items-center"
            >
              <h2 className="text-[20px] font-normal text-center">
                {getLocalizedText(post.title, language).toUpperCase()}
              </h2>
              <DividerIcon size={150} />
              <div className="text-[#7687a5] flex gap-5 text-[13px] mb-5">
                <div>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div>
                  {post.readingTime} {t.readingTime}
                </div>
              </div>
              <Image
                src={post.image}
                alt={getLocalizedText(post.title, language)}
                width={800}
                height={600}
                className="rounded-lg mb-4 w-full h-64 object-cover"
              />
              <p className="text-gray-600 text-left mb-6">
                {getLocalizedText(post.excerpt, language, "No excerpt")}
              </p>
              <div className="bg-gray-100 text-black hover:bg-gray-200 py-3 px-4 w-full rounded relative group transition-colors duration-1000">
                <Link
                  href={`/posts/${post._id}`}
                  className="font-normal text-[14px] block text-center"
                >
                  {t.readMore}
                </Link>
                <FaArrowRight className="w-3.5 h-3.5 text-[#d3b062] absolute right-10 top-1/2 transform -translate-y-1/2 transition-all duration-300 group-hover:right-5" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[#7687a5]">{t.noResult}</p>
        )}
      </div>

      {displayCount < searchResults.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-gray-100 cursor-pointer text-sm text-black hover:bg-gray-200 py-3 px-6 rounded transition-colors duration-300"
          >
            {t.olderPosts}
          </button>
        </div>
      )}
    </div>
  );
}
