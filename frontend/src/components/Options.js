"use client";

import { memo } from "react"; // Thêm import React.memo
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import {
  MdPostAdd,
  MdDashboard,
  MdInfoOutline,
  MdPeople,
  MdAccountCircle,
} from "react-icons/md";
import useTranslation from "@/app/hooks/useTranslations";

function SidebarLink({ href, label, icon, onClick }) {
  return (
    <Link
      href={href}
      onClick={() => onClick(false)}
      className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#cfac1e] transition"
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

const MemoizedSidebarLink = memo(SidebarLink);

export default function AdminSidebar({
  showAdminSidebar,
  setShowAdminSidebar,
}) {
  const translations = useTranslation();
  const t = translations?.Options || {};

  return (
    <>
      {showAdminSidebar && (
        <div
          className={`fixed top-15 left-0 h-auto w-full md:w-64 bg-white z-[1000] border-r border-gray-200  px-6 py-8 transition-all duration-300 ease-in-out ${
            showAdminSidebar ? "left-0 opacity-100" : "-left-64 opacity-0"
          }`}
        >
          {/* Close Button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowAdminSidebar(false)}
              className="text-gray-500 hover:text-red-500 transition"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Quản trị Admin
          </h2>

          {/* Links */}
          <nav className="space-y-4">
            <MemoizedSidebarLink
              href="/admin"
              label={t.post}
              icon={<MdDashboard />}
              onClick={setShowAdminSidebar}
            />
            <MemoizedSidebarLink
              href="/admin/create-post"
              label={t.createPost}
              icon={<MdPostAdd />}
              onClick={setShowAdminSidebar}
            />
            <MemoizedSidebarLink
              href="/admin/edit-about"
              label={t.about}
              icon={<MdInfoOutline />}
              onClick={setShowAdminSidebar}
            />
            <MemoizedSidebarLink
              href="/admin/users-list"
              label={t.users}
              icon={<MdPeople />}
              onClick={setShowAdminSidebar}
            />
            <MemoizedSidebarLink
              href="/admin/profile"
              label={t.admin}
              icon={<MdAccountCircle />}
              onClick={setShowAdminSidebar}
            />
          </nav>
        </div>
      )}
    </>
  );
}
