"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signIn() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");
  }

  async function signUp() {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created successfully!");
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-6 shadow-xl sm:p-8 lg:p-10">
      <h1 className="mb-8 text-center font-serif text-3xl text-sky-600 sm:text-4xl">
        Vitamin Sea
      </h1>

      <input
        className="mb-4 w-full rounded-xl border p-4 outline-none transition focus:border-sky-500"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="mb-6 w-full rounded-xl border p-4 outline-none transition focus:border-sky-500"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={signIn}
        className="mb-3 w-full rounded-xl bg-sky-500 p-4 font-semibold text-white transition hover:bg-sky-600"
      >
        {loading ? "Loading..." : "Login"}
      </button>

      <button
        onClick={signUp}
        className="w-full rounded-xl border border-sky-500 p-4 font-semibold text-sky-500 transition hover:bg-sky-50"
      >
        Create Account
      </button>
    </div>
  );
}