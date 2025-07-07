"use client";

import { useState, useEffect, useMemo } from "react";
import Comment from "./Comment";
import { getComments, createComment } from "@/app/services/commentService";
import { montserrat } from "../lib/font";
import DividerIcon from "./DividerIcon";
import { getUser } from "@/app/services/authService";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import { getLocalizedText } from "@/lib/getLocalizedText"; // Hàm lấy văn bản theo ngôn ngữ

export default function CommentSection({ post }) {
  const { language } = useLanguage();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchComments = async () => {
    try {
      setLoading(true);
      const rawComments = await getComments(post._id);
      const map = new Map();
      const roots = [];

      rawComments.forEach((c) => {
        map.set(c._id, { ...c, replies: [] });
      });

      map.forEach((comment) => {
        if (comment.parentId) {
          const parent = map.get(comment.parentId);
          if (parent) parent.replies.push(comment);
        } else {
          roots.push(comment);
        }
      });

      setComments(roots);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post._id]);

  useEffect(() => {
    async function fetchUser() {
      const data = await getUser();
      setUser(data);
    }
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/auth/login");
      return;
    }
    if (!newComment.trim()) return;

    try {
      await createComment({
        content: newComment,
        postId: post._id,
        parentId: replyTo,
      });
      setNewComment("");
      setReplyTo(null);
      fetchComments();
    } catch (err) {
      console.error(err.message);
      alert("Không thể gửi bình luận.");
    }
  };

  const countAllComments = (comments) => {
    let count = 0;
    comments.forEach((comment) => {
      count += 1;
      if (comment.replies?.length > 0) {
        count += countAllComments(comment.replies);
      }
    });
    return count;
  };

  const totalComments = useMemo(() => countAllComments(comments), [comments]);

  const handleTextareaClick = () => {
    if (!user) {
      router.push("/auth/login");
    }
  };

  return (
    <div className={`container mx-auto p-4 w-full ${montserrat.className}`}>
      <h2 className="text-[20px] font-[500] mb-2 text-center uppercase">
        {totalComments} THOUGHTS ON {getLocalizedText(post.title, language)}
      </h2>
      <DividerIcon size={200} />

      {loading ? (
        <p className="text-center text-gray-500">Đang tải bình luận...</p>
      ) : totalComments === 0 ? (
        <p className="text-gray-500 text-center">No comments yet.</p>
      ) : (
        comments.map((comment, index) => (
          <Comment
            key={comment._id}
            comment={{ ...comment, index: index + 1 }}
            replies={comment.replies}
            onReply={(c) => setReplyTo(replyTo === c._id ? null : c._id)}
            replyTo={replyTo}
            newComment={newComment}
            setNewComment={setNewComment}
            handleSubmit={handleSubmit}
            user={user}
          />
        ))
      )}

      {!replyTo && (
        <>
          <div className="text-center font-[400] text-2xl mt-8">
            LEAVE A COMMENT
          </div>
          <DividerIcon size={200} />

          <form
            onSubmit={handleSubmit}
            className="border border-gray-300 mb-10 mt-6 rounded"
          >
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onClick={handleTextareaClick} // Điều hướng khi click
              className="w-full p-6 rounded-t resize-none h-[150px] focus:outline-none text-sm text-black placeholder:text-gray-500"
              placeholder={
                user ? "Write a comment..." : "Bạn cần đăng nhập để bình luận"
              }
              // KHÔNG disable textarea nữa để onClick vẫn hoạt động
            />

            <div className="flex justify-end border-t border-gray-300 px-4 py-3">
              <button
                type="submit"
                className="text-xs text-gray-500 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Comment
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
