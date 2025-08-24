"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import TextareaAutosize from "react-textarea-autosize";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import FontSize from "@/components/FontSize";
import EditorToolbar from "@/components/EditorToolbar";
import { getPost, updatePost } from "@/app/services/postService";
import mammoth from "mammoth";

const DEFAULT_IMAGE = "/default-image.jpg";
const BASE_URL = "http://localhost:5000"; // Tiền tố URL cho server local

// Hàm định dạng ảnh
const formatImage = (image) => {
  if (!image) return DEFAULT_IMAGE;
  if (image.startsWith("/uploads/")) {
    return `${BASE_URL}${image}`;
  }
  return image.startsWith("data:image") ? image : image || DEFAULT_IMAGE;
};

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    title: { vi: "", jp: "" },
    excerpt: { vi: "", jp: "" },
    categories: "",
    content: {
      vi: { type: "doc", content: [] },
      jp: { type: "doc", content: [] },
    },
    readingTime: 1,
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const editorVi = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true, allowBase64: false }),
      TextStyle,
      FontSize,
    ],
    content: form.content.vi,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setForm((prev) => ({
        ...prev,
        content: { ...prev.content, vi: json },
      }));
    },
  });

  const editorJp = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true, allowBase64: false }),
      TextStyle,
      FontSize,
    ],
    content: form.content.jp,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setForm((prev) => ({
        ...prev,
        content: { ...prev.content, jp: json },
      }));
    },
  });

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      setError("Ảnh quá lớn (tối đa 1MB).");
      return;
    }

    const filetypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!filetypes.includes(file.type)) {
      setError("Chỉ hỗ trợ ảnh PNG/JPEG.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setForm((prev) => ({
        ...prev,
        image: event.target.result, // Chuyển file thành base64
      }));
      setError(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleImagePaste = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    const items = event.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file.size > 1 * 1024 * 1024) {
          setError("Ảnh quá lớn (tối đa 1MB).");
          return;
        }

        const filetypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!filetypes.includes(file.type)) {
          setError("Chỉ hỗ trợ ảnh PNG/JPEG.");
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          setForm((prev) => ({
            ...prev,
            image: reader.result, // Lưu base64 từ paste
          }));
          setError(null);
        };
        reader.readAsDataURL(file);
        break;
      }
    }
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id);
        const formattedImage = formatImage(data.image);
        setForm({
          title: data.title || { vi: "", jp: "" },
          excerpt: data.excerpt || { vi: "", jp: "" },
          categories: data.categories?.join(", ") || "",
          content: {
            vi: data.content?.vi || { type: "doc", content: [] },
            jp: data.content?.jp || { type: "doc", content: [] },
          },
          readingTime: data.readingTime || 1,
          image: formattedImage,
        });
        if (editorVi)
          editorVi.commands.setContent(
            data.content?.vi || { type: "doc", content: [] }
          );
        if (editorJp)
          editorJp.commands.setContent(
            data.content?.jp || { type: "doc", content: [] }
          );
      } catch (err) {
        setError("Không tìm thấy bài viết.");
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, editorVi, editorJp]);

  const handleInputChange = useCallback((field, lang, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  }, []);

  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      const contentSize = Buffer.byteLength(
        JSON.stringify(form.content),
        "utf8"
      );
      if (contentSize > 2 * 1024 * 1024) {
        throw new Error("Nội dung quá lớn (tối đa 2MB).");
      }

      const payload = {
        title: form.title,
        excerpt: form.excerpt,
        categories: form.categories
          ? form.categories.split(",").map((c) => c.trim())
          : [],
        content: form.content,
        readingTime: form.readingTime,
        image: form.image || "", // Gửi image (URL hoặc base64)
      };

      console.log("Payload gửi lên:", payload); // Debug payload
      await updatePost(id, payload);
      alert("✅ Cập nhật thành công");
      router.push("/admin");
    } catch (err) {
      console.error("Error saving post:", err);
      setError(
        err.response?.data?.message || err.message || "Lỗi khi cập nhật."
      );
    } finally {
      setSaving(false);
    }
  }, [form, id, router]);

  const handleDrop = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const files = Array.from(e.dataTransfer?.files || []);
      if (!files.length) {
        setError("Không có file được chọn.");
        return;
      }

      const validTypes = [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxSize = 10 * 1024 * 1024; // 10MB

      const targetClass = e.currentTarget?.className || "";
      const isJp = targetClass.includes("tiptap-jp");
      const isVi = targetClass.includes("tiptap-vi");
      const editor = isJp ? editorJp : isVi ? editorVi : null;

      if (!editor) {
        setError("Không xác định được vùng biên tập.");
        return;
      }

      try {
        for (const file of files) {
          if (!validTypes.includes(file.type)) {
            setError(`File ${file.name} không được hỗ trợ`);
            continue;
          }
          if (file.size > maxSize) {
            setError(`File ${file.name} quá lớn, tối đa 10MB`);
            continue;
          }

          const ext = file.name.split(".").pop().toLowerCase();
          let content = "";
          if (ext === "docx") {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.convertToHtml({ arrayBuffer });
            content = result.value || "<p>Nội dung trống</p>";
          }

          if (content) {
            editor.commands.insertContent(content);
          } else {
            setError(`Không thể đọc nội dung từ ${file.name}`);
          }
        }
      } catch (err) {
        console.error("Error in handleDrop:", err);
        setError(`Lỗi khi xử lý file: ${err.message}`);
      }
    },
    [editorVi, editorJp]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-blue-400", "bg-blue-50");
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-blue-400", "bg-blue-50");
  }, []);

  if (loading) return <p className="mt-10 text-center">Đang tải dữ liệu...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">✏️ Sửa bài viết</h1>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tiêu đề (Tiếng Việt)
            </label>
            <TextareaAutosize
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              minRows={1}
              value={form.title.vi}
              onChange={(e) => handleInputChange("title", "vi", e.target.value)}
              placeholder="Nhập tiêu đề tiếng Việt"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tiêu đề (Tiếng Nhật)
            </label>
            <TextareaAutosize
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              minRows={1}
              value={form.title.jp}
              onChange={(e) => handleInputChange("title", "jp", e.target.value)}
              placeholder="Nhập tiêu đề tiếng Nhật"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tóm tắt (Tiếng Việt)
            </label>
            <TextareaAutosize
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              minRows={2}
              value={form.excerpt.vi}
              onChange={(e) =>
                handleInputChange("excerpt", "vi", e.target.value)
              }
              placeholder="Nhập tóm tắt tiếng Việt"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tóm tắt (Tiếng Nhật)
            </label>
            <TextareaAutosize
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              minRows={2}
              value={form.excerpt.jp}
              onChange={(e) =>
                handleInputChange("excerpt", "jp", e.target.value)
              }
              placeholder="Nhập tóm tắt tiếng Nhật"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Thể loại
            </label>
            <input
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              value={form.categories}
              onChange={(e) => handleChange("categories", e.target.value)}
              placeholder="Nhập thể loại, cách nhau bằng dấu phẩy"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Thời gian đọc (phút)
            </label>
            <input
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              type="number"
              value={form.readingTime}
              onChange={(e) =>
                handleChange("readingTime", Number(e.target.value))
              }
              placeholder="Nhập thời gian đọc"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Ảnh bìa (URL, dán ảnh, hoặc upload)
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400 mb-2"
            value={form.image}
            onChange={(e) => handleChange("image", e.target.value)}
            onPaste={handleImagePaste}
            placeholder="Nhập URL ảnh hoặc dán ảnh trực tiếp"
          />
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleFileChange}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
          />
          {form.image && (
            <img
              src={formatImage(form.image)}
              alt="Preview"
              className="mt-3 rounded-lg border border-gray-200 shadow-sm max-w-sm"
            />
          )}
        </div>

        <div
          className="relative rounded-xl border border-gray-200 p-5 bg-white shadow-sm hover:shadow-md transition-all"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <label className="block mb-3 text-base font-semibold text-gray-800">
            Nội dung (Tiếng Việt)
          </label>
          <EditorToolbar editor={editorVi} />
          <EditorContent
            editor={editorVi}
            onDrop={handleDrop}
            className="tiptap tiptap-vi w-full rounded-lg min-h-[200px] bg-gray-50 p-4"
          />
        </div>

        <div
          className="relative rounded-xl border border-gray-200 p-5 bg-white shadow-sm hover:shadow-md transition-all"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <label className="block mb-3 text-base font-semibold text-gray-800">
            Nội dung (Tiếng Nhật)
          </label>
          <EditorToolbar editor={editorJp} />
          <EditorContent
            editor={editorJp}
            onDrop={handleDrop}
            className="tiptap tiptap-jp w-full rounded-lg min-h-[200px] bg-gray-50 p-4"
          />
        </div>

        <div className="text-right pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 shadow-md ${
              saving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
}
