import { useEffect, useRef, useState } from "react";

let initialized = false;

async function ensureMermaid() {
  const mod = await import("mermaid");
  const mermaid = mod.default;
  if (!initialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "strict",
      fontFamily: "JetBrains Mono, ui-monospace, monospace",
      themeVariables: {
        background: "#1a1d24",
        primaryColor: "#1f2430",
        primaryTextColor: "#e6e9ef",
        primaryBorderColor: "#3b82f6",
        lineColor: "#5b6478",
        secondaryColor: "#262b36",
        tertiaryColor: "#1a1d24",
        nodeBorder: "#3b82f6",
        clusterBkg: "#1a1d24",
        clusterBorder: "#3b82f6",
        edgeLabelBackground: "#1a1d24",
        textColor: "#e6e9ef",
        mainBkg: "#1f2430",
        actorBkg: "#1f2430",
        actorBorder: "#3b82f6",
        actorTextColor: "#e6e9ef",
        signalColor: "#9aa3b2",
        signalTextColor: "#e6e9ef",
      },
    });
    initialized = true;
  }
  return mermaid;
}

let counter = 0;

export function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = await ensureMermaid();
        const id = `mmd-${++counter}-${Date.now()}`;
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <pre className="overflow-auto rounded-md border border-destructive/40 bg-destructive/10 p-3 font-mono text-xs text-destructive">
        {error}
      </pre>
    );
  }
  return <div ref={ref} className="mermaid-container w-full overflow-auto [&_svg]:h-auto [&_svg]:max-w-full" />;
}
