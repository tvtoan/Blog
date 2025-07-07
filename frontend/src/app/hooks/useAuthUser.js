"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/app/services/authService";

const useAuthUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Luôn bắt đầu là true

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser()
        .then((userData) => {
          console.log("User data:", userData);
          setUser(userData);
        })
        .catch((error) => {
          console.error("Get user error:", error);
          setUser(null);
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      // ✅ Nếu không có token thì cũng cần kết thúc loading
      setLoading(false);
    }
  }, []);

  return { user, loading };
};

export default useAuthUser;
