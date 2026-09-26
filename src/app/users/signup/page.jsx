"use client";

import Link from "next/link";
import { useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowRight, Loader2, Sparkles } from "lucide-react";

export default function Signup() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  async function onSignup(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("/api/users/signup", user);

      toast.success("Account created successfully! 🎉");

      router.push("/users/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "User already exists with this email or username."
        );
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setButtonDisabled(!(user.username && user.email && user.password));
  }, [user]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0ea5e933,transparent_40%)]" />
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-blue-600/20 blur-[160px]" />

      <Card className="relative z-10 w-full max-w-md border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10">
            <Sparkles className="h-7 w-7 text-cyan-400" />
          </div>

          <CardTitle className="text-3xl font-bold text-white">
            Create Account
          </CardTitle>

          <CardDescription className="text-slate-400">
            Join our AI platform and start creating amazing projects.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSignup} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-slate-300">Username</Label>

              <Input
                placeholder="Sangam"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
                className="border-slate-700 bg-slate-900/60 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Email</Label>

              <Input
                type="email"
                placeholder="you@example.com"
                value={user.email}
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value })
                }
                className="border-slate-700 bg-slate-900/60 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Password</Label>

              <Input
                type="password"
                placeholder="••••••••"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
                className="border-slate-700 bg-slate-900/60 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500"
              />
            </div>

            <Button
              type="submit"
              disabled={buttonDisabled || loading}
              className="group w-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all hover:from-cyan-400 hover:to-blue-500"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>

            <p className="text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                href="/users/login"
                className="font-medium text-cyan-400 hover:text-cyan-300"
              >
                Sign In
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}