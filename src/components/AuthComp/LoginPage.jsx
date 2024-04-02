"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Start");
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        {
          email,
          password,
        }
      );
      console.log("response", response);

      if (response.status === 200) {
        // If login is successful, redirect or perform any other action
        const userData = response.data;

        // Store user data in cookies
        Cookies.set("userData", userData, { expires: 7 });

        console.log("Login successful");
        router.push("/production");
      } else {
        // If login fails, display error message
        console.error("Login failed:");
      }
    } catch (error) {
      console.error("Error logging in:");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full mx-4 md:max-w-screen-md border container border-black">
        <div className="text-center">
          {/* Logo */}
          <img
            src="/loginlogo.jpeg"
            alt="Logo"
            className="w-20 h-20 mb-8 mx-auto"
          />

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">Log In</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full h-10 border border-gray-500 bg-gray-200 rounded py-4 px-6 mb-4 block mx-auto text-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full h-10 border border-gray-500 bg-gray-200 rounded py-4 px-6 mb-4 block mx-auto text-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 text-xl rounded hover:bg-blue-600 block mx-auto"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
