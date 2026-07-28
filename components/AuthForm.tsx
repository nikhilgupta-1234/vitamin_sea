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
    <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">

      <h1 className="text-4xl font-serif text-center text-sky-600 mb-8">
        Vitamin Sea
      </h1>

      <input
        className="border rounded-xl w-full p-4 mb-4"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border rounded-xl w-full p-4 mb-6"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button
        onClick={signIn}
        className="w-full bg-sky-500 text-white rounded-xl p-4 mb-3"
      >
        {loading ? "Loading..." : "Login"}
      </button>

      <button
        onClick={signUp}
        className="w-full border border-sky-500 text-sky-500 rounded-xl p-4"
      >
        Create Account
      </button>

    </div>
  );
}