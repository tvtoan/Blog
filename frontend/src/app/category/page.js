"use client";

import React from "react";
import { postsData } from "../../data";
import Link from "next/link";
import { montserrat } from "../../lib/font"; // Assuming you have a montserrat font import

export default function CategoryList() {
  const categories = Array.from(
    new Set(postsData.flatMap((post) => post.categories || []))
  );

  const categoryCounts = categories.map((cat) => ({
    name: cat,
    count: postsData.filter((post) => post.categories?.includes(cat)).length,
  }));

  return (
    <div className={`container mx-auto p-4 ${montserrat.className}`}>
      <h1 className="text-3xl font-medium mb-4">Tất cả thể loại</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryCounts.map((cat) => (
          <Link
            key={cat.name}
            href={`/category/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="border border-[#e1c680] p-4 rounded-md shadow-sm hover:bg-[#f9f6f1] hover:text-[#e1c680] transition-all"
          >
            <h2 className="text-lg font-medium text-[#585656] mb-1">
              {cat.name}
            </h2>
            <p className="text-sm text-gray-500">{cat.count} bài viết</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
