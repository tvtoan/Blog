"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAboutData, updateAboutData } from "@/app/services/aboutService";
import useAuthUser from "@/app/hooks/useAuthUser";
import useTranslation from "@/app/hooks/useTranslations";

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
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-[#cfac1e]">{t.editTitle}</h1>

      <div className="space-y-5">
        <div>
          <label className="font-semibold">{t.placeholderTitle}</label>
          <input
            className="border p-3 rounded w-full mb-2"
            value={form.title.vi}
            onChange={(e) => handleFieldChange("title", "vi", e.target.value)}
          />
          <label className="font-semibold">{t.placeholderTitle_1}</label>
          <input
            className="border p-3 rounded w-full"
            value={form.title.jp}
            onChange={(e) => handleFieldChange("title", "jp", e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">{t.placeholderExcerpt}</label>
          <textarea
            className="border p-3 rounded w-full mb-2"
            value={form.excerpt.vi}
            onChange={(e) => handleFieldChange("excerpt", "vi", e.target.value)}
          />
          <label className="font-semibold">{t.placeholderExcerpt_1}</label>
          <textarea
            className="border p-3 rounded w-full"
            value={form.excerpt.jp}
            onChange={(e) => handleFieldChange("excerpt", "jp", e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">{t.placeholderImage}</label>
          <input
            className="border p-3 rounded w-full"
            value={form.image}
            onChange={(e) => handleChange("image", e.target.value)}
          />
          {form.image && (
            <img
              src={form.image}
              alt="Cover"
              className="mt-2 rounded border max-w-xs"
            />
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">{t.sectionHeading}</h2>
          {form.sections.map((sec, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 border border-gray-300 rounded space-y-2"
            >
              <div>
                <label className="font-semibold">{t.sectionTitle}</label>
                <input
                  className="border p-2 mb-2 w-full rounded"
                  value={sec.subtitle.vi}
                  onChange={(e) =>
                    handleSectionChange(index, "subtitle", "vi", e.target.value)
                  }
                />
                <label className="font-semibold">{t.sectionTitle_1}</label>
                <input
                  className="border p-2 w-full rounded"
                  value={sec.subtitle.jp}
                  onChange={(e) =>
                    handleSectionChange(index, "subtitle", "jp", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="font-semibold">{t.sectionContent}</label>
                <textarea
                  className="border p-2 mb-2 w-full rounded"
                  rows={3}
                  value={sec.content.vi}
                  onChange={(e) =>
                    handleSectionChange(index, "content", "vi", e.target.value)
                  }
                />
                <label className="font-semibold">{t.sectionContent_1}</label>
                <textarea
                  className="border p-2 w-full rounded"
                  rows={3}
                  value={sec.content.jp}
                  onChange={(e) =>
                    handleSectionChange(index, "content", "jp", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="font-semibold">{t.sectionImage}</label>
                <input
                  className="border p-2 w-full rounded"
                  value={sec.image}
                  onChange={(e) =>
                    handleSectionChange(index, "image", null, e.target.value)
                  }
                />
                {sec.image && (
                  <img
                    src={sec.image}
                    alt="Section"
                    className="mt-2 rounded border max-w-xs"
                  />
                )}
              </div>
            </div>
          ))}
          <button
            onClick={handleAddSection}
            type="button"
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900"
          >
            {t.addSection}
          </button>
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
