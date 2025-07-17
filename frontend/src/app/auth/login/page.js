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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fef9e7] to-[#f9f6f1] px-4">
      <div className="w-full max-w-md bg-white border border-[#e1c680] p-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-[#585656] text-center mb-8 tracking-wide">
          {t.title || "Welcome Back"}
        </h1>

        <div className="flex flex-col gap-5">
          <button
            onClick={loginWithGoogle}
            className="flex items-center cursor-pointer justify-center gap-3 bg-white text-[#585656] border border-[#e1c680] px-6 py-3 rounded-xl hover:bg-[#f9f6f1] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <FaGoogle className="text-xl" />
            {t.loginGoogle || "Login with Google"}
          </button>

          <button
            onClick={loginWithGitHub}
            className="flex items-center cursor-pointer justify-center gap-3 bg-[#24292f] text-white px-6 py-3 rounded-xl hover:bg-[#1b1f23] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <FaGithub className="text-xl" />
            {t.loginGitHub || "Login with GitHub"}
          </button>

          <button
            onClick={loginWithFacebook}
            className="flex items-center cursor-pointer justify-center gap-3 bg-[#1877f2] text-white px-6 py-3 rounded-xl hover:bg-[#145ec6] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <FaFacebookF className="text-xl" />
            {t.loginFacebook || "Login with Facebook"}
          </button>
        </div>
      </div>
    </div>
  );
}
