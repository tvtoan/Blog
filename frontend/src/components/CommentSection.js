"use client";

import { useState, useEffect } from "react";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comment/${postId}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (!token) return alert("Please log in to comment");

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: newComment, postId }),
    });
    setNewComment("");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comment/${postId}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Write a comment..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Submit
        </button>
      </form>
      {comments.map((comment) => (
        <div key={comment._id} className="mb-2 p-2 bg-white rounded shadow">
          <p className="text-gray-700">{comment.content}</p>
          <p className="text-sm text-gray-500">
            By {comment.user.name} on{" "}
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
