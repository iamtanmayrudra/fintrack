"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "./sidebar-context";

export function MobileMenuButton() {
  const { setOpen } = useSidebar();
  return (
    <button aria-label="Open menu" onClick={() => setOpen(true)} className="rounded-lg border border-slate-200 p-2 text-slate-500 lg:hidden">
      <Menu size={18} />
    </button>
  );
}
