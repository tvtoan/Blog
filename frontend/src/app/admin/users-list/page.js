"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/app/services/authService";
import { useLanguage } from "@/app/context/LanguageContext";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  const text = {
    vi: {
      title: "Danh Sách Người Dùng",
      loading: "Đang tải danh sách người dùng...",
      name: "Tên",
      email: "Email",
      role: "Role",
      bio: "Bio",
      job: "Job",
      notUpdated: "Chưa cập nhật",
    },
    jp: {
      title: "ユーザー一覧",
      loading: "ユーザーリストを読み込み中...",
      name: "名前",
      email: "メール",
      role: "役割",
      bio: "自己紹介",
      job: "職業",
      notUpdated: "未更新",
    },
  };

  const t = text[language] || text.vi;

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
    <div className="p-8 bg-white rounded-lg shadow-md max-w-5xl mx-auto my-8">
      <h1 className="text-2xl font-semibold text-[#333] mb-6 text-center uppercase tracking-wide">
        {t.title}
      </h1>

      <div className="overflow-x-auto">
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
                  {typeof user.name === "object"
                    ? user.name[language] || t.notUpdated
                    : user.name || t.notUpdated}
                </td>
                <td className="p-3 border text-[#555]">{user.email}</td>
                <td className="p-3 border text-[#555]">{user.role}</td>
                <td className="p-3 border text-[#555] italic">
                  {typeof user.bio === "object"
                    ? user.bio[language] || t.notUpdated
                    : user.bio || t.notUpdated}
                </td>
                <td className="p-3 border text-[#555]">
                  {typeof user.job === "object"
                    ? user.job[language] || t.notUpdated
                    : user.job || t.notUpdated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
