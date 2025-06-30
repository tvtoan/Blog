"use client";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { likeComment } from "@/app/services/commentService";
import { useRouter } from "next/navigation";
import { getUser } from "@/app/services/authService";

const DEFAULT_AVATAR = "/cv.jpg";

export default function Comment({ comment, replies }) {
  const [likes, setLikes] = useState(comment.likes?.length || 0);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        setUser(null); // User not logged in
      }
    }
    fetchUser();
  }, []);

  const handleLike = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    try {
      await likeComment(comment._id);
      setLikes((prev) => prev + 1);
    } catch (error) {
      console.error(error.message);
      alert(error.message || "Failed to like comment");
    }
  };

  const formattedDate = new Date(comment.createdAt).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="mb-10">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-10 h-10 mt-4 bg-gray-100 text-center flex items-center justify-center text-sm font-semibold text-[#f5b04e]">
            {comment.index || 1}
          </div>
          <div className="absolute mt-2 left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-gray-100"></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-[74px] h-[74px] rounded-full overflow-hidden shrink-0 border">
              <img
                src={comment.user?.avatar || DEFAULT_AVATAR}
                alt={comment.user?.name || "User"}
                className="w-full h-full、メ  object-cover"
              />
            </div>
            <div className="cursor-pointer">
              <p className="text-sm mb-2 hover:text-[#7687a5] font-bold uppercase text-gray-800">
                {comment.user?.name || "Anonymous"}
              </p>
              <p className="text-[13px] hover:text-[#7687a5] font-[600] italic text-[#a38e60]">
                {formattedDate}
              </p>
            </div>
          </div>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line mb-6">
            {comment.content}
          </p>
          <div className="items-center text-sm text-gray-600 font-medium mb-4">
            <div
              className={`flex items-center gap-1 ${
                user ? "cursor-pointer" : "cursor-not-allowed"
              } group`}
              onClick={user ? handleLike : () => router.push("/login")}
            >
              <FaStar
                className={`text-blue-400 mb-1 w-4 h-4 ${
                  user ? "group-hover:text-[#ccc28a]" : "text-gray-400"
                } transition-colors`}
              />
              {likes > 0
                ? `Liked by ${likes} ${likes === 1 ? "person" : "people"}`
                : user
                ? "Like"
                : "Log in to like"}
            </div>
            <button className="px-4 py-2 bg-gray-200 mt-6 text-[12px] hover:bg-gray-300 cursor-pointer transition">
              REPLY
            </button>
          </div>
          {replies && replies.length > 0 && (
            <div className="mt-10 pl-6 border-l-2 border-gray-200">
              {replies.map((reply, i) => (
                <Comment
                  key={reply._id}
                  comment={{ ...reply, index: i + 1 }}
                  replies={[]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
