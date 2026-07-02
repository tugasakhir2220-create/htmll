import type { ReactNode } from "react"

export function LayerHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string
  title: string
  desc: string
}) {
  return (
    <div className="mb-4 flex flex-col items-start justify-between gap-2 md:flex-row md:items-end md:gap-6">
      <div>
        <p className="mb-1 font-mono text-[11px] uppercase tracking-[2px] text-primary">{eyebrow}</p>
        <h1 className="font-head text-[clamp(24px,3vw,36px)] font-bold leading-none tracking-wide text-balance">
          {title}
        </h1>
      </div>
      <p className="max-w-[470px] text-sm leading-relaxed text-muted-foreground text-pretty">{desc}</p>
    </div>
  )
}

export function SummaryCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-h-[78px] flex-col justify-center gap-1.5 rounded-xl border border-border bg-card/70 p-4">
      <span className="font-head text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <strong className="font-mono text-[15px] font-semibold leading-tight text-foreground">{children}</strong>
    </div>
  )
}
