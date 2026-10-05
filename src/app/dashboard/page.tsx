"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDownLeft, ArrowUpRight, Plus, TrendingDown, TrendingUp, X } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Select } from "@/components/ui/select";

const transactions = [
  { name: "Whole Foods Market", category: "Groceries", date: "Today, 10:24 AM", amount: "-$84.32", color: "bg-emerald-50 text-emerald-700" },
  { name: "Acme Inc. Payroll", category: "Salary", date: "Yesterday, 9:00 AM", amount: "+$3,200.00", color: "bg-blue-50 text-blue-700" },
  { name: "Netflix", category: "Subscriptions", date: "Sep 24, 2026", amount: "-$15.49", color: "bg-red-50 text-red-700" },
  { name: "Metro Transit", category: "Transport", date: "Sep 23, 2026", amount: "-$42.00", color: "bg-amber-50 text-amber-700" },
];

const statCards = [
  { title: "Total balance", value: "$2,485.20", note: "+12.8% from last month", positive: true },
  { title: "Income", value: "$4,820.00", note: "+8.2% from last month", positive: true },
  { title: "Expenses", value: "$2,334.80", note: "-4.6% from last month", positive: false },
  { title: "Savings rate", value: "51.6%", note: "+6.4% from last month", positive: true },
];

const cashFlow = [
  { month: "Apr", income: 42, expenses: 24 },
  { month: "May", income: 58, expenses: 38 },
  { month: "Jun", income: 45, expenses: 30 },
  { month: "Jul", income: 72, expenses: 50 },
  { month: "Aug", income: 64, expenses: 42 },
  { month: "Sep", income: 88, expenses: 66 },
];

export default function DashboardPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState(transactions);
  const [formError, setFormError] = useState("");
  const chartRef = useRef<HTMLDivElement>(null);
  const maxFlow = Math.max(...cashFlow.flatMap((m) => [m.income, m.expenses]));

  useEffect(() => {
    if (!chartRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(".cash-flow-bar", { scaleY: 0, opacity: 0, transformOrigin: "bottom center" }, {
        scaleY: 1,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: { each: 0.09, from: "start" },
      });
    }, chartRef);
    return () => context.revert();
  }, []);

  function handleAddTransaction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const description = String(form.get("description") || "").trim();
    const amount = Number(form.get("amount"));
    const type = String(form.get("type"));
    if (!description || !amount || amount <= 0) {
      setFormError("Enter a description and an amount greater than zero.");
      return;
    }
    setRecentTransactions((current) => [{
      name: description,
      category: String(form.get("category")),
      date: "Just now",
      amount: `${type === "income" ? "+" : "-"}$${amount.toFixed(2)}`,
      color: type === "income" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700",
    }, ...current]);
    setIsAddOpen(false);
    setFormError("");
  }

  return (
    <>
      <PageHeader
        title="Good morning, Alex"
        subtitle="Monday, September 28, 2026"
        actions={
          <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 hover:scale-[1.02] active:scale-[0.98]">
            <Plus size={17} /> <span className="hidden sm:inline">Add transaction</span>
          </button>
        }
      />

      <main className="mx-auto max-w-7xl space-y-7 px-6 py-8 sm:px-10">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <div key={card.title} className="group rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md hover:shadow-violet-100">
              <p className="text-sm text-slate-500">{card.title}</p>
              <p className="mt-3 text-2xl font-bold tracking-tight">{card.value}</p>
              <p className={`mt-2 flex items-center gap-1 text-xs font-semibold ${card.positive ? "text-emerald-600" : "text-red-600"}`}>
                {card.positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {card.note}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-7 xl:grid-cols-[1.4fr_.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-bold">Cash flow</h2>
                <p className="mt-1 text-sm text-slate-500">Income and expenses over the last 6 months</p>
              </div>
              <Select className="py-2 text-xs">
                <option>Last 6 months</option>
                <option>This year</option>
              </Select>
            </div>
            <div ref={chartRef} className="mt-8 flex h-56 items-end gap-4 border-b border-slate-100 px-2">
              {cashFlow.map(({ month, income, expenses }) => (
                <div key={month} className="group flex h-full flex-1 items-end justify-center gap-1.5">
                  <div
                    className="cash-flow-bar w-3 rounded-t bg-violet-500 transition-colors group-hover:bg-violet-600"
                    style={{ height: `${(income / maxFlow) * 100}%` }}
                    title={`Income $${income * 50}`}
                  />
                  <div
                    className="cash-flow-bar w-3 rounded-t bg-ink/80 transition-colors group-hover:bg-ink"
                    style={{ height: `${(expenses / maxFlow) * 100}%` }}
                    title={`Expenses $${expenses * 50}`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between px-1 text-xs text-slate-400">
              {cashFlow.map(({ month }) => (
                <span key={month}>{month}</span>
              ))}
            </div>
            <div className="mt-5 flex gap-5 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-violet-500" /> Income
              </span>
              <span className="flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-ink" /> Expenses
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-violet-950 p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-bold">September budget</h2>
                <p className="mt-1 text-sm text-slate-300">All categories</p>
              </div>
              <span className="rounded-full bg-violet-300 px-2.5 py-1 text-xs font-bold text-violet-950">On track</span>
            </div>
            <p className="mt-9 text-4xl font-bold">$1,665.20</p>
            <p className="mt-1 text-sm text-slate-300">of $2,400.00 spent</p>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-[69%] rounded-full bg-violet-400 transition-all" />
            </div>
            <div className="mt-3 flex justify-between text-xs text-slate-300">
              <span>69% used</span>
              <span>$734.80 left</span>
            </div>
            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="text-xs text-slate-300">Top category</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-semibold">Housing</span>
                <span className="font-semibold">$720.00</span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <div>
              <h2 className="font-bold">Recent transactions</h2>
              <p className="mt-1 text-sm text-slate-500">Your latest financial activity</p>
            </div>
            <a href="/dashboard/transactions" className="text-sm font-bold text-violet-700 hover:underline">
              View all
            </a>
          </div>
          <div className="divide-y divide-slate-100">
            {recentTransactions.map((transaction) => {
              const isIncome = transaction.amount.startsWith("+");
              return (
                <div key={transaction.name} className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-slate-50">
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

      {isAddOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4" role="dialog" aria-modal="true" aria-labelledby="add-transaction-title">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div><h2 id="add-transaction-title" className="text-xl font-bold">Add transaction</h2><p className="mt-1 text-sm text-slate-500">Record income or spending in your workspace.</p></div>
              <button onClick={() => setIsAddOpen(false)} aria-label="Close dialog" className="rounded-lg p-2 text-slate-400 hover:bg-violet-50 hover:text-violet-700"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddTransaction} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2"><label className="block"><span className="mb-2 block text-sm font-semibold">Type</span><Select name="type" className="w-full py-3"><option value="expense">Expense</option><option value="income">Income</option></Select></label><label className="block"><span className="mb-2 block text-sm font-semibold">Amount</span><input name="amount" type="number" min="0.01" step="0.01" required placeholder="0.00" className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200" /></label></div>
              <div className="grid gap-4 sm:grid-cols-2"><label className="block"><span className="mb-2 block text-sm font-semibold">Description</span><input name="description" required placeholder="e.g. Coffee shop" className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200" /></label><label className="block"><span className="mb-2 block text-sm font-semibold">Category</span><Select name="category" className="w-full py-3"><option>Food & dining</option><option>Groceries</option><option>Transport</option><option>Housing</option><option>Shopping</option><option>Salary</option><option>Other</option></Select></label></div>
              <label className="block"><span className="mb-2 block text-sm font-semibold">Date</span><input name="date" type="date" defaultValue="2026-09-28" className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200" /></label>
              {formError && <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{formError}</p>}
              <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={() => setIsAddOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-50">Cancel</button><button type="submit" className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700">Save transaction</button></div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
