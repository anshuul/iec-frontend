"use client";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Cookies from "js-cookie";

import Breadcrumbs from "./Breadcrumbs";
import { usePathname, useRouter } from 'next/navigation';

import { HiOutlineUser, HiOutlineLogout } from "react-icons/hi";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [userEmailName, setUserEmailName] = useState("");

  useEffect(() => {
    // Retrieve user email from localStorage
    const userEmail = localStorage.getItem('userEmail');
    // Extract name from email
    const name = userEmail ? userEmail.split('@')[0] : ""; // Split email by '@' and get the first part
    setUserEmailName(name);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between px-4 py-4 mb-4 bg-white">
      <Breadcrumbs pathname={pathname} />
      {/* Account Info */}
      <div className="relative">
        <div className="flex flex-row items-center justify-center gap-4 cursor-pointer" onClick={toggleDropdown}>
          <span className="px-3 py-2 bg-blue-300 rounded-full">V</span>
          {/* Show user email name */}
          <p>{userEmailName}</p>
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 w-40 mt-2 bg-white rounded-lg shadow-lg"
          >
            <ul className="py-2">
              <li>
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  <HiOutlineUser className="mr-2" />
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  <HiOutlineLogout className="mr-2 font-bold text-red-600" />
                  Logout
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Header;
