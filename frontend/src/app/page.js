"use client";

import { useEffect, useState } from "react";
import { postsData } from "../data";
import Link from "next/link";
import DividerIcon from "@/components/DividerIcon";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [displayCount, setDisplayCount] = useState(8); // Initial display limit of 8 posts

  useEffect(() => {
    setPosts(postsData);
  }, []);

  // Function to handle "Older Posts" button click
  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 8); // Load 8 more posts
  };

  // Slice posts to display only up to displayCount
  const displayedPosts = posts.slice(0, displayCount);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                alt=""
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
          ))
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>

      {/* "Older Posts" button */}
      {displayCount < posts.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-gray-100 cursor-pointer text-sm mb-16 text-black hover:bg-gray-200 py-3 px-6 rounded transition-colors duration-300"
          >
            OLDER POSTS
          </button>
        </div>
      )}
    </div>
  );
}
