"use client";

import React from "react";
import { postsData } from "../../data";
import Link from "next/link";

export default function CategoryList() {
  const categories = Array.from(
    new Set(postsData.flatMap((post) => post.categories || []))
  );

  const categoryCounts = categories.map((cat) => ({
    name: cat,
    count: postsData.filter((post) => post.categories?.includes(cat)).length,
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Tất cả thể loại</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryCounts.map((cat) => (
          <Link
            key={cat.name}
            href={`/category/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="border p-4 rounded shadow hover:bg-gray-100"
          >
            <h2 className="text-xl font-semibold">{cat.name}</h2>
            <p className="text-gray-600">{cat.count} bài viết</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
