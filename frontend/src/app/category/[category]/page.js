"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import DividerIcon from "@/components/DividerIcon";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { slugifyCategory } from "../../../lib/slugifyCategory";
import { getOriginalCategoryFromSlug } from "@/lib/categoryHelpers";
import { getPosts } from "@/app/services/postService";
import { getImageUrl } from "@/lib/getImageUrl";

export default function CategoryPage() {
  const { category } = useParams();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [displayCount, setDisplayCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const posts = await getPosts();
        const matched = posts.filter((post) =>
          post.categories?.some((cat) => slugifyCategory(cat) === category)
        );
        setFilteredPosts(matched);
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra khi lấy bài viết.");
        setFilteredPosts([]);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchPosts();
    } else {
      setLoading(false);
      setError("Danh mục không hợp lệ.");
    }
  }, [category]);

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 8);
  };

  const displayedPosts = filteredPosts.slice(0, displayCount);
  const originalCategory = category
    ? getOriginalCategoryFromSlug(category)
    : "";

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Đang tải...</div>;
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
        Category: {originalCategory || "Không xác định"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => (
            <div
              key={post._id}
              className="mb-10 p-4 rounded flex flex-col items-center"
            >
              <h2 className="text-[20px] font-normal text-center">
                {post.title.toUpperCase()}
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
                <div>Reading time {post.readingTime} minutes.</div>
              </div>
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={600}
                className="rounded-lg mb-4 w-full h-64 object-cover"
              />
              <p className="text-gray-600 text-left mb-6">
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
          ))
        ) : (
          <p className="text-center text-[#7687a5]">
            Không có bài viết nào trong thể loại này.
          </p>
        )}
      </div>

      {displayCount < filteredPosts.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-gray-100 cursor-pointer text-sm text-black hover:bg-gray-200 py-3 px-6 rounded transition-colors duration-300"
          >
            OLDER POSTS
          </button>
        </div>
      )}
    </div>
  );
}
