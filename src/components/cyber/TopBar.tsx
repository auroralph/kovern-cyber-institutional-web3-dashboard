import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Ticker } from "./Ticker";
import { useWallet } from "@/lib/wallet";
import { shortAddr } from "@/lib/mock/data";
import { Wallet, Power } from "lucide-react";

export function TopBar() {
  const { address, network, connect, disconnect } = useWallet();
  return (
    <header className="sticky top-0 z-30 flex h-12 items-center gap-3 border-b border-border bg-background/80 px-3 backdrop-blur">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      <div className="hidden items-center gap-2 md:flex">
        <span className="inline-flex items-center gap-1.5 rounded-sm border border-[color-mix(in_oklch,var(--cobalt)_45%,transparent)] bg-[color-mix(in_oklch,var(--cobalt)_10%,transparent)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--cobalt-glow)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--cobalt-glow)]" />
          {network}
        </span>
      </div>
      <div className="flex-1 overflow-hidden">
        <Ticker className="px-2" />
      </div>
      {address ? (
        <div className="flex items-center gap-2">
          <span className="hidden rounded-sm border border-border bg-card px-2 py-1 font-mono text-[11px] text-foreground sm:inline-flex">
            {shortAddr(address)}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={disconnect}
            className="h-7 gap-1.5 px-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-[var(--destructive)]"
          >
            <Power className="h-3 w-3" /> Disconnect
          </Button>
        </div>
      ) : (
        <Button
          size="sm"
          onClick={connect}
          className="h-7 gap-1.5 rounded-sm bg-[var(--cobalt)] px-3 font-mono text-[10px] uppercase tracking-wider text-primary-foreground hover:bg-[var(--cobalt-glow)]"
        >
          <Wallet className="h-3 w-3" /> Connect Wallet
        </Button>
      )}
    </header>
  );
}
