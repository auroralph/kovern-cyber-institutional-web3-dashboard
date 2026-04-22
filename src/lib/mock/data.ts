// Mocked Web3 data with deterministic-ish drift simulation.

export type ActivityStatus = "Confirmed" | "Pending" | "Failed";

export type Activity = {
  hash: string;
  type: string;
  from: string;
  to: string;
  value: string;
  asset: string;
  status: ActivityStatus;
  blockNumber: number;
  timestamp: number;
};

export type TokenBalance = {
  symbol: string;
  name: string;
  balance: number;
  priceUsd: number;
  change24h: number;
  staked: number;
};

export type Proposal = {
  id: string;
  title: string;
  description: string;
  status: "Active" | "Passed" | "Rejected" | "Queued";
  for: number;
  against: number;
  abstain: number;
  quorum: number;
  endsIn: string;
};

export type Proof = {
  id: string;
  circuit: string;
  submittedBy: string;
  status: "Verified" | "Pending" | "Rejected";
  txHash: string;
  size: string;
  submittedAt: number;
};

export type Ticker = {
  symbol: string;
  price: number;
  change24h: number;
};

const HEX = "0123456789abcdef";
function hex(n: number, seed = Math.random()) {
  let s = "";
  for (let i = 0; i < n; i++) {
    s += HEX[Math.floor(((seed * (i + 7)) % 1) * 16)];
  }
  return s;
}

export function shortAddr(addr: string) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function mockWalletAddress(): string {
  return "0x" + hex(40, 0.7242);
}

export function genActivity(count = 14): Activity[] {
  const types = ["Transfer", "Swap", "Stake", "Bridge", "Mint", "Vote"];
  const assets = ["ETH", "USDC", "WBTC", "ARB", "OP", "LINK"];
  const statuses: ActivityStatus[] = ["Confirmed", "Confirmed", "Confirmed", "Pending", "Failed"];
  const out: Activity[] = [];
  for (let i = 0; i < count; i++) {
    const seed = (i + 1) / count;
    out.push({
      hash: "0x" + hex(64, seed * 0.91 + 0.03),
      type: types[i % types.length],
      from: "0x" + hex(40, seed * 0.31),
      to: "0x" + hex(40, seed * 0.77),
      value: (Math.random() * 12 + 0.01).toFixed(4),
      asset: assets[i % assets.length],
      status: statuses[i % statuses.length],
      blockNumber: 19_482_103 - i,
      timestamp: Date.now() - i * 1000 * 60 * 3,
    });
  }
  return out;
}

export function genTVLSeries(points = 48) {
  const out: { t: string; tvl: number }[] = [];
  let v = 4_200_000_000;
  for (let i = 0; i < points; i++) {
    v += (Math.random() - 0.45) * 30_000_000;
    out.push({
      t: `${String(i).padStart(2, "0")}:00`,
      tvl: Math.round(v),
    });
  }
  return out;
}

export function genTPS(points = 24) {
  return Array.from({ length: points }, (_, i) => ({
    t: `${i}h`,
    tps: Math.round(800 + Math.random() * 1800),
  }));
}

export function genGasHeat(points = 48) {
  return Array.from({ length: points }, () => 10 + Math.round(Math.random() * 90));
}

export function genTokens(): TokenBalance[] {
  return [
    { symbol: "ETH", name: "Ethereum", balance: 12.4821, priceUsd: 3284.11, change24h: 1.84, staked: 4.0 },
    { symbol: "WBTC", name: "Wrapped BTC", balance: 0.4732, priceUsd: 67214.5, change24h: -0.42, staked: 0 },
    { symbol: "USDC", name: "USD Coin", balance: 28412.55, priceUsd: 1.0, change24h: 0.01, staked: 10000 },
    { symbol: "ARB", name: "Arbitrum", balance: 8421.1, priceUsd: 0.92, change24h: 3.21, staked: 5000 },
    { symbol: "LINK", name: "Chainlink", balance: 642.7, priceUsd: 14.21, change24h: -1.12, staked: 200 },
    { symbol: "OP", name: "Optimism", balance: 1284.0, priceUsd: 1.74, change24h: 2.04, staked: 0 },
  ];
}

export function genProposals(): Proposal[] {
  return [
    {
      id: "ZIP-042",
      title: "Adjust ZK-Shield circuit fee parameter",
      description:
        "Reduce per-proof submission fee from 0.0008 ETH to 0.0005 ETH to encourage privacy-preserving usage.",
      status: "Active",
      for: 612_412,
      against: 188_214,
      abstain: 42_002,
      quorum: 1_000_000,
      endsIn: "2d 14h",
    },
    {
      id: "ZIP-041",
      title: "Onboard new validator set (Cohort B)",
      description: "Add 12 validators meeting institutional KYV tier-2 attestation requirements.",
      status: "Active",
      for: 822_113,
      against: 91_002,
      abstain: 12_400,
      quorum: 1_000_000,
      endsIn: "5d 02h",
    },
    {
      id: "ZIP-040",
      title: "Treasury allocation: audit budget Q2",
      description: "Allocate 1.2M USDC to third-party cryptographic audit of Shield v3.",
      status: "Passed",
      for: 1_412_300,
      against: 122_500,
      abstain: 30_000,
      quorum: 1_000_000,
      endsIn: "Closed",
    },
    {
      id: "ZIP-039",
      title: "Deprecate legacy bridge contract",
      description: "Sunset Bridge v1 in favor of Bridge v2 with native message passing.",
      status: "Rejected",
      for: 240_002,
      against: 901_445,
      abstain: 14_000,
      quorum: 1_000_000,
      endsIn: "Closed",
    },
  ];
}

export function genProofs(): Proof[] {
  const circuits = ["Groth16/Transfer", "PLONK/Membership", "Halo2/Range", "STARK/State"];
  const statuses: Proof["status"][] = ["Verified", "Verified", "Pending", "Verified", "Rejected", "Verified", "Pending"];
  return Array.from({ length: 8 }, (_, i) => ({
    id: `PRF-${(10248 - i).toString(16).toUpperCase()}`,
    circuit: circuits[i % circuits.length],
    submittedBy: "0x" + hex(40, (i + 3) / 17),
    status: statuses[i % statuses.length],
    txHash: "0x" + hex(64, (i + 11) / 23),
    size: `${(8 + Math.random() * 24).toFixed(1)} KB`,
    submittedAt: Date.now() - i * 1000 * 60 * 17,
  }));
}

export const initialTickers: Ticker[] = [
  { symbol: "BTC", price: 67214.5, change24h: -0.42 },
  { symbol: "ETH", price: 3284.11, change24h: 1.84 },
  { symbol: "SOL", price: 168.42, change24h: 3.12 },
  { symbol: "ARB", price: 0.92, change24h: 3.21 },
  { symbol: "OP", price: 1.74, change24h: 2.04 },
  { symbol: "LINK", price: 14.21, change24h: -1.12 },
];

export function driftTicker(t: Ticker): Ticker {
  const delta = (Math.random() - 0.5) * 0.004;
  const price = +(t.price * (1 + delta)).toFixed(t.price > 100 ? 2 : 4);
  return { ...t, price, change24h: +(t.change24h + delta * 100).toFixed(2) };
}

export function explorerUrl(hash: string) {
  return `https://etherscan.io/tx/${hash}`;
}
