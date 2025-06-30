"use client";

import {
  loginWithGoogle,
  loginWithGitHub,
  loginWithFacebook,
} from "@/app/services/authService";

export default function Login() {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-6">Đăng nhập</h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => {
            console.log("Initiating Google login");
            loginWithGoogle();
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Đăng nhập bằng Google
        </button>
        <button
          onClick={() => {
            console.log("Initiating GitHub login");
            loginWithGitHub();
          }}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Đăng nhập bằng GitHub
        </button>
        <button
          onClick={() => {
            console.log("Initiating Facebook login");
            loginWithFacebook();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Đăng nhập bằng Facebook
        </button>
      </div>
    </div>
  );
}
