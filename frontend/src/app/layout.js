import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Title from "@/components/Title";
import "./globals.css";

export const metadata = {
  title: "Hanoi Chamomile Blog",
  description: "A blog about life and culture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[white] text-[#333]">
      <body className="bg-[#f5f5f5] text-[#333] min-h-screen flex flex-col">
        <Header />
        <Title />
        <div className="flex flex-1 w-7xl mx-auto">
          <main className="flex-1 p-5 bg-white">{children}</main>
          <Sidebar />
        </div>
        <Footer />
      </body>
    </html>
  );
}
