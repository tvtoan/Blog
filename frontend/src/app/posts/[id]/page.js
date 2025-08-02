"use client";

import React, { useEffect, useState } from "react";
import { getPost } from "@/app/services/postService";
import { getComments } from "@/app/services/commentService";
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
import CommentSection from "@/components/CommentSection";
import { montserrat } from "../../../lib/font";
import { getLocalizedText } from "@/lib/getLocalizedText";
import { useLanguage } from "@/app/context/LanguageContext";
import getValidImage from "@/lib/getValidImage";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

const DEFAULT_AVATAR = "/cv.jpg";
const DEFAULT_IMAGE = "/default-image.jpg";

export default function Post() {
  const { language } = useLanguage();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [commentCount, setCommentCount] = useState(0);
  const router = useRouter();
  const { id } = useParams();

  // Initialize Tiptap editor for displaying content (read-only)
  const editor = useEditor({
    extensions: [StarterKit, Image.configure({ inline: true })],
    editable: false,
    immediatelyRender: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setError(null);
        const postData = await getPost(id);
        setPost(postData);

        // Set editor content based on language
        if (editor) {
          const content = getLocalizedText(postData.content, language, {
            type: "doc",
            content: [],
          });
          editor.commands.setContent(content);
        }

        const comments = await getComments(id);
        const totalCount = countAllComments(comments);
        setCommentCount(totalCount);

        const userData = await getUser();
        setUser(userData);
      } catch (err) {
        setError(
          getLocalizedText(
            {
              vi: err.message || "Có lỗi xảy ra khi lấy dữ liệu.",
              jp: err.message || "データの取得中にエラーが発生しました。",
            },
            language
          )
        );
        console.error(err.message);
      }
    }
    if (id) {
      fetchData();
    } else {
      setError(
        getLocalizedText(
          { vi: "ID không hợp lệ.", jp: "無効なIDです。" },
          language
        )
      );
    }
  }, [id, language, editor]);

  const countAllComments = (comments) => {
    let count = 0;
    comments.forEach((comment) => {
      count += 1;
      if (comment.replies && comment.replies.length > 0) {
        count += countAllComments(comment.replies);
      }
    });
    return count;
  };

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

  if (!post || !editor) {
    return (
      <div className="container mx-auto p-4 text-center">
        {getLocalizedText({ vi: "Đang tải...", jp: "ロード中..." }, language)}
      </div>
    );
  }

  return (
    <div className={`container mx-auto mb-10 p-4 ${montserrat.className}`}>
      <h1 className="text-[22px] font-normal text-center">
        {getLocalizedText(post.title, language).toUpperCase()}
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
            : getLocalizedText(
                { vi: "Không có danh mục", jp: "カテゴリーなし" },
                language
              )}
        </div>
        <div>
          <FaComments className="inline mr-1 text-[#7687a5]" />
          {commentCount}{" "}
          {getLocalizedText({ vi: "Bình luận", jp: "コメント" }, language)}
        </div>
      </div>

      <img
        src={getValidImage(post.image) || DEFAULT_IMAGE}
        alt={getLocalizedText(post.title, language)}
        width={750}
        height={420}
        className="object-cover rounded-lg mb-4"
      />

      <p className="text-[16px] mt-10 mb-14">
        {getLocalizedText(
          post.excerpt,
          language,
          getLocalizedText(
            { vi: "Không có tóm tắt.", jp: "要約がありません。" },
            language
          )
        )}
      </p>

      <div className="prose mb-16">
        <div className="mb-6">
          <EditorContent editor={editor} className="text-[16px] w-[750px]" />
        </div>
      </div>

      <div className="border-t border-t-gray-300 w-fit pt-6 mb-4 text-sm text-gray-700">
        {getLocalizedText({ vi: "CHIA SẺ:", jp: "共有:" }, language)}
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
            src={getValidImage(post.owner?.avatar) || DEFAULT_AVATAR}
            alt={getLocalizedText(post.owner?.name, language, "Unknown")}
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-[#7687a5] mb-4">
            {getLocalizedText({ vi: "ĐĂNG BỞI", jp: "投稿者" }, language)}{" "}
            <span className="text-[#f5b04e] font-[500] uppercase">
              {getLocalizedText(post.owner?.name, language, "Unknown")}
            </span>
          </p>
          <p className="text-[#555] leading-relaxed">
            {getLocalizedText(
              post.owner?.bio,
              language,
              getLocalizedText(
                { vi: "Chưa có mô tả", jp: "説明がありません" },
                language
              )
            )}
          </p>
        </div>
      </div>

      <CommentSection post={post} />
    </div>
  );
}
