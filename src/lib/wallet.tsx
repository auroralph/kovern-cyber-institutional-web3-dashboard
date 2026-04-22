import * as React from "react";
import { mockWalletAddress } from "@/lib/mock/data";

type WalletCtx = {
  address: string | null;
  network: string;
  connect: () => void;
  disconnect: () => void;
  setNetwork: (n: string) => void;
};

const Ctx = React.createContext<WalletCtx | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = React.useState<string | null>(null);
  const [network, setNetwork] = React.useState("Ethereum Mainnet");
  const value = React.useMemo<WalletCtx>(
    () => ({
      address,
      network,
      connect: () => setAddress(mockWalletAddress()),
      disconnect: () => setAddress(null),
      setNetwork,
    }),
    [address, network],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWallet() {
  const v = React.useContext(Ctx);
  if (!v) throw new Error("useWallet must be inside WalletProvider");
  return v;
}
