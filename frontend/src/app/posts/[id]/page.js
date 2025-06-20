"use client";

import { use } from "react";
import { postsData, userData } from "../../../data";
import Link from "next/link";
import { FaPencil, FaFolderOpen } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

import DividerIcon from "@/components/DividerIcon";
import Image from "next/image";
import CommentSection from "@/components/CommentSection";
import { montserrat } from "../../../lib/font";

export default function Post({ params }) {
  const { id } = use(params); // ✅ unwrap Promise

  const post = postsData.find((p) => p._id === id);

  if (!post) {
    return <div className="container mx-auto p-4">Đang tải...</div>;
  }

  return (
    <div className={`container mx-auto mb-10 p-4 ${montserrat.className}`}>
      <h1 className="text-[22px] font-normal mb-4 text-center">
        {post.title.toUpperCase()}
      </h1>
      <DividerIcon size={150} className="mb-6" />

      {/* Metadata: Author, Category, Comment */}
      <div className="flex gap-8 mt-4 items-center text-gray-500 mb-4 text-sm">
        <div>
          <FaPencil className="inline mr-1 text-[#7687a5]" />
          Lemonari
        </div>
        <div>
          <FaFolderOpen className="inline mr-1 text-[#7687a5]" />
          {post.categories?.length > 0
            ? post.categories.map((cat, index) => (
                <Link
                  key={index}
                  href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:underline"
                >
                  {cat}
                  {index < post.categories.length - 1 ? ", " : ""}
                </Link>
              ))
            : "Không có danh mục"}
        </div>
        <div>
          <FaComments className="inline mr-1 text-[#7687a5]" />0 Comments
        </div>
      </div>

      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={750}
          height={420}
          className="object-cover rounded-lg mb-4"
        />
      )}

      <p className="text-[16px] mt-10 mb-14">{post.excerpt}</p>

      <div className="prose mb-16">
        {post.sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-[18px] font-semibold mb-6">
              {section.subtitle.toUpperCase()}
            </h2>

            <p className="text-[16px] w-[750px]">{section.content}</p>

            {section.image && (
              <Image
                src={section.image}
                alt={section.subtitle}
                width={750}
                height={420}
                className="object-cover rounded-lg mb-14 mt-8"
              />
            )}
          </div>
        ))}
      </div>
      <div className="border-t border-t-gray-300 w-fit pt-6 mb-4 text-sm text-gray-700">
        SHARE THIS:
      </div>

      <button className="border border-gray-300 flex gap-3 px-4 py-2 rounded transition-colors">
        <FaFacebook className="mt-1" /> Facebook
      </button>

      <div className="w-[90px] border-t border-gray-300 mt-8 mb-[100px]"></div>
      <div className="flex items-start justify-between gap-4  pb-6 mb-[100px]">
        {/* Avatar */}
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden shrink-0">
          <img
            src={userData.avatar}
            alt={`${userData.username} avatar`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-[#7687a5] mb-4">
            POSTED BY{"  "}
            <span className="text-[#f5b04e] font-[500] uppercase">
              {userData.name}
            </span>
          </p>
          <p className="text-[#555] leading-relaxed">{userData.bio}</p>
        </div>
      </div>
      <CommentSection post={post} />
    </div>
  );
}
