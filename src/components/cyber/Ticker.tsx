import { useEffect, useState } from "react";
import { initialTickers, driftTicker, type Ticker as T } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

export function Ticker({ className }: { className?: string }) {
  const [tickers, setTickers] = useState<T[]>(initialTickers);
  useEffect(() => {
    const id = setInterval(() => {
      setTickers((curr) => curr.map(driftTicker));
    }, 1500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={cn("flex items-center gap-5 overflow-x-auto whitespace-nowrap font-mono text-xs", className)}>
      {tickers.map((t) => {
        const up = t.change24h >= 0;
        return (
          <div key={t.symbol} className="flex items-center gap-2">
            <span className="text-muted-foreground">{t.symbol}</span>
            <span className="text-foreground">${t.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            <span className={cn(up ? "text-[var(--success)]" : "text-[var(--destructive)]")}>
              {up ? "+" : ""}
              {t.change24h.toFixed(2)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
