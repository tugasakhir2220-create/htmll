"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { batteryPercent, batteryStatus } from "@/lib/traffic"
import type { BadgeTone, TrafficRecord } from "@/lib/types"

const toneText: Record<BadgeTone, string> = {
  green: "text-green",
  amber: "text-amber",
  red: "text-red",
}

function fillColor(pct: number) {
  if (pct > 70) return "var(--green)"
  if (pct > 30) return "var(--amber)"
  return "var(--red)"
}

export function BatteryCard({ current }: { current: TrafficRecord | null }) {
  const volt = Number(current?.tegangan ?? 0)
  const arus = Number(current?.arus ?? 0)
  const daya = (volt * Math.abs(arus)) / 1000
  const pct = current ? batteryPercent(volt) : 70
  const status = batteryStatus(volt)
  const color = fillColor(pct)
  const charging = arus < 0

  return (
    <Card className="before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-primary before:to-transparent before:opacity-40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-muted-foreground before:h-3.5 before:w-[3px] before:rounded before:bg-primary before:content-['']">
          Status Baterai & Daya
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-6">
          <div className="relative flex h-[90px] w-14 flex-shrink-0 items-end overflow-hidden rounded-md border-2 border-border before:absolute before:-top-2 before:left-1/2 before:h-2 before:w-5 before:-translate-x-1/2 before:rounded-t before:bg-border before:content-['']">
            <div
              className="w-full rounded-b-sm transition-[height] duration-700"
              style={{ height: `${pct.toFixed(0)}%`, background: color }}
            />
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] tracking-wide text-muted-foreground">TEGANGAN</span>
              <span className="font-mono text-lg text-foreground">{current ? `${volt.toFixed(2)} V` : "—"}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] tracking-wide text-muted-foreground">ARUS</span>
              <span className="font-mono text-sm text-foreground">{current ? `${arus.toFixed(1)} mA` : "—"}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] tracking-wide text-muted-foreground">DAYA</span>
              <span className="font-mono text-sm text-foreground">{current ? `${daya.toFixed(2)} W` : "—"}</span>
            </div>
          </div>
        </div>

        <div className="mb-2.5 h-1.5 overflow-hidden rounded bg-white/5">
          <div
            className="h-full rounded transition-[width] duration-700"
            style={{ width: `${pct.toFixed(0)}%`, background: color }}
          />
        </div>

        <div className={`font-mono text-[11px] tracking-wide ${toneText[status.tone]}`}>
          {current ? status.text : "Menunggu data..."}
        </div>

        <div className={`mt-1.5 flex items-center gap-1 text-[11px] ${charging ? "text-green" : "text-amber"}`}>
          {current ? (
            charging ? (
              <>
                <ArrowUp className="h-3 w-3" /> Pengisian dari Panel Surya
              </>
            ) : (
              <>
                <ArrowDown className="h-3 w-3" /> Discharge ke Beban
              </>
            )
          ) : (
            "—"
          )}
        </div>

        <div className="mt-2 text-[10px] text-muted-foreground">
          Sumber: Panel Surya + Baterai 12V via INA219
        </div>
      </CardContent>
    </Card>
  )
}
