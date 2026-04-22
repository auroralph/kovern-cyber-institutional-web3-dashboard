import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { ExternalLink } from "lucide-react";
import { MetricCard } from "@/components/cyber/MetricCard";
import { StatusBadge } from "@/components/cyber/StatusBadge";
import { AddressMono } from "@/components/cyber/AddressMono";
import { genActivity, genGasHeat, genTPS, genTVLSeries, explorerUrl } from "@/lib/mock/data";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — ZK-Shield" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [tvl, setTvl] = useState(() => genTVLSeries());
  const [tps] = useState(() => genTPS());
  const [gas] = useState(() => genGasHeat());
  const [activity] = useState(() => genActivity(10));

  useEffect(() => {
    const id = setInterval(() => {
      setTvl((curr) => {
        const last = curr[curr.length - 1].tvl;
        const next = last + (Math.random() - 0.45) * 30_000_000;
        return [...curr.slice(1), { t: new Date().toLocaleTimeString().slice(0, 5), tvl: Math.round(next) }];
      });
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-6">
      <SectionHeader title="Network Analytics" subtitle="Real-time on-chain telemetry" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Total Value Locked" value="$4.21B" delta={1.84} hint="14 chains aggregated" />
        <MetricCard label="24h Volume" value="$812.4M" delta={-0.62} hint="settled on-chain" />
        <MetricCard label="Active Wallets" value="142,408" delta={2.41} hint="last 24h" />
        <MetricCard label="Throughput" value="1,824" unit="TPS" delta={0.92} hint="rolling 1m" />
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <Panel title="TVL — 48 epochs" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tvl} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="cobaltLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--cobalt-glow)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--cobalt)" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="t" stroke="var(--muted-foreground)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={false} interval={5} />
                <YAxis
                  stroke="var(--muted-foreground)"
                  tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${(v / 1e9).toFixed(2)}B`}
                  width={56}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    fontFamily: "JetBrains Mono",
                    fontSize: 11,
                  }}
                  formatter={(v: number) => [`$${(v / 1e9).toFixed(3)}B`, "TVL"]}
                />
                <Line
                  type="monotone"
                  dataKey="tvl"
                  stroke="var(--cobalt-glow)"
                  strokeWidth={1.5}
                  dot={false}
                  activeDot={{ r: 3, fill: "var(--cobalt-glow)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Throughput (TPS)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tps} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="t" stroke="var(--muted-foreground)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={false} interval={3} />
                <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={false} width={36} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    fontFamily: "JetBrains Mono",
                    fontSize: 11,
                  }}
                />
                <Bar dataKey="tps" fill="var(--cobalt)" radius={[1, 1, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel title="Gas heatstrip — last 48 blocks">
        <div className="flex h-10 items-stretch gap-px overflow-hidden rounded-sm">
          {gas.map((v, i) => (
            <div
              key={i}
              className="flex-1"
              style={{
                background: `color-mix(in oklch, var(--cobalt) ${v}%, var(--background))`,
              }}
              title={`${v} gwei`}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">
          <span>−48</span>
          <span>now</span>
        </div>
      </Panel>

      <Panel title="Recent Activity">
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-xs">
            <thead>
              <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-3 font-normal">Hash</th>
                <th className="py-2 pr-3 font-normal">Type</th>
                <th className="py-2 pr-3 font-normal">From</th>
                <th className="py-2 pr-3 font-normal">To</th>
                <th className="py-2 pr-3 text-right font-normal">Value</th>
                <th className="py-2 pr-3 font-normal">Status</th>
                <th className="py-2 pr-1 text-right font-normal">Block</th>
              </tr>
            </thead>
            <tbody>
              {activity.map((a) => (
                <tr key={a.hash} className="border-b border-border/60 transition-colors hover:bg-accent/30">
                  <td className="py-2 pr-3">
                    <a
                      href={explorerUrl(a.hash)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--cobalt-glow)] hover:underline"
                    >
                      {a.hash.slice(0, 10)}…
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                  <td className="py-2 pr-3 text-foreground">{a.type}</td>
                  <td className="py-2 pr-3"><AddressMono value={a.from} /></td>
                  <td className="py-2 pr-3"><AddressMono value={a.to} /></td>
                  <td className="py-2 pr-3 text-right text-foreground">
                    {a.value} <span className="text-muted-foreground">{a.asset}</span>
                  </td>
                  <td className="py-2 pr-3"><StatusBadge status={a.status} /></td>
                  <td className="py-2 pr-1 text-right text-muted-foreground">{a.blockNumber.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-end justify-between border-b border-border pb-3">
      <div>
        <h1 className="font-mono text-lg uppercase tracking-[0.18em] text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 font-mono text-[11px] text-muted-foreground">{subtitle}</p>}
      </div>
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {new Date().toUTCString().slice(5, 22)} UTC
      </span>
    </div>
  );
}

export function Panel({
  title,
  children,
  className,
  action,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className={`rounded-md border border-border bg-card ${className ?? ""}`}>
      <header className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </h2>
        {action}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}
