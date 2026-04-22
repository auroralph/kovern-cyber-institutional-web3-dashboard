import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { shortAddr, explorerUrl } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

export function AddressMono({
  value,
  short = true,
  link = false,
  className,
}: {
  value: string;
  short?: boolean;
  link?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const display = short ? shortAddr(value) : value;
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-mono text-xs text-foreground/90", className)}>
      <span>{display}</span>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
        className="text-muted-foreground transition-colors hover:text-[var(--cobalt-glow)]"
        aria-label="Copy address"
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      </button>
      {link && (
        <a
          href={explorerUrl(value)}
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground transition-colors hover:text-[var(--cobalt-glow)]"
        >
          <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </span>
  );
}
