"use client";

import { useState, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { createPost, saveDraft, getMyDraft } from "@/app/services/postService";
import { useLanguage } from "@/app/context/LanguageContext";
import debounce from "lodash/debounce";

export default function CreatePost({ t, onPostCreated }) {
  const { language } = useLanguage();
  const [newPost, setNewPost] = useState({
    title: { vi: "", jp: "" },
    excerpt: { vi: "", jp: "" },
    categories: "",
    sections: [
      { subtitle: { vi: "", jp: "" }, content: { vi: "", jp: "" }, image: "" },
    ],
    readingTime: 1,
    image: "",
  });
  const [saving, setSaving] = useState(false);
  const [draftId, setDraftId] = useState(null);

  // Debounce lưu bản nháp
  const debouncedSaveDraft = useRef(
    debounce(async (data) => {
      try {
        const payload = {
          ...data,
          categories: data.categories
            ? data.categories.split(",").map((c) => c.trim())
            : [],
        };
        if (draftId) payload._id = draftId;
        const saved = await saveDraft(payload);
        setDraftId(saved._id);
        console.log("✅ Draft saved (debounced)", saved._id);
      } catch (err) {
        console.warn("❌ Draft save failed", err.message);
      }
    }, 2000)
  ).current;

  // Load bản nháp khi vào lại
  useEffect(() => {
    getMyDraft()
      .then((draft) => {
        if (draft) {
          setNewPost({
            ...draft,
            categories: draft.categories?.join(", ") || "",
          });
          setDraftId(draft._id);
        }
      })
      .catch((err) => {
        console.warn("❌ Không tải được bản nháp:", err.message);
      });
  }, []);

  // Auto-save mỗi lần thay đổi
  useEffect(() => {
    debouncedSaveDraft(newPost);
  }, [newPost]);

  const handleInputChange = (field, lang, value) => {
    const updated = {
      ...newPost,
      [field]: { ...newPost[field], [lang]: value },
    };
    setNewPost(updated);
  };

  const handleSectionChange = (index, field, lang, value) => {
    const updated = [...newPost.sections];
    if (field === "subtitle" || field === "content") {
      updated[index][field][lang] = value;
    } else {
      updated[index][field] = value;
    }
    const updatedPost = { ...newPost, sections: updated };
    setNewPost(updatedPost);
  };

  const handleAddSection = () => {
    setNewPost((prev) => ({
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

  const handleCreate = async () => {
    setSaving(true);
    try {
      const payload = {
        title: newPost.title,
        excerpt: newPost.excerpt,
        readingTime: newPost.readingTime,
        image: newPost.image,
        categories: newPost.categories.split(",").map((c) => c.trim()),
        sections: newPost.sections,
      };
      await createPost(payload);
      setNewPost({
        title: { vi: "", jp: "" },
        excerpt: { vi: "", jp: "" },
        categories: "",
        sections: [
          {
            subtitle: { vi: "", jp: "" },
            content: { vi: "", jp: "" },
            image: "",
          },
        ],
        readingTime: 1,
        image: "",
      });
      alert(t.saved);
      if (onPostCreated) onPostCreated();
    } catch (err) {
      alert(t.error + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
      className="space-y-5"
    >
      <div className="grid md:grid-cols-2 gap-4">
        {/* Title and Excerpt Fields */}
        <div>
          <label className="block mb-1 font-semibold">{t.title}</label>
          <TextareaAutosize
            className="border p-3 rounded w-full"
            minRows={1}
            value={newPost.title.vi}
            onChange={(e) => handleInputChange("title", "vi", e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">{t.title_1}</label>
          <TextareaAutosize
            className="border p-3 rounded w-full"
            minRows={1}
            value={newPost.title.jp}
            onChange={(e) => handleInputChange("title", "jp", e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">{t.excerpt}</label>
          <TextareaAutosize
            className="border p-3 rounded w-full"
            minRows={2}
            value={newPost.excerpt.vi}
            onChange={(e) => handleInputChange("excerpt", "vi", e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">{t.excerpt_1}</label>
          <TextareaAutosize
            className="border p-3 rounded w-full"
            minRows={2}
            value={newPost.excerpt.jp}
            onChange={(e) => handleInputChange("excerpt", "jp", e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">{t.categories}</label>
          <input
            className="border p-3 rounded w-full"
            value={newPost.categories}
            onChange={(e) =>
              setNewPost({ ...newPost, categories: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">{t.readingTime}</label>
          <input
            className="border p-3 rounded w-full"
            type="number"
            value={newPost.readingTime}
            onChange={(e) =>
              setNewPost({ ...newPost, readingTime: Number(e.target.value) })
            }
          />
        </div>
      </div>

      {/* Image field */}
      <div>
        <label className="block mb-1 font-semibold">{t.imageUrl}</label>
        <input
          type="text"
          className="border p-3 rounded w-full"
          value={newPost.image}
          onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
        />
        {newPost.image && (
          <img
            src={newPost.image}
            alt="Preview"
            className="mt-2 rounded border max-w-xs"
          />
        )}
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold mb-2">{t.sections}</h3>
        {newPost.sections.map((section, index) => (
          <div
            key={index}
            className="md:p-4 p-0 border md:border-gray-300 border-none rounded-lg mb-4 bg-gray-50"
          >
            <div>
              <label className="block mb-1 font-semibold">{t.smallTitle}</label>
              <TextareaAutosize
                className="border p-2 mb-2 w-full rounded"
                minRows={1}
                value={section.subtitle.vi}
                onChange={(e) =>
                  handleSectionChange(index, "subtitle", "vi", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">
                {t.smallTitle_1}
              </label>
              <TextareaAutosize
                className="border p-2 mb-2 w-full rounded"
                minRows={1}
                value={section.subtitle.jp}
                onChange={(e) =>
                  handleSectionChange(index, "subtitle", "jp", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">{t.content}</label>
              <TextareaAutosize
                className="border p-2 mb-2 w-full rounded"
                minRows={3}
                value={section.content.vi}
                onChange={(e) =>
                  handleSectionChange(index, "content", "vi", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">{t.content_1}</label>
              <TextareaAutosize
                className="border p-2 mb-2 w-full rounded"
                minRows={3}
                value={section.content.jp}
                onChange={(e) =>
                  handleSectionChange(index, "content", "jp", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">{t.image}</label>
              <input
                className="border p-2 w-full rounded"
                value={section.image}
                onChange={(e) =>
                  handleSectionChange(index, "image", null, e.target.value)
                }
              />
              {section.image && (
                <img
                  src={section.image}
                  alt="Section preview"
                  className="mt-2 rounded border max-w-xs"
                />
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSection}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900"
        >
          + {t.addSection}
        </button>
      </div>

      <div className="text-right pt-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#cfac1e] text-white font-semibold px-6 py-2 rounded hover:bg-[#b89514] disabled:opacity-50"
        >
          {saving ? t.saving : t.submit}
        </button>
      </div>
    </form>
  );
}
