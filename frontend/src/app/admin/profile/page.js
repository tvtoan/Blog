"use client";

import { useEffect, useState } from "react";
import { updateAdmin } from "@/app/services/authService";
import { useAdmin } from "@/app/context/AdminContext";
import useTranslation from "@/app/hooks/useTranslations";

export default function EditAdminPage() {
  const [form, setForm] = useState({
    name: "",
    bio: { vi: "", jp: "" },
    job: { vi: "", jp: "" },
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const { admin, fetchAdmin, loadingAdmin } = useAdmin();
  const translations = useTranslation();
  const t = translations?.AdminInfo || {};

  useEffect(() => {
    if (admin) {
      setForm({
        name: admin.name || "",
        bio: {
          vi: admin.bio?.vi || "",
          jp: admin.bio?.jp || "",
        },
        job: {
          vi: admin.job?.vi || "",
          jp: admin.job?.jp || "",
        },
        avatar: admin.avatar || "",
      });
      setLoading(false);
    } else if (!loadingAdmin) {
      setLoading(false);
    }
  }, [admin, loadingAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (field, lang, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAdmin(form);
      await fetchAdmin();
      alert(t.success || "Cập nhật thành công!");
    } catch (error) {
      console.error("Failed to update admin:", error);
      alert(t.error + (error.message || ""));
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-yellow-600 animate-pulse">
        {t.loading || "Đang tải..."}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-white rounded-xl shadow-md max-w-2xl mx-auto my-10 w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-yellow-600 mb-6 text-center uppercase tracking-wider">
        {t.title || "Chỉnh sửa thông tin Admin"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Admin Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {t.name}
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            placeholder="VD: Nguyễn Văn A"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {t.bio_vi}
          </label>
          <input
            type="text"
            value={form.bio.vi}
            onChange={(e) => handleNestedChange("bio", "vi", e.target.value)}
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            placeholder="Mô tả bằng tiếng Việt"
          />
          <label className="block mt-4 mb-1 text-sm font-medium text-gray-700">
            {t.bio_jp}
          </label>
          <input
            type="text"
            value={form.bio.jp}
            onChange={(e) => handleNestedChange("bio", "jp", e.target.value)}
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            placeholder="日本語の自己紹介"
          />
        </div>

        {/* Job */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {t.job_vi}
          </label>
          <input
            type="text"
            value={form.job.vi}
            onChange={(e) => handleNestedChange("job", "vi", e.target.value)}
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            placeholder="Chức vụ tiếng Việt"
          />
          <label className="block mt-4 mb-1 text-sm font-medium text-gray-700">
            {t.job_jp}
          </label>
          <input
            type="text"
            value={form.job.jp}
            onChange={(e) => handleNestedChange("job", "jp", e.target.value)}
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            placeholder="役職名（日本語）"
          />
        </div>

        {/* Avatar */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {t.avatar}
          </label>
          <input
            type="text"
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            placeholder="URL hình đại diện"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition shadow-sm"
          >
            {t.save || "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}
