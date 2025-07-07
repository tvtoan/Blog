"use client";

import { useState, useEffect } from "react";
import { createPost, getUser } from "@/app/services/postService";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState({ vi: "", jp: "" });
  const [excerpt, setExcerpt] = useState({ vi: "", jp: "" });
  const [image, setImage] = useState("");
  const [sections, setSections] = useState([
    { subtitle: { vi: "", jp: "" }, content: { vi: "", jp: "" }, image: "" },
  ]);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("vi");
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser();
        if (userData.role !== "admin") {
          setError(
            language === "vi"
              ? "Chỉ admin mới được đăng bài."
              : "管理者のみ投稿可能です。"
          );
          router.push("/login");
        } else {
          setUser(userData);
        }
      } catch (error) {
        setError(
          language === "vi"
            ? "Vui lòng đăng nhập để đăng bài."
            : "投稿するにはログインしてください。"
        );
        router.push("/login");
      }
    }
    fetchUser();
  }, [router, language]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        title,
        excerpt,
        image,
        sections,
      };
      await createPost(postData);
      alert(
        language === "vi"
          ? "✅ Bài viết đã được tạo!"
          : "✅ 投稿が作成されました！"
      );
      setTitle({ vi: "", jp: "" });
      setExcerpt({ vi: "", jp: "" });
      setImage("");
      setSections([
        {
          subtitle: { vi: "", jp: "" },
          content: { vi: "", jp: "" },
          image: "",
        },
      ]);
      router.push("/");
    } catch (error) {
      console.error(error.message);
      alert(
        error.message ||
          (language === "vi"
            ? "❌ Tạo bài viết thất bại."
            : "❌ 投稿作成に失敗しました。")
      );
    }
  };

  const addSection = () => {
    setSections([
      ...sections,
      { subtitle: { vi: "", jp: "" }, content: { vi: "", jp: "" }, image: "" },
    ]);
  };

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4 text-center">
        {language === "vi" ? "Đang tải..." : "読み込み中..."}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-center">
          {language === "vi" ? "✍️ Tạo bài viết mới" : "✍️ 新しい投稿を作成"}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage("vi")}
            className={`px-4 py-2 rounded ${
              language === "vi" ? "bg-[#cfac1e] text-white" : "bg-gray-200"
            }`}
          >
            🇻🇳
          </button>
          <button
            onClick={() => setLanguage("jp")}
            className={`px-4 py-2 rounded ${
              language === "jp" ? "bg-[#cfac1e] text-white" : "bg-gray-200"
            }`}
          >
            🇯🇵
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-[750px] mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium">
            {language === "vi" ? "Tiêu đề" : "タイトル"} (
            {language.toUpperCase()})
          </label>
          <input
            type="text"
            value={title[language]}
            onChange={(e) => setTitle({ ...title, [language]: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">
            {language === "vi" ? "Tóm tắt" : "概要"} ({language.toUpperCase()})
          </label>
          <textarea
            value={excerpt[language]}
            onChange={(e) =>
              setExcerpt({ ...excerpt, [language]: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">
            {language === "vi" ? "Ảnh bìa (URL)" : "カバー画像 (URL)"}
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {sections.map((section, index) => (
          <div key={index} className="mb-4 border p-4 rounded bg-gray-50">
            <label className="block text-sm font-medium mb-1">
              {language === "vi"
                ? `Phần ${index + 1} - Tiêu đề nhỏ`
                : `セクション ${index + 1} - 小見出し`}{" "}
              ({language.toUpperCase()})
            </label>
            <input
              type="text"
              value={section.subtitle[language]}
              onChange={(e) => {
                const newSections = [...sections];
                newSections[index].subtitle[language] = e.target.value;
                setSections(newSections);
              }}
              className="w-full p-2 border rounded"
            />

            <label className="block text-sm font-medium mt-2 mb-1">
              {language === "vi"
                ? `Phần ${index + 1} - Nội dung`
                : `セクション ${index + 1} - 内容`}{" "}
              ({language.toUpperCase()})
            </label>
            <textarea
              value={section.content[language]}
              onChange={(e) => {
                const newSections = [...sections];
                newSections[index].content[language] = e.target.value;
                setSections(newSections);
              }}
              className="w-full p-2 border rounded"
            />

            <label className="block text-sm font-medium mt-2 mb-1">
              {language === "vi"
                ? `Phần ${index + 1} - Ảnh (URL)`
                : `セクション ${index + 1} - 画像 (URL)`}
            </label>
            <input
              type="text"
              value={section.image}
              onChange={(e) => {
                const newSections = [...sections];
                newSections[index].image = e.target.value;
                setSections(newSections);
              }}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addSection}
          className="bg-gray-200 px-4 py-2 rounded mb-4 hover:bg-gray-300"
        >
          {language === "vi" ? "➕ Thêm phần mới" : "➕ セクションを追加"}
        </button>

        <button
          type="submit"
          className="bg-[#cfac1e] text-white px-6 py-2 rounded hover:bg-[#b89514]"
        >
          {language === "vi" ? "💾 Đăng bài" : "💾 投稿する"}
        </button>
      </form>
    </div>
  );
}
