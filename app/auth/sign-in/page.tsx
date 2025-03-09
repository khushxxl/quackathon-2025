"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithSupabase } from "@/lib/db.action";

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
  root?: string;
}

function Signin() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Entered value does not match email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);
        await signInWithSupabase(formData);
        router.push("/admin/");
      } catch (error) {
        setErrors({
          root: "An error occurred during sign in. Please try again.",
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-[20px] shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600 mb-2">The Green Team</h1>
          <p className="text-gray-600 dark:text-gray-300">Admin Panel Access</p>
        </div>
        
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-[#151717] dark:text-gray-200 font-semibold mb-2">Email</label>
            <div className="border-[1.5px] border-[#ecedec] dark:border-gray-600 rounded-[10px] h-[50px] flex items-center px-3 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 32 32" height={20} className="text-gray-500">
                <g data-name="Layer 3" id="Layer_3">
                  <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" fill="currentColor" />
                </g>
              </svg>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="ml-2 border-none w-full h-full focus:outline-none bg-transparent dark:text-white"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          
          <div className="flex flex-col">
            <label className="text-[#151717] dark:text-gray-200 font-semibold mb-2">Password</label>
            <div className="border-[1.5px] border-[#ecedec] dark:border-gray-600 rounded-[10px] h-[50px] flex items-center px-3 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="-64 0 512 512" height={20} className="text-gray-500">
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" fill="currentColor" />
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" fill="currentColor" />
              </svg>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="ml-2 border-none w-full h-full focus:outline-none bg-transparent dark:text-white"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {errors.root && (
            <div className="text-red-500 text-sm text-center mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              {errors.root}
            </div>
          )}

          <button 
            type="submit" 
            className="mt-6 bg-green-600 text-white font-medium py-3 rounded-[10px] hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In to Admin Panel"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
