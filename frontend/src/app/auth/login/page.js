"use client";

import {
  loginWithGoogle,
  loginWithGitHub,
  loginWithFacebook,
} from "@/app/services/authService";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f6f1] px-4">
      <div className="w-full max-w-md bg-white border border-[#e1c680] p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-[#585656] text-center mb-6">
          Đăng nhập vào Blog
        </h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              console.log("Initiating Google login");
              loginWithGoogle();
            }}
            className="bg-white text-[#585656] border border-[#e1c680] px-4 py-2 rounded hover:bg-[#f9f6f1] transition"
          >
            Đăng nhập bằng Google
          </button>
          <button
            onClick={() => {
              console.log("Initiating GitHub login");
              loginWithGitHub();
            }}
            className="bg-[#585656] text-white px-4 py-2 rounded hover:bg-[#464646] transition"
          >
            Đăng nhập bằng GitHub
          </button>
          <button
            onClick={() => {
              console.log("Initiating Facebook login");
              loginWithFacebook();
            }}
            className="bg-[#e1c680] text-[#585656] px-4 py-2 rounded hover:bg-[#d6b85c] transition"
          >
            Đăng nhập bằng Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
