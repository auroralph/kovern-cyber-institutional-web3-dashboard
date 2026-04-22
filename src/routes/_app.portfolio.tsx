import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Panel, SectionHeader } from "./_app.dashboard";
import { genTokens, genActivity, explorerUrl } from "@/lib/mock/data";
import { StatusBadge } from "@/components/cyber/StatusBadge";
import { AddressMono } from "@/components/cyber/AddressMono";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/_app/portfolio")({
  head: () => ({ meta: [{ title: "Portfolio — ZK-Shield" }] }),
  component: Portfolio,
});

const COLORS = ["var(--cobalt-glow)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--cobalt)"];

function Portfolio() {
  const [tokens] = useState(() => genTokens());
  const [activity] = useState(() => genActivity(8));
  const total = tokens.reduce((s, t) => s + t.balance * t.priceUsd, 0);
  const allocation = tokens.map((t) => ({ name: t.symbol, value: t.balance * t.priceUsd }));

  return (
    <div className="space-y-6">
      <SectionHeader title="Asset Management" subtitle="Multi-chain treasury position" />

      <div className="grid gap-3 lg:grid-cols-3">
        <div className="rounded-md border border-border bg-card p-5 lg:col-span-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Total Net Worth
          </div>
          <div className="mt-2 font-mono text-4xl text-foreground">
            ${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="mt-1 font-mono text-[11px] text-[var(--success)]">+$48,213.40 (24h)</div>
          <div className="mt-6 grid grid-cols-3 gap-px border border-border bg-border">
            {[
              { l: "Liquid", v: "$294,812" },
              { l: "Staked", v: "$112,408" },
              { l: "Vested", v: "$48,200" },
            ].map((s) => (
              <div key={s.l} className="bg-card p-3">
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                <div className="mt-1 font-mono text-base text-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <Panel title="Allocation">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocation}
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="var(--background)"
                  strokeWidth={2}
                >
                  {allocation.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    fontFamily: "JetBrains Mono",
                    fontSize: 11,
                  }}
                  formatter={(v: number) => `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1 font-mono text-[10px]">
            {allocation.map((a, i) => (
              <div key={a.name} className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2 w-2 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="text-foreground">{a.name}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Token Balances">
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-xs">
            <thead>
              <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-3 font-normal">Asset</th>
                <th className="py-2 pr-3 text-right font-normal">Balance</th>
                <th className="py-2 pr-3 text-right font-normal">Price</th>
                <th className="py-2 pr-3 text-right font-normal">24h</th>
                <th className="py-2 pr-3 text-right font-normal">Value</th>
                <th className="py-2 pr-3 text-right font-normal">Staked</th>
                <th className="py-2 pr-1 text-right font-normal">Action</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((t) => (
                <tr key={t.symbol} className="border-b border-border/60 hover:bg-accent/30">
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-border bg-background text-[10px] text-[var(--cobalt-glow)]">
                        {t.symbol.slice(0, 2)}
                      </div>
                      <div className="leading-tight">
                        <div className="text-foreground">{t.symbol}</div>
                        <div className="text-[10px] text-muted-foreground">{t.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 pr-3 text-right text-foreground">{t.balance.toLocaleString(undefined, { maximumFractionDigits: 4 })}</td>
                  <td className="py-2.5 pr-3 text-right text-muted-foreground">${t.priceUsd.toLocaleString()}</td>
                  <td className={`py-2.5 pr-3 text-right ${t.change24h >= 0 ? "text-[var(--success)]" : "text-[var(--destructive)]"}`}>
                    {t.change24h >= 0 ? "+" : ""}{t.change24h.toFixed(2)}%
                  </td>
                  <td className="py-2.5 pr-3 text-right text-foreground">
                    ${(t.balance * t.priceUsd).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-2.5 pr-3 text-right text-muted-foreground">{t.staked.toLocaleString()}</td>
                  <td className="py-2.5 pr-1 text-right">
                    <Button size="sm" variant="outline" className="h-7 rounded-sm border-border bg-transparent px-2 font-mono text-[10px] uppercase tracking-wider hover:border-[var(--cobalt)]">
                      Stake
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Transaction History">
        <ul className="divide-y divide-border">
          {activity.map((a) => (
            <li key={a.hash} className="flex items-center justify-between py-2.5 font-mono text-xs">
              <div className="flex items-center gap-3">
                <StatusBadge status={a.status} />
                <span className="text-foreground">{a.type}</span>
                <AddressMono value={a.to} />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-foreground">
                  {a.value} <span className="text-muted-foreground">{a.asset}</span>
                </span>
                <a
                  href={explorerUrl(a.hash)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-[var(--cobalt-glow)]"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
