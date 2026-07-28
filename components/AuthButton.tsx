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
    } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-sm font-medium"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="rounded-full bg-sky-500 px-4 py-2 text-sm text-white"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <User size={20} />

      <span className="hidden md:block">
        {user.email}
      </span>

      <button
        onClick={logout}
        className="rounded-full border px-4 py-2 text-sm"
      >
        Logout
      </button>
    </div>
  );
}