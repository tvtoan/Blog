"use client";

import { useEffect, useState, useCallback, useMemo } from "react"; // Thêm import useMemo
import { getUsers } from "@/app/services/authService";
import useTranslation from "@/app/hooks/useTranslations";
import { getLocalizedText } from "@/lib/getLocalizedText";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const translations = useTranslation();
  const t = translations?.UserList || {};

  const fetchUsers = useCallback(async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const userList = useMemo(
    () =>
      users.map((user) => ({
        ...user,
        name: getLocalizedText(user.name, translations.language, t.notUpdated),
        bio: getLocalizedText(user.bio, translations.language, t.notUpdated),
        job: getLocalizedText(user.job, translations.language, t.notUpdated),
      })),
    [users, translations.language, t.notUpdated]
  );

  if (loading) {
    return (
      <div className="p-6 text-center text-[#7687a5] text-lg animate-pulse">
        {t.loading || "Loading..."}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-[calc(100vh-60px)] rounded-lg shadow-sm max-w-6xl mx-auto my-10 w-full ">
      <h1 className="text-2xl md:text-3xl font-bold text-yellow-600 mb-8 text-center uppercase tracking-wider">
        {t.title || "User List"}
      </h1>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm shadow-sm">
          <thead>
            <tr className="bg-yellow-100 text-[#444] uppercase text-xs">
              <th className="p-3 border">👤 {t.name}</th>
              <th className="p-3 border">📧 {t.email}</th>
              <th className="p-3 border">🎓 {t.role}</th>
              <th className="p-3 border">📝 {t.bio}</th>
              <th className="p-3 border">💼 {t.job}</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-yellow-50 transition-colors cursor-pointer border-b last:border-b-0"
              >
                <td className="p-3 border text-gray-800 font-semibold">
                  {user.name}
                </td>
                <td className="p-3 border text-gray-600">{user.email}</td>
                <td className="p-3 border text-gray-600 capitalize">
                  {user.role}
                </td>
                <td className="p-3 border text-gray-500 italic">{user.bio}</td>
                <td className="p-3 border text-gray-500">{user.job}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="block md:hidden space-y-4 mt-6">
        {userList.map((user) => (
          <div
            key={user._id}
            className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
          >
            <p className="text-yellow-600 font-semibold text-lg mb-2">
              {user.name}
            </p>
            <p className="text-sm text-gray-700">
              📧 <span className="font-medium">{user.email}</span>
            </p>
            <p className="text-sm text-gray-700 mt-1">
              🎓 <span className="capitalize">{user.role}</span>
            </p>
            <p className="text-sm text-gray-600 italic mt-1">
              📝 <span>{user.bio}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              💼 <span>{user.job}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
