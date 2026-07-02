"use client"

import { Car, CloudRain, Sun, Thermometer } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { labelRisikoDariPersen, riskColor } from "@/lib/traffic"
import type { TrafficRecord } from "@/lib/types"

const badgeVariant = { 1: "green", 2: "amber", 3: "red" } as const

function computeProbabilities(data: TrafficRecord) {
  const risiko = Number(data.risiko_persen ?? 0)
  let rendah = Number(data.prob_rendah ?? 0)
  let sedang = Number(data.prob_sedang ?? 0)
  let bahaya = Number(data.prob_bahaya ?? 0)

  const kosong =
    data.prob_rendah === undefined && data.prob_sedang === undefined && data.prob_bahaya === undefined

  if (kosong) {
    if (risiko >= 70) [rendah, sedang, bahaya] = [0, 0, risiko]
    else if (risiko >= 40) [rendah, sedang, bahaya] = [0, risiko, 0]
    else [rendah, sedang, bahaya] = [risiko, 0, 0]
  }
  return { rendah, sedang, bahaya }
}

function ProbBar({
  label,
  value,
  color,
  active,
  activeClass,
}: {
  label: string
  value: number
  color: string
  active: boolean
  activeClass: string
}) {
  return (
    <div
      className={`rounded-[10px] border border-border bg-white/[0.03] px-3 py-2.5 transition-shadow ${
        active ? activeClass : ""
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-head text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
        <strong className="font-mono text-sm text-foreground">{value.toFixed(1)}%</strong>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%`, background: color }}
        />
      </div>
    </div>
  )
}

function Faktor({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-lg border border-border bg-white/[0.03] px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="font-mono text-base text-primary">{value}</div>
    </div>
  )
}

export function RiskGauge({ current }: { current: TrafficRecord | null }) {
  const risiko = Number(current?.risiko_persen ?? 0)
  const info = labelRisikoDariPersen(risiko)
  const deg = (Math.min(Math.max(risiko, 0), 100) / 100) * 360
  const col = riskColor[info.level]
  const { rendah, sedang, bahaya } = current ? computeProbabilities(current) : { rendah: 0, sedang: 0, bahaya: 0 }
  const max = Math.max(rendah, sedang, bahaya)

  const kepadatan = Number(current?.kepadatan_persen ?? 0)

  return (
    <Card className="row-span-2 before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-primary before:to-transparent before:opacity-40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-muted-foreground before:h-3.5 before:w-[3px] before:rounded before:bg-primary before:content-['']">
          Prediksi Risiko Kecelakaan
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div
          className="relative flex h-[170px] w-[170px] items-center justify-center rounded-full transition-[background] duration-700"
          style={{ background: `conic-gradient(${col} ${deg}deg, #1e293b ${deg}deg)` }}
        >
          <div className="flex h-[130px] w-[130px] flex-col items-center justify-center gap-0.5 rounded-full bg-card">
            <div className="font-mono text-[32px] font-bold" style={{ color: col }}>
              {current ? `${risiko.toFixed(0)}%` : "—%"}
            </div>
            <div className="text-[10px] tracking-wide text-muted-foreground">RISIKO</div>
          </div>
        </div>

        <Badge variant={badgeVariant[info.level]} className="px-4 py-1.5 font-head text-[13px] font-bold">
          {current ? info.teks : "Menunggu data..."}
        </Badge>

        <div className="grid w-full grid-cols-1 gap-2">
          <ProbBar
            label="Rendah"
            value={rendah}
            color="var(--green)"
            active={max === rendah && max > 0}
            activeClass="border-green/70 shadow-[0_0_20px_rgba(34,197,94,0.08)]"
          />
          <ProbBar
            label="Sedang"
            value={sedang}
            color="var(--amber)"
            active={max === sedang && max > 0}
            activeClass="border-amber/70 shadow-[0_0_20px_rgba(245,158,11,0.08)]"
          />
          <ProbBar
            label="Bahaya"
            value={bahaya}
            color="var(--red)"
            active={max === bahaya && max > 0}
            activeClass="border-red/70 shadow-[0_0_20px_rgba(239,68,68,0.08)]"
          />
        </div>

        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
          <Faktor
            icon={<Car className="h-3 w-3" />}
            label="Kepadatan"
            value={current ? `${kepadatan.toFixed(0)}%` : "—"}
          />
          <Faktor
            icon={<CloudRain className="h-3 w-3" />}
            label="Hujan"
            value={current ? `${Number(current.intensitas_hujan ?? 0).toFixed(0)}%` : "—"}
          />
          <Faktor
            icon={<Thermometer className="h-3 w-3" />}
            label="Suhu"
            value={current ? `${Number(current.suhu ?? 0).toFixed(1)}°C` : "—"}
          />
          <Faktor
            icon={<Sun className="h-3 w-3" />}
            label="Cahaya"
            value={current ? `${Number(current.cahaya ?? 0).toFixed(0)} lx` : "—"}
          />
        </div>

        <div className="mt-1 font-mono text-[10px] text-muted-foreground">
          Diperbarui: {current?.timestamp ?? "—"}
        </div>
      </CardContent>
    </Card>
  )
}
