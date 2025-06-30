"use client";

import { useEffect, useState } from "react";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "@/app/services/postService";

export default function AdminPostPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    categories: "",
    sections: [],
    readingTime: 1,
    image: null,
  });
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      alert(error.message);
    }
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
      const postData = {
        ...newPost,
        categories: newPost.categories
          .split(",")
          .map((cat) => cat.trim())
          .filter(Boolean),
      };
      await createPost(postData);
      setNewPost({
        title: "",
        excerpt: "",
        categories: "",
        sections: [],
        readingTime: 1,
        image: null,
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

  const handleEdit = async () => {
    try {
      await updatePost(editingPost._id, editingPost);
      setEditingPost(null);
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

      {/* FORM TẠO BÀI VIẾT */}
      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm mb-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
          className="space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="border p-3 rounded w-full"
              placeholder="Tiêu đề bài viết"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              required
            />
            <input
              className="border p-3 rounded w-full"
              placeholder="Tóm tắt"
              value={newPost.excerpt}
              onChange={(e) =>
                setNewPost({ ...newPost, excerpt: e.target.value })
              }
            />
            <input
              className="border p-3 rounded w-full"
              placeholder="Thể loại (ngăn cách bằng dấu phẩy)"
              value={newPost.categories}
              onChange={(e) =>
                setNewPost({ ...newPost, categories: e.target.value })
              }
            />
            <input
              className="border p-3 rounded w-full"
              type="number"
              placeholder="Thời gian đọc (phút)"
              value={newPost.readingTime}
              onChange={(e) =>
                setNewPost({ ...newPost, readingTime: Number(e.target.value) })
              }
            />
          </div>

          <input
            type="file"
            className="border p-3 rounded w-full"
            onChange={(e) =>
              setNewPost({ ...newPost, image: e.target.files[0] })
            }
          />

          <div>
            <h3 className="text-lg font-semibold mb-2">Sections</h3>
            {newPost.sections.map((section, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50"
              >
                <input
                  className="border p-2 mb-2 w-full rounded"
                  placeholder="Tiêu đề nhỏ"
                  value={section.subtitle}
                  onChange={(e) =>
                    handleSectionChange(index, "subtitle", e.target.value)
                  }
                />
                <textarea
                  className="border p-2 mb-2 w-full rounded"
                  placeholder="Nội dung"
                  rows={3}
                  value={section.content}
                  onChange={(e) =>
                    handleSectionChange(index, "content", e.target.value)
                  }
                />
                <input
                  className="border p-2 w-full rounded"
                  placeholder="URL ảnh (tùy chọn)"
                  value={section.image}
                  onChange={(e) =>
                    handleSectionChange(index, "image", e.target.value)
                  }
                />
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

      {/* DANH SÁCH BÀI VIẾT */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm"
          >
            {editingPost?._id === post._id ? (
              <div>
                <input
                  className="border p-2 w-full mb-2 rounded"
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, title: e.target.value })
                  }
                />
                <textarea
                  className="border p-2 w-full mb-3 rounded"
                  value={editingPost.excerpt}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, excerpt: e.target.value })
                  }
                />
                <div className="space-x-3">
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={handleEdit}
                  >
                    💾 Lưu
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => setEditingPost(null)}
                  >
                    ❌ Huỷ
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-[#222]">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
                <div className="mt-3 space-x-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => setEditingPost(post)}
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
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
