"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAboutData, updateAboutData } from "@/app/services/aboutService";
import useAuthUser from "@/app/hooks/useAuthUser";
import useTranslation from "@/app/hooks/useTranslations";
import TextareaAutosize from "react-textarea-autosize";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import { FontSize } from "@/components/FontSize";
import EditorToolbar from "@/components/EditorToolbar";
import mammoth from "mammoth";

export default function EditAboutPage() {
  const { user, loading } = useAuthUser();
  const [form, setForm] = useState({
    title: { vi: "", jp: "" },
    excerpt: { vi: "", jp: "" },
    image: "",
    content: {
      vi: { type: "doc", content: [] },
      jp: { type: "doc", content: [] },
    },
  });
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(true);
  const translations = useTranslation();
  const t = translations?.EditAbout || {};
  const router = useRouter();

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

  // Fetch data
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAboutData();
        const safeData = data || {
          title: { vi: "", jp: "" },
          excerpt: { vi: "", jp: "" },
          image: "",
          content: {
            vi: { type: "doc", content: [] },
            jp: { type: "doc", content: [] },
          },
        };
        setForm({
          title:
            typeof safeData.title === "object"
              ? safeData.title
              : { vi: safeData.title || "", jp: "" },
          excerpt:
            typeof safeData.excerpt === "object"
              ? safeData.excerpt
              : { vi: safeData.excerpt || "", jp: "" },
          image: safeData.image || "",
          content: {
            vi: safeData.content?.vi || { type: "doc", content: [] },
            jp: safeData.content?.jp || { type: "doc", content: [] },
          },
        });
        if (editorVi)
          editorVi.commands.setContent(
            safeData.content?.vi || { type: "doc", content: [] }
          );
        if (editorJp)
          editorJp.commands.setContent(
            safeData.content?.jp || { type: "doc", content: [] }
          );
      } catch (err) {
        console.error(
          "Failed to fetch:",
          err.response?.data || err.message || "Unknown error",
          "Status:",
          err.response?.status
        );
      } finally {
        setFetching(false);
      }
    };
    if (!user || user.role !== "admin") return;
    fetch();
  }, [user, editorVi, editorJp]);

  const handleFieldChange = (field, lang, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDrop = async (e, lang) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    if (!file) {
      alert("Không có file được chọn.");
      return;
    }

    const ext = file.name.split(".").pop().toLowerCase();
    let content = "";

    try {
      if (ext === "docx") {
        content = await extractDocxContent(file);
      } else {
        alert("Chỉ hỗ trợ file .docx");
        return;
      }

      const editor = lang === "jp" ? editorJp : editorVi;
      if (editor) {
        editor.commands.setContent(content, "html");
      } else {
        alert("Không xác định được vùng biên tập.");
      }
    } catch (err) {
      console.error("Error in handleDrop:", err);
      alert("Không thể đọc file: " + err.message);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAboutData(form);
      alert(t.saved);
    } catch (err) {
      console.error("Failed to save:", err.response?.data || err.message);
      alert(t.error + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading || fetching)
    return <p className="text-center mt-10">{t.loading}</p>;
  if (!user || user.role !== "admin")
    return <p className="text-center mt-10 text-red-600">{t.noAccess}</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-[#cfac1e]">{t.editTitle}</h1>

      <div className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">
              {t.placeholderTitle}
            </label>
            <TextareaAutosize
              className="border p-3 rounded w-full"
              minRows={1}
              value={form.title.vi}
              onChange={(e) => handleFieldChange("title", "vi", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">
              {t.placeholderTitle_1}
            </label>
            <TextareaAutosize
              className="border p-3 rounded w-full"
              minRows={1}
              value={form.title.jp}
              onChange={(e) => handleFieldChange("title", "jp", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">
              {t.placeholderExcerpt}
            </label>
            <TextareaAutosize
              className="border p-3 rounded w-full"
              minRows={2}
              value={form.excerpt.vi}
              onChange={(e) =>
                handleFieldChange("excerpt", "vi", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">
              {t.placeholderExcerpt_1}
            </label>
            <TextareaAutosize
              className="border p-3 rounded w-full"
              minRows={2}
              value={form.excerpt.jp}
              onChange={(e) =>
                handleFieldChange("excerpt", "jp", e.target.value)
              }
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            {t.placeholderImage}
          </label>
          <input
            type="text"
            className="border p-3 rounded w-full"
            value={form.image}
            onChange={(e) => handleChange("image", e.target.value)}
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
            className="border rounded-lg p-4 bg-gray-50 tiptap-vi"
            onDrop={(e) => handleDrop(e, "vi")}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <label className="block mb-1 font-semibold">{t.contentLabel}</label>
            {editorVi && (
              <>
                <EditorToolbar editor={editorVi} />
                <EditorContent
                  editor={editorVi}
                  className="p-2 w-full rounded min-h-[200px] focus:outline-none focus:border-transparent"
                />
              </>
            )}
          </div>
          <div
            className="border rounded-lg p-4 bg-gray-50 tiptap-jp"
            onDrop={(e) => handleDrop(e, "jp")}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <label className="block mb-1 font-semibold">
              {t.contentLabel_1}
            </label>
            {editorJp && (
              <>
                <EditorToolbar editor={editorJp} />
                <EditorContent
                  editor={editorJp}
                  className="p-2 w-full rounded min-h-[200px] focus:outline-none focus:border-transparent"
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
            {saving ? t.saving : t.save}
          </button>
        </div>
      </div>
    </div>
  );
}
