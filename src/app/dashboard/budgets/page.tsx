import { PageHeader } from "@/components/dashboard/page-header";

const budgets = [
  { category: "Housing", spent: 720, limit: 1000 },
  { category: "Groceries", spent: 412, limit: 500 },
  { category: "Transport", spent: 168, limit: 250 },
  { category: "Subscriptions", spent: 64, limit: 100 },
  { category: "Dining out", spent: 221, limit: 200 },
  { category: "Shopping", spent: 180, limit: 350 },
];

export default function BudgetsPage() {
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0);

  return (
    <>
      <PageHeader title="Budgets" subtitle="September spending limits by category" />
      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8 sm:px-10">
        <section className="rounded-2xl border border-slate-200 bg-violet-950 p-6 text-white">
          <p className="text-sm text-slate-300">Total spent this month</p>
          <p className="mt-2 text-4xl font-bold tracking-tight">${totalSpent.toFixed(2)}</p>
          <p className="mt-1 text-sm text-slate-300">of ${totalLimit.toFixed(2)} budgeted</p>
        </section>

        <section className="grid gap-5 sm:grid-cols-2">
          {budgets.map(({ category, spent, limit }) => {
            const percent = Math.min(100, Math.round((spent / limit) * 100));
            const overBudget = spent > limit;
            return (
              <div key={category} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <p className="font-bold">{category}</p>
                  {overBudget && <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">Over budget</span>}
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  <span className="font-semibold text-ink">${spent.toFixed(2)}</span> of ${limit.toFixed(2)}
                </p>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all ${overBudget ? "bg-red-500" : "bg-violet-500"}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">{percent}% used</p>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}
