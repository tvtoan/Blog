"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { FaFacebook, FaRegStar, FaPen, FaStar } from "react-icons/fa6";
import DividerIcon from "@/components/DividerIcon";
import { montserrat } from "@/lib/font";
import {
  getAboutData,
  likeAbout,
  unlikeAbout,
} from "@/app/services/aboutService";
import useAuthUser from "@/app/hooks/useAuthUser";
import { useRouter } from "next/navigation";
import useTranslation from "@/app/hooks/useTranslations";
import { getLocalizedText } from "@/lib/getLocalizedText";
import Skeleton from "@/components/Skeleton";
import getValidImage from "@/lib/getValidImage";

const DEFAULT_IMAGE = "/default-image.jpg";
const BASE_URL = "http://localhost:5000";

const formatImage = (image) => {
  if (!image || typeof image !== "string") {
    return DEFAULT_IMAGE;
  }
  if (image.startsWith("/uploads/")) {
    return `${BASE_URL}${image}`;
  }
  if (image.startsWith("data:image/")) {
    return image;
  }
  try {
    const url = new URL(image);
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
    if (imageExtensions.test(url.pathname)) {
      return image;
    }
  } catch {
    // Không phải URL hợp lệ
  }
  return DEFAULT_IMAGE;
};

const renderTiptapContent = (content, language, defaultContent) => {
  if (!content || !content[language]) return defaultContent;

  const nodes = content[language]?.content || [];
  return nodes.map((node, index) => {
    if (node.type === "heading") {
      const level = node.attrs?.level || 2;
      const HeadingTag = `h${level}`;
      return (
        <HeadingTag
          key={index}
          className="text-[18px] font-semibold text-[#444]"
        >
          {node.content?.map((c) => c.text).join("") || ""}
        </HeadingTag>
      );
    }
    if (node.type === "paragraph") {
      return (
        <p key={index} className="text-[16px] text-[#555] leading-relaxed">
          {node.content?.map((c) => c.text).join("") || ""}
        </p>
      );
    }
    return null;
  });
};

export default function AboutPage() {
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const { user, loading } = useAuthUser();
  const router = useRouter();
  const translations = useTranslation();
  const t = translations?.About || {};
  const language = translations.language || "vi";

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    currentUrl
  )}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const data = await getAboutData();
        setPost(data);

        if (user && data.likes?.some((likeUser) => likeUser._id === user._id)) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      } catch (error) {
        setPost({
          title: { vi: t.defaultTitle, jp: t.defaultTitle },
          excerpt: { vi: t.defaultExcerpt, jp: t.defaultExcerpt },
          image: "",
          content: {
            vi: { type: "doc", content: [] },
            jp: { type: "doc", content: [] },
          },
          likes: [],
        });
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [language, t, user]);

  const handleLikeToggle = useCallback(async () => {
    if (!user) return;

    try {
      const res = isLiked ? await unlikeAbout() : await likeAbout();
      setPost((prev) => ({ ...prev, likes: res.users || [] }));
      setIsLiked(!isLiked);
    } catch (err) {
      console.error(err);
    }
  }, [isLiked, user]);

  const content = useMemo(
    () => renderTiptapContent(post?.content, language, t.defaultContent),
    [post?.content, language, t.defaultContent]
  );

  if (loadingData) return <Skeleton variant="about" />;

  if (!post) return <div className="text-center mt-10">{t.loading}</div>;

  return (
    <div className={`container mx-auto mb-10 p-4 ${montserrat.className}`}>
      <h1 className="text-[22px] font-normal mb-4 text-center">
        {getLocalizedText(post.title, language, t.defaultTitle).toUpperCase()}
      </h1>

      <DividerIcon size={150} className="mb-6" />

      {!loading && user?.role === "admin" && (
        <div className="flex absolute top-[43%] right-[35%] cursor-pointer justify-center mb-6">
          <button
            onClick={() => router.push("/admin/edit-about")}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-all"
          >
            <FaPen className="inline mr-2" />
            {t.editButton}
          </button>
        </div>
      )}

      {post.image && (
        <div className="flex justify-center mt-6 mb-10">
          <img
            src={formatImage(post?.image)}
            alt={getLocalizedText(post.title, language, t.defaultTitle)}
            width={750}
            height={420}
            className="object-cover rounded-lg shadow"
          />
        </div>
      )}

      {post.excerpt && (
        <p className="text-[16px] text-[#585656] italic leading-relaxed max-w-[750px] mx-auto mb-10 text-center">
          {getLocalizedText(post.excerpt, language, t.defaultExcerpt)}
        </p>
      )}

      <div className="max-w-[750px] mx-auto text-[16px] text-[#555] leading-relaxed space-y-4">
        {content}
      </div>

      <div className="w-full max-w-[750px] mx-auto mt-16">
        <div className="border-t border-t-gray-300 w-fit pt-6 mb-4 text-sm text-gray-700">
          {t.shareText}
        </div>

        <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
          <button className="border border-gray-300 flex items-center gap-2 px-4 py-2 rounded transition-colors hover:bg-gray-100 mb-6">
            <FaFacebook className="text-blue-600" />
            <span className="text-sm">{t.shareButton}</span>
          </button>
        </a>

        <div className="flex items-center gap-3 mb-10">
          <button
            onClick={handleLikeToggle}
            className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition"
          >
            {isLiked ? (
              <FaStar className="text-yellow-500" />
            ) : (
              <FaRegStar className="text-[#333]" />
            )}
            <span className="text-sm">{t.likeButton}</span>
          </button>

          <div className="flex -space-x-2">
            {post.likes?.map((u, idx) => (
              <img
                key={idx}
                src={getValidImage(u.avatar) || "/avatars/default.jpg"}
                alt={`like-${idx}`}
                className="w-7 h-7 rounded-full border-2 border-white shadow"
              />
            ))}
          </div>

          <span className="text-sm text-[#e1c680]">
            {post.likes?.length || 0} {t.likes}
          </span>
        </div>
      </div>
    </div>
  );
}
