"use client";
import "./globals.css";
import SideBar from "@/components/common/SideBar";
import Header from "@/components/common/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathName = usePathname();
  const isLoginPage = pathName === "/login";

  return (
    <html lang="en">
      <body className="scrollbar-none scroll-smooth bg-white">
        <div className="flex h-full">
        {!isLoginPage && <SideBar />}
          <div className="w-full bg-gray-300">
          {!isLoginPage && <Header />}
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
