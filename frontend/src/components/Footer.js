"use client";
import React, { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { ImInstagram } from "react-icons/im";
import { AiFillTikTok } from "react-icons/ai";
import { montserrat } from "../lib/font";
import { slugifyCategory } from "../lib/slugifyCategory";
import { getPosts } from "@/app/services/postService";
import Link from "next/link";

export default function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!window.FB) {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src =
        "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v19.0";
      script.onload = () => {
        if (window.FB) {
          window.FB.XFBML.parse();
        }
      };
      document.body.appendChild(script);
    } else {
      window.FB.XFBML.parse();
    }

    // Gọi API để lấy danh mục
    const fetchTags = async () => {
      try {
        const posts = await getPosts();
        const uniqueTags = Array.from(
          new Set(posts.flatMap((post) => post.categories || []))
        );
        setCategories(uniqueTags);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchTags();
  }, []);

  return (
    <footer className={`bg-black text-white py-8 ${montserrat.className}`}>
      <div className="container pt-2 md:w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* TAGS Column */}
        <div className="text-center md:text-left">
          <div className="inline-block mb-7 w-full text-center bg-[#eeeeee] px-6 py-3 text-black text-sm font-medium relative">
            TAGS
            <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#eeeeee]" />
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {categories.map((tag) => (
              <Link
                key={tag}
                href={`/category/${slugifyCategory(tag)}`}
                className="bg-gray-800 text-white px-2 py-1 text-sm rounded hover:bg-[#f1c40f] transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* FOLLOW ON FACEBOOK Column */}
        <div className="text-center">
          <div className="inline-block mb-7 w-full bg-[#eeeeee] px-6 py-3 text-black text-sm font-medium relative">
            FOLLOW ON FACEBOOK
            <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#eeeeee]" />
          </div>
          <div
            className="fb-page"
            data-href="https://www.facebook.com/lemonnari"
            data-tabs=""
            data-width=""
            data-height=""
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="false"
          >
            <blockquote
              cite="https://www.facebook.com/lemonnari"
              className="fb-xfbml-parse-ignore"
            >
              <a href="https://www.facebook.com/lemonnari">lemonnari</a>
            </blockquote>
          </div>
        </div>

        {/* SUBSCRIBE Column */}
        <div className="text-center">
          <div className="inline-block mb-6 w-full bg-[#eeeeee] px-6 py-3 text-black text-sm font-medium relative">
            SUBSCRIBE
            <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#eeeeee]" />
          </div>

          <p className="text-[14px] font-medium mb-4 mt-4 mx-auto w-[90%] text-white">
            Subscribe nếu bạn muốn theo dõi các bài viết tiếp theo của mình nhé!
          </p>

          <input
            type="email"
            placeholder="Email Address"
            className="w-[90%] px-4 py-2 mb-6 border-none bg-black text-white text-sm placeholder-gray-400 outline-none"
          />
          <button className="w-[90%] h-13 bg-[#2e2e2e] hover:bg-[#444] text-white font-medium text-[17px] py-2 rounded-full transition">
            SUBSCRIBE
          </button>
          <p className="text-sm text-white text-left mt-8 font-semibold">
            Join 4,294 other subscribers
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 text-center">
        <div className="flex justify-center space-x-16 mb-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoFacebook className="text-white w-5 h-5 hover:text-[#f1c40f] transition-colors" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillTikTok className="text-white w-5 h-5 hover:text-[#f1c40f] transition-colors" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ImInstagram className="text-white mt-0.5 hover:text-[#f1c40f] transition-colors" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="text-white hover:text-[#f1c40f] w-5 h-5 transition-colors" />
          </a>
        </div>
        <div className="w-7xl mx-auto mt-[80px] mb-8 h-px bg-white"></div>
        <p className="text-[12px] hover:text-gray-300 text-[#f1c40f]">
          WEBSITE BUILT WITH WORDPRESS.COM
        </p>
      </div>
    </footer>
  );
}
