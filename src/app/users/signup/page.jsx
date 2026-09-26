'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

function Signup() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async (e) => {
    e.preventDefault(); 

    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      toast.success("Signup successful 🎉",res);
      router.push("/users/login");

    } catch (error) {
      const message =
      error?.response?.data?.message || "Signup failed";
      toast.error("User Already existed with this email or username ",message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isValid =
      user.email &&
      user.password &&
      user.username;

    setButtonDisabled(!isValid);
  }, [user]);

  return (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4">
    {/* Background Glow */}
    <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
    <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-blue-600/20 blur-[140px]" />

    <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
      <div className="mb-8 text-center">
        <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
          Create Account
        </h1>

        <p className="mt-3 text-slate-400">
          Join us and start your journey 🚀
        </p>
      </div>

      <form onSubmit={onSignup} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username"
            value={user.username}
            onChange={(e) =>
              setUser({ ...user, username: e.target.value })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>

        <button
          type="submit"
          disabled={buttonDisabled || loading}
          className={`w-full rounded-xl py-3 font-semibold text-white transition-all ${
            buttonDisabled || loading
              ? "cursor-not-allowed bg-slate-700"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 hover:scale-[1.02]"
          }`}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            href="/users/login"
            className="font-medium text-cyan-400 hover:text-cyan-300"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  </div>
);
}

export default Signup;