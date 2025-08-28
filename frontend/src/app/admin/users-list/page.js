"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { getUsers, deleteUser } from "@/app/services/authService";
import useTranslation from "@/app/hooks/useTranslations";
import { getLocalizedText } from "@/lib/getLocalizedText";
import { FaTrash, FaUserShield, FaUser } from "react-icons/fa";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const translations = useTranslation();
  const t = translations?.UserList || {};

  const fetchUsers = useCallback(async () => {
    try {
      const data = await getUsers();
      // Admin đứng đầu
      const sorted = [...data].sort((a, b) => {
        if (a.role === "admin" && b.role !== "admin") return -1;
        if (a.role !== "admin" && b.role === "admin") return 1;
        return 0;
      });
      setUsers(sorted);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá user này không?")) return;
    try {
      setDeleting(id);
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Delete user failed:", error);
      alert(error.message || "Xoá user thất bại");
    } finally {
      setDeleting(null);
    }
  };

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
    <div className="p-4 md:p-8 bg-gray-50 min-h-[calc(100vh-60px)] max-w-6xl mx-auto my-10 w-full">
      <h1 className="text-3xl font-bold text-yellow-600 mb-10 text-center uppercase tracking-wide">
        {t.title || "User List"}
      </h1>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userList.map((user) => (
          <div
            key={user._id}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center"
          >
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shadow-md">
              {user.role === "admin" ? (
                <FaUserShield size={32} />
              ) : (
                <FaUser size={32} />
              )}
            </div>

            {/* Info */}
            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>

            {/* Role Badge */}
            <span
              className={`mt-3 px-3 py-1 text-xs font-medium rounded-full ${
                user.role === "admin"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {user.role}
            </span>

            {/* Admin có thêm Bio + Job */}
            {user.role === "admin" && (
              <>
                <p className="mt-3 text-sm text-gray-600 italic">{user.bio}</p>
                <p className="mt-1 text-sm text-gray-600">{user.job}</p>
              </>
            )}

            {/* Delete Button (ẩn cho admin) */}
            {user.role !== "admin" && (
              <button
                onClick={() => handleDelete(user._id)}
                disabled={deleting === user._id}
                className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-red-500 text-white rounded-xl shadow hover:bg-red-600 active:scale-95 disabled:opacity-50 transition"
              >
                <FaTrash size={14} />
                {deleting === user._id ? "Deleting..." : t.delete || "Delete"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
