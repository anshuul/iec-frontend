"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Start");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`,
        {
          email,
          password,
        }
      );
      console.log("response", response);

      if (response.status === 200) {
        // If login is successful, redirect or perform any other action
        const userData = response.data;
        console.log("userData", userData);

        const token = userData.token;

        document.cookie = `token=${token}`;

        // Store user email and username in localStorage
        localStorage.setItem("userEmail", userData.user.email);
        localStorage.setItem("userName", userData.user.userName);

        console.log("Login successful");
        router.push("/");
      } else {
        // If login fails, display error message
        console.error("Login failed:");
      }
    } catch (error) {
      console.error("Error logging in:");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container w-full px-8 pt-6 pb-8 mx-4 mb-4 bg-white border border-black rounded shadow-md md:max-w-screen-md">
        <div className="text-center">
          {/* Logo */}
          <img
            src="/loginlogo.jpeg"
            alt="Logo"
            className="w-20 h-20 mx-auto mb-8"
          />

          {/* Title */}
          <h1 className="mb-4 text-3xl font-bold">Log In</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <div className="relative flex items-center mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-0 px-4 py-2 text-gray-600 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="block px-4 py-2 mx-auto text-xl text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
