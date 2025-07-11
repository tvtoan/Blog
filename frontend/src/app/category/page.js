"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { montserrat } from "../../lib/font";
import { getPosts } from "@/app/services/postService";
import { slugifyCategory } from "@/lib/slugifyCategory";
import useTranslation from "../hooks/useTranslations";

export default function CategoryList() {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const translations = useTranslation();
  const t = translations?.CategoryList || {};

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const posts = await getPosts();
        const categoryMap = {};

        posts.forEach((post) => {
          (post.categories || []).forEach((cat) => {
            categoryMap[cat] = (categoryMap[cat] || 0) + 1;
          });
        });

        setCategories(categoryMap);
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi khi tải chuyên mục.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4 text-center">{t.loading}</div>;
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
      <h1 className="text-3xl font-medium mb-4">{t.title}</h1>

      {Object.keys(categories).length === 0 ? (
        <p className="text-center text-sm text-gray-500">{t.noCategories}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(categories).map(([category, count]) => (
            <Link
              key={category}
              href={`/category/${slugifyCategory(category)}`}
              className="border border-[#e1c680] p-4 rounded-md shadow-sm hover:bg-[#f9f6f1] hover:text-[#e1c680] transition-all"
            >
              <h2 className="text-lg font-medium text-[#585656] mb-1">
                {category}
              </h2>
              <p className="text-sm text-gray-500">
                {count} {t.posts}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
