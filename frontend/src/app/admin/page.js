"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { deletePost, getPosts } from "@/app/services/postService";
import { getComments } from "@/app/services/commentService";
import useAuthUser from "@/app/hooks/useAuthUser";
import { getLocalizedText } from "@/lib/getLocalizedText";
import useTranslation from "@/app/hooks/useTranslations";

const DEFAULT_IMAGE = "/default-image.jpg";
const BASE_URL = "http://localhost:5000";

const formatImage = (image) => {
  if (!image || typeof image !== "string") {
    return DEFAULT_IMAGE;
  }
  if (image.startsWith("/uploads/")) {
    return `${BASE_URL}${image}`;
  }
  if (image.startsWith("data:image/")) {
    return image;
  }
  try {
    const url = new URL(image);
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
    if (imageExtensions.test(url.pathname)) {
      return image;
    }
  } catch {
    // Không phải URL hợp lệ
  }
  return DEFAULT_IMAGE;
};

export default function AdminPostPage() {
  const router = useRouter();
  const { user, loading } = useAuthUser();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [commentCounts, setCommentCounts] = useState({});
  const [fetching, setFetching] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const translations = useTranslation();
  const t = translations.AdminPost || {};

  const fetchPosts = useCallback(async () => {
    try {
      const data = await getPosts();
      setPosts(data);
      setFilteredPosts(data);
      fetchAllComments(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setFetching(false);
    }
  }, []);

  const fetchAllComments = useCallback(async (posts) => {
    const counts = {};
    await Promise.all(
      posts.map(async (post) => {
        try {
          const rawComments = await getComments(post._id);
          const count = countAllComments(buildCommentTree(rawComments));
          counts[post._id] = count;
        } catch {
          counts[post._id] = 0;
        }
      })
    );
    setCommentCounts(counts);
  }, []);

  const buildCommentTree = useCallback((rawComments) => {
    const map = new Map();
    const roots = [];
    rawComments.forEach((c) => map.set(c._id, { ...c, replies: [] }));
    map.forEach((comment) => {
      if (comment.parentId) {
        const parent = map.get(comment.parentId);
        if (parent) parent.replies.push(comment);
      } else roots.push(comment);
    });
    return roots;
  }, []);

  const countAllComments = useCallback((comments) => {
    let count = 0;
    comments.forEach((comment) => {
      count += 1;
      if (comment.replies?.length > 0) {
        count += countAllComments(comment.replies);
      }
    });
    return count;
  }, []);

  const handleFilter = useCallback(() => {
    const from = startDate ? new Date(startDate) : null;
    const to = endDate ? new Date(endDate) : null;

    const filtered = posts.filter((post) => {
      const createdAt = new Date(post.createdAt);
      if (from && createdAt < from) return false;
      if (to && createdAt > to) return false;
      return true;
    });

    setFilteredPosts(filtered);
    setVisibleCount(10);
  }, [startDate, endDate, posts]);

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm(t.confirmDelete)) return;
      try {
        await deletePost(id);
        fetchPosts();
      } catch (err) {
        alert(t.error + err.message);
      }
    },
    [fetchPosts, t]
  );

  useEffect(() => {
    if (!loading && user?.role === "admin") {
      fetchPosts();
    }
  }, [loading, user, fetchPosts]);

  if (loading || fetching) {
    return (
      <p className="text-center mt-10 text-lg text-gray-500">{t.loading}</p>
    );
  }

  if (!user || user.role !== "admin") {
    return <p className="text-center mt-10 text-red-600">{t.noAccess}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 min-h-[calc(100vh-60px)]">
      <h1 className="text-4xl font-bold text-yellow-600 mb-8 text-center">
        {t.managePosts}
      </h1>
      <div className="bg-white p-6 rounded-lg shadow mb-8 flex flex-col md:flex-row gap-4 md:items-end justify-between">
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label className="text-sm font-medium text-gray-700">
            {t.startDate || "Từ ngày"}
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md shadow-sm"
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label className="text-sm font-medium text-gray-700">
            {t.endDate || "Đến ngày"}
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md shadow-sm"
          />
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            onClick={handleFilter}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition shadow"
          >
            🔍 {t.filter || "Lọc"}
          </button>
          <button
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setFilteredPosts(posts);
              setVisibleCount(10);
            }}
            className="text-gray-500 text-sm underline hover:text-gray-800 transition"
          >
            ❌ {t.clear || "Xóa lọc"}
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {filteredPosts.slice(0, visibleCount).map((post) => (
          <div
            key={post._id}
            className="bg-white p-6 rounded-xl shadow border hover:border-yellow-500 transition flex flex-col md:flex-row gap-4"
          >
            {post.image && (
              <div className="flex-shrink-0">
                <img
                  src={formatImage(post.image)}
                  alt={getLocalizedText(
                    post.title,
                    translations.language,
                    "No Title"
                  )}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
            )}
            <div className="flex-1">
              <div
                className="cursor-pointer"
                onClick={() => router.push(`/posts/${post._id}`)}
              >
                <h3 className="text-xl font-semibold text-gray-800 hover:text-yellow-600 transition">
                  {getLocalizedText(
                    post.title,
                    translations.language,
                    "No Title"
                  )}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {getLocalizedText(
                    post.excerpt,
                    translations.language,
                    "No Excerpt"
                  )}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {commentCounts[post._id] ?? 0} {t.comments} •{" "}
                  {post.readingTime} {t.minutes}
                </p>
              </div>
              <div className="mt-4 flex gap-4">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => router.push(`/admin/edit-post/${post._id}`)}
                >
                  ✏️ {t.edit}
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(post._id)}
                >
                  🗑️ {t.delete}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < filteredPosts.length && (
        <div className="text-center mt-10">
          <button
            className="text-yellow-600 font-semibold hover:underline"
            onClick={() => setVisibleCount((prev) => prev + 10)}
          >
            ⬇ {t.oldPosts || "Old Posts"}
          </button>
        </div>
      )}
    </div>
  );
}
