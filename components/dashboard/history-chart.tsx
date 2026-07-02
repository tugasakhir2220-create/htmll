"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatWaktu } from "@/lib/traffic"
import type { TrafficRecord } from "@/lib/types"

interface Point {
  waktu: string
  kepadatan: number
  risiko: number
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 font-mono text-xs shadow-lg">
      <div className="mb-1 text-muted-foreground">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2" style={{ color: p.color }}>
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: p.color }} />
          {p.name}: {Number(p.value).toFixed(1)}%
        </div>
      ))}
    </div>
  )
}

export function HistoryChart({ history }: { history: TrafficRecord[] }) {
  // Oldest -> newest, keep the most recent 30 points for readability.
  const data: Point[] = [...history]
    .reverse()
    .slice(-30)
    .map((d) => ({
      waktu: formatWaktu(d.timestamp),
      kepadatan: Number(d.kepadatan_persen ?? 0),
      risiko: Number(d.risiko_persen ?? 0),
    }))

  return (
    <Card className="before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-primary before:to-transparent before:opacity-40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-muted-foreground before:h-3.5 before:w-[3px] before:rounded before:bg-primary before:content-['']">
          Tren Kepadatan & Risiko
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[280px] items-center justify-center font-mono text-xs text-muted-foreground">
            Menunggu data dari sistem...
          </div>
        ) : (
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillKepadatan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--blue)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--blue)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fillRisiko" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--red)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--red)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis
                  dataKey="waktu"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "var(--font-mono)" }}
                  tickLine={false}
                  axisLine={{ stroke: "var(--border)" }}
                  minTickGap={24}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "var(--font-mono)" }}
                  tickLine={false}
                  axisLine={false}
                  unit="%"
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="kepadatan"
                  name="Kepadatan"
                  stroke="var(--blue)"
                  strokeWidth={2}
                  fill="url(#fillKepadatan)"
                />
                <Area
                  type="monotone"
                  dataKey="risiko"
                  name="Risiko"
                  stroke="var(--red)"
                  strokeWidth={2}
                  fill="url(#fillRisiko)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="mt-3 flex items-center gap-5 font-mono text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-blue" /> Kepadatan
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-red" /> Risiko
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
