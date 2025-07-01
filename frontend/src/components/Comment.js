"use client";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { likeComment } from "@/app/services/commentService";
import { useRouter } from "next/navigation";
import { getUser } from "@/app/services/authService";

const DEFAULT_AVATAR = "/cv.jpg";

export default function Comment({
  comment,
  replies,
  onReply,
  replyTo,
  newComment,
  setNewComment,
  handleSubmit,
  user,
}) {
  const [likes, setLikes] = useState(comment.likes?.length || 0);
  const [localUser, setLocalUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser();
        setLocalUser(userData);
      } catch {
        setLocalUser(null);
      }
    }
    fetchUser();
  }, []);

  const handleLike = async () => {
    if (!localUser) {
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
            {comment.index}
          </div>
          <div className="absolute mt-2 left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-gray-100"></div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-[74px] h-[74px] rounded-full overflow-hidden shrink-0 border">
              <img
                src={comment.user?.avatar || DEFAULT_AVATAR}
                alt={comment.user?.name || "User"}
                className="w-full h-full object-cover"
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
                localUser ? "cursor-pointer" : "cursor-not-allowed"
              } group`}
              onClick={localUser ? handleLike : () => router.push("/login")}
            >
              <FaStar
                className={`text-blue-400 mb-1 w-4 h-4 ${
                  localUser ? "group-hover:text-[#ccc28a]" : "text-gray-400"
                } transition-colors`}
              />
              {likes > 0
                ? `Liked by ${likes} ${likes === 1 ? "person" : "people"}`
                : localUser
                ? "Like"
                : "Log in to like"}
            </div>

            <button
              className="px-4 py-2 bg-gray-200 mt-6 text-[12px] hover:bg-gray-300 cursor-pointer transition"
              onClick={() => onReply?.(comment)}
            >
              REPLY
            </button>
          </div>

          {replyTo === comment._id && (
            <form
              onSubmit={handleSubmit}
              className="border border-gray-300 mb-6 mt-4 rounded"
            >
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-4 rounded-t resize-none h-[100px] focus:outline-none text-sm text-black placeholder:text-gray-500"
                placeholder={
                  user ? "Write a reply..." : "Bạn cần đăng nhập để trả lời"
                }
                disabled={!user}
              />
              <div className="flex justify-end border-t border-gray-300 px-3 py-2">
                <button
                  type="submit"
                  disabled={!user}
                  className="text-xs text-gray-500 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 transition disabled:opacity-50"
                >
                  Reply
                </button>
              </div>
            </form>
          )}

          {replies?.length > 0 && (
            <div className="mt-10 pl-6 border-l-2 border-gray-200">
              {replies.map((reply) => (
                <Comment
                  key={reply._id}
                  comment={{ ...reply, index: comment.index }}
                  replies={reply.replies || []}
                  onReply={onReply}
                  replyTo={replyTo}
                  newComment={newComment}
                  setNewComment={setNewComment}
                  handleSubmit={handleSubmit}
                  user={user}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
