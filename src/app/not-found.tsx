import Link from "next/link";
import { ArrowRight, Compass, Home } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream px-6 py-16">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-200/50 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl" />

      <div className="relative w-full max-w-lg text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight">
          <LogoMark /> fintrack
        </Link>

        <div className="relative mx-auto mt-10 grid h-28 w-28 place-items-center rounded-[2rem] bg-violet-950 shadow-2xl shadow-violet-950/20">
          <div className="absolute -right-3 -top-3 h-10 w-10 rounded-full bg-violet-400/40 blur-xl" />
          <Compass size={44} className="text-violet-300" />
        </div>

        <p className="mt-8 text-8xl font-bold tracking-tight text-ink sm:text-9xl">404</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">This page wandered off track.</h1>
        <p className="mx-auto mt-4 max-w-sm leading-7 text-slate-600">
          The page you're looking for doesn't exist or may have moved. Let's get your finances back in view.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-white transition-colors hover:bg-violet-700">
            <Home size={18} /> Back to home
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3.5 font-semibold transition-colors hover:border-violet-300 hover:text-violet-700">
            Go to dashboard <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
