"use client";

import { FormEvent, useState } from "react";
import { Plus, Target, X } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Select } from "@/components/ui/select";

const initialGoals = [
  { name: "Emergency fund", saved: 4200, target: 6000, due: "Dec 2026" },
  { name: "Trip to Japan", saved: 1850, target: 3500, due: "Jun 2027" },
  { name: "New laptop", saved: 980, target: 1800, due: "Feb 2027" },
];

const dueMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function GoalsPage() {
  const [goals, setGoals] = useState(initialGoals);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formError, setFormError] = useState("");

  const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
  const overallPercent = totalTarget > 0 ? Math.min(100, Math.round((totalSaved / totalTarget) * 100)) : 0;

  function handleAddGoal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const target = Number(form.get("target"));
    const saved = Number(form.get("saved") || 0);
    const month = String(form.get("month"));
    const year = String(form.get("year"));
    if (!name || !target || target <= 0) {
      setFormError("Enter a goal name and a target amount greater than zero.");
      return;
    }
    if (saved < 0 || saved > target) {
      setFormError("Amount saved can't be negative or more than the target.");
      return;
    }
    setGoals((current) => [...current, { name, saved, target, due: `${month} ${year}` }]);
    setIsAddOpen(false);
    setFormError("");
    event.currentTarget.reset();
  }

  return (
    <>
      <PageHeader
        title="Goals"
        subtitle="What you're saving toward"
        actions={
          <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-violet-700 active:scale-[0.98]">
            <Plus size={17} /> <span className="hidden sm:inline">Add goal</span>
          </button>
        }
      />
      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8 sm:px-10">
        <section className="rounded-2xl border border-slate-200 bg-violet-950 p-6 text-white">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-300">Saved across all goals</p>
              <p className="mt-2 text-4xl font-bold tracking-tight">${totalSaved.toLocaleString()}</p>
              <p className="mt-1 text-sm text-slate-300">of ${totalTarget.toLocaleString()} targeted</p>
            </div>
            <span className="rounded-full bg-violet-300 px-2.5 py-1 text-xs font-bold text-violet-950">{overallPercent}% funded</span>
          </div>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-violet-400 transition-all" style={{ width: `${overallPercent}%` }} />
          </div>
        </section>

        {goals.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-sm text-slate-500">
            No goals yet. Add one to start tracking progress.
          </p>
        ) : (
          <section className="grid gap-5 sm:grid-cols-2">
            {goals.map(({ name, saved, target, due }) => {
              const percent = Math.min(100, Math.round((saved / target) * 100));
              const reached = saved >= target;
              return (
                <div key={name} className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md hover:shadow-violet-100">
                  <div className="flex items-start justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-100"><Target size={21} className="text-violet-700" /></div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${reached ? "bg-emerald-50 text-emerald-700" : "bg-violet-50 text-violet-700"}`}>
                      {reached ? "Goal reached" : `Due ${due}`}
                    </span>
                  </div>
                  <p className="mt-4 font-bold">{name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    <span className="font-semibold text-ink">${saved.toLocaleString()}</span> saved of ${target.toLocaleString()}
                  </p>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full transition-all ${reached ? "bg-emerald-500" : "bg-violet-500"}`} style={{ width: `${percent}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{percent}% of the way there</p>
                </div>
              );
            })}
          </section>
        )}
      </main>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4" role="dialog" aria-modal="true" aria-labelledby="add-goal-title">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 id="add-goal-title" className="text-xl font-bold">Add goal</h2>
                <p className="mt-1 text-sm text-slate-500">Set a new savings target to track.</p>
              </div>
              <button onClick={() => setIsAddOpen(false)} aria-label="Close dialog" className="rounded-lg p-2 text-slate-400 hover:bg-violet-50 hover:text-violet-700"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddGoal} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Goal name</span>
                <input name="name" required placeholder="e.g. New bike" className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200" />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Target amount</span>
                  <input name="target" type="number" min="1" step="0.01" required placeholder="1000" className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Already saved</span>
                  <input name="saved" type="number" min="0" step="0.01" placeholder="0" className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200" />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Due month</span>
                  <Select name="month" className="w-full py-3" defaultValue="Dec">
                    {dueMonths.map((month) => <option key={month}>{month}</option>)}
                  </Select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Due year</span>
                  <input name="year" type="number" min="2026" max="2099" defaultValue="2027" className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200" />
                </label>
              </div>
              {formError && <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{formError}</p>}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsAddOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-50">Cancel</button>
                <button type="submit" className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700">Save goal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
