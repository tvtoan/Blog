"use client";

import { useState, useEffect, useRef } from "react";
import { IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import useAuthUser from "@/app/hooks/useAuthUser"; // 👈 import hook của bạn
import { SiAwssecretsmanager } from "react-icons/si";
import { FaRegAddressBook } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { BsFileEarmarkPostFill } from "react-icons/bs";

export default function AdminToolButton() {
  const { user, loading } = useAuthUser(); // 👈 lấy user & loading
  const [menuOpen, setMenuOpen] = useState(false);
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      closeMenu();
    }, 2000);
  };

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // 👇 Không phải admin thì không render gì cả
  if (loading || user?.role !== "admin") return null;

  return (
    <div
      ref={containerRef}
      className="fixed top-1/2 left-4 transform -translate-y-1/2 z-50 flex items-center"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="bg-gray-400 text-white p-2 rounded-full shadow-lg hover:bg-gray-300"
        aria-label="Admin Tools"
      >
        <IoMenuOutline size={20} />
      </button>

      {menuOpen && (
        <div className="ml-4 bg-white border rounded shadow-lg p-4 space-y-3 text-sm text-gray-700 w-52">
          <Link
            href="/admin"
            className=" hover:text-[#cfac1e] flex text-center items-center gap-2"
          >
            <BsFileEarmarkPostFill /> Quản lý Bài viết
          </Link>
          <Link
            href="/admin/edit-about"
            className=" hover:text-[#cfac1e] flex text-center items-center gap-2"
          >
            <SiAwssecretsmanager /> Quản lý About Me
          </Link>
          <Link
            href="/admin/users-list"
            className=" hover:text-[#cfac1e] flex text-center items-center gap-2"
          >
            <FaRegAddressBook /> Quản lý Người dùng
          </Link>
          <Link
            href="/admin/profile"
            className=" hover:text-[#cfac1e] flex text-center items-center gap-2"
          >
            <IoSettingsOutline /> Chỉnh sửa Admin
          </Link>
        </div>
      )}
    </div>
  );
}
