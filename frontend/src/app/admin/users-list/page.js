"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/app/services/authService";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("vi"); // Thêm ngôn ngữ

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
    return (
      <div className="p-6 text-center text-[#7687a5]">
        Đang tải danh sách người dùng...
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-5xl mx-auto my-8">
      <h1 className="text-2xl font-semibold text-[#333] mb-6 text-center uppercase tracking-wide">
        {language === "vi" ? "Danh Sách Người Dùng" : "ユーザー一覧"}
      </h1>

      {/* Nút đổi ngôn ngữ */}
      <div className="flex justify-end mb-4 space-x-4">
        <button
          onClick={() => setLanguage("vi")}
          className={`px-4 py-2 rounded ${
            language === "vi" ? "bg-[#cfac1e] text-white" : "bg-gray-200"
          }`}
        >
          🇻🇳 Tiếng Việt
        </button>
        <button
          onClick={() => setLanguage("jp")}
          className={`px-4 py-2 rounded ${
            language === "jp" ? "bg-[#cfac1e] text-white" : "bg-gray-200"
          }`}
        >
          🇯🇵 日本語
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg text-sm">
          <thead>
            <tr className="bg-[#f5f5f5] text-[#7687a5] uppercase text-xs">
              <th className="p-3 border">
                {language === "vi" ? "Tên" : "名前"}
              </th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">
                {language === "vi" ? "Tiểu sử" : "自己紹介"}
              </th>
              <th className="p-3 border">
                {language === "vi" ? "Công việc" : "職業"}
              </th>
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
                    ? user.name[language] || "Chưa cập nhật"
                    : user.name}
                </td>
                <td className="p-3 border text-[#555]">{user.email}</td>
                <td className="p-3 border text-[#555]">{user.role}</td>
                <td className="p-3 border text-[#555] italic">
                  {typeof user.bio === "object"
                    ? user.bio[language] || "Chưa cập nhật"
                    : user.bio || "Chưa cập nhật"}
                </td>
                <td className="p-3 border text-[#555]">
                  {typeof user.job === "object"
                    ? user.job[language] || "Chưa cập nhật"
                    : user.job || "Chưa cập nhật"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
