"use client"

import { labelRisikoDariPersen, rekomendasiLevel } from "@/lib/traffic"
import type { TrafficRecord } from "@/lib/types"
import { LayerHeading, SummaryCard } from "./shared"
import { RiskGauge } from "./risk-gauge"
import { BatteryCard } from "./battery-card"
import { EnvironmentCard } from "./environment-card"

export function SensorLayer({ current }: { current: TrafficRecord | null }) {
  const risiko = Number(current?.risiko_persen ?? 0)
  const info = labelRisikoDariPersen(risiko)

  return (
    <div>
      <LayerHeading
        eyebrow="Layer 02"
        title="Data Sensor, Baterai, dan Hasil Prediksi"
        desc="Layer ini berisi kondisi lingkungan, status daya sistem, serta hasil prediksi risiko dari data yang masuk."
      />

      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <SummaryCard label="Update Sistem">{current?.timestamp ?? "—"}</SummaryCard>
        <SummaryCard label="Batas Kecepatan">{current ? `${info.batas} KM/J` : "—"}</SummaryCard>
        <SummaryCard label="Rekomendasi Sistem">
          {current ? rekomendasiLevel(info.level) : "Menunggu data..."}
        </SummaryCard>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
        <RiskGauge current={current} />
        <BatteryCard current={current} />
        <EnvironmentCard current={current} />
      </div>
    </div>
  )
}
