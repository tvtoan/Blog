"use client";

import React, { useEffect, useState } from "react";
import { getPost, deletePost } from "@/app/services/postService";
import { getUser } from "@/app/services/authService";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  FaPencil,
  FaFolderOpen,
  FaComments,
  FaFacebook,
} from "react-icons/fa6";
import DividerIcon from "@/components/DividerIcon";
import Image from "next/image";
import CommentSection from "@/components/CommentSection";
import { montserrat } from "../../../lib/font";
import { getImageUrl } from "@/lib/getImageUrl";

export default function Post() {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Unwrap params using React.use()
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        setError(null);
        const postData = await getPost(id);
        setPost(postData);
        try {
          const userData = await getUser();
          setUser(userData);
        } catch (err) {
          // User might not be logged in, but post can still be viewed
          setUser(null);
        }
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra khi lấy dữ liệu.");
        console.error(err.message);
      }
    }
    if (id) {
      fetchData();
    } else {
      setError("ID không hợp lệ.");
    }
  }, [id]);

  const handleShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(shareUrl, "_blank");
  };

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!post) {
    return <div className="container mx-auto p-4 text-center">Đang tải...</div>;
  }

  const isAuthor =
    user &&
    post.owner &&
    user._id === post.owner._id.toString() &&
    user.role === "admin";

  return (
    <div className={`container mx-auto mb-10 p-4 ${montserrat.className}`}>
      <h1 className="text-[22px] font-normal text-center">
        {post.title.toUpperCase()}
      </h1>
      <DividerIcon size={150} className="mb-6" />
      <div className="flex gap-8 mt-4 items-center text-gray-500 mb-4 text-sm">
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
                  className="hover:underline"
                >
                  {cat}
                  {index < post.categories.length - 1 ? ", " : ""}
                </Link>
              ))
            : "Không có danh mục"}
        </div>
        <div>
          <FaComments className="inline mr-1 text-[#7687a5]" />
          {post.commentCount || 0} Comments
        </div>
      </div>
      {post.image && (
        <Image
          src={getImageUrl(post.image)}
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
              <img
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
      <button
        onClick={handleShare}
        className="border border-gray-300 flex gap-3 px-4 py-2 rounded transition-colors hover:bg-gray-100"
      >
        <FaFacebook className="mt-1 text-blue-600" /> Facebook
      </button>

      <div className="w-[90px] border-t border-gray-300 mt-8 mb-[100px]"></div>
      <div className="flex items-start justify-between gap-4 pb-6 mb-[100px]">
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden shrink-0">
          <img
            src={post.owner?.avatar || "/default-avatar.jpg"}
            alt={`${post.owner?.name || "User"} avatar`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-[#7687a5] mb-4">
            POSTED BY{" "}
            <span className="text-[#f5b04e] font-[500] uppercase">
              {post.owner?.name || "Unknown"}
            </span>
          </p>
          <p className="text-[#555] leading-relaxed">{post.owner?.bio}</p>
        </div>
      </div>
      <CommentSection post={post} />
    </div>
  );
}
