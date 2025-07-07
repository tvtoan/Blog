"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { montserrat } from "../../lib/font";
import { getPosts } from "@/app/services/postService";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("vi"); // ✅ Ngôn ngữ: vi | jp

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const posts = await getPosts();
        const uniqueCategories = Array.from(
          new Set(posts.flatMap((post) => post.categories || []))
        );
        const categoryCounts = uniqueCategories.map((cat) => ({
          name: cat,
          count: posts.filter((post) => post.categories?.includes(cat)).length,
        }));
        setCategories(categoryCounts);
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra khi lấy danh mục.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Đang tải...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className={`container mx-auto p-4 ${montserrat.className}`}>
      {/* Nút chọn ngôn ngữ */}
      <div className="flex justify-end mb-6 space-x-4">
        <button
          onClick={() => setLanguage("vi")}
          className={`px-4 py-2 rounded ${
            language === "vi" ? "bg-[#cfac1e] text-white" : "bg-gray-200"
          }`}
        >
          🇻🇳 Tiếng Việt
        </button>
        <button
          onClick={() => setLanguage("jp")}
          className={`px-4 py-2 rounded ${
            language === "jp" ? "bg-[#cfac1e] text-white" : "bg-gray-200"
          }`}
        >
          🇯🇵 日本語
        </button>
      </div>

      <h1 className="text-3xl font-medium mb-4">
        {language === "vi" ? "Tất cả thể loại" : "すべてのカテゴリー"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/category/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="border border-[#e1c680] p-4 rounded-md shadow-sm hover:bg-[#f9f6f1] hover:text-[#e1c680] transition-all"
          >
            <h2 className="text-lg font-medium text-[#585656] mb-1">
              {cat.name}
            </h2>
            <p className="text-sm text-gray-500">
              {language === "vi"
                ? `${cat.count} bài viết`
                : `${cat.count} 記事`}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
