"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

export default function Callback() {
  const router = useRouter();
  const { searchParams } = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      setCookie(null, "token", token, { maxAge: 3600, path: "/" });
      router.push("/");
    }
  }, [token, router]);

  return <div className="container mx-auto p-4">Logging in...</div>;
}
