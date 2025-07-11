"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deletePost, getPosts } from "@/app/services/postService";
import { getComments } from "@/app/services/commentService";
import useAuthUser from "@/app/hooks/useAuthUser";
import { getLocalizedText } from "@/lib/getLocalizedText";
import CreatePost from "@/components/CreatePost";
import useTranslation from "@/app/hooks/useTranslations";

export default function AdminPostPage() {
  const router = useRouter();
  const { user, loading } = useAuthUser();
  const [posts, setPosts] = useState([]);
  const [commentCounts, setCommentCounts] = useState({});
  const [fetching, setFetching] = useState(true);

  const translations = useTranslation();
  const t = translations.AdminPost;

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
      fetchAllComments(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setFetching(false);
    }
  };

  const fetchAllComments = async (posts) => {
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
  };

  const buildCommentTree = (rawComments) => {
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

  useEffect(() => {
    if (!loading && user?.role === "admin") {
      fetchPosts();
    }
  }, [loading, user]);

  const handleDelete = async (id) => {
    if (!confirm(t.confirmDelete)) return;
    try {
      await deletePost(id);
      fetchPosts();
    } catch (err) {
      alert(t.error + err.message);
    }
  };

  if (loading || fetching) {
    return <p className="text-center mt-10">{t.loading}</p>;
  }

  if (!user || user.role !== "admin") {
    return <p className="text-center mt-10 text-red-600">{t.noAccess}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#cfac1e] mb-10">
        {t.managePosts}
      </h1>

      <div className="bg-white border-none md:border md:border-gray-200 p-0 md:p-6 rounded-xl shadow-sm mb-12 w-auto md:w-full">
        <CreatePost t={t} onPostCreated={fetchPosts} />
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div
              className="mb-4 md:mb-0 cursor-pointer"
              onClick={() => router.push(`/posts/${post._id}`)}
            >
              <h3 className="text-lg font-semibold text-[#222] hover:text-[#cfac1e]">
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
              <p className="text-xs text-gray-500 mt-2">
                {commentCounts[post._id] ?? 0} {t.comments} | {post.readingTime}{" "}
                {t.minutes}
              </p>
            </div>
            <div className="space-x-4 flex-shrink-0">
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
        ))}
      </div>
    </div>
  );
}
