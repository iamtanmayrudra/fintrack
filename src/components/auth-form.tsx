"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { logIn, signUp } from "@/lib/auth";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (isSignup && name.trim().length < 2) return setError("Please enter your full name.");
    if (!email.includes("@")) return setError("Enter a valid email address.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    setIsSubmitting(true);
    if (isSignup) {
      signUp({ name: name.trim(), email: email.trim(), password });
      window.location.href = "/dashboard";
      return;
    }
    if (!logIn(email.trim(), password)) {
      setIsSubmitting(false);
      return setError("We couldn't match that email and password. Create an account first or try again.");
    }
    window.location.href = "/dashboard";
  }

  return <form onSubmit={handleSubmit} className="mt-8 space-y-5">
    {isSignup && <label className="block"><span className="mb-2 block text-sm font-semibold">Full name</span><span className="relative block"><User size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200" placeholder="Alex Morgan" autoComplete="name" autoFocus /></span></label>}
    <label className="block"><span className="mb-2 block text-sm font-semibold">Email address</span><span className="relative block"><Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200" placeholder="you@example.com" type="email" autoComplete="email" autoFocus={!isSignup} /></span></label>
    <label className="block"><div className="mb-2 flex items-center justify-between"><span className="text-sm font-semibold">Password</span>{!isSignup && <a href="#" className="text-xs font-semibold text-violet-700 hover:text-violet-800">Forgot password?</a>}</div><span className="relative block"><Lock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-12 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200" placeholder="At least 8 characters" type={showPassword ? "text" : "password"} autoComplete={isSignup ? "new-password" : "current-password"} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-violet-600">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>
    {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
    <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3.5 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? <><Loader2 size={18} className="animate-spin" /> {isSignup ? "Creating account…" : "Logging in…"}</> : <>{isSignup ? "Create account" : "Log in"}<ArrowRight size={18} /></>}</button>
  </form>;
}
