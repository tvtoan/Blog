"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/app/services/postService";
import useAuthUser from "@/app/hooks/useAuthUser";
import Link from "next/link";
import DividerIcon from "@/components/DividerIcon";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { useLanguage } from "./context/LanguageContext";
import { getLocalizedText } from "@/lib/getLocalizedText";

export default function Home() {
  const { language } = useLanguage(); // Lấy ngôn ngữ từ context
  const [posts, setPosts] = useState([]);
  const [displayCount, setDisplayCount] = useState(8);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  const user = useAuthUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError(err.message || "Lỗi khi lấy danh sách bài viết.");
        console.error("Lỗi:", err.message);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 8);
  };

  const displayedPosts = posts.slice(0, displayCount);

  const labels = {
    vi: {
      create: "Tạo bài viết mới",
      loading: "Đang tải bài viết...",
      error: "Có lỗi xảy ra.",
      noPosts: "Không có bài viết nào.",
      readingTime: "phút đọc",
      readMore: "ĐỌC THÊM",
      olderPosts: "XEM THÊM",
    },
    jp: {
      create: "新しい記事を作成",
      loading: "記事を読み込み中...",
      error: "エラーが発生しました。",
      noPosts: "記事がありません。",
      readingTime: "分間の読書",
      readMore: "続きを読む",
      olderPosts: "さらに表示",
    },
  };

  const t = labels[language];

  return (
    <div className="container mx-auto p-4">
      {/* Nút chọn ngôn ngữ */}
      <div className="flex justify-between items-center mb-6">
        {user?.role === "admin" && (
          <Link
            href="/create-post"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {t.create}
          </Link>
        )}
      </div>

      {loadingPosts ? (
        <p className="text-center text-gray-500">{t.loading}</p>
      ) : error ? (
        <p className="text-center text-red-500">{t.error}</p>
      ) : displayedPosts.length === 0 ? (
        <p className="text-center text-gray-500">{t.noPosts}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedPosts.map((post) => (
            <div
              key={post._id}
              className="mb-10 p-4 rounded flex flex-col items-center"
            >
              <h2 className="text-[20px] font-normal text-center">
                {getLocalizedText(post.title).toUpperCase()}
              </h2>
              <DividerIcon size={150} />
              <div className="text-gray-500 flex gap-5 text-[13px] mb-5">
                <div>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div>
                  {t.readingTime} {post.readingTime}
                </div>
              </div>
              <Image
                src={post.image}
                alt={getLocalizedText(post.title)}
                width={800}
                height={600}
                className="rounded-lg mb-4 w-full h-64 object-cover"
              />
              <p className="text-gray-600 text-center mb-6">
                {getLocalizedText(post.excerpt, "No excerpt")}
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
          ))}
        </div>
      )}

      {!loadingPosts && displayCount < posts.length && (
        <div className="text-center mt-8 mb-16">
          <button
            onClick={handleLoadMore}
            className="bg-gray-100 text-sm text-black hover:bg-gray-200 py-3 px-6 rounded transition-colors duration-300"
          >
            {t.olderPosts}
          </button>
        </div>
      )}
    </div>
  );
}
