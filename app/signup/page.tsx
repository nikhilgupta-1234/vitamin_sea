"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSignup(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    alert(
      "Account created successfully. Please verify your email."
    );

    router.push("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F4EC] px-4 py-10">

      <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-xl sm:p-10">

        <div className="mb-8 text-center">

          <p className="font-semibold uppercase tracking-[4px] text-sky-500">
            Welcome
          </p>

          <h1 className="mt-3 font-serif text-4xl text-[#143D60]">
            Create Account
          </h1>

          <p className="mt-3 text-gray-500">
            Join Vitamin Sea and start shopping.
          </p>

        </div>

        <form
          onSubmit={handleSignup}
          className="space-y-5"
        >

          {/* Name */}

          <div className="relative">

            <User
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              required
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-2xl border border-gray-200 py-4 pl-12 pr-4 outline-none transition focus:border-sky-500"
            />

          </div>

          {/* Email */}

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
              className="w-full rounded-2xl border border-gray-200 py-4 pl-12 pr-4 outline-none transition focus:border-sky-500"
            />

          </div>

          {/* Password */}

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
              className="w-full rounded-2xl border border-gray-200 py-4 pl-12 pr-12 outline-none transition focus:border-sky-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="flex w-full items-center justify-center rounded-2xl bg-sky-500 py-4 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>

        </form>

        <div className="mt-8 text-center">

          <p className="text-gray-500">
            Already have an account?
          </p>

          <Link
            href="/login"
            className="mt-2 inline-block font-semibold text-sky-600 hover:text-sky-700"
          >
            Login →
          </Link>

        </div>

      </div>

    </main>
  );
}