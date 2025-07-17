"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Title from "@/components/Title";
import AdminSidebar from "@/components/Options";
import { AdminProvider } from "@/app/context/AdminContext";
import { LanguageProvider } from "@/app/context/LanguageContext";
import { useState } from "react";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const [showAdminSidebar, setShowAdminSidebar] = useState(false);

  return (
    <LanguageProvider>
      <AdminProvider>
        <div className="bg-white text-[#333] min-h-screen flex flex-col">
          <Header
            showAdminSidebar={showAdminSidebar}
            setShowAdminSidebar={setShowAdminSidebar}
          />

          {!isAdminPage && <Title />}

          <div className="flex flex-col md:flex-row flex-1 w-full max-w-full md:max-w-7xl mx-auto px-4 md:px-0">
            <AdminSidebar
              showAdminSidebar={showAdminSidebar}
              setShowAdminSidebar={setShowAdminSidebar}
            />
            <main className="w-full flex-1 py-5 px-0 md:px-10 bg-white">
              {children}
            </main>
            {!isAdminPage && (
              <div className="w-full md:w-auto py-5 md:py-0 px-0 md:px-0">
                <Sidebar />
              </div>
            )}
          </div>

          <Footer />
        </div>
      </AdminProvider>
    </LanguageProvider>
  );
}
