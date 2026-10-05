"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut } from "lucide-react";
import { getStoredUser, logOut, type FinTrackUser } from "@/lib/auth";

export function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<FinTrackUser | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  if (!user) return null;

  const initials = user.name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  function handleLogOut() {
    logOut();
    router.push("/login");
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-slate-200 py-1.5 pl-1.5 pr-3 text-sm font-semibold text-ink transition-colors hover:bg-violet-50"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">{initials}</span>
        <span className="hidden max-w-[9rem] truncate sm:inline">{user.name}</span>
        <ChevronDown size={14} className="hidden text-slate-400 sm:block" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-xl shadow-slate-300/40">
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="truncate text-sm font-bold">{user.name}</p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
            <button onClick={handleLogOut} className="flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50">
              <LogOut size={16} /> Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
