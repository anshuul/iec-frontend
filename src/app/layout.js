"use client";
import "./globals.css";
import SideBar from "@/components/common/SideBar";
import Header from "@/components/common/Header";
import { usePathname } from "next/navigation";
import { Provider } from 'react-redux'
import store from "@/store/store";

export default function RootLayout({ children }) {
  const pathName = usePathname();
  const isLoginPage = pathName === "/login";

  return (
    <html lang="en">
      <body className="scrollbar-none scroll-smooth bg-white">
        <Provider store={store}>
          <div className="flex h-full">
            {!isLoginPage && <SideBar />}
            <div className="w-full bg-gray-300">
              {!isLoginPage && <Header />}
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
