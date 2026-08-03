"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">

      <Image
        src="/login/login-bg.jpg"
        alt="Vitamin Sea"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 w-full max-w-md rounded-[35px] border border-white/20 bg-white/15 p-10 shadow-2xl backdrop-blur-xl">

        <div className="text-center">

          <p className="uppercase tracking-[6px] text-sky-200">
            Vitamin Sea
          </p>

          <h1 className="mt-4 font-serif text-5xl text-white">
            Welcome Back
          </h1>

          <p className="mt-3 text-gray-200">
            Login to continue shopping.
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-6"
        >

          <div className="relative">

            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-2xl bg-white pl-12 pr-4 py-4 outline-none"
            />

          </div>

          <div className="relative">

            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              required
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-2xl bg-white pl-12 pr-14 py-4 outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {error && (
            <p className="text-red-200">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-sky-500 py-4 font-semibold text-white transition hover:bg-sky-600"
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

        </form>

        <div className="mt-6 flex items-center justify-between text-sm text-white">

          <Link
            href="/forgot-password"
            className="hover:underline"
          >
            Forgot Password?
          </Link>

          <Link
            href="/signup"
            className="font-semibold text-sky-200 hover:text-white"
          >
            Create Account
          </Link>

        </div>

      </div>

    </main>
  );
}