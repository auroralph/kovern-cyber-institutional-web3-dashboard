import { cn } from "@/lib/utils";

type Status =
  | "Confirmed"
  | "Pending"
  | "Failed"
  | "Verified"
  | "Rejected"
  | "Active"
  | "Passed"
  | "Queued";

const styles: Record<Status, string> = {
  Confirmed: "bg-[color-mix(in_oklch,var(--success)_15%,transparent)] text-[var(--success)] border-[color-mix(in_oklch,var(--success)_40%,transparent)]",
  Verified: "bg-[color-mix(in_oklch,var(--success)_15%,transparent)] text-[var(--success)] border-[color-mix(in_oklch,var(--success)_40%,transparent)]",
  Passed: "bg-[color-mix(in_oklch,var(--success)_15%,transparent)] text-[var(--success)] border-[color-mix(in_oklch,var(--success)_40%,transparent)]",
  Pending: "bg-[color-mix(in_oklch,var(--warning)_12%,transparent)] text-[var(--warning)] border-[color-mix(in_oklch,var(--warning)_40%,transparent)]",
  Queued: "bg-[color-mix(in_oklch,var(--warning)_12%,transparent)] text-[var(--warning)] border-[color-mix(in_oklch,var(--warning)_40%,transparent)]",
  Failed: "bg-[color-mix(in_oklch,var(--destructive)_15%,transparent)] text-[var(--destructive)] border-[color-mix(in_oklch,var(--destructive)_40%,transparent)]",
  Rejected: "bg-[color-mix(in_oklch,var(--destructive)_15%,transparent)] text-[var(--destructive)] border-[color-mix(in_oklch,var(--destructive)_40%,transparent)]",
  Active: "bg-[color-mix(in_oklch,var(--cobalt)_15%,transparent)] text-[var(--cobalt-glow)] border-[color-mix(in_oklch,var(--cobalt)_45%,transparent)]",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        styles[status],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
