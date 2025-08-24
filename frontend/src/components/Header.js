"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaYoutube, FaBars } from "react-icons/fa";
import { IoLogoFacebook, IoIosLogIn } from "react-icons/io";
import { ImInstagram } from "react-icons/im";
import { AiFillTikTok } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { slugifyCategory } from "@/lib/slugifyCategory";
import { montserrat } from "../lib/font";
import { getPosts } from "@/app/services/postService";
import { useLanguage } from "@/app/context/LanguageContext";
import useAuthUser from "@/app/hooks/useAuthUser";

// Component cho mỗi mục trong dropdown, bọc bằng memo
const CategoryLink = memo(({ category, onClick }) => (
  <Link
    href={`/category/${slugifyCategory(category)}`}
    onClick={onClick}
    className="block px-4 py-2 text-[#585656] hover:bg-gray-100 hover:text-[#e1c680] transition-colors"
  >
    {category}
  </Link>
));

const Header = ({ showAdminSidebar, setShowAdminSidebar }) => {
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const pathname = usePathname();
  const menuRef = useRef(null);
  const blogTimeoutRef = useRef(null);

  const { language, toggleLanguage } = useLanguage();
  const { user } = useAuthUser();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const posts = await getPosts();
        const uniqueCategories = Array.from(
          new Set(posts.flatMap((post) => post.categories || []))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const isActive = (path) => {
    return pathname === path || (path !== "/" && pathname.startsWith(path));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleBlogMouseEnter = () => {
    if (blogTimeoutRef.current) clearTimeout(blogTimeoutRef.current);
    setIsBlogOpen(true);
  };

  const handleBlogMouseLeave = () => {
    blogTimeoutRef.current = setTimeout(() => {
      setIsBlogOpen(false);
    }, 200);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const t = {
    home: language === "vi" ? "HOME" : "ホーム",
    blog: language === "vi" ? "BLOG" : "ブログ",
    youtube: language === "vi" ? "YOUTUBE" : "ユーチューブ",
    about: language === "vi" ? "ABOUT ME" : "私について",
    categories: categories,
    options: language === "vi" ? "TÙY CHỌN" : "オプション",
  };

  return (
    <header
      className={`bg-[#ececec] px-6 md:px-[100px] py-[18px] flex justify-between items-center border-b border-gray-200 ${montserrat.className}`}
    >
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#585656] hover:text-[#e1c680] text-xl"
        >
          <FaBars />
        </button>
      </div>

      <nav className="hidden md:flex items-center space-x-6 text-[12px]">
        <Link
          href="/"
          prefetch={true}
          className={`font-[400] transition-colors ${
            isActive("/")
              ? "text-[#e1c680]"
              : "text-[#585656] hover:text-[#e1c680]"
          }`}
        >
          {t.home}
        </Link>

        <div
          className="relative"
          onMouseEnter={handleBlogMouseEnter}
          onMouseLeave={handleBlogMouseLeave}
        >
          <Link
            href="/category"
            prefetch={true}
            className={`font-[400] transition-colors ${
              isActive("/category")
                ? "text-[#e1c680]"
                : "text-[#585656] hover:text-[#e1c680]"
            }`}
          >
            {t.blog} <MdKeyboardArrowDown className="inline-block w-5 h-5" />
          </Link>

          {isBlogOpen && (
            <div className="absolute top-full -left-[70px] mt-4 text-center bg-white border border-[#e1c680] shadow-md min-w-[200px] z-50 before:content-[''] before:absolute before:top-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-[14px] before:h-[14px] before:bg-white before:border-l before:border-t before:border-[#e1c680] before:rotate-45">
              {loadingCategories ? (
                <div className="px-4 py-2 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                </div>
              ) : (
                t.categories.map((item, index) => (
                  <CategoryLink
                    key={index}
                    category={item}
                    onClick={handleMenuItemClick}
                  />
                ))
              )}
            </div>
          )}
        </div>

        {/* <Link
          href="/youtube"
          prefetch={true}
          className={`font-[400] transition-colors ${
            isActive("/youtube")
              ? "text-[#e1c680]"
              : "text-[#585656] hover:text-[#e1c680]"
          }`}
        >
          {t.youtube}
        </Link> */}

        <Link
          href="/about"
          prefetch={true}
          className={`font-[400] transition-colors ${
            isActive("/about")
              ? "text-[#e1c680]"
              : "text-[#585656] hover:text-[#e1c680]"
          }`}
        >
          {t.about}
        </Link>
        <button
          onClick={toggleLanguage}
          className="font-[400] transition-colors text-[#585656] hover:text-[#e1c680]"
        >
          {language === "vi" ? "日本語" : "VIETNAMESE"}
        </button>

        {user?.role === "admin" && (
          <button
            onClick={() => setShowAdminSidebar(!showAdminSidebar)}
            className="font-[400] transition-colors text-[#585656] hover:text-[#e1c680]"
          >
            {t.options}
          </button>
        )}
      </nav>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-[60px] left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50 text-[14px] md:hidden"
          style={{ display: isMenuOpen ? "block" : "none" }} // Sử dụng CSS để ẩn/hiện
        >
          <Link
            href="/"
            prefetch={true}
            onClick={handleMenuItemClick}
            className="block text-center py-3 border-b hover:bg-gray-100"
          >
            {t.home}
          </Link>
          <Link
            href="/category"
            prefetch={true}
            onClick={handleMenuItemClick}
            className="block text-center py-3 border-b hover:bg-gray-100"
          >
            {t.blog}
          </Link>
          <Link
            href="/"
            prefetch={true}
            onClick={handleMenuItemClick}
            className="block py-3 text-center border-b hover:bg-gray-100"
          >
            {t.youtube}
          </Link>
          <Link
            href="/about"
            prefetch={true}
            onClick={handleMenuItemClick}
            className="block py-3 text-center border-b hover:bg-gray-100"
          >
            {t.about}
          </Link>
          <button
            onClick={() => {
              toggleLanguage();
              handleMenuItemClick();
            }}
            className="block text-center py-3 hover:bg-gray-100 w-full text-left"
          >
            {language === "vi" ? "日本語" : "VIETNAMESE"}
          </button>
          {user?.role === "admin" && (
            <button
              onClick={() => {
                setShowAdminSidebar(!showAdminSidebar);
                handleMenuItemClick();
              }}
              className="block text-center py-3 hover:bg-gray-100 w-full text-left"
            >
              {t.options}
            </button>
          )}
        </div>
      )}

      <div className="flex space-x-3 text-black text-[16px]">
        <a
          href="https://www.facebook.com/lemonnari"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#e1c680]"
        >
          <IoLogoFacebook />
        </a>
        <a
          href="https://www.tiktok.com/@thuhiennar?_t=ZS-8yJdhPe9aCt&_r=1"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#e1c680]"
        >
          <AiFillTikTok />
        </a>
        <a
          href="https://www.instagram.com/thuhien.nar/profilecard/?igsh=MXB4cms0YTYzNGU2MA%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#e1c680]"
        >
          <ImInstagram className="mt-[1px] w-[13px] h-[13px]" />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#e1c680]"
        >
          <FaYoutube />
        </a>
        <Link
          href="/auth/login"
          prefetch={true}
          className="font-[400] transition-colors text-black hover:text-[#e1c680]"
        >
          <IoIosLogIn className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
