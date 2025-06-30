import { useEffect, useState } from "react";
import { getUser } from "@/app/services/authService";

export default function useAuthUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      getUser()
        .then((userData) => {
          console.log("User data:", userData); // Debug
          setUser(userData);
        })
        .catch((error) => {
          console.error("Get user error:", error);
          setUser(null);
          localStorage.removeItem("token"); // Xóa token không hợp lệ
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return { user, loading };
}
