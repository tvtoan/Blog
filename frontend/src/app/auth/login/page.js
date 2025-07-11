"use client";

import {
  loginWithGoogle,
  loginWithGitHub,
  loginWithFacebook,
} from "@/app/services/authService";
import useTranslation from "@/app/hooks/useTranslations";

export default function Login() {
  const translations = useTranslation();
  const t = translations?.Login || {};
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f6f1] px-4">
      <div className="w-full max-w-md bg-white border border-[#e1c680] p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-[#585656] text-center mb-6">
          {t.title}
        </h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              console.log("Initiating Google login");
              loginWithGoogle();
            }}
            className="bg-white text-[#585656] border border-[#e1c680] px-4 py-2 rounded hover:bg-[#f9f6f1] transition"
          >
            {t.loginWithGoogle}
          </button>
          <button
            onClick={() => {
              console.log("Initiating GitHub login");
              loginWithGitHub();
            }}
            className="bg-[#585656] text-white px-4 py-2 rounded hover:bg-[#464646] transition"
          >
            {t.loginWithGitHub}
          </button>
          <button
            onClick={() => {
              console.log("Initiating Facebook login");
              loginWithFacebook();
            }}
            className="bg-[#e1c680] text-[#585656] px-4 py-2 rounded hover:bg-[#d6b85c] transition"
          >
            {t.loginWithFacebook}
          </button>
        </div>
      </div>
    </div>
  );
}
