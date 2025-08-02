"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TextareaAutosize from "react-textarea-autosize";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import { FontSize } from "@/components/FontSize";
import EditorToolbar from "@/components/EditorToolbar";
import { getPost, updatePost } from "@/app/services/postService";
import mammoth from "mammoth";

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

  // Initialize Tiptap editors for Vietnamese and Japanese content
  const editorVi = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true, allowBase64: true }),
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
      Image.configure({ inline: true, allowBase64: true }),
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

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id);
        setForm({
          title: data.title || { vi: "", jp: "" },
          excerpt: data.excerpt || { vi: "", jp: "" },
          categories: data.categories?.join(", ") || "",
          content: {
            vi: data.content?.vi || { type: "doc", content: [] },
            jp: data.content?.jp || { type: "doc", content: [] },
          },
          readingTime: data.readingTime || 1,
          image: data.image || "",
        });
        if (editorVi) {
          editorVi.commands.setContent(
            data.content?.vi || { type: "doc", content: [] }
          );
        }
        if (editorJp) {
          editorJp.commands.setContent(
            data.content?.jp || { type: "doc", content: [] }
          );
        }
      } catch (err) {
        alert("Không tìm thấy bài viết.");
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, editorVi, editorJp]);

  const handleInputChange = (field, lang, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        excerpt: form.excerpt,
        categories: form.categories
          ? form.categories.split(",").map((c) => c.trim())
          : [],
        content: form.content,
        readingTime: form.readingTime,
        image: form.image,
      };
      await updatePost(id, payload);
      alert("✅ Cập nhật thành công");
      router.push("/admin");
    } catch (err) {
      alert("❌ Lỗi khi cập nhật: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Ngăn chặn hành vi mặc định của trình duyệt
    const file = e.dataTransfer?.files?.[0];
    if (!file) {
      alert("Không có file được chọn.");
      return;
    }

    const ext = file.name.split(".").pop().toLowerCase();
    const targetClass = e.currentTarget?.className || "";

    // Xác định là tiếng Việt hay tiếng Nhật dựa vào className
    const isJp = targetClass.includes("tiptap-jp");
    const isVi = targetClass.includes("tiptap-vi");

    let content = "";

    try {
      if (ext === "docx") {
        content = await extractDocxContent(file);
      } else {
        alert("Chỉ hỗ trợ file .docx");
        return;
      }

      // Set content tương ứng vào editor
      if (isJp && editorJp) {
        editorJp.commands.setContent(content, "html");
      } else if (isVi && editorVi) {
        editorVi.commands.setContent(content, "html");
      } else {
        alert("Không xác định được vùng biên tập.");
      }
    } catch (err) {
      console.error("Error in handleDrop:", err);
      alert("Không thể đọc file: " + err.message);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Cho phép thả file
    e.currentTarget.classList.add("border-blue-400", "bg-blue-50");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-blue-400", "bg-blue-50");
  };

  const extractDocxContent = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({
      arrayBuffer,
      convertImage: (element) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64Image = e.target.result;
            resolve({
              src: base64Image,
              alt: element.alt || "Image from Word",
            });
          };
          reader.readAsDataURL(element.content);
        });
      },
    });
    return result.value; // HTML string
  };

  if (loading) return <p className="mt-10 text-center">Đang tải dữ liệu...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-[#cfac1e]">
        ✏️ Sửa bài viết
      </h1>

      <div className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">
              Tiêu đề (Tiếng Việt)
            </label>
            <TextareaAutosize
              className="border p-3 rounded w-full"
              minRows={1}
              value={form.title.vi}
              onChange={(e) => handleInputChange("title", "vi", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">
              Tiêu đề (Tiếng Nhật)
            </label>
            <TextareaAutosize
              className="border p-3 rounded w-full"
              minRows={1}
              value={form.title.jp}
              onChange={(e) => handleInputChange("title", "jp", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">
              Tóm tắt (Tiếng Việt)
            </label>
            <TextareaAutosize
              className="border p-3 rounded w-full"
              minRows={2}
              value={form.excerpt.vi}
              onChange={(e) =>
                handleInputChange("excerpt", "vi", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">
              Tóm tắt (Tiếng Nhật)
            </label>
            <TextareaAutosize
              className="border p-3 rounded w-full"
              minRows={2}
              value={form.excerpt.jp}
              onChange={(e) =>
                handleInputChange("excerpt", "jp", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Thể loại</label>
            <input
              className="border p-3 rounded w-full"
              value={form.categories}
              onChange={(e) => setForm({ ...form, categories: e.target.value })}
              placeholder="Thể loại (cách nhau bằng dấu phẩy)"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">
              Thời gian đọc (phút)
            </label>
            <input
              className="border p-3 rounded w-full"
              type="number"
              value={form.readingTime}
              onChange={(e) =>
                setForm({ ...form, readingTime: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">URL ảnh</label>
          <input
            type="text"
            className="border p-3 rounded w-full"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="mt-2 rounded border max-w-xs"
            />
          )}
        </div>

        <div className="space-y-6">
          <div
            className="border rounded-lg p-4 bg-gray-50"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <label className="block mb-1 font-semibold">
              Nội dung (Tiếng Việt)
            </label>
            {editorVi && (
              <>
                <EditorToolbar editor={editorVi} />
                <EditorContent
                  editor={editorVi}
                  onDrop={handleDrop}
                  className="border tiptap-vi editor p-2 w-full rounded min-h-[200px] focus:outline-none focus:border-transparent"
                />
              </>
            )}
          </div>
          <div
            className="border rounded-lg p-4 bg-gray-50"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <label className="block mb-1 font-semibold">
              Nội dung (Tiếng Nhật)
            </label>
            {editorJp && (
              <>
                <EditorToolbar editor={editorJp} />
                <EditorContent
                  editor={editorJp}
                  onDrop={handleDrop}
                  className="border tiptap-jp editor p-2 w-full rounded min-h-[200px] focus:outline-none focus:border-transparent"
                />
              </>
            )}
          </div>
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
