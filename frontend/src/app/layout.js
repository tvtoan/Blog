import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Title from "@/components/Title";
import "./globals.css";
import { montserrat } from "@/lib/font";
import AdminToolButton from "@/components/Options";
import { AdminProvider } from "@/app/context/AdminContext";
import { LanguageProvider } from "./context/LanguageContext";

export const metadata = {
  title: "Hanoi Chamomile Blog",
  description: "A blog about life and culture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`bg-white text-[#333] ${montserrat.className}`}>
      <body className="bg-[#f5f5f5] text-[#333] min-h-screen flex flex-col">
        <LanguageProvider>
          <AdminProvider>
            <Header />
            <Title />

            {/* ✅ Thẻ cha full width + responsive */}
            <div className="flex flex-col md:flex-row flex-1 w-full max-w-full md:max-w-7xl mx-auto px-4 md:px-0">
              {/* Main content */}
              <main className="w-full md:flex-1 py-5 px-0 md:px-10 md:mr-10 bg-white">
                {children}
              </main>

              {/* Sidebar */}
              <div className="w-full md:w-auto py-5 md:py-0 px-0 md:px-0">
                <Sidebar />
              </div>
            </div>

            {/* Admin Tool Button */}
            <div className="fixed top-1/2 left-4 transform -translate-y-1/2 z-50">
              <AdminToolButton />
            </div>

            <Footer />
          </AdminProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
