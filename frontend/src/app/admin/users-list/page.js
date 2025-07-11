"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/app/services/authService";
import useTranslation from "@/app/hooks/useTranslations";
import { getLocalizedText } from "@/lib/getLocalizedText";
export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const translations = useTranslation();
  const t = translations?.UserList || {};

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-[#7687a5]">{t.loading}</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-white rounded-lg shadow-md max-w-5xl mx-auto my-8 w-full">
      <h1 className="text-xl md:text-2xl font-semibold text-[#333] mb-6 text-center uppercase tracking-wide">
        {t.title}
      </h1>

      {/* ✅ Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg text-sm">
          <thead>
            <tr className="bg-[#f5f5f5] text-[#7687a5] uppercase text-xs">
              <th className="p-3 border">{t.name}</th>
              <th className="p-3 border">{t.email}</th>
              <th className="p-3 border">{t.role}</th>
              <th className="p-3 border">{t.bio}</th>
              <th className="p-3 border">{t.job}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-[#fef8e7] transition-colors cursor-pointer"
              >
                <td className="p-3 border text-[#333] font-medium">
                  {getLocalizedText(
                    user.name,
                    translations.language,
                    t.notUpdated
                  )}
                </td>
                <td className="p-3 border text-[#555]">{user.email}</td>
                <td className="p-3 border text-[#555]">{user.role}</td>
                <td className="p-3 border text-[#555] italic">
                  {getLocalizedText(
                    user.bio,
                    translations.language,
                    t.notUpdated
                  )}
                </td>
                <td className="p-3 border text-[#555]">
                  {getLocalizedText(
                    user.job,
                    translations.language,
                    t.notUpdated
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <p className="text-[#333] font-semibold mb-1">
              {t.name}:{" "}
              <span className="font-normal">
                {getLocalizedText(
                  user.name,
                  translations.language,
                  t.notUpdated
                )}
              </span>
            </p>
            <p className="text-[#555] text-sm mb-1">
              {t.email}: <span className="font-medium">{user.email}</span>
            </p>
            <p className="text-[#555] text-sm mb-1">
              {t.role}: <span className="font-medium">{user.role}</span>
            </p>
            <p className="text-[#555] text-sm mb-1 italic">
              {t.bio}:{" "}
              <span>
                {getLocalizedText(
                  user.bio,
                  translations.language,
                  t.notUpdated
                )}
              </span>
            </p>
            <p className="text-[#555] text-sm">
              {t.job}:{" "}
              <span>
                {getLocalizedText(
                  user.job,
                  translations.language,
                  t.notUpdated
                )}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
