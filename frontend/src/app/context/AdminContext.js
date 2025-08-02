"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getAdminInfo } from "@/app/services/authService";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  const fetchAdmin = async () => {
    try {
      const data = await getAdminInfo();
      setAdmin(data);
    } catch (error) {
      setAdmin(null);
    } finally {
      setLoadingAdmin(false);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <AdminContext.Provider value={{ admin, loadingAdmin, fetchAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
