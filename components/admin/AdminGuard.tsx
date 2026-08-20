"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/admin";

interface Props {
  children: React.ReactNode;
}

export default function AdminGuard({
  children,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      const admin = await isAdmin();

      if (!admin) {
        router.replace("/");
        return;
      }

      setAllowed(true);
      setLoading(false);
    }

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-slate-500">
          Checking permissions...
        </p>
      </div>
    );
  }

  if (!allowed) return null;

  return <>{children}</>;
}