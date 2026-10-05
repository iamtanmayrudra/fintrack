"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDownLeft, BarChart3, CircleHelp, Home, PiggyBank, Settings, Target, WalletCards, X } from "lucide-react";
import { useSidebar } from "./sidebar-context";
import { LogoMark } from "@/components/logo-mark";

const navItems = [
  { label: "Overview", icon: Home, href: "/dashboard" },
  { label: "Transactions", icon: ArrowDownLeft, href: "/dashboard/transactions" },
  { label: "Accounts", icon: WalletCards, href: "/dashboard/accounts" },
  { label: "Budgets", icon: BarChart3, href: "/dashboard/budgets" },
  { label: "Savings", icon: PiggyBank, href: "/dashboard/savings" },
  { label: "Goals", icon: Target, href: "/dashboard/goals" },
];

export function Sidebar() {
  const { open, setOpen } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setOpen(false)} />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white px-5 py-7 transition-transform duration-200 ease-out lg:w-64 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-2">
          <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2 text-xl font-bold">
            <LogoMark /> fintrack
          </Link>
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-slate-400 lg:hidden">
            <X size={20} />
          </button>
        </div>
        <p className="mb-4 mt-12 px-3 text-[11px] font-bold uppercase tracking-[.18em] text-slate-400">Workspace</p>
        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
                  isActive ? "bg-violet-600 text-white shadow-sm shadow-violet-600/30" : "text-slate-500 hover:bg-violet-50 hover:text-violet-700"
                }`}
              >
                <Icon size={18} /> {label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-7 left-5 right-5 space-y-1 border-t border-slate-100 pt-4">
          <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-500 hover:bg-violet-50 hover:text-violet-700" href="#">
            <Settings size={18} /> Settings
          </a>
          <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-500 hover:bg-violet-50 hover:text-violet-700" href="#">
            <CircleHelp size={18} /> Help center
          </a>
        </div>
      </aside>
    </>
  );
}
