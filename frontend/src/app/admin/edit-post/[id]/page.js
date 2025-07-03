"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPost, updatePost } from "@/app/services/postService";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    image: "",
    categories: [],
    readingTime: 0,
    sections: [{ subtitle: "", content: "", image: "" }],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id);

        // Fallback nếu thiếu sections
        if (!data.sections || data.sections.length === 0) {
          data.sections = [{ subtitle: "", content: "", image: "" }];
        }

        // Fallback nếu thiếu các field khác
        setForm({
          title: data.title || "",
          excerpt: data.excerpt || "",
          image: data.image || "",
          categories: data.categories || [],
          readingTime: data.readingTime || 0,
          sections: data.sections,
        });
      } catch (err) {
        alert("Không tìm thấy bài viết.");
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...form.sections];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, sections: updated }));
  };

  const handleAddSection = () => {
    setForm((prev) => ({
      ...prev,
      sections: [...prev.sections, { subtitle: "", content: "", image: "" }],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePost(id, form);
      alert("✅ Cập nhật thành công");
      router.push("/admin");
    } catch (err) {
      alert("❌ Lỗi khi cập nhật: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="mt-10 text-center">Đang tải dữ liệu...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-[#cfac1e]">
        ✏️ Sửa bài viết
      </h1>

      <div className="space-y-5">
        <input
          className="border p-3 rounded w-full"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Tiêu đề"
        />
        <textarea
          className="border p-3 rounded w-full"
          value={form.excerpt}
          onChange={(e) => handleChange("excerpt", e.target.value)}
          placeholder="Tóm tắt"
        />
        <input
          className="border p-3 rounded w-full"
          value={form.image}
          onChange={(e) => handleChange("image", e.target.value)}
          placeholder="Link ảnh"
        />
        <input
          className="border p-3 rounded w-full"
          value={form.categories.join(", ")}
          onChange={(e) =>
            handleChange(
              "categories",
              e.target.value.split(",").map((c) => c.trim())
            )
          }
          placeholder="Thể loại (cách nhau bằng dấu phẩy)"
        />
        <input
          className="border p-3 rounded w-full"
          type="number"
          value={form.readingTime}
          onChange={(e) => handleChange("readingTime", Number(e.target.value))}
          placeholder="Thời gian đọc (phút)"
        />

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">📚 Nội dung từng phần</h2>
          {form.sections.map((sec, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 border border-gray-300 rounded space-y-2"
            >
              <input
                className="border p-2 rounded w-full"
                value={sec.subtitle}
                placeholder="Tiêu đề nhỏ"
                onChange={(e) =>
                  handleSectionChange(index, "subtitle", e.target.value)
                }
              />
              <textarea
                className="border p-2 rounded w-full"
                value={sec.content}
                rows={3}
                placeholder="Nội dung"
                onChange={(e) =>
                  handleSectionChange(index, "content", e.target.value)
                }
              />
              <input
                className="border p-2 rounded w-full"
                value={sec.image}
                placeholder="URL ảnh"
                onChange={(e) =>
                  handleSectionChange(index, "image", e.target.value)
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

        <div className="text-right pt-6">
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
