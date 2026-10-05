"use client";

import { useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Search } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Select } from "@/components/ui/select";

const transactions = [
  { name: "Whole Foods Market", category: "Groceries", date: "Today, 10:24 AM", amount: "-$84.32", color: "bg-emerald-50 text-emerald-700" },
  { name: "Acme Inc. Payroll", category: "Salary", date: "Yesterday, 9:00 AM", amount: "+$3,200.00", color: "bg-blue-50 text-blue-700" },
  { name: "Netflix", category: "Subscriptions", date: "Sep 24, 2026", amount: "-$15.49", color: "bg-red-50 text-red-700" },
  { name: "Metro Transit", category: "Transport", date: "Sep 23, 2026", amount: "-$42.00", color: "bg-amber-50 text-amber-700" },
  { name: "Trader Joe's", category: "Groceries", date: "Sep 21, 2026", amount: "-$56.10", color: "bg-emerald-50 text-emerald-700" },
  { name: "Spotify", category: "Subscriptions", date: "Sep 19, 2026", amount: "-$11.99", color: "bg-red-50 text-red-700" },
  { name: "Freelance deposit", category: "Side income", date: "Sep 17, 2026", amount: "+$450.00", color: "bg-blue-50 text-blue-700" },
  { name: "Landlord", category: "Housing", date: "Sep 1, 2026", amount: "-$1,450.00", color: "bg-violet-50 text-violet-700" },
  { name: "Shell Gas Station", category: "Transport", date: "Aug 29, 2026", amount: "-$38.72", color: "bg-amber-50 text-amber-700" },
  { name: "Amazon", category: "Shopping", date: "Aug 27, 2026", amount: "-$67.45", color: "bg-purple-50 text-purple-700" },
];

const categories = ["All", ...Array.from(new Set(transactions.map((t) => t.category)))];

export default function TransactionsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchesCategory = category === "All" || t.category === category;
      const matchesQuery = t.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <>
      <PageHeader title="Transactions" subtitle="Your latest financial activity" />
      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8 sm:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="relative flex-1 min-w-[200px]">
            <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search transactions"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </span>
          <Select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white">
          <div className="divide-y divide-slate-100">
            {filtered.length === 0 && <p className="px-6 py-10 text-center text-sm text-slate-500">No transactions match your search.</p>}
            {filtered.map((transaction) => {
              const isIncome = transaction.amount.startsWith("+");
              return (
                <div key={transaction.name + transaction.date} className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-slate-50">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${transaction.color}`}>
                      {isIncome ? <ArrowDownLeft size={17} /> : <ArrowUpRight size={17} />}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{transaction.name}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {transaction.category} · {transaction.date}
                      </p>
                    </div>
                  </div>
                  <p className={`shrink-0 text-sm font-bold ${isIncome ? "text-emerald-600" : "text-ink"}`}>{transaction.amount}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
