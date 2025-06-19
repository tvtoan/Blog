"use client";

import { use } from "react";
import { postsData } from "../../../data";
import Link from "next/link";
import { FaPencil, FaFolderOpen } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";
import DividerIcon from "@/components/DividerIcon";
import Image from "next/image";
export default function Post({ params }) {
  const { id } = use(params); // ✅ unwrap Promise

  const post = postsData.find((p) => p._id === id);

  if (!post) {
    return <div className="container mx-auto p-4">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-[20px] font-normal mb-4 text-center">
        {post.title.toUpperCase()}
      </h1>
      <DividerIcon size={150} className="mb-6" />

      {/* Metadata: Author, Category, Comment */}
      <div className="flex gap-8 items-center text-gray-500 mb-4 text-sm">
        <div>
          <FaPencil className="inline mr-1 text-[#7687a5]" />
          {post.owner?.name || "Lemonari"}
        </div>
        <div>
          <FaFolderOpen className="inline mr-1 text-[#7687a5]" />
          {post.categories?.length > 0
            ? post.categories.map((cat, index) => (
                <Link
                  key={index}
                  href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className=" hover:underline "
                >
                  {cat}
                  {index < post.categories.length - 1 ? ", " : ""}
                </Link>
              ))
            : "Không có danh mục"}
        </div>
        <div>
          <FaComments className="inline mr-1 text-[#7687a5]" />
          {post.comments?.length || 0} Comments
        </div>
      </div>

      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={750}
          height={420}
          className=" object-cover rounded-lg mb-4"
        />
      )}

      <p className="text-[#7687a5] mb-4">
        Đăng bởi {post.owner?.name || "Lemonari"} vào{" "}
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      <div
        className="prose mb-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        Chia sẻ trên Facebook
      </button>
    </div>
  );
}
