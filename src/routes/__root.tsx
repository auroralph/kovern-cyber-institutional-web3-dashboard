import { Outlet, createRootRoute, HeadContent, Link, Scripts } from "@tanstack/react-router";
import { WalletProvider } from "@/lib/wallet";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-mono text-7xl font-bold text-[var(--cobalt-glow)]">404</h1>
        <h2 className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-foreground">
          Route Not Found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The endpoint you requested is not registered on this node.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-sm border border-[var(--cobalt)] bg-[color-mix(in_oklch,var(--cobalt)_15%,transparent)] px-4 py-2 font-mono text-xs uppercase tracking-wider text-[var(--cobalt-glow)] hover:bg-[color-mix(in_oklch,var(--cobalt)_25%,transparent)]"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ZK-Shield — Institutional Web3 Console" },
      {
        name: "description",
        content:
          "Cyber-Institutional Web3 management console. Real-time analytics, ZK compliance, and on-chain governance.",
      },
      { property: "og:title", content: "ZK-Shield — Institutional Web3 Console" },
      {
        property: "og:description",
        content: "Real-time TVL, transaction throughput, ZK proof verification, and governance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "ZK-Shield — Institutional Web3 Console" },
      { name: "description", content: "Kovern: Cyber-Institutional Web3 Dashboard. High-density analytics, ZK-Shield compliance, & Mermaid diagrams for RWA/industrial supply chain provenance." },
      { property: "og:description", content: "Kovern: Cyber-Institutional Web3 Dashboard. High-density analytics, ZK-Shield compliance, & Mermaid diagrams for RWA/industrial supply chain provenance." },
      { name: "twitter:description", content: "Kovern: Cyber-Institutional Web3 Dashboard. High-density analytics, ZK-Shield compliance, & Mermaid diagrams for RWA/industrial supply chain provenance." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9cb85bcd-d140-411b-8aaf-b07338e2451d/id-preview-6228757a--000ef283-f394-4f70-8cc5-c0ead63f40bf.lovable.app-1776851638973.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9cb85bcd-d140-411b-8aaf-b07338e2451d/id-preview-6228757a--000ef283-f394-4f70-8cc5-c0ead63f40bf.lovable.app-1776851638973.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <WalletProvider>
      <Outlet />
    </WalletProvider>
  );
}
