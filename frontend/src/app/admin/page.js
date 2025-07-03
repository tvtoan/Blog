"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createPost, deletePost, getPosts } from "@/app/services/postService";
import { getComments } from "@/app/services/commentService";

export default function AdminPostPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [commentCounts, setCommentCounts] = useState({});
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    categories: "",
    sections: [],
    readingTime: 1,
    image: "",
  });

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
      fetchAllComments(data);
    } catch (error) {
      alert(error.message);
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
    fetchPosts();
  }, []);

  const handleAddSection = () => {
    setNewPost({
      ...newPost,
      sections: [...newPost.sections, { subtitle: "", content: "", image: "" }],
    });
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...newPost.sections];
    updated[index][field] = value;
    setNewPost({ ...newPost, sections: updated });
  };

  const handleCreate = async () => {
    try {
      const payload = {
        title: newPost.title,
        excerpt: newPost.excerpt,
        readingTime: newPost.readingTime,
        image: newPost.image,
        categories: newPost.categories.split(",").map((c) => c.trim()),
        sections: newPost.sections,
      };

      await createPost(payload);

      setNewPost({
        title: "",
        excerpt: "",
        categories: "",
        sections: [],
        readingTime: 1,
        image: "",
      });
      fetchPosts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Xác nhận xoá bài viết?")) return;
    try {
      await deletePost(id);
      fetchPosts();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#cfac1e] mb-10">
        🛠️ Quản lý bài viết
      </h1>

      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm mb-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
          className="space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">
                Tiêu đề bài viết
              </label>
              <input
                className="border p-3 rounded w-full"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Tóm tắt</label>
              <input
                className="border p-3 rounded w-full"
                value={newPost.excerpt}
                onChange={(e) =>
                  setNewPost({ ...newPost, excerpt: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">
                Thể loại (ngăn cách bằng dấu phẩy)
              </label>
              <input
                className="border p-3 rounded w-full"
                value={newPost.categories}
                onChange={(e) =>
                  setNewPost({ ...newPost, categories: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">
                Thời gian đọc (phút)
              </label>
              <input
                className="border p-3 rounded w-full"
                type="number"
                value={newPost.readingTime}
                onChange={(e) =>
                  setNewPost({
                    ...newPost,
                    readingTime: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">URL ảnh bài viết</label>
            <input
              type="text"
              className="border p-3 rounded w-full"
              value={newPost.image}
              onChange={(e) =>
                setNewPost({ ...newPost, image: e.target.value })
              }
            />
            {newPost.image && (
              <img
                src={newPost.image}
                alt="Preview"
                className="mt-2 rounded border max-w-xs"
              />
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Sections</h3>
            {newPost.sections.map((section, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50"
              >
                <div>
                  <label className="block mb-1 font-semibold">
                    Tiêu đề nhỏ
                  </label>
                  <input
                    className="border p-2 mb-2 w-full rounded"
                    value={section.subtitle}
                    onChange={(e) =>
                      handleSectionChange(index, "subtitle", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Nội dung</label>
                  <textarea
                    className="border p-2 mb-2 w-full rounded"
                    rows={3}
                    value={section.content}
                    onChange={(e) =>
                      handleSectionChange(index, "content", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">
                    URL ảnh (tùy chọn)
                  </label>
                  <input
                    className="border p-2 w-full rounded"
                    value={section.image}
                    onChange={(e) =>
                      handleSectionChange(index, "image", e.target.value)
                    }
                  />
                </div>

                {section.image && (
                  <img
                    src={section.image}
                    alt="Section preview"
                    className="mt-2 rounded border max-w-xs"
                  />
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSection}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900"
            >
              + Thêm section
            </button>
          </div>

          <div className="text-right pt-4">
            <button
              type="submit"
              className="bg-[#cfac1e] text-white font-semibold px-6 py-2 rounded hover:bg-[#b89514]"
            >
              📤 Đăng bài viết
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div
              className="mb-4 md:mb-0 cursor-pointer"
              onClick={() => router.push(`/post/${post._id}`)}
            >
              <h3 className="text-lg font-semibold text-[#222] hover:text-[#cfac1e]">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600">{post.excerpt}</p>
              <p className="text-xs text-gray-500">
                📝 {commentCounts[post._id] ?? 0} bình luận | ⏱️{" "}
                {post.readingTime} phút đọc
              </p>
            </div>

            <div className="space-x-4 flex-shrink-0">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => router.push(`/admin/edit-post/${post._id}`)}
              >
                ✏️ Sửa
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleDelete(post._id)}
              >
                🗑️ Xoá
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
