"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";

const Sidebar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside className="w-[300px] p-5 bg-white ">
      <div ref={searchContainerRef} className="mb-5">
        <div className="relative">
          <input
            type="text"
            className="w-full h-10 px-4 border border-gray-300 focus:outline-none"
            placeholder=" "
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button
            type="button"
            className={`absolute right-0 top-0 h-10 px-4 flex items-center transition-all duration-300 ${
              isFocused
                ? "bg-[#f1c40f] text-white"
                : "bg-black text-white hover:bg-[#f1c40f] hover:text-white"
            }`}
          >
            {isFocused ? (
              <FaArrowRight className="w-5 h-5 transition-colors duration-300" />
            ) : (
              <span className="flex items-center text-[12px]">
                SEARCH{" "}
                <FaArrowRight className="ml-2 w-4 h-4 text-[#f1c40f] transition-colors duration-300" />
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="text-center mb-5">
        <h2 className="text-lg text-black">ABOUT ME</h2>
      </div>
      <div className="text-center">
        <img
          src="/cv.jpg"
          alt="Profile"
          className="w-full h-full object-cover mx-auto"
        />
        <p className="text-gray-600 my-2">Blogger & Youtuber</p>
        <p className="text-gray-600 text-sm">
          Hi, Mình là Nam Anh. Chào mừng bạn đến với blog của mình. Ngày nào
          mình cũng thử nghiệm những cách sống tối giản và chia sẻ lại kinh
          nghiệm đó với bạn.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
