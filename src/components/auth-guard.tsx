"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { LogoMark } from "@/components/logo-mark";

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
      return;
    }
    setAuthed(true);
  }, [router]);

  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-cream">
        <LogoMark className="h-10 w-10 animate-pulse" iconSize={22} />
      </div>
    );
  }

  return <>{children}</>;
}
