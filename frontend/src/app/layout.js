// app/layout.js
import ClientLayout from "@/components/ClientLayout";
import { montserrat } from "@/lib/font";
import "./globals.css";

export const metadata = {
  title: "Lemonari",
  description: "A blog about life and culture",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${montserrat.className} bg-white`}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
