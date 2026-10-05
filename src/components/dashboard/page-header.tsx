"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, Check, ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { MobileMenuButton } from "./mobile-menu-button";
import { UserMenu } from "./user-menu";

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/90 px-6 py-5 backdrop-blur sm:px-10">
      <div className="flex items-center gap-3">
        <MobileMenuButton />
        <div>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          <h1 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">{title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
        <button aria-label="Notifications" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="relative rounded-full border border-slate-200 p-2.5 text-slate-500 transition-colors hover:bg-violet-50 hover:text-violet-700">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-500" />
        </button>
        {open && <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-xl shadow-slate-300/40"><div className="flex items-center justify-between border-b border-slate-100 px-4 py-3"><div><p className="font-bold">Notifications</p><p className="text-xs text-slate-500">3 unread updates</p></div><button className="text-xs font-semibold text-violet-700"><Check size={14} className="mr-1 inline" /> Mark read</button></div><div className="divide-y divide-slate-100"><Link href="/notifications" onClick={() => setOpen(false)} className="block bg-violet-50/60 px-4 py-3 transition hover:bg-violet-50"><p className="text-sm font-semibold">You’re close to your Food budget</p><p className="mt-1 text-xs text-slate-500">You have used 80% of your monthly limit · 2h ago</p></Link><Link href="/notifications" onClick={() => setOpen(false)} className="block px-4 py-3 transition hover:bg-slate-50"><p className="text-sm font-semibold">Salary received</p><p className="mt-1 text-xs text-slate-500">+$3,200.00 added to Checking · Yesterday</p></Link><Link href="/notifications" onClick={() => setOpen(false)} className="block px-4 py-3 transition hover:bg-slate-50"><p className="text-sm font-semibold">Goal milestone reached</p><p className="mt-1 text-xs text-slate-500">Emergency Fund is now 40% complete · Sep 24</p></Link></div><Link href="/notifications" onClick={() => setOpen(false)} className="flex items-center justify-between px-4 py-3 text-sm font-bold text-violet-700 hover:bg-slate-50">View all notifications <ChevronRight size={16} /></Link></div>}
        </div>
        {actions}
        <UserMenu />
      </div>
    </header>
  );
}
