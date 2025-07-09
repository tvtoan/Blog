"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPost, deletePost, getPosts } from "@/app/services/postService";
import { getComments } from "@/app/services/commentService";
import { useLanguage } from "@/app/context/LanguageContext";
import useAuthUser from "@/app/hooks/useAuthUser";
import { getLocalizedText } from "@/lib/getLocalizedText";

const text = {
  vi: {
    managePosts: "🛠️ Quản lý bài viết",
    title: "Tiêu đề (Tiếng Việt)",
    title_1: "Tiêu đề (Tiếng Nhật)",
    excerpt: "Tóm tắt (Tiếng Việt)",
    excerpt_1: "Tóm tắt (Tiếng Nhật)",
    categories: "Thể loại (dấu phẩy)",
    readingTime: "Thời gian đọc",
    imageUrl: "URL ảnh bài viết",
    sections: "Sections",
    addSection: "Thêm section",
    submit: "Đăng bài viết",
    confirmDelete: "Xác nhận xoá bài viết?",
    edit: "Sửa",
    delete: "Xoá",
    comments: "bình luận",
    minutes: "phút đọc",
    smallTitle: "Tiêu đề nhỏ (Tiếng Việt)",
    smallTitle_1: "Tiêu đề nhỏ (Tiếng Nhật)",
    content: "Nội dung (Tiếng Việt)",
    content_1: "Nội dung (Tiếng Nhật)",
    image: "URL ảnh",
    saving: "💾 Đang lưu...",
    loading: "Đang tải dữ liệu...",
    noAccess: "🚫 Bạn không có quyền truy cập trang này.",
    saved: "✅ Đã lưu bài viết.",
    error: "❌ Lỗi khi lưu: ",
  },
  jp: {
    managePosts: "🛠️ 投稿管理",
    title: "タイトル (日本語)",
    title_1: "タイトル (英語)",
    excerpt: "要約 (日本語)",
    excerpt_1: "要約 (英語)",
    categories: "カテゴリー (カンマ区切り)",
    readingTime: "読書時間",
    imageUrl: "投稿画像URL",
    sections: "セクション",
    addSection: "セクションを追加",
    submit: "投稿する",
    confirmDelete: "投稿を削除しますか？",
    edit: "編集",
    delete: "削除",
    comments: "コメント",
    minutes: "分",
    smallTitle: "小見出し (日本語)",
    smallTitle_1: "小見出し (英語)",
    content: "内容 (日本語)",
    content_1: "内容 (英語)",
    image: "画像URL",
    saving: "💾 保存中...",
    loading: "データを読み込み中...",
    noAccess: "🚫 このページへのアクセス権がありません。",
    saved: "✅ 投稿が保存されました。",
    error: "❌ 保存エラー: ",
  },
};

export default function AdminPostPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { user, loading } = useAuthUser();
  const [posts, setPosts] = useState([]);
  const [commentCounts, setCommentCounts] = useState({});
  const [newPost, setNewPost] = useState({
    title: { vi: "", jp: "" },
    excerpt: { vi: "", jp: "" },
    categories: "",
    sections: [
      { subtitle: { vi: "", jp: "" }, content: { vi: "", jp: "" }, image: "" },
    ],
    readingTime: 1,
    image: "",
  });
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(true);

  const t = text[language] || text.vi;

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

  const handleAddSection = () => {
    setNewPost((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          subtitle: { vi: "", jp: "" },
          content: { vi: "", jp: "" },
          image: "",
        },
      ],
    }));
  };

  const handleSectionChange = (index, field, lang, value) => {
    const updated = [...newPost.sections];
    if (field === "subtitle" || field === "content") {
      updated[index][field][lang] = value;
    } else {
      updated[index][field] = value;
    }
    setNewPost({ ...newPost, sections: updated });
  };

  const handleCreate = async () => {
    setSaving(true);
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
        title: { vi: "", jp: "" },
        excerpt: { vi: "", jp: "" },
        categories: "",
        sections: [
          {
            subtitle: { vi: "", jp: "" },
            content: { vi: "", jp: "" },
            image: "",
          },
        ],
        readingTime: 1,
        image: "",
      });
      alert(t.saved);
      fetchPosts();
    } catch (err) {
      alert(t.error + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(t.confirmDelete)) return;
    try {
      await deletePost(id);
      fetchPosts();
    } catch (err) {
      alert(t.error + err.message);
    }
  };

  const handleInputChange = (field, lang, value) => {
    setNewPost((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
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

      <div className="bg-white border md:w-full w-auto border-gray-200 p-6 rounded-xl shadow-sm mb-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
          className="space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">{t.title}</label>
              <input
                className="border p-3 rounded w-full"
                value={newPost.title.vi}
                onChange={(e) =>
                  handleInputChange("title", "vi", e.target.value)
                }
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">{t.title_1}</label>
              <input
                className="border p-3 rounded w-full"
                value={newPost.title.jp}
                onChange={(e) =>
                  handleInputChange("title", "jp", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">{t.excerpt}</label>
              <input
                className="border p-3 rounded w-full"
                value={newPost.excerpt.vi}
                onChange={(e) =>
                  handleInputChange("excerpt", "vi", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">{t.excerpt_1}</label>
              <input
                className="border p-3 rounded w-full"
                value={newPost.excerpt.jp}
                onChange={(e) =>
                  handleInputChange("excerpt", "jp", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">{t.categories}</label>
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
                {t.readingTime}
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
            <label className="block mb-1 font-semibold">{t.imageUrl}</label>
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

          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-2">{t.sections}</h3>
            {newPost.sections.map((section, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50"
              >
                <div>
                  <label className="block mb-1 font-semibold">
                    {t.smallTitle}
                  </label>
                  <input
                    className="border p-2 mb-2 w-full rounded"
                    value={section.subtitle.vi}
                    onChange={(e) =>
                      handleSectionChange(
                        index,
                        "subtitle",
                        "vi",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">
                    {t.smallTitle_1}
                  </label>
                  <input
                    className="border p-2 mb-2 w-full rounded"
                    value={section.subtitle.jp}
                    onChange={(e) =>
                      handleSectionChange(
                        index,
                        "subtitle",
                        "jp",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">
                    {t.content}
                  </label>
                  <textarea
                    className="border p-2 mb-2 w-full rounded"
                    rows={3}
                    value={section.content.vi}
                    onChange={(e) =>
                      handleSectionChange(
                        index,
                        "content",
                        "vi",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">
                    {t.content_1}
                  </label>
                  <textarea
                    className="border p-2 mb-2 w-full rounded"
                    rows={3}
                    value={section.content.jp}
                    onChange={(e) =>
                      handleSectionChange(
                        index,
                        "content",
                        "jp",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">{t.image}</label>
                  <input
                    className="border p-2 w-full rounded"
                    value={section.image}
                    onChange={(e) =>
                      handleSectionChange(index, "image", null, e.target.value)
                    }
                  />
                  {section.image && (
                    <img
                      src={section.image}
                      alt="Section preview"
                      className="mt-2 rounded border max-w-xs"
                    />
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSection}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900"
            >
              + {t.addSection}
            </button>
          </div>

          <div className="text-right pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#cfac1e] text-white font-semibold px-6 py-2 rounded hover:bg-[#b89514] disabled:opacity-50"
            >
              {saving ? t.saving : t.submit}
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
                {getLocalizedText(post.title, language, "No Title")}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {getLocalizedText(post.excerpt, language, "No Excerpt")}
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
