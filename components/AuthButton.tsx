"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AuthButton() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  if (!user) {
    return (
      <div className="hidden items-center gap-3 md:flex">
        <Link
          href="/login"
          className="text-sm font-medium hover:text-sky-600"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-3 md:flex">
      <div className="flex items-center gap-2">
        <User size={18} />

        <span className="max-w-[150px] truncate text-sm">
          {user.email}
        </span>
      </div>

      <button
        onClick={logout}
        className="rounded-full border px-4 py-2 text-sm transition hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  );
}