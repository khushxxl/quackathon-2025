"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpWithSupabase } from "@/lib/db/db.actions";
import { Button } from "@/components/ui/button";

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface Errors {
  username?: string;
  email?: string;
  password?: string;
  root?: string;
}

function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Entered value does not match email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must have at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await signUpWithSupabase(formData);
        router.push("/");
      } catch (error) {
        setErrors({
          root: "An error occurred during sign up. Please try again.",
        });
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background">
      <div className="w-full max-w-md space-y-8 p-4 sm:p-0">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Full Name
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-input placeholder-muted-foreground text-foreground rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-input placeholder-muted-foreground text-foreground focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-input placeholder-muted-foreground text-foreground rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          {errors.root && (
            <div className="text-red-500 text-sm text-center">
              {errors.root}
            </div>
          )}

          <div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
        <div className="text-sm text-center">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <a href="/auth/sign-in" className="">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
