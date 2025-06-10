"use client";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  useEffect(() => {
    // Tải Facebook SDK nếu chưa có
    if (!window.FB) {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src =
        "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v19.0";
      script.onload = () => {
        if (window.FB) {
          window.FB.XFBML.parse(); // Parse sau khi SDK tải xong
        }
      };
      document.body.appendChild(script);
    } else {
      window.FB.XFBML.parse(); // Nếu SDK đã tồn tại, chỉ cần parse lại
    }
  }, []);

  return (
    <footer className="bg-black text-white py-8">
      <div className="container md:w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* TAGS Column */}
        <div className="text-center md:text-left">
          <h3 className="text-[16px] font-normal text-center mb-8   w-full bg-white text-black px-4 py-2 inline-block rounded-tl-lg rounded-tr-lg">
            TAGS
          </h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {[
              "Daily life",
              "Decluttering",
              "Du học",
              "Du lịch",
              "Don Dep",
              "Hàn Quốc",
              "Học ngôn ngữ",
              "LPT",
              "Khám Phá",
              "Korea",
              "Lifestyle",
              "Minimalism",
              "Nhật Bản",
              "Nhật ký",
              "Nấu ăn",
              "Starbucks",
              "Tsutaya",
              "Tối giản",
            ].map((tag) => (
              <span
                key={tag}
                className="bg-gray-800 text-white px-2 py-1 text-sm rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* FOLLOW ON FACEBOOK Column (dùng fb-page plugin) */}
        <div className="text-center">
          <h3 className="text-[16px] font-normal text-center mb-8   w-full bg-white text-black px-4 py-2 inline-block rounded-tl-lg rounded-tr-lg">
            FOLLOW ON FACEBOOK
          </h3>
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
        <div className="text-center ">
          <h3 className="text-[16px] font-normal text-center mb-8   w-full bg-white text-black px-4 py-2 inline-block rounded-tl-lg rounded-tr-lg">
            SUBSCRIBE
          </h3>
          <p className="text-sm mb-2 w-[90%] mx-auto">
            Subscribe nếu bạn muốn theo dõi các bài viết mới nhất và tip theo
            cách mình nhé!
          </p>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full md:w-[90%]  px-4 py-2 mb-2 border border-gray-600 bg-black text-white rounded"
          />
          <button className="bg-gray-600 text-white px-4 py-2 w-full md:w-[90%] rounded">
            SUBSCRIBE
          </button>
          <p className="text-sm text-gray-400 mt-2 text-left">
            Join 4,292 other subscribers
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 text-center">
        <div className="flex justify-center  space-x-[100px] mb-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="text-white hover:text-[#f1c40f] transition-colors" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-white hover:text-[#f1c40f] transition-colors" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="text-white hover:text-[#f1c40f] transition-colors" />
          </a>
        </div>
        <div className="w-7xl mx-auto mt-[80px] mb-8 h-px bg-white"></div>
        <p className="text-[12px] hover:text-gray-300 text-[#f1c40f] ">
          WEBSITE BUILT WITH WORDPRESS.COM
        </p>
      </div>
    </footer>
  );
}
