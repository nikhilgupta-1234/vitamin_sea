"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Props {
  mobile?: boolean;
  onNavigate?: () => void;
}

export default function AuthButton({
  mobile = false,
  onNavigate,
}: Props) {
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

    if (onNavigate) {
      onNavigate();
    }

    window.location.reload();
  };

  // ==========================
  // MOBILE VIEW
  // ==========================
  if (mobile) {
    if (!user) {
      return (
        <div className="mt-6 space-y-3 border-t pt-6">
          <Link
            href="/login"
            onClick={onNavigate}
            className="flex h-12 w-full items-center justify-center rounded-xl border border-sky-500 text-base font-medium text-sky-600 transition hover:bg-sky-50"
          >
            Login
          </Link>

          <Link
            href="/signup"
            onClick={onNavigate}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-sky-500 text-base font-semibold text-white transition hover:bg-sky-600"
          >
            Sign Up
          </Link>
        </div>
      );
    }

    return (
      <div className="mt-6 space-y-4 border-t pt-6">
        <div className="flex items-center gap-3 rounded-xl bg-sky-50 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white">
            <User size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-500">
              Logged in as
            </p>

            <p className="truncate text-sm font-medium text-gray-800">
              {user.email}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full rounded-xl border border-red-300 py-3 font-medium text-red-600 transition hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    );
  }

  // ==========================
  // DESKTOP VIEW
  // ==========================
  if (!user) {
    return (
      <div className="hidden items-center gap-3 md:flex">
        <Link
          href="/login"
          className="text-sm font-medium transition hover:text-sky-600"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="rounded-full bg-sky-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-sky-600"
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

        <span className="max-w-[170px] truncate text-sm">
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