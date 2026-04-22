import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Panel, SectionHeader } from "./_app.dashboard";
import { genProofs, explorerUrl } from "@/lib/mock/data";
import { StatusBadge } from "@/components/cyber/StatusBadge";
import { AddressMono } from "@/components/cyber/AddressMono";
import { MermaidDiagram } from "@/components/cyber/MermaidDiagram";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ExternalLink, ShieldCheck, Upload } from "lucide-react";

export const Route = createFileRoute("/_app/compliance")({
  head: () => ({ meta: [{ title: "Compliance · ZK-Shield" }] }),
  component: Compliance,
});

const ZK_FLOWCHART = `flowchart LR
  A[Wallet Connect] --> B[Tx Initiation]
  B --> C{ZK-Shield<br/>Privacy Layer}
  C -->|Proof OK| D[Validator Attest]
  C -->|Proof Fail| E[Reject + Log]
  D --> F[Blockchain Finality]
  F --> G[(Compliance Log)]
  E --> G`;

function Compliance() {
  const [proofs] = useState(() => genProofs());
  return (
    <div className="space-y-6">
      <SectionHeader title="ZK-Shield Compliance" subtitle="Zero-knowledge proof verification & audit trail" />

      <div className="grid gap-3 md:grid-cols-4">
        <Stat label="Proofs Submitted" value="8,241" hint="last 30d" />
        <Stat label="Verified" value="8,012" tone="success" />
        <Stat label="Pending" value="184" tone="warn" />
        <Stat label="Rejected" value="45" tone="fail" />
      </div>

      <Tabs defaultValue="proofs">
        <TabsList className="rounded-sm border border-border bg-card p-0.5">
          {["proofs", "submit", "flow"].map((v) => (
            <TabsTrigger
              key={v}
              value={v}
              className="rounded-sm font-mono text-[10px] uppercase tracking-wider data-[state=active]:bg-[color-mix(in_oklch,var(--cobalt)_18%,transparent)] data-[state=active]:text-[var(--cobalt-glow)]"
            >
              {v === "proofs" ? "Proofs" : v === "submit" ? "Submit" : "Flow"}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="proofs" className="mt-3">
          <Panel title="Verification Log">
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-xs">
                <thead>
                  <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                    <th className="py-2 pr-3 font-normal">Proof ID</th>
                    <th className="py-2 pr-3 font-normal">Circuit</th>
                    <th className="py-2 pr-3 font-normal">Submitter</th>
                    <th className="py-2 pr-3 font-normal">Tx</th>
                    <th className="py-2 pr-3 text-right font-normal">Size</th>
                    <th className="py-2 pr-1 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {proofs.map((p) => (
                    <tr key={p.id} className="border-b border-border/60 hover:bg-accent/30">
                      <td className="py-2.5 pr-3 text-[var(--cobalt-glow)]">{p.id}</td>
                      <td className="py-2.5 pr-3 text-foreground">{p.circuit}</td>
                      <td className="py-2.5 pr-3"><AddressMono value={p.submittedBy} /></td>
                      <td className="py-2.5 pr-3">
                        <a
                          href={explorerUrl(p.txHash)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-muted-foreground hover:text-[var(--cobalt-glow)]"
                        >
                          {p.txHash.slice(0, 10)}…<ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                      <td className="py-2.5 pr-3 text-right text-muted-foreground">{p.size}</td>
                      <td className="py-2.5 pr-1"><StatusBadge status={p.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="submit" className="mt-3">
          <Panel title="Submit Proof">
            <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
              <div className="space-y-3">
                <Field label="Circuit">
                  <select className="w-full rounded-sm border border-border bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-[var(--cobalt)] focus:outline-none">
                    <option>Groth16 / Transfer</option>
                    <option>PLONK / Membership</option>
                    <option>Halo2 / Range</option>
                    <option>STARK / State</option>
                  </select>
                </Field>
                <Field label="Public Inputs (JSON)">
                  <textarea
                    rows={5}
                    defaultValue={`{\n  "nullifier": "0x9a…",\n  "commitment": "0x8c…"\n}`}
                    className="w-full rounded-sm border border-border bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-[var(--cobalt)] focus:outline-none"
                  />
                </Field>
                <Field label="Proof Bytes">
                  <input
                    placeholder="0x…"
                    className="w-full rounded-sm border border-border bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-[var(--cobalt)] focus:outline-none"
                  />
                </Field>
                <Button className="h-9 gap-2 rounded-sm bg-[var(--cobalt)] font-mono text-[11px] uppercase tracking-wider hover:bg-[var(--cobalt-glow)]">
                  <Upload className="h-3.5 w-3.5" /> Submit for Verification
                </Button>
              </div>
              <div className="rounded-sm border border-dashed border-border bg-background/40 p-4">
                <ShieldCheck className="h-5 w-5 text-[var(--cobalt-glow)]" />
                <h3 className="mt-3 font-mono text-xs uppercase tracking-wider text-foreground">
                  Privacy Guarantee
                </h3>
                <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground">
                  ZK-Shield verifies your statement without revealing inputs.
                  Verification keys are pinned on-chain; circuit hashes are
                  attested by the validator set under a 2/3 BFT consensus.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-[10px]">
                  <div className="rounded-sm border border-border bg-card p-2">
                    <div className="text-muted-foreground">Verifier</div>
                    <div className="text-foreground">0x42a…f81</div>
                  </div>
                  <div className="rounded-sm border border-border bg-card p-2">
                    <div className="text-muted-foreground">Circuit Hash</div>
                    <div className="text-foreground">0x9d…c34</div>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="flow" className="mt-3">
          <Panel title="ZK-Shield Privacy Flow">
            <MermaidDiagram chart={ZK_FLOWCHART} />
          </Panel>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Stat({ label, value, hint, tone }: { label: string; value: string; hint?: string; tone?: "success" | "warn" | "fail" }) {
  const color =
    tone === "success" ? "text-[var(--success)]" :
    tone === "warn" ? "text-[var(--warning)]" :
    tone === "fail" ? "text-[var(--destructive)]" : "text-foreground";
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-2 font-mono text-2xl ${color}`}>{value}</div>
      {hint && <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      {children}
    </label>
  );
}
