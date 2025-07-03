"use client";

import { useEffect, useState } from "react";
import { getAdminInfo, updateAdmin } from "@/app/services/authService";

export default function EditAdminPage() {
  const [admin, setAdmin] = useState({
    name: "",
    bio: "",
    job: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await getAdminInfo();
        setAdmin(data);
      } catch (error) {
        console.error("Failed to fetch admin info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAdmin(admin);
      alert("✅ Cập nhật thành công");
    } catch (error) {
      console.error("Failed to update admin:", error);
      alert("❌ Lỗi khi cập nhật");
    }
  };

  if (loading)
    return (
      <div className="p-4 text-center text-yellow-600">
        Đang tải dữ liệu admin...
      </div>
    );

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#cfac1e]">
        👤 Chỉnh sửa thông tin Admin
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-[#cfac1e]">
            Tên Admin
          </label>
          <input
            type="text"
            name="name"
            value={admin.name}
            onChange={handleChange}
            className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cfac1e]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#cfac1e]">
            Tiểu sử (Bio)
          </label>
          <input
            type="text"
            name="bio"
            value={admin.bio}
            onChange={handleChange}
            className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cfac1e]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#cfac1e]">
            Công việc
          </label>
          <input
            type="text"
            name="job"
            value={admin.job}
            onChange={handleChange}
            className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cfac1e]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#cfac1e]">
            Ảnh đại diện (URL)
          </label>
          <input
            type="text"
            name="avatar"
            value={admin.avatar}
            onChange={handleChange}
            className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cfac1e]"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-[#cfac1e] text-white font-semibold px-6 py-3 rounded hover:bg-[#b89514] transition"
          >
            💾 Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
