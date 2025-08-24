"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import TextareaAutosize from "react-textarea-autosize";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import { useLanguage } from "@/app/context/LanguageContext";
import debounce from "lodash/debounce";
import { createPost, saveDraft, getMyDraft } from "@/app/services/postService";
import EditorToolbar from "./EditorToolbar";
import FontSize from "./FontSize";
import "../app/globals.css";
import mammoth from "mammoth";

export default function CreatePost({ t, onPostCreated }) {
  const { language } = useLanguage();
  const router = useRouter();
  const [newPost, setNewPost] = useState({
    title: { vi: "", jp: "" },
    excerpt: { vi: "", jp: "" },
    categories: "",
    content: {
      vi: { type: "doc", content: [] },
      jp: { type: "doc", content: [] },
    },
    readingTime: 1,
    image: "", // Chỉ giữ image (URL hoặc base64)
  });
  const [saving, setSaving] = useState(false);
  const [draftId, setDraftId] = useState(null);
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const cleanContent = (content) => {
    if (typeof content === "string") {
      return content.replace(/<div>/g, "").replace(/<\/div>/g, "");
    }
    return content;
  };

  const editorVi = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true, allowBase64: false }), // Tắt allowBase64 để kiểm soát paste
      TextStyle,
      FontSize,
    ],
    content: cleanContent(newPost.content.vi),
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setNewPost((prev) => ({
        ...prev,
        content: { ...prev.content, vi: json },
      }));
    },
  });

  const editorJp = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true, allowBase64: false }), // Tắt allowBase64 để kiểm soát paste
      TextStyle,
      FontSize,
    ],
    content: cleanContent(newPost.content.jp),
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setNewPost((prev) => ({
        ...prev,
        content: { ...prev.content, jp: json },
      }));
    },
  });

  const handleFileChange = (e) => {
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
    reader.onload = (event) => {
      setNewPost((prev) => ({
        ...prev,
        image: event.target.result, // Chuyển file thành base64
      }));
    };
    reader.readAsDataURL(file);
    setError(null);
  };

  const handleImagePaste = (event) => {
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
          setNewPost((prev) => ({
            ...prev,
            image: reader.result, // Lưu base64 từ paste
          }));
          setError(null);
        };
        reader.readAsDataURL(file);
        event.preventDefault();
        break;
      }
    }
  };

  const debouncedSaveDraft = useRef(
    debounce(async (data, currentDraftId) => {
      if (isDraftSaving) return;
      setIsDraftSaving(true);
      try {
        const payload = {
          ...data,
          categories: data.categories
            ? data.categories.split(",").map((c) => c.trim())
            : [],
          isDraft: true,
        };
        if (currentDraftId) payload._id = currentDraftId;
        const saved = await saveDraft(payload);
        setDraftId(saved._id);
      } catch (err) {
        console.warn("❌ Lưu bản nháp thất bại:", err.message);
        setError(t.errorDraft || "Lưu bản nháp thất bại: " + err.message);
      } finally {
        setIsDraftSaving(false);
      }
    }, 2000)
  ).current;

  useEffect(() => {
    getMyDraft()
      .then((draft) => {
        if (draft) {
          setNewPost({
            ...draft,
            categories: draft.categories?.join(", ") || "",
            content: {
              vi: draft.content?.vi || { type: "doc", content: [] },
              jp: draft.content?.jp || { type: "doc", content: [] },
            },
            image: draft.image || "", // Lấy image từ draft (URL hoặc base64)
          });
          setDraftId(draft._id);
          if (editorVi)
            editorVi.commands.setContent(
              draft.content?.vi || { type: "doc", content: [] }
            );
          if (editorJp)
            editorJp.commands.setContent(
              draft.content?.jp || { type: "doc", content: [] }
            );
        }
      })
      .catch((err) => {
        console.warn("❌ Không tải được bản nháp:", err.message);
        setError(
          t.errorFetchDraft || "Không tải được bản nháp: " + err.message
        );
      });
  }, [editorVi, editorJp, t]);

  useEffect(() => {
    if (
      (newPost.title.vi ||
        newPost.title.jp ||
        newPost.excerpt.vi ||
        newPost.excerpt.jp ||
        newPost.categories ||
        newPost.image ||
        newPost.content.vi.content.length > 0 ||
        newPost.content.jp.content.length > 0) &&
      !saving
    ) {
      debouncedSaveDraft(newPost, draftId);
    }
  }, [newPost, draftId, saving]);

  const handleInputChange = (field, lang, value) => {
    setNewPost((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setError(null);

    try {
      const contentSize = Buffer.byteLength(
        JSON.stringify(newPost.content),
        "utf8"
      );
      if (contentSize > 2 * 1024 * 1024) {
        throw new Error(t.errorContentSize || "Nội dung quá lớn (tối đa 2MB).");
      }

      const payload = {
        _id: draftId,
        title: newPost.title,
        excerpt: newPost.excerpt,
        readingTime: newPost.readingTime,
        image: newPost.image, // Chỉ gửi image (URL hoặc base64)
        categories: newPost.categories
          ? newPost.categories.split(",").map((c) => c.trim())
          : [],
        content: newPost.content,
        isDraft: false,
      };

      console.log("Payload sent to createPost:", payload); // Debug payload

      const response = await createPost(payload);
      setNewPost({
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
      setDraftId(null);
      if (editorVi) editorVi.commands.setContent({ type: "doc", content: [] });
      if (editorJp) editorJp.commands.setContent({ type: "doc", content: [] });
      alert(t.saved || "Đăng bài thành công!");
      if (onPostCreated) onPostCreated();
      router.push("/");
    } catch (err) {
      console.error("Error creating post:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          t.error ||
          "Lỗi khi đăng bài."
      );
    } finally {
      setSaving(false);
    }
  };

  const extractDocxContent = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      return result.value || "<p>Nội dung trống</p>";
    } catch (err) {
      throw new Error(`Lỗi đọc file Word: ${err.message}`);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer?.files || []);
    if (!files.length) {
      setError(t.noFile || "Không có file được chọn");
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
      setError(t.invalidEditor || "Không xác định được vùng biên tập");
      return;
    }

    setIsProcessing(true);
    try {
      for (const file of files) {
        if (!validTypes.includes(file.type)) {
          setError(t.invalidFileType || `File ${file.name} không được hỗ trợ`);
          continue;
        }
        if (file.size > maxSize) {
          setError(t.fileTooLarge || `File ${file.name} quá lớn, tối đa 10MB`);
          continue;
        }

        const ext = file.name.split(".").pop().toLowerCase();
        let content = "";
        if (ext === "docx") {
          content = await extractDocxContent(file);
        }

        if (content) {
          editor.commands.insertContent(content);
        } else {
          setError(t.fileReadError || `Không thể đọc nội dung từ ${file.name}`);
        }
      }
    } catch (err) {
      console.error("Error in handleDrop:", err);
      setError(t.fileReadError || `Lỗi khi xử lý file: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("border-blue-400", "bg-blue-50");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-blue-400", "bg-blue-50");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {t.createPost || "Tạo bài viết mới"}
      </h1>

      <form onSubmit={handleCreate} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t.title || "Tiêu đề (Tiếng Việt)"}
            </label>
            <TextareaAutosize
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              minRows={1}
              value={newPost.title.vi}
              onChange={(e) => handleInputChange("title", "vi", e.target.value)}
              placeholder="Nhập tiêu đề tiếng Việt"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t.title_1 || "Tiêu đề (Tiếng Nhật)"}
            </label>
            <TextareaAutosize
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              minRows={1}
              value={newPost.title.jp}
              onChange={(e) => handleInputChange("title", "jp", e.target.value)}
              placeholder="Nhập tiêu đề tiếng Nhật"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t.excerpt || "Tóm tắt (Tiếng Việt)"}
            </label>
            <TextareaAutosize
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              minRows={2}
              value={newPost.excerpt.vi}
              onChange={(e) =>
                handleInputChange("excerpt", "vi", e.target.value)
              }
              placeholder="Nhập tóm tắt tiếng Việt"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t.excerpt_1 || "Tóm tắt (Tiếng Nhật)"}
            </label>
            <TextareaAutosize
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              minRows={2}
              value={newPost.excerpt.jp}
              onChange={(e) =>
                handleInputChange("excerpt", "jp", e.target.value)
              }
              placeholder="Nhập tóm tắt tiếng Nhật"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t.categories || "Thể loại"}
            </label>
            <input
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              value={newPost.categories}
              onChange={(e) =>
                setNewPost({ ...newPost, categories: e.target.value })
              }
              placeholder="Nhập thể loại, cách nhau bằng dấu phẩy"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t.readingTime || "Thời gian đọc (phút)"}
            </label>
            <input
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              type="number"
              value={newPost.readingTime}
              onChange={(e) =>
                setNewPost({ ...newPost, readingTime: Number(e.target.value) })
              }
              placeholder="Nhập thời gian đọc"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {t.imageUrl || "Ảnh bìa (URL, dán ảnh, hoặc upload)"}
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none hover:bg-gray-100 transition-all duration-200 text-gray-800 placeholder-gray-400 mb-2"
            value={newPost.image}
            onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
            onPaste={handleImagePaste}
            placeholder="Nhập URL ảnh hoặc dán ảnh trực tiếp"
          />
          <div className="relative">
            <input
              type="file"
              id="file-upload"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 cursor-pointer text-center block"
            >
              Chọn file ảnh từ máy
            </label>
          </div>
          {newPost.image && (
            <img
              src={newPost.image}
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
            {t.content || "Nội dung (Tiếng Việt)"}
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
            {t.content_1 || "Nội dung (Tiếng Nhật)"}
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
            type="submit"
            disabled={saving || isProcessing}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 shadow-md ${
              saving || isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? t.saving || "Đang lưu..." : t.submit || "Đăng bài"}
          </button>
        </div>
      </form>
    </div>
  );
}
