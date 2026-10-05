import { ChevronDown } from "lucide-react";
import { forwardRef, SelectHTMLAttributes } from "react";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select(
  { className = "", children, ...props },
  ref,
) {
  const isFullWidth = className.includes("w-full");
  return (
    <span className={`relative ${isFullWidth ? "block" : "inline-block"}`}>
      <select
        ref={ref}
        className={`peer w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-9 text-sm font-semibold text-slate-700 outline-none transition-colors hover:border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors peer-hover:text-violet-500 peer-focus:text-violet-600" />
    </span>
  );
});
