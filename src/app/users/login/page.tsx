'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

function Login() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async (e:any) => {
    e.preventDefault(); // 🔥 important

    try {
      setLoading(true);

      await axios.post("/api/users/login", user);

      toast.success("Login successful 🎉");
      router.push("/users/profile");

    } catch (error:any) {
      const message =
        error?.response?.data?.message || "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4">
    {/* Background Glow */}
    <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
    <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-blue-600/20 blur-[140px]" />

    {/* Login Card */}
    <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
      <div className="mb-8 text-center">
        <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
          Welcome Back
        </h1>

        <p className="mt-3 text-slate-400">
          Login to continue your journey 🚀
        </p>
      </div>

      <form onSubmit={onLogin} className="space-y-5">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-cyan-400 hover:text-cyan-300"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={buttonDisabled || loading}
          className={`w-full rounded-xl py-3 font-semibold text-white transition-all duration-300 ${
            buttonDisabled || loading
              ? "cursor-not-allowed bg-slate-700"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 hover:scale-[1.02] hover:shadow-cyan-500/50"
          }`}
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-700" />
          <span className="text-sm text-slate-500">OR</span>
          <div className="h-px flex-1 bg-slate-700" />
        </div>
        {/* Signup */}
        <p className="text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            href="/users/signup"
            className="font-medium text-cyan-400 hover:text-cyan-300"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  </div>
);
}

export default Login;
