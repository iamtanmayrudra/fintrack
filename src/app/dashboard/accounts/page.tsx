import { CreditCard, Landmark, PiggyBank, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";

const accounts = [
  { name: "Everyday Checking", institution: "Horizon Bank", balance: "$2,485.20", icon: Landmark, note: "Updated just now" },
  { name: "High-Yield Savings", institution: "Horizon Bank", balance: "$8,920.44", icon: PiggyBank, note: "4.2% APY" },
  { name: "Rewards Credit Card", institution: "Summit Credit Union", balance: "-$612.18", icon: CreditCard, note: "Balance owed · Due Oct 12" },
  { name: "Brokerage", institution: "Clearview Invest", balance: "$14,203.77", icon: TrendingUp, note: "+3.1% this month" },
];

const totalAssets = "$25,609.41";

export default function AccountsPage() {
  return (
    <>
      <PageHeader title="Accounts" subtitle="Everything you've linked to FinTrack" />
      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8 sm:px-10">
        <section className="rounded-2xl border border-slate-200 bg-violet-950 p-6 text-white">
          <p className="text-sm text-slate-300">Net worth across accounts</p>
          <p className="mt-2 text-4xl font-bold tracking-tight">{totalAssets}</p>
        </section>

        <section className="grid gap-5 sm:grid-cols-2">
          {accounts.map(({ name, institution, balance, icon: Icon, note }) => {
            const isNegative = balance.startsWith("-");
            return (
              <div key={name} className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md hover:shadow-violet-100">
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-100"><Icon size={21} className="text-violet-700" /></div>
                </div>
                <p className="mt-4 font-bold">{name}</p>
                <p className="text-sm text-slate-500">{institution}</p>
                <p className={`mt-4 text-2xl font-bold tracking-tight ${isNegative ? "text-red-600" : "text-ink"}`}>{balance}</p>
                <p className="mt-1 text-xs text-slate-500">{note}</p>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}
