"use client";

import { useState, useEffect } from "react";
import Comment from "./Comment";
import { commentsData } from "../data"; // ✅ import đúng (theo export const)
import { montserrat } from "../lib/font";
import DividerIcon from "./DividerIcon";

export default function CommentSection({ post }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    //  Tách các comment theo tầng
    const map = new Map();
    const roots = [];

    // Gộp theo ID để build cây
    commentsData.forEach((c) => {
      map.set(c._id, { ...c, replies: [] });
    });

    // Gắn reply vào parent
    map.forEach((comment) => {
      if (comment.parentId) {
        const parent = map.get(comment.parentId);
        if (parent) parent.replies.push(comment);
      } else {
        roots.push(comment); // top-level
      }
    });

    setComments(roots);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Fake comment submitted (demo mode)");
    setNewComment("");
  };

  return (
    <div className={`container mx-auto  p-4 w-full ${montserrat.className}`}>
      <h2 className="text-[20] font-[500] mb-2 text-center uppercase">
        {comments.length} THOUGHTS ON {post.title}
      </h2>
      <DividerIcon size={200} />

      {/* Comment List */}
      {comments.length === 0 ? (
        <p className="text-gray-500 text-center">No comments yet.</p>
      ) : (
        comments.map((comment, index) => (
          <Comment
            key={comment._id}
            comment={{ ...comment, index: index + 1 }}
            replies={comment.replies}
          />
        ))
      )}
      <div className="text-center font-[400] text-2xl">LEAVE A COMMENT</div>
      <DividerIcon size={200} />
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 mb-10 mt-6 rounded"
      >
        {/* Textarea */}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-6 rounded-t resize-none h-[150px] focus:outline-none text-sm text-black placeholder:text-gray-500"
          placeholder="Write a comment..."
        />

        {/* Button container */}
        <div className="flex justify-end border-t border-gray-300 px-4 py-3">
          <button
            type="submit"
            className="text-xs text-gray-500 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  );
}
