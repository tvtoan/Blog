"use client";

import { useEffect, useState } from "react";
import useAuthUser from "@/app/hooks/useAuthUser";
import { getAboutData, updateAboutData } from "@/app/services/aboutService";

export default function EditAboutPage() {
  const { user, loading } = useAuthUser();
  const [form, setForm] = useState({
    title: { vi: "", jp: "" },
    excerpt: { vi: "", jp: "" },
    image: "",
    sections: [
      {
        subtitle: { vi: "", jp: "" },
        content: { vi: "", jp: "" },
        image: "",
      },
    ],
  });

  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAboutData();

        if (!data.sections || data.sections.length === 0) {
          data.sections = [
            {
              subtitle: { vi: "", jp: "" },
              content: { vi: "", jp: "" },
              image: "",
            },
          ];
        } else {
          data.sections = data.sections.map((s) => ({
            subtitle: s.subtitle || { vi: "", jp: "" },
            content: s.content || { vi: "", jp: "" },
            image: s.image || "",
          }));
        }

        setForm({
          title: data.title || { vi: "", jp: "" },
          excerpt: data.excerpt || { vi: "", jp: "" },
          image: data.image || "",
          sections: data.sections,
        });
      } catch (err) {
        console.warn("Không có dữ liệu, tạo mới.");
        setForm({
          title: { vi: "", jp: "" },
          excerpt: { vi: "", jp: "" },
          image: "",
          sections: [
            {
              subtitle: { vi: "", jp: "" },
              content: { vi: "", jp: "" },
              image: "",
            },
          ],
        });
      } finally {
        setFetching(false);
      }
    };
    fetch();
  }, []);

  const handleFieldChange = (field, lang, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value,
      },
    }));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSectionChange = (index, field, lang, value) => {
    const updated = [...form.sections];
    if (field === "subtitle" || field === "content") {
      updated[index][field][lang] = value;
    } else {
      updated[index][field] = value;
    }
    setForm((prev) => ({ ...prev, sections: updated }));
  };

  const handleAddSection = () => {
    setForm((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          subtitle: { vi: "", jp: "" },
          content: { vi: "", jp: "" },
          image: "",
        },
      ],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAboutData(form);
      alert("✅ Đã lưu bài giới thiệu.");
    } catch (err) {
      alert("❌ Lỗi khi lưu: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || fetching)
    return <p className="text-center mt-10">Đang tải dữ liệu...</p>;

  if (!user || user.role !== "admin")
    return (
      <p className="text-center mt-10 text-red-600">
        🚫 Bạn không có quyền truy cập trang này.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-[#cfac1e]">
        📝 Chỉnh sửa bài About Me
      </h1>

      <div className="space-y-5">
        {/* Title */}
        <input
          type="text"
          className="border p-3 rounded w-full"
          placeholder="Tiêu đề (Tiếng Việt)"
          value={form.title.vi}
          onChange={(e) => handleFieldChange("title", "vi", e.target.value)}
        />
        <input
          type="text"
          className="border p-3 rounded w-full"
          placeholder="Tiêu đề (Tiếng Nhật)"
          value={form.title.jp}
          onChange={(e) => handleFieldChange("title", "jp", e.target.value)}
        />

        {/* Excerpt */}
        <textarea
          className="border p-3 rounded w-full"
          placeholder="Tóm tắt (Tiếng Việt)"
          value={form.excerpt.vi}
          onChange={(e) => handleFieldChange("excerpt", "vi", e.target.value)}
        />
        <textarea
          className="border p-3 rounded w-full"
          placeholder="Tóm tắt (Tiếng Nhật)"
          value={form.excerpt.jp}
          onChange={(e) => handleFieldChange("excerpt", "jp", e.target.value)}
        />

        {/* Image */}
        <input
          type="text"
          className="border p-3 rounded w-full"
          placeholder="Link ảnh bìa"
          value={form.image}
          onChange={(e) => handleChange("image", e.target.value)}
        />

        {/* Sections */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">📚 Nội dung từng phần</h2>
          {form.sections.map((sec, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 border border-gray-300 rounded space-y-2"
            >
              <input
                type="text"
                placeholder="Tiêu đề nhỏ (Tiếng Việt)"
                className="border p-2 w-full rounded"
                value={sec.subtitle.vi}
                onChange={(e) =>
                  handleSectionChange(index, "subtitle", "vi", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Tiêu đề nhỏ (Tiếng Nhật)"
                className="border p-2 w-full rounded"
                value={sec.subtitle.jp}
                onChange={(e) =>
                  handleSectionChange(index, "subtitle", "jp", e.target.value)
                }
              />

              <textarea
                placeholder="Nội dung (Tiếng Việt)"
                rows={3}
                className="border p-2 w-full rounded"
                value={sec.content.vi}
                onChange={(e) =>
                  handleSectionChange(index, "content", "vi", e.target.value)
                }
              />
              <textarea
                placeholder="Nội dung (Tiếng Nhật)"
                rows={3}
                className="border p-2 w-full rounded"
                value={sec.content.jp}
                onChange={(e) =>
                  handleSectionChange(index, "content", "jp", e.target.value)
                }
              />

              <input
                type="text"
                placeholder="URL ảnh (tuỳ chọn)"
                className="border p-2 w-full rounded"
                value={sec.image}
                onChange={(e) =>
                  handleSectionChange(index, "image", null, e.target.value)
                }
              />
            </div>
          ))}
          <button
            onClick={handleAddSection}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900"
          >
            + Thêm section
          </button>
        </div>

        <div className="text-right pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#cfac1e] text-white font-semibold px-6 py-2 rounded hover:bg-[#b89514] disabled:opacity-50"
          >
            💾 {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
}
