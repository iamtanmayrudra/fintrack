"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDownLeft, BellRing, CalendarClock, Check, CircleDollarSign, Target } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";

const initialNotifications = [
  { id: 1, title: "You're close to your Food budget", detail: "You have used 80% of your $450 monthly Food budget. You have $90 remaining.", time: "2 hours ago", icon: BellRing, color: "bg-amber-100 text-amber-700", unread: true },
  { id: 2, title: "Salary received", detail: "$3,200.00 was added to your Checking account.", time: "Yesterday at 9:00 AM", icon: CircleDollarSign, color: "bg-emerald-100 text-emerald-700", unread: true },
  { id: 3, title: "Goal milestone reached", detail: "Your Emergency Fund goal is now 40% complete. Keep going!", time: "Sep 24, 2026", icon: Target, color: "bg-violet-100 text-violet-700", unread: true },
  { id: 4, title: "Upcoming recurring payment", detail: "Netflix payment of $15.49 is scheduled for October 2, 2026.", time: "Sep 23, 2026", icon: CalendarClock, color: "bg-blue-100 text-blue-700", unread: false },
  { id: 5, title: "Transfer completed", detail: "$500.00 was transferred from Checking to Emergency Fund.", time: "Sep 20, 2026", icon: ArrowDownLeft, color: "bg-slate-100 text-slate-700", unread: false },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => n.unread).length;

  function markAllRead() {
    setNotifications((current) => current.map((n) => ({ ...n, unread: false })));
  }

  function markOneRead(id: number) {
    setNotifications((current) => current.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  }

  return (
    <>
      <PageHeader title="Notifications" subtitle="Stay up to date with your financial activity" />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8 sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">All notifications</h2>
            <p className="mt-1 text-sm text-slate-500">
              {unreadCount === 0 ? "You're all caught up" : `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`}
            </p>
          </div>
          <button
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-ink"
          >
            <Check size={16} /> Mark all as read
          </button>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="divide-y divide-slate-100">
            {notifications.map(({ id, title, detail, time, icon: Icon, color, unread }) => (
              <button
                key={id}
                onClick={() => unread && markOneRead(id)}
                className={`flex w-full gap-4 p-5 text-left transition hover:bg-slate-50 ${unread ? "bg-violet-50/30" : ""}`}
              >
                <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${color}`}>
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{title}</h3>
                    {unread && <span className="h-2 w-2 shrink-0 rounded-full bg-violet-500" aria-label="Unread" />}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{detail}</p>
                  <p className="mt-2 text-xs text-slate-400">{time}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <Link href="/dashboard" className="inline-block text-sm font-bold text-violet-700 hover:underline">← Back to dashboard</Link>
      </main>
    </>
  );
}
