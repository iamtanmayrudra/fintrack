# FinTrack — Personal Finance, Made Clear

FinTrack is a personal finance and expense management web app. It brings your accounts, spending, budgets, savings, and goals into one calm dashboard, so you can see where your money goes and plan with confidence.

Built with **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**.

---

## Use cases

### Marketing & onboarding
- **Landing page** — product pitch, social-proof stats, a "How it works" walkthrough, feature highlights, testimonials, and a call-to-action to sign up.
- **Sign up** — create an account with name, email, and password (client-side validated).
- **Log in** — authenticate with an existing account; "Forgot password?" entry point included.
- **404 page** — on-brand "page not found" screen with quick links back to the home page or dashboard.

### Dashboard overview
- At-a-glance stat cards: total balance, income, expenses, and savings rate, each with a month-over-month trend indicator.
- **Cash flow chart** — animated bar chart comparing income vs. expenses over the last 6 months.
- **Budget snapshot** — current month's spend vs. budget with a progress bar and top spending category.
- **Recent transactions** — latest activity at a glance, with a link through to the full transaction list.
- **Add transaction** — modal to record a new income or expense entry (type, amount, description, category, date) with validation.
- **Notifications** — bell icon with a live dropdown preview, and a full notifications page; items can be marked read individually or all at once.

### Transactions
- Full transaction history, independent of the dashboard's "recent" preview.
- **Search** transactions by name.
- **Filter** by category.

### Accounts
- Linked accounts overview (checking, savings, credit card, brokerage) with balances.
- Net-worth summary card aggregating all accounts.

### Budgets
- Per-category budgets (housing, groceries, transport, subscriptions, dining, shopping) with spent-vs-limit progress bars.
- Categories that exceed their limit are flagged as "Over budget."
- Total spent vs. total budgeted summary.

### Savings
- Automatically derives monthly savings (**income − expenses**) from the same financial data used elsewhere in the app — not a separate manually maintained number.
- **Time-range filter**: last 3 months, last 6 months, or this year.
- Total saved, average savings rate, and best month, all recalculated live as the filter changes.
- Monthly breakdown with per-month progress bars and savings rate.

### Goals
- Track savings goals (e.g. emergency fund, a trip, a big purchase) with a saved-vs-target progress bar and due date.
- **Add goal** — modal to create a new goal (name, target amount, amount already saved, due month/year).
- Summary card showing total saved and overall % funded across all goals.
- Goals that reach 100% are marked "Goal reached."

### Navigation & responsiveness
- Persistent sidebar (Overview, Transactions, Accounts, Budgets, Savings, Goals) with active-route highlighting.
- Mobile-friendly slide-in navigation drawer.
- Consistent, reusable header (title, mobile menu trigger, notifications, page-specific actions) across every dashboard page.

---

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) + React 18 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [GSAP](https://gsap.com/) for chart entrance animation

Authentication is currently a client-side mock (`localStorage`-backed) for demo purposes — see [`src/lib/auth.ts`](src/lib/auth.ts).

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/
    page.tsx                 # Landing page
    login/, signup/          # Auth pages
    not-found.tsx             # Custom 404
    notifications/            # Notifications page
    dashboard/
      layout.tsx               # Shared sidebar + provider for all dashboard routes
      page.tsx                 # Overview
      transactions/
      accounts/
      budgets/
      savings/
      goals/
  components/
    dashboard/                # Sidebar, page header, mobile menu, sidebar context
    ui/                       # Shared form primitives (e.g. Select)
    auth-form.tsx
    logo-mark.tsx
  lib/
    auth.ts                   # Mock auth (localStorage)
```
