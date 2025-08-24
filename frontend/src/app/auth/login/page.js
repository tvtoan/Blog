"use client";

import {
  loginWithGoogle,
  loginWithGitHub,
  loginWithFacebook,
} from "@/app/services/authService";
import useTranslation from "@/app/hooks/useTranslations";
import { FaGoogle, FaGithub, FaFacebookF } from "react-icons/fa";

export default function Login() {
  const translations = useTranslation();
  const t = translations?.Login || {};

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8 rounded-3xl relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/hinh-nen-ban-phim-dinh-nghia.jpg')",
      }}
    >
      <style jsx>{`
        .edge-blur::before,
        .edge-blur::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          z-index: 1;
        }
        .edge-blur::before {
          left: 0;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.3),
            transparent
          );
        }
        .edge-blur::after {
          right: 0;
          background: linear-gradient(
            to left,
            rgba(255, 255, 255, 0.3),
            transparent
          );
        }
      `}</style>
      <div className="w-full max-w-md bg-white/30 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold text-white text-center mb-10 tracking-tight drop-shadow-md font-sans">
          {t.title || "Welcome Back"}
        </h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={loginWithGoogle}
            className="flex items-center justify-center gap-3 bg-white/80 text-[#585656] border border-[#e1c680]/50 px-6 py-4 rounded-xl hover:bg-white/90 hover:scale-105 transform transition-all duration-300 shadow-sm hover:shadow-lg focus:ring-2 focus:ring-[#e1c680] focus:outline-none"
          >
            <FaGoogle className="text-2xl text-[#db4437]" />
            <span className="font-semibold">
              {t.loginGoogle || "Login with Google"}
            </span>
          </button>

          <button
            onClick={loginWithGitHub}
            className="flex items-center justify-center gap-3 bg-[#24292f]/90 text-white px-6 py-4 rounded-xl hover:bg-[#1b1f23]/95 hover:scale-105 transform transition-all duration-300 shadow-sm hover:shadow-lg focus:ring-2 focus:ring-gray-800 focus:outline-none"
          >
            <FaGithub className="text-2xl" />
            <span className="font-semibold">
              {t.loginGitHub || "Login with GitHub"}
            </span>
          </button>

          <button
            onClick={loginWithFacebook}
            className="flex items-center justify-center gap-3 bg-[#1877f2]/90 text-white px-6 py-4 rounded-xl hover:bg-[#145ec6]/95 hover:scale-105 transform transition-all duration-300 shadow-sm hover:shadow-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <FaFacebookF className="text-2xl" />
            <span className="font-semibold">
              {t.loginFacebook || "Login with Facebook"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
