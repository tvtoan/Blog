"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/app/services/postService";
import useAuthUser from "@/app/hooks/useAuthUser"; // 🧠 custom hook bạn tạo
import Link from "next/link";
import DividerIcon from "@/components/DividerIcon";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [displayCount, setDisplayCount] = useState(8);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  const user = useAuthUser(); // 💡 gọi hook để lấy user (nếu có)

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

  return (
    <div className="container mx-auto p-4">
      {user?.role === "admin" && (
        <div className="text-right mb-4">
          <Link
            href="/create-post"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create New Post
          </Link>
        </div>
      )}

      {loadingPosts ? (
        <p className="text-center text-gray-500">Đang tải bài viết...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : displayedPosts.length === 0 ? (
        <p className="text-center text-gray-500">Không có bài viết nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedPosts.map((post) => (
            <div
              key={post._id}
              className="mb-10 p-4 rounded flex flex-col items-center"
            >
              <h2 className="text-[20px] font-normal text-center">
                {post.title.toUpperCase()}
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
                <div>Reading time {post.readingTime} minutes.</div>
              </div>
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={600}
                className="rounded-lg mb-4 w-full h-64 object-cover"
              />
              <p className="text-gray-600 text-center mb-6">
                {post.excerpt || "No excerpt"}
              </p>
              <div className="bg-gray-100 text-black hover:bg-gray-200 py-3 px-4 w-full rounded relative group transition-colors duration-1000">
                <Link
                  href={`/posts/${post._id}`}
                  className="font-normal text-[14px] block text-center"
                >
                  READ MORE
                </Link>
                <FaArrowRight className="w-3.5 h-3.5 text-[#d3b062] absolute right-10 top-1/2 transform -translate-y-1/2 transition-all duration-300 group-hover:right-5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loadingPosts && displayCount < posts.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-gray-100 text-sm text-black hover:bg-gray-200 py-3 px-6 rounded transition-colors duration-300 mb-16"
          >
            OLDER POSTS
          </button>
        </div>
      )}
    </div>
  );
}
