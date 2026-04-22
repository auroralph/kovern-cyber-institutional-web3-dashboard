export function CryptoBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-40" />
      <div className="absolute inset-0 cyber-scanlines opacity-50" />
      <div
        className="absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklch, var(--cobalt) 45%, transparent) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
