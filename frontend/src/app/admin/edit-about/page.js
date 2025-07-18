"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAboutData, updateAboutData } from "@/app/services/aboutService";
import useAuthUser from "@/app/hooks/useAuthUser";
import useTranslation from "@/app/hooks/useTranslations";
import TextareaAutosize from "react-textarea-autosize";

export default function EditAboutPage() {
  const { user, loading } = useAuthUser();
  const [form, setForm] = useState({
    title: { vi: "", jp: "" },
    excerpt: { vi: "", jp: "" },
    image: "",
    sections: [
      { subtitle: { vi: "", jp: "" }, content: { vi: "", jp: "" }, image: "" },
    ],
  });
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(true);
  const translations = useTranslation();
  const t = translations?.EditAbout || {};

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAboutData();

        const safeSections = (data.sections || []).map((s) => ({
          subtitle:
            typeof s.subtitle === "object"
              ? s.subtitle
              : { vi: s.subtitle || "", jp: "" },
          content:
            typeof s.content === "object"
              ? s.content
              : { vi: s.content || "", jp: "" },
          image: s.image || "",
        }));

        setForm({
          title:
            typeof data.title === "object"
              ? data.title
              : { vi: data.title || "", jp: "" },
          excerpt:
            typeof data.excerpt === "object"
              ? data.excerpt
              : { vi: data.excerpt || "", jp: "" },
          image: data.image || "",
          sections: safeSections.length
            ? safeSections
            : [
                {
                  subtitle: { vi: "", jp: "" },
                  content: { vi: "", jp: "" },
                  image: "",
                },
              ],
        });
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setFetching(false);
      }
    };
    fetch();
  }, []);

  const handleFieldChange = (field, lang, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSectionChange = (index, field, lang, value) => {
    const updated = [...form.sections];
    if (lang) {
      updated[index][field][lang] = value;
    } else {
      updated[index][field] = value;
    }
    setForm({ ...form, sections: updated });
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
      alert(t.saved);
    } catch (err) {
      alert(t.error + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || fetching)
    return <p className="text-center mt-10">{t.loading}</p>;
  if (!user || user.role !== "admin")
    return <p className="text-center mt-10 text-red-600">{t.noAccess}</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-[#cfac1e] text-center">
        {t.editTitle}
      </h1>

      {/* Title & Excerpt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg p-6 rounded-xl border">
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            {t.placeholderTitle}
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#cfac1e]"
            value={form.title.vi}
            onChange={(e) => handleFieldChange("title", "vi", e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            {t.placeholderTitle_1}
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#cfac1e]"
            value={form.title.jp}
            onChange={(e) => handleFieldChange("title", "jp", e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            {t.placeholderExcerpt}
          </label>
          <TextareaAutosize
            minRows={3}
            value={form.excerpt.vi}
            onChange={(e) => handleFieldChange("excerpt", "vi", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#cfac1e] resize-none"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            {t.placeholderExcerpt_1}
          </label>
          <TextareaAutosize
            minRows={3}
            value={form.excerpt.jp}
            onChange={(e) => handleFieldChange("excerpt", "jp", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#cfac1e] resize-none"
          />
        </div>
      </div>

      {/* Main Image */}
      <div className="bg-white shadow-lg p-6 rounded-xl border space-y-3">
        <label className="block font-medium text-gray-700">
          {t.placeholderImage}
        </label>
        <input
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#cfac1e]"
          value={form.image}
          onChange={(e) => handleChange("image", e.target.value)}
        />
        {form.image && (
          <img
            src={form.image}
            alt="Cover"
            className="mt-2 rounded-lg border max-w-sm shadow"
          />
        )}
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {t.sectionHeading}
        </h2>

        {form.sections.map((sec, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl border shadow-md space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t.sectionTitle}
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#cfac1e]"
                  value={sec.subtitle.vi}
                  onChange={(e) =>
                    handleSectionChange(index, "subtitle", "vi", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t.sectionTitle_1}
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#cfac1e]"
                  value={sec.subtitle.jp}
                  onChange={(e) =>
                    handleSectionChange(index, "subtitle", "jp", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t.sectionContent}
                </label>
                <TextareaAutosize
                  minRows={4}
                  value={sec.content.vi}
                  onChange={(e) =>
                    handleSectionChange(index, "content", "vi", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#cfac1e] resize-none"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t.sectionContent_1}
                </label>
                <TextareaAutosize
                  minRows={4}
                  value={sec.content.jp}
                  onChange={(e) =>
                    handleSectionChange(index, "content", "jp", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#cfac1e] resize-none"
                />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                {t.sectionImage}
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#cfac1e]"
                value={sec.image}
                onChange={(e) =>
                  handleSectionChange(index, "image", null, e.target.value)
                }
              />
              {sec.image && (
                <img
                  src={sec.image}
                  alt="Section"
                  className="mt-2 rounded-lg border max-w-sm shadow"
                />
              )}
            </div>
          </div>
        ))}

        <button
          onClick={handleAddSection}
          type="button"
          className="px-5 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-900 transition"
        >
          {t.addSection}
        </button>
      </div>

      {/* Save button */}
      <div className="text-center pt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#cfac1e] text-white text-lg font-semibold px-8 py-3 rounded-lg hover:bg-[#b89514] transition disabled:opacity-50"
        >
          {saving ? t.saving : t.save}
        </button>
      </div>
    </div>
  );
}
