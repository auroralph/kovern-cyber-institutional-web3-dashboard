import { createFileRoute } from "@tanstack/react-router";
import { Panel, SectionHeader } from "./_app.dashboard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useWallet } from "@/lib/wallet";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — ZK-Shield" }] }),
  component: Settings,
});

const networks = ["Ethereum Mainnet", "Arbitrum One", "Optimism", "Base", "ZK-Shield L2"];

function Settings() {
  const { network, setNetwork } = useWallet();
  return (
    <div className="space-y-6">
      <SectionHeader title="Settings" subtitle="Console preferences & node configuration" />

      <Panel title="Network">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Active network">
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="w-full rounded-sm border border-border bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-[var(--cobalt)] focus:outline-none"
            >
              {networks.map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
          <Field label="Custom RPC endpoint">
            <input
              defaultValue="https://rpc.zk-shield.example/v1"
              className="w-full rounded-sm border border-border bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-[var(--cobalt)] focus:outline-none"
            />
          </Field>
        </div>
      </Panel>

      <Panel title="Appearance">
        <ToggleRow label="Dark mode (locked)" hint="Cyber-Institutional theme is dark by default." defaultChecked disabled />
        <ToggleRow label="Density: Compact" hint="Tighter row heights & monospace numerals." defaultChecked />
        <ToggleRow label="Cryptographic background pattern" hint="Subtle grid + scanline overlay on landing." defaultChecked />
      </Panel>

      <Panel title="Notifications">
        <ToggleRow label="Pending transaction alerts" defaultChecked />
        <ToggleRow label="ZK proof verification status" defaultChecked />
        <ToggleRow label="Governance: new proposals" />
        <ToggleRow label="Validator slashing events" defaultChecked />
      </Panel>

      <Panel title="Danger Zone">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">Revoke all session signatures and disconnect.</div>
          <Button variant="outline" className="h-8 rounded-sm border-[var(--destructive)] bg-transparent font-mono text-[10px] uppercase tracking-wider text-[var(--destructive)] hover:bg-[color-mix(in_oklch,var(--destructive)_15%,transparent)]">
            Revoke Sessions
          </Button>
        </div>
      </Panel>
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

function ToggleRow({ label, hint, defaultChecked, disabled }: { label: string; hint?: string; defaultChecked?: boolean; disabled?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-2.5 last:border-b-0">
      <div>
        <div className="font-mono text-xs text-foreground">{label}</div>
        {hint && <div className="font-mono text-[10px] text-muted-foreground">{hint}</div>}
      </div>
      <Switch defaultChecked={defaultChecked} disabled={disabled} />
    </div>
  );
}
