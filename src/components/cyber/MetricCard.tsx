import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  delta,
  unit,
  hint,
}: {
  label: string;
  value: string;
  delta?: number;
  unit?: string;
  hint?: string;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="relative overflow-hidden rounded-md border border-border bg-card p-4">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--cobalt)] to-transparent opacity-40" />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {typeof delta === "number" && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-mono text-[11px]",
              positive ? "text-[var(--success)]" : "text-[var(--destructive)]",
            )}
          >
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta).toFixed(2)}%
          </span>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="font-mono text-2xl font-medium tracking-tight text-foreground">{value}</span>
        {unit && <span className="font-mono text-xs text-muted-foreground">{unit}</span>}
      </div>
      {hint && <div className="mt-1 font-mono text-[10px] text-muted-foreground">{hint}</div>}
    </div>
  );
}
