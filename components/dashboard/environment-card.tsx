"use client"

import { Clock3, CloudRain, Droplets, Sun, Thermometer } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { badgeCahaya, badgeHujan, badgeHum, badgeSuhu } from "@/lib/traffic"
import type { BadgeTone, TrafficRecord } from "@/lib/types"

function SensorRow({
  icon,
  iconBg,
  label,
  value,
  badge,
}: {
  icon: React.ReactNode
  iconBg: string
  label: string
  value: string
  badge: { text: string; tone: BadgeTone | "default"; pulse?: boolean }
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-white/[0.02] px-3 py-2.5">
      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${iconBg}`}>{icon}</div>
      <div className="flex-1">
        <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="font-mono text-base text-foreground">{value}</div>
      </div>
      <Badge
        variant={badge.tone === "default" ? "green" : badge.tone}
        className={badge.pulse ? "animate-pulse-ring" : ""}
      >
        {badge.text}
      </Badge>
    </div>
  )
}

export function EnvironmentCard({ current }: { current: TrafficRecord | null }) {
  const suhu = Number(current?.suhu ?? 0)
  const hum = Number(current?.kelembaban ?? 0)
  const hujan = Number(current?.intensitas_hujan ?? 0)
  const cahaya = Number(current?.cahaya ?? 0)

  const [suhuTxt, suhuTone] = badgeSuhu(suhu)
  const [humTxt, humTone] = badgeHum(hum)
  const [hujanTxt, hujanTone] = badgeHujan(hujan)
  const [cahayaTxt, cahayaTone] = badgeCahaya(cahaya)

  const waktuSensor = current?.timestamp?.split(" ")[1] ?? "—"
  const dash = { text: "—", tone: "default" as const }

  return (
    <Card className="before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-primary before:to-transparent before:opacity-40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-muted-foreground before:h-3.5 before:w-[3px] before:rounded before:bg-primary before:content-['']">
          Kondisi Lingkungan
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2.5">
        <SensorRow
          icon={<Thermometer className="h-4 w-4 text-[#f97316]" />}
          iconBg="bg-[rgba(249,115,22,0.15)]"
          label="Suhu Udara"
          value={current ? `${suhu.toFixed(1)}°C` : "—"}
          badge={current ? { text: suhuTxt, tone: suhuTone } : dash}
        />
        <SensorRow
          icon={<Droplets className="h-4 w-4 text-primary" />}
          iconBg="bg-primary/15"
          label="Kelembaban"
          value={current ? `${hum.toFixed(1)}%` : "—"}
          badge={current ? { text: humTxt, tone: humTone } : dash}
        />
        <SensorRow
          icon={<CloudRain className="h-4 w-4 text-[#6366f1]" />}
          iconBg="bg-[rgba(99,102,241,0.15)]"
          label="Intensitas Hujan"
          value={current ? `${hujan.toFixed(0)}%` : "—"}
          badge={current ? { text: hujanTxt, tone: hujanTone } : dash}
        />
        <SensorRow
          icon={<Sun className="h-4 w-4 text-[#eab308]" />}
          iconBg="bg-[rgba(234,179,8,0.15)]"
          label="Intensitas Cahaya"
          value={current ? `${cahaya.toFixed(0)} lux` : "—"}
          badge={current ? { text: cahayaTxt, tone: cahayaTone } : dash}
        />
        <SensorRow
          icon={<Clock3 className="h-4 w-4 text-muted-foreground" />}
          iconBg="bg-[rgba(100,116,139,0.15)]"
          label="Waktu Sensor RTC"
          value={waktuSensor}
          badge={{ text: "AKTIF", tone: "green", pulse: true }}
        />
      </CardContent>
    </Card>
  )
}
