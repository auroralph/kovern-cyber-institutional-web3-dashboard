
# Cyber-Institutional Web3 Dashboard

A high-end, dark-mode Web3 management platform with a "Cyber-Institutional" aesthetic — Deep Charcoal (#121212), Electric Cobalt, and Slate Gray. All data is mocked/simulated (no real wallet connection or chain RPC) so the UI is fully interactive out of the box.

## Design Language

- **Palette:** Deep Charcoal background `#121212`, Electric Cobalt accent (~oklch electric blue), Slate Gray surfaces and text tiers, success/warn/fail tokens for status badges.
- **Typography:** Geometric sans for UI, monospace for hashes, addresses, and numerical readouts.
- **Surfaces:** Subtle 1px slate borders, faint grid/scanline background pattern, restrained glow on active accents. No gradients-as-decoration, no rounded "playful" shapes — tight 4–8px radii.
- **Density:** Tabular layouts, mono numerals, fine dividers, compact toolbars. Recharts styled with cobalt strokes and slate gridlines.

## Routes & Layout

Persistent **collapsible sidebar** (shadcn `Sidebar`, `collapsible="icon"`) + top bar with truncated wallet address, network pill, and a live crypto ticker strip.

- `/` — **Landing & Connect**: hero, "Connect Wallet" CTA (simulated), live ticker (BTC/ETH/SOL mocked with drift), feature strip.
- `/dashboard` — **Analytics**: KPI cards (TVL, 24h Volume, Active Wallets, TPS), TVL line chart, TPS bar chart, gas heatstrip, Recent Activity table with Pending/Confirmed/Failed badges + explorer links.
- `/portfolio` — **Asset Management**: token balance table, stake/unstake dialog (mock), allocation donut, transaction history with explorer links.
- `/compliance` — **ZK-Shield**: proof verification status list (Verified/Pending/Rejected), compliance log feed, proof submission panel (mock).
- `/governance` — proposal list with vote tallies, For/Against/Abstain voting controls, quorum progress.
- `/settings` — network selector, RPC endpoint, theme lock (dark default), notification toggles.
- `/architecture` — **Technical Documentation** page rendering all three diagrams.

## Technical Diagrams (in-app)

Rendered with **Mermaid.js** (client-side) inside styled cards on `/architecture`, also surfaced as a tab on `/compliance` for the ZK flow:

1. **ERD** — Users (wallet address PK) ⇄ Transactions ⇄ Assets, with Compliance Logs linked to both Users and Transactions.
2. **Use Case Diagram** — Actors: User, Smart Contract, ZK-Validator. Use cases: Connect, Sign Tx, Submit Proof, Verify Proof, Finalize.
3. **System Flowchart** — Wallet Connect → Tx Initiation → ZK-Shield Privacy Processing → Validator Attestation → Blockchain Finality, with failure branches.

Mermaid theme overridden to match the cobalt/charcoal palette.

## Key Components

- `AppSidebar` (Dashboard, Portfolio, Compliance, Governance, Settings, Architecture)
- `TopBar` with wallet pill, network selector, ticker
- `MetricCard`, `StatusBadge`, `AddressMono`, `HashLink`
- `TVLChart`, `TPSChart`, `AllocationChart` (Recharts, cobalt-themed)
- `ActivityTable`, `ProposalCard`, `ProofRow`
- `MermaidDiagram` wrapper (lazy init, dark theme config)
- Cryptographic background pattern (SVG grid + faint hex/scanline overlay)

## Data

All mocked in `src/lib/mock/*.ts` with light random drift on a timer to simulate realtime (TVL line appends, ticker updates, TPS bars cycle). Wallet "connection" is local state — clicking Connect produces a deterministic mock 0x address.

## Out of Scope (this pass)

- Real Wagmi/RainbowKit chain integration, real RPC calls, real ZK verification.
- Auth/persistence (no Lovable Cloud needed yet).

These can be layered in later without restructuring the UI.
