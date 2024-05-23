"use client";
import { useEffect, useState } from "react";

const Profile = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve user name from localStorage
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName || "");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-[85vh]">
      <div className="bg-gray-200 py-12 px-6 sm:py-24 sm:px-12 rounded-lg shadow-md w-full sm:w-auto">
        <h1 className="text-4xl sm:text-6xl text-center font-bold mb-4 text-[#03193D]">
          <span className="text-[#FF5733]">{userName}</span> Profile
        </h1>
        <span className="text-lg sm:text-xl text-gray-600">
          Welcome to your profile page
        </span>
        <span className="mt-2 text-md sm:text-lg text-gray-500">
          Manage your account settings and preferences
        </span>
      </div>
    </div>
  );
};

export default Profile;
