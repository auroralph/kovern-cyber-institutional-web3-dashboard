import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Activity, Cpu, Lock, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CryptoBackdrop } from "@/components/cyber/CryptoBackdrop";
import { Ticker } from "@/components/cyber/Ticker";
import { useWallet } from "@/lib/wallet";
import { shortAddr } from "@/lib/mock/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZK-Shield — Institutional Web3 Console" },
      {
        name: "description",
        content:
          "Connect your wallet to access institutional-grade analytics, ZK-compliance and on-chain governance.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { address, connect } = useWallet();
  return (
    <div className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <CryptoBackdrop />

      {/* Top nav */}
      <header className="relative z-10 flex items-center justify-between border-b border-border/60 px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--cobalt)] bg-[color-mix(in_oklch,var(--cobalt)_15%,transparent)]">
            <Hexagon className="h-4 w-4 text-[var(--cobalt-glow)]" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">
              ZK-Shield
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
              Institutional Console
            </span>
          </div>
        </div>
        <nav className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground md:flex">
          <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
          <Link to="/compliance" className="hover:text-foreground">ZK-Shield</Link>
          <Link to="/governance" className="hover:text-foreground">Governance</Link>
          <Link to="/architecture" className="hover:text-foreground">Architecture</Link>
        </nav>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground hover:border-[var(--cobalt)]"
        >
          Enter Console <ArrowRight className="h-3 w-3" />
        </Link>
      </header>

      {/* Ticker strip */}
      <div className="relative z-10 border-b border-border/60 bg-background/60 px-6 py-2 backdrop-blur">
        <Ticker />
      </div>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 rounded-sm border border-[color-mix(in_oklch,var(--cobalt)_45%,transparent)] bg-[color-mix(in_oklch,var(--cobalt)_8%,transparent)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--cobalt-glow)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--cobalt-glow)]" />
          v3.2 · ZK-Shield mainnet operational
        </div>
        <h1 className="mt-6 max-w-4xl font-mono text-5xl font-medium leading-[1.05] tracking-tight text-foreground md:text-6xl">
          Institutional-grade
          <br />
          <span className="text-[var(--cobalt-glow)]">cryptographic infrastructure</span>
          <br />
          for on-chain operations.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground">
          Real-time settlement analytics, zero-knowledge compliance attestations, and
          governance tooling — engineered for treasuries, validators and protocol operators.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {address ? (
            <>
              <span className="inline-flex items-center gap-2 rounded-sm border border-[var(--cobalt)] bg-card px-3 py-2 font-mono text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                {shortAddr(address)}
              </span>
              <Button asChild className="h-10 rounded-sm bg-[var(--cobalt)] px-5 font-mono text-xs uppercase tracking-wider hover:bg-[var(--cobalt-glow)]">
                <Link to="/dashboard">
                  Enter Dashboard <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={connect}
                className="h-10 rounded-sm bg-[var(--cobalt)] px-5 font-mono text-xs uppercase tracking-wider hover:bg-[var(--cobalt-glow)]"
              >
                Connect Wallet
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-10 rounded-sm border-border bg-transparent px-5 font-mono text-xs uppercase tracking-wider hover:border-[var(--cobalt)]"
              >
                <Link to="/architecture">View Architecture</Link>
              </Button>
            </>
          )}
        </div>

        {/* Feature strip */}
        <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-4">
          {[
            { icon: Activity, label: "TVL Settled", value: "$4.21B", hint: "across 14 chains" },
            { icon: Cpu, label: "TPS (24h avg)", value: "1,824", hint: "p99 3.1s finality" },
            { icon: ShieldCheck, label: "Proofs Verified", value: "8.2M", hint: "ZK-Shield circuits" },
            { icon: Lock, label: "Validators", value: "412", hint: "tier-2 attested" },
          ].map((f) => (
            <div key={f.label} className="bg-background p-5">
              <f.icon className="h-4 w-4 text-[var(--cobalt-glow)]" />
              <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {f.label}
              </div>
              <div className="mt-1 font-mono text-2xl text-foreground">{f.value}</div>
              <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">{f.hint}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/60 px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span>© ZK-Shield Labs · Cyber-Institutional</span>
          <span className="text-[var(--success)]">● ALL SYSTEMS NOMINAL</span>
        </div>
      </footer>
    </div>
  );
}
