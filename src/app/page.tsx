import Link from "next/link";
import { ArrowRight, BarChart3, Check, PiggyBank, Plug, ShieldCheck, Sparkles, Target, WalletCards } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";

const features = [
  { icon: WalletCards, title: "One clear view", text: "Bring accounts, income, and everyday spending into one calm dashboard." },
  { icon: BarChart3, title: "Useful insights", text: "Understand where your money goes with simple, readable analytics." },
  { icon: ShieldCheck, title: "Built with care", text: "Your financial data deserves thoughtful security and transparent controls." },
];

const stats = [
  { value: "12,000+", label: "People tracking spending" },
  { value: "$2.4M+", label: "Transactions categorized monthly" },
  { value: "4.9/5", label: "Average member rating" },
  { value: "38%", label: "Average increase in savings rate" },
];

const steps = [
  { icon: Plug, title: "Connect your accounts", text: "Securely link your banks and cards, or add transactions manually in seconds." },
  { icon: Target, title: "Set your budgets", text: "Define spending limits for every category and a savings goal to work toward." },
  { icon: Sparkles, title: "Track in real time", text: "See where you stand at a glance, with gentle nudges before you overspend." },
];

const testimonials = [
  { quote: "FinTrack is the first budgeting app that didn't feel like homework. I actually open it every day.", name: "Priya Shah", role: "Product designer" },
  { quote: "Seeing cash flow laid out so simply changed how I plan my month. I've saved more in three months than all of last year.", name: "Marcus Lee", role: "Freelance developer" },
  { quote: "The dashboard is clean, fast, and honestly a little satisfying to look at.", name: "Dana Oyelaran", role: "Small business owner" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight"><LogoMark /> fintrack</Link>
        <div className="flex items-center gap-5 text-sm font-semibold"><a href="#how-it-works" className="hidden text-slate-600 transition-colors hover:text-ink sm:block">How it works</a><a href="#features" className="hidden text-slate-600 transition-colors hover:text-ink sm:block">Features</a><a href="/login" className="hidden text-slate-600 transition-colors hover:text-ink sm:block">Log in</a><a href="/signup" className="rounded-full bg-ink px-5 py-2.5 text-white transition-colors hover:bg-violet-700">Get started</a></div>
      </nav>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 pt-12 lg:grid-cols-[1.05fr_.95fr] lg:pt-24">
        <div><p className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-[.18em] text-violet-700">Money, made visible</p><h1 className="max-w-xl text-5xl font-bold leading-[1.05] tracking-[-.05em] sm:text-7xl">Feel good about where your money goes.</h1><p className="mt-7 max-w-lg text-lg leading-8 text-slate-600">FinTrack brings your daily finances into focus, so you can spend intentionally, save consistently, and plan with confidence.</p><div className="mt-9 flex flex-wrap gap-3"><a href="/signup" className="flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-white transition-colors hover:bg-violet-700">Get started <ArrowRight size={18} /></a><a href="/dashboard" className="rounded-full border border-slate-300 px-6 py-3.5 font-semibold transition-colors hover:border-violet-300 hover:text-violet-700">Explore the dashboard</a></div><div className="mt-8 flex items-center gap-5 text-sm text-slate-500"><span className="flex items-center gap-1.5"><Check size={16} className="text-violet-600" /> Free to get started</span><span className="flex items-center gap-1.5"><Check size={16} className="text-violet-600" /> No spreadsheets</span></div></div>
        <div className="relative rounded-[2rem] bg-violet-950 p-5 shadow-2xl shadow-violet-950/20 sm:p-7"><div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-400/40 blur-2xl" /><div className="relative rounded-2xl bg-[#2a2145] p-5 text-white"><div className="flex items-start justify-between"><div><p className="text-sm text-slate-300">Total balance</p><p className="mt-2 text-4xl font-bold tracking-tight">$2,485.20</p></div><div className="rounded-xl bg-white/10 px-3 py-2 text-xs text-violet-300">+12.8%</div></div><div className="mt-9 flex h-32 items-end gap-3">{[35, 52, 44, 70, 58, 82, 68, 94, 76, 100].map((h, i) => <div key={i} className="flex-1 rounded-t-md bg-violet-400" style={{ height: `${h}%` }} />)}</div><div className="mt-3 flex justify-between text-xs text-slate-400"><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div></div><div className="relative mt-4 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-slate-300">This month</p><p className="mt-2 text-xl font-bold text-white">$428.50</p><p className="mt-1 text-xs text-violet-300">↓ 8% spending</p></div><div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-slate-300">Saved so far</p><p className="mt-2 text-xl font-bold text-white">$184.00</p><p className="mt-1 text-xs text-slate-300">of $250.00 goal</p></div></div></div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="text-3xl font-bold tracking-tight text-ink">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-[.18em] text-slate-500">How it works</p>
        <h2 className="mt-3 max-w-lg text-3xl font-bold tracking-tight sm:text-4xl">Three steps to a clearer financial picture.</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <div key={title} className="relative rounded-2xl border border-slate-200 bg-white p-6">
              <span className="text-xs font-bold tracking-[.18em] text-violet-300">STEP {String(index + 1).padStart(2, "0")}</span>
              <div className="mb-5 mt-4 grid h-11 w-11 place-items-center rounded-xl bg-violet-100"><Icon size={21} className="text-violet-700" /></div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="border-t border-slate-200 bg-white"><div className="mx-auto max-w-6xl px-6 py-20"><p className="text-sm font-bold uppercase tracking-[.18em] text-slate-500">Everything in one place</p><div className="mt-8 grid gap-10 md:grid-cols-3">{features.map(({ icon: Icon, title, text }) => <div key={title}><div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-violet-100"><Icon size={21} className="text-violet-700" /></div><h2 className="text-xl font-bold">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></div>)}</div></div></section>

      <section className="border-t border-slate-200 bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-slate-500">Loved by people who hate spreadsheets</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
                <blockquote className="flex-1 leading-7 text-slate-600">“{testimonial.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">{testimonial.name.split(" ").map((part) => part[0]).join("")}</span>
                  <div><p className="text-sm font-bold">{testimonial.name}</p><p className="text-xs text-slate-500">{testimonial.role}</p></div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="relative overflow-hidden rounded-[2rem] bg-violet-950 px-8 py-14 text-center text-white sm:px-16">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-violet-400/30 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
            <PiggyBank size={32} className="relative mx-auto text-violet-300" />
            <h2 className="relative mx-auto mt-5 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">Start building better money habits today.</h2>
            <p className="relative mx-auto mt-4 max-w-md leading-7 text-slate-300">It takes less than five minutes to set up your workspace and see your first insights.</p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="/signup" className="flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-violet-100">Create your free account <ArrowRight size={18} /></a>
              <a href="/dashboard" className="rounded-full border border-white/20 px-6 py-3.5 font-semibold transition-colors hover:border-white/40">See a live demo</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-ink"><LogoMark className="h-6 w-6 rounded-md" iconSize={13} /> fintrack</Link>
          <p>© 2026 FinTrack. All rights reserved.</p>
          <div className="flex items-center gap-5 font-semibold"><a href="#features" className="transition-colors hover:text-ink">Features</a><a href="/login" className="transition-colors hover:text-ink">Log in</a><a href="/signup" className="transition-colors hover:text-ink">Sign up</a></div>
        </div>
      </footer>
    </main>
  );
}
