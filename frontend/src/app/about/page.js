"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaFacebook, FaRegStar, FaPen } from "react-icons/fa6";
import DividerIcon from "@/components/DividerIcon";
import { montserrat } from "@/lib/font";
import { getAboutData } from "@/app/services/aboutService";
import useAuthUser from "@/app/hooks/useAuthUser";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/getImageUrl";

const likes = [
  "/avatars/user1.jpg",
  "/avatars/user2.jpg",
  "/avatars/user3.jpg",
  "/avatars/user4.jpg",
];
const likeCount = 66;

export default function AboutPage() {
  const [post, setPost] = useState(null);
  const { user, loading } = useAuthUser();
  const router = useRouter();

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAboutData();
        setPost(data);
      } catch (error) {
        console.warn("Không có dữ liệu About Me. Dùng dữ liệu mặc định.");
        setPost({
          title: "About Me",
          excerpt: "",
          image: "",
          sections: [{ subtitle: "", content: "", image: "" }],
        });
      }
    };
    fetchData();
  }, []);

  if (!post) return <div className="text-center mt-10">Đang tải...</div>;

  return (
    <div className={`container mx-auto mb-10 p-4 ${montserrat.className}`}>
      {/* Tiêu đề */}
      <h1 className="text-[22px] font-normal mb-4 text-center">
        {post.title.toUpperCase()}
      </h1>

      <DividerIcon size={150} className="mb-6" />

      {/* Nút sửa nếu là admin */}
      {!loading && user?.role === "admin" && (
        <div className="flex absolute top-[43%] right-[35%] cursor-pointer justify-center mb-6">
          <button
            onClick={() => router.push("/admin/edit-about")}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-all"
          >
            <FaPen className="inline mr-2" />
            Sửa bài
          </button>
        </div>
      )}

      {/* Ảnh bìa */}
      {post.image && (
        <div className="flex justify-center mt-6 mb-10">
          <Image
            src={post.image}
            alt={post.title}
            width={750}
            height={420}
            className="object-cover rounded-lg shadow"
          />
        </div>
      )}

      {/* Trích đoạn */}
      {post.excerpt && (
        <p className="text-[16px] text-[#585656] italic leading-relaxed max-w-[750px] mx-auto mb-10 text-center">
          {post.excerpt}
        </p>
      )}

      {/* Nội dung chính */}
      <div className="max-w-[750px] mx-auto text-[16px] text-[#555] leading-relaxed space-y-10">
        {post.sections.map((section, index) => (
          <div key={index} className="space-y-4">
            {section.subtitle && (
              <h2 className="text-[18px] font-semibold text-[#444]">
                {section.subtitle}
              </h2>
            )}
            {section.content && <p>{section.content}</p>}

            {section.image && (
              <Image
                src={section.image}
                alt={section.subtitle}
                width={750}
                height={420}
                className="object-cover rounded-lg mt-4 shadow"
              />
            )}
          </div>
        ))}
      </div>

      {/* SHARE + LIKE */}
      <div className="w-full max-w-[750px] mx-auto mt-16">
        <div className="border-t border-t-gray-300 w-fit pt-6 mb-4 text-sm text-gray-700">
          SHARE THIS:
        </div>

        <button className="border border-gray-300 flex items-center gap-2 px-4 py-2 rounded transition-colors hover:bg-gray-100 mb-6">
          <FaFacebook className="text-blue-600" />
          <span className="text-sm">Facebook</span>
        </button>

        <div className="flex items-center gap-3 mb-10">
          <button className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition">
            <FaRegStar className="text-[#333]" />
            <span className="text-sm">Like</span>
          </button>

          <div className="flex -space-x-2">
            {likes.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`like-${index}`}
                className="w-7 h-7 rounded-full border-2 border-white shadow"
              />
            ))}
          </div>

          <span className="text-sm text-[#e1c680]">{likeCount} likes</span>
        </div>
      </div>
    </div>
  );
}
