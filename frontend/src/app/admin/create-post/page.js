"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react"; // Thêm import useCallback
import CreatePost from "@/components/CreatePost";
import useTranslation from "@/app/hooks/useTranslations";

export default function AdminCreatePostPage() {
  const router = useRouter();
  const translations = useTranslation();
  const t = translations.AdminPost;

  const handlePostCreated = useCallback(() => {
    router.push("/admin/posts");
  }, [router]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 min-h-[calc(100vh-60px)]">
      <h1 className="text-2xl font-bold text-[#cfac1e] mb-6">
        {t.createNewPost}
      </h1>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <CreatePost t={t} onPostCreated={handlePostCreated} />
      </div>
    </div>
  );
}
