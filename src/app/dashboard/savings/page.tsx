"use client";

import { useMemo, useState } from "react";
import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Select } from "@/components/ui/select";

const monthlyFinances = [
  { month: "Apr", income: 4200, expenses: 3100 },
  { month: "May", income: 4350, expenses: 2900 },
  { month: "Jun", income: 4100, expenses: 3400 },
  { month: "Jul", income: 4600, expenses: 2800 },
  { month: "Aug", income: 4500, expenses: 3200 },
  { month: "Sep", income: 4820, expenses: 2334.8 },
];

const ranges = [
  { label: "Last 3 months", months: 3 },
  { label: "Last 6 months", months: 6 },
  { label: "This year", months: 12 },
];

const currency = (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function SavingsPage() {
  const [rangeIndex, setRangeIndex] = useState(1);

  const data = useMemo(() => {
    const months = ranges[rangeIndex].months;
    return monthlyFinances.slice(-months).map((entry) => ({
      ...entry,
      savings: entry.income - entry.expenses,
      rate: ((entry.income - entry.expenses) / entry.income) * 100,
    }));
  }, [rangeIndex]);

  const totalSaved = data.reduce((sum, m) => sum + m.savings, 0);
  const totalIncome = data.reduce((sum, m) => sum + m.income, 0);
  const avgRate = totalIncome > 0 ? (totalSaved / totalIncome) * 100 : 0;
  const bestMonth = data.reduce((best, m) => (m.savings > (best?.savings ?? -Infinity) ? m : best), data[0]);
  const maxSavings = Math.max(...data.map((m) => Math.abs(m.savings)), 1);

  return (
    <>
      <PageHeader title="Savings" subtitle="What's left over after expenses, month by month" />
      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8 sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">Savings = income − expenses for each month in the selected range.</p>
          <Select value={rangeIndex} onChange={(event) => setRangeIndex(Number(event.target.value))}>
            {ranges.map((range, index) => (
              <option key={range.label} value={index}>{range.label}</option>
            ))}
          </Select>
        </div>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-violet-950 p-5 text-white">
            <p className="text-sm text-slate-300">Total saved</p>
            <p className="mt-2 text-3xl font-bold tracking-tight">{currency(totalSaved)}</p>
            <p className="mt-1 text-xs text-slate-300">over {data.length} month{data.length === 1 ? "" : "s"}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Average savings rate</p>
            <p className="mt-2 text-3xl font-bold tracking-tight">{avgRate.toFixed(1)}%</p>
            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600"><TrendingUp size={14} /> of income kept</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Best month</p>
            <p className="mt-2 text-3xl font-bold tracking-tight">{bestMonth?.month ?? "–"}</p>
            <p className="mt-1 text-xs text-slate-500">{bestMonth ? currency(bestMonth.savings) : "No data"} saved</p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-6">
            <h2 className="font-bold">Monthly breakdown</h2>
            <p className="mt-1 text-sm text-slate-500">Income, expenses, and what you kept</p>
          </div>
          <div className="divide-y divide-slate-100">
            {data.map(({ month, income, expenses, savings, rate }) => {
              const isPositive = savings >= 0;
              return (
                <div key={month} className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4 sm:w-40">
                    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${isPositive ? "bg-violet-100 text-violet-700" : "bg-red-50 text-red-700"}`}>
                      <PiggyBank size={17} />
                    </div>
                    <div>
                      <p className="font-bold">{month}</p>
                      <p className="text-xs text-slate-500">{currency(income)} in · {currency(expenses)} out</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all ${isPositive ? "bg-violet-500" : "bg-red-500"}`}
                        style={{ width: `${Math.min(100, (Math.abs(savings) / maxSavings) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right sm:w-36">
                    <p className={`flex items-center justify-end gap-1 font-bold ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
                      {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {currency(Math.abs(savings))}
                    </p>
                    <p className="text-xs text-slate-500">{rate.toFixed(1)}% rate</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
