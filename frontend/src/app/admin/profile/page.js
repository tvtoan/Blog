"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { updateAdmin } from "@/app/services/authService";
import { useAdmin } from "@/app/context/AdminContext";
import useTranslation from "@/app/hooks/useTranslations";
import TextareaAutosize from "react-textarea-autosize";

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

export default function EditAdminPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    bio: { vi: "", jp: "" },
    job: { vi: "", jp: "" },
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
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
        avatar: formatImage(admin.avatar) || "",
      });
      setLoading(false);
    } else if (!loadingAdmin) {
      setError(t.errorNotFound || "Không tìm thấy thông tin admin.");
      router.push("/admin");
    }
  }, [admin, loadingAdmin, router, t]);

  const handleInputChange = useCallback((field, lang, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  }, []);

  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const maxSize = 1 * 1024 * 1024; // 1MB
      if (file.size > maxSize) {
        setError(t.errorFileSize || "Ảnh quá lớn (tối đa 1MB).");
        return;
      }

      const filetypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!filetypes.includes(file.type)) {
        setError(t.errorFileType || "Chỉ hỗ trợ ảnh PNG/JPEG.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({
          ...prev,
          avatar: reader.result, // Lưu base64 để preview và gửi
        }));
        setError(null);
      };
      reader.readAsDataURL(file);
    },
    [t]
  );

  const handleImagePaste = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file.size > 1 * 1024 * 1024) {
            setError(t.errorFileSize || "Ảnh quá lớn (tối đa 1MB).");
            return;
          }

          const filetypes = ["image/jpeg", "image/jpg", "image/png"];
          if (!filetypes.includes(file.type)) {
            setError(t.errorFileType || "Chỉ hỗ trợ ảnh PNG/JPEG.");
            return;
          }

          const reader = new FileReader();
          reader.onload = () => {
            setForm((prev) => ({
              ...prev,
              avatar: reader.result, // Lưu base64 để preview và gửi
            }));
            setError(null);
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    },
    [t]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      setSaving(true);

      // Frontend validation
      if (!form.name.trim()) {
        setError(t.errorNameRequired || "Tên là bắt buộc.");
        setSaving(false);
        return;
      }
      if (!form.bio.vi.trim()) {
        setError(t.errorBioViRequired || "Bio tiếng Việt là bắt buộc.");
        setSaving(false);
        return;
      }
      if (!form.job.vi.trim()) {
        setError(t.errorJobViRequired || "Chức vụ tiếng Việt là bắt buộc.");
        setSaving(false);
        return;
      }

      try {
        // Kiểm tra kích thước bio và job
        const bioSize = Buffer.byteLength(JSON.stringify(form.bio), "utf8");
        const jobSize = Buffer.byteLength(JSON.stringify(form.job), "utf8");
        if (bioSize > 1 * 1024 * 1024 || jobSize > 1 * 1024 * 1024) {
          throw new Error(
            t.errorContentSize || "Bio hoặc Job quá lớn (tối đa 1MB)."
          );
        }

        // Tạo payload JSON
        const payload = {
          name: form.name,
          bio: form.bio,
          job: form.job,
          avatar: form.avatar || "",
        };

        console.log("Payload gửi lên:", payload);
        await updateAdmin(payload);
        await fetchAdmin();
        alert(t.success || "✅ Cập nhật thành công");
        router.push("/admin");
      } catch (error) {
        console.error("Failed to update admin:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            t.error ||
            "Lỗi khi cập nhật."
        );
      } finally {
        setSaving(false);
      }
    },
    [form, t, router, fetchAdmin]
  );

  if (loading) {
    return (
      <div className="p-6 text-center text-blue-600 animate-pulse">
        {t.loading || "Đang tải..."}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {t.title || "Chỉnh sửa thông tin Admin"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t.name || "Tên"} <span className="text-red-500">*</span>
            </label>
            <TextareaAutosize
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              minRows={1}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="VD: Nguyễn Văn A"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bio */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t.bio_vi || "Bio (Tiếng Việt)"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <TextareaAutosize
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              minRows={2}
              value={form.bio.vi}
              onChange={(e) => handleInputChange("bio", "vi", e.target.value)}
              placeholder="Mô tả bằng tiếng Việt"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t.bio_jp || "Bio (Tiếng Nhật)"}
            </label>
            <TextareaAutosize
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              minRows={2}
              value={form.bio.jp}
              onChange={(e) => handleInputChange("bio", "jp", e.target.value)}
              placeholder="日本語の自己紹介"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Job */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t.job_vi || "Chức vụ (Tiếng Việt)"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <TextareaAutosize
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              minRows={1}
              value={form.job.vi}
              onChange={(e) => handleInputChange("job", "vi", e.target.value)}
              placeholder="Chức vụ tiếng Việt"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t.job_jp || "Chức vụ (Tiếng Nhật)"}
            </label>
            <TextareaAutosize
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              minRows={1}
              value={form.job.jp}
              onChange={(e) => handleInputChange("job", "jp", e.target.value)}
              placeholder="役職名（日本語）"
            />
          </div>
        </div>

        {/* Avatar */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {t.avatar || "Ảnh đại diện (URL, dán ảnh, hoặc upload)"}
          </label>
          <input
            type="text"
            name="avatar"
            value={form.avatar}
            onChange={(e) => handleChange("avatar", e.target.value)}
            onPaste={handleImagePaste}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400 mb-2"
            placeholder="Dán URL ảnh hoặc base64"
          />
          <div className="relative">
            <input
              type="file"
              id="avatar-upload"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="avatar-upload"
              className="w-full p-3 50 border border-gray-200 rounded-lg text-gray-800  outline-none transition-all duration-200 cursor-pointer text-center block shadow-sm hover:shadow-md  transform"
            >
              Chọn ảnh đại diện từ máy
            </label>
          </div>
          {form.avatar && (
            <img
              src={formatImage(form.avatar)}
              alt="Preview"
              className="mt-3 rounded-lg border border-gray-200 shadow-sm max-w-sm"
            />
          )}
        </div>

        <div className="text-right pt-4">
          <button
            type="submit"
            disabled={saving}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 shadow-md ${
              saving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? t.saving || "Đang lưu..." : t.save || "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}
