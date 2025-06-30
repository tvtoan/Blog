"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleCallback } from "@/app/services/authService";

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    console.log("Callback token:", token);
    if (token) {
      try {
        handleCallback(token);
        console.log("Token saved to localStorage");
        router.push("/");
      } catch (error) {
        console.error("Callback error:", error);
        router.push("/login?error=callback_failed");
      }
    } else {
      console.error("No token in URL");
      router.push("/login?error=missing_token");
    }
  }, [token, router]);

  return <div className="container mx-auto p-4">Logging in...</div>;
}
