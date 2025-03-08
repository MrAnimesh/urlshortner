import axios from "axios";
import React, { useState } from "react";
import { FaGoogle, FaGithub,FaEye,FaEyeSlash, FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import VerificationPage from "./VerificationPage";

const cardContent = [
  {
    heading: "Fast & Reliable",
    desc: "Shorten links instantly with 99.9% uptime.",
  },
  {
    heading: "Advanced Analytics",
    desc: "Track clicks, locations, and devices in real-time.",
  },
  {
    heading: "Custom URLs",
    desc: "Create branded, memorable short links.",
  },
  {
    heading: "Secure Links",
    desc: "Protect your links with passwords and malware scanning.",
  },
  {
    heading: "Generate QR",
    desc: "Generate QR code for your website and businesses.",
  },
];
interface User {
  username: string;
  email: string;
  password: string;
}

const Login: React.FC<{}> = () => {
  const[showPassword, setShowPassword] = useState(false);
  const navigaet = useNavigate();

  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e: any) => {    
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:8081/api/auth/public/register", user);
      const data = await response.data
      console.log(response.data)
      navigateToVerification(data)
    }catch(err){
      console.log(err)
    }
  };

  const navigateToVerification = (data: any) => {
    navigaet('/verification', {state: data})
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      {/* Container */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
        {/* Left Side - Website Info */}
        <div className="hidden md:flex flex-col justify-center items-center p-8 md:w-1/2 space-y-6 bg-gradient-to-br from-blue-100 to-purple-100">
          <h1 className="text-5xl font-bold text-gray-900 text-center">
            Shorten Your Links
          </h1>
          <p className="text-lg text-gray-700 text-center">
            Make your links shorter, smarter, and shareable. Join the future of
            seamless connectivity.
          </p>

          {/* Link Icon */}
          <div className="animate-bounce">
            <FaLink className="h-12 w-12 text-purple-600" />
          </div>

          {/* Card Carousel */}
          <div className="w-full mt-8 overflow-hidden relative h-40">
            <div className="absolute top-0 left-0 w-[500%] flex animate-carousel">
              {cardContent.map((card, index) => (
                <div
                  key={index}
                  className="min-w-[20%] flex-shrink-0 p-6 bg-white rounded-lg border border-gray-200 shadow-sm mx-2"
                >
                  <h3 className="text-xl font-bold text-gray-900">
                    {card.heading}
                  </h3>
                  <p className="text-gray-700">{card.desc}</p>
                </div>
              ))}
              {/* Duplicate cards for seamless looping */}
              {cardContent.map((card, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="min-w-[20%] flex-shrink-0 p-6 bg-white rounded-lg border border-gray-200 shadow-sm mx-2"
                >
                  <h3 className="text-xl font-bold text-gray-900">
                    {card.heading}
                  </h3>
                  <p className="text-gray-700">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-center text-3xl font-bold mb-8 text-gray-900">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your username"
                onChange={handleOnChange}
                value={user.username}
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
                onChange={handleOnChange}
                value={user.email}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                  value={user.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {/* Password Strength Meter */}
              {/* <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div> */}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>

            {/* Social Login Buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                className="w-1/2 flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
              >
                <FaGoogle className="mr-2" /> Google
              </button>
              <button
                type="button"
                className="w-1/2 flex items-center justify-center bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all"
              >
                <FaGithub className="mr-2" /> GitHub
              </button>
            </div>

            {/* Already have an account? Log in */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-purple-500 hover:text-purple-600 font-semibold"
                >
                  Log in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* CSS for Carousel Animation */}
      <style>
        {`
          @keyframes carousel {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-carousel {
            animation: carousel 20s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
