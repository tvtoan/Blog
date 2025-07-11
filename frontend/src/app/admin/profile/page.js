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
      alert(t.success);
    } catch (error) {
      console.error("Failed to update admin:", error);
      alert(t.error + (error.message || ""));
    }
  };

  if (loading) {
    return <div className="p-4 text-center text-yellow-600">{t.loading}</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#cfac1e]">{t.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Tên Admin */}
        <div>
          <label className="block mb-1 font-medium text-[#cfac1e]">
            {t.name}
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cfac1e]"
          />
        </div>

        {/* Tiểu sử (Bio) */}
        <div>
          <label className="block mb-1 font-medium text-[#cfac1e]">
            {t.bio_vi}
          </label>
          <input
            type="text"
            value={form.bio.vi}
            onChange={(e) => handleNestedChange("bio", "vi", e.target.value)}
            className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cfac1e]"
          />
          <label className="block mt-2 mb-1 font-medium text-[#cfac1e]">
            {t.bio_jp}
          </label>
          <input
            type="text"
            value={form.bio.jp}
            onChange={(e) => handleNestedChange("bio", "jp", e.target.value)}
            className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cfac1e]"
          />
        </div>

        {/* Công việc (Job) */}
        <div>
          <label className="block mb-1 font-medium text-[#cfac1e]">
            {t.job_vi}
          </label>
          <input
            type="text"
            value={form.job.vi}
            onChange={(e) => handleNestedChange("job", "vi", e.target.value)}
            className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cfac1e]"
          />
          <label className="block mt-2 mb-1 font-medium text-[#cfac1e]">
            {t.job_jp}
          </label>
          <input
            type="text"
            value={form.job.jp}
            onChange={(e) => handleNestedChange("job", "jp", e.target.value)}
            className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cfac1e]"
          />
        </div>

        {/* Ảnh đại diện */}
        <div>
          <label className="block mb-1 font-medium text-[#cfac1e]">
            {t.avatar}
          </label>
          <input
            type="text"
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
            className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cfac1e]"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-[#cfac1e] text-white font-semibold px-6 py-3 rounded hover:bg-[#b89514] transition"
          >
            {t.save}
          </button>
        </div>
      </form>
    </div>
  );
}
