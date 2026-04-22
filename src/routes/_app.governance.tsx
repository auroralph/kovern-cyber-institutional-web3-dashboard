import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Panel, SectionHeader } from "./_app.dashboard";
import { StatusBadge } from "@/components/cyber/StatusBadge";
import { Button } from "@/components/ui/button";
import { genProposals, type Proposal } from "@/lib/mock/data";

export const Route = createFileRoute("/_app/governance")({
  head: () => ({ meta: [{ title: "Governance — ZK-Shield" }] }),
  component: Governance,
});

function Governance() {
  const [proposals, setProposals] = useState(() => genProposals());

  function vote(id: string, side: "for" | "against" | "abstain") {
    setProposals((curr) =>
      curr.map((p) =>
        p.id === id
          ? {
              ...p,
              for: side === "for" ? p.for + 12_000 : p.for,
              against: side === "against" ? p.against + 12_000 : p.against,
              abstain: side === "abstain" ? p.abstain + 12_000 : p.abstain,
            }
          : p,
      ),
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Governance" subtitle="On-chain proposals & voting" />
      <div className="grid gap-3 lg:grid-cols-2">
        {proposals.map((p) => (
          <ProposalCard key={p.id} p={p} onVote={(s) => vote(p.id, s)} />
        ))}
      </div>
    </div>
  );
}

function ProposalCard({ p, onVote }: { p: Proposal; onVote: (s: "for" | "against" | "abstain") => void }) {
  const total = p.for + p.against + p.abstain;
  const forPct = (p.for / total) * 100;
  const againstPct = (p.against / total) * 100;
  const abstainPct = (p.abstain / total) * 100;
  const quorumPct = Math.min(100, (total / p.quorum) * 100);
  const closed = p.status === "Passed" || p.status === "Rejected";

  return (
    <Panel
      title={p.id}
      action={<StatusBadge status={p.status} />}
    >
      <h3 className="font-mono text-sm text-foreground">{p.title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.description}</p>

      <div className="mt-4 flex h-2 overflow-hidden rounded-sm border border-border">
        <div style={{ width: `${forPct}%`, background: "var(--success)" }} />
        <div style={{ width: `${againstPct}%`, background: "var(--destructive)" }} />
        <div style={{ width: `${abstainPct}%`, background: "var(--muted-foreground)" }} />
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-[10px]">
        <Tally label="For" value={p.for} pct={forPct} color="var(--success)" />
        <Tally label="Against" value={p.against} pct={againstPct} color="var(--destructive)" />
        <Tally label="Abstain" value={p.abstain} pct={abstainPct} color="var(--muted-foreground)" />
      </div>

      <div className="mt-3 rounded-sm border border-border bg-background/40 p-2 font-mono text-[10px]">
        <div className="flex justify-between text-muted-foreground">
          <span>Quorum</span>
          <span>{quorumPct.toFixed(1)}% · ends in {p.endsIn}</span>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-sm bg-border">
          <div style={{ width: `${quorumPct}%`, background: "var(--cobalt-glow)" }} className="h-full" />
        </div>
      </div>

      {!closed && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Button onClick={() => onVote("for")} className="h-8 rounded-sm bg-[color-mix(in_oklch,var(--success)_22%,transparent)] font-mono text-[10px] uppercase tracking-wider text-[var(--success)] hover:bg-[color-mix(in_oklch,var(--success)_30%,transparent)]">For</Button>
          <Button onClick={() => onVote("against")} className="h-8 rounded-sm bg-[color-mix(in_oklch,var(--destructive)_22%,transparent)] font-mono text-[10px] uppercase tracking-wider text-[var(--destructive)] hover:bg-[color-mix(in_oklch,var(--destructive)_30%,transparent)]">Against</Button>
          <Button onClick={() => onVote("abstain")} variant="outline" className="h-8 rounded-sm border-border bg-transparent font-mono text-[10px] uppercase tracking-wider hover:border-[var(--cobalt)]">Abstain</Button>
        </div>
      )}
    </Panel>
  );
}

function Tally({ label, value, pct, color }: { label: string; value: number; pct: number; color: string }) {
  return (
    <div className="rounded-sm border border-border bg-background/40 p-2">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-sm" style={{ background: color }} />
        {label}
      </div>
      <div className="mt-0.5 text-foreground">{value.toLocaleString()}</div>
      <div className="text-muted-foreground">{pct.toFixed(1)}%</div>
    </div>
  );
}
