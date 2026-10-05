import { PiggyBank } from "lucide-react";

export function LogoMark({ className = "h-8 w-8", iconSize = 18 }: { className?: string; iconSize?: number }) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center rounded-lg bg-gradient-to-br from-violet-400 to-violet-600 text-white shadow-sm shadow-violet-600/40 ring-1 ring-inset ring-white/25 ${className}`}
    >
      <PiggyBank size={iconSize} strokeWidth={2.25} />
    </span>
  );
}
