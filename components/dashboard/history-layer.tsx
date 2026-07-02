"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatWaktu, labelRisikoDariPersen } from "@/lib/traffic"
import type { RiskLevel, TrafficRecord } from "@/lib/types"
import { LayerHeading, SummaryCard } from "./shared"
import { HistoryChart } from "./history-chart"

const chipVariant: Record<RiskLevel, "green" | "amber" | "red"> = { 1: "green", 2: "amber", 3: "red" }

export function HistoryLayer({ history }: { history: TrafficRecord[] }) {
  const latest = history[0]
  const latestInfo = latest ? labelRisikoDariPersen(latest.risiko_persen) : null

  return (
    <div>
      <LayerHeading
        eyebrow="Layer 03"
        title="Riwayat Data Kepadatan Kendaraan"
        desc="Menampilkan histori data lalu lintas yang diterima dashboard secara realtime."
      />

      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <SummaryCard label="Jumlah Data Ditampilkan">{history.length}</SummaryCard>
        <SummaryCard label="Kepadatan Terakhir">
          {latest ? `${Number(latest.kepadatan_persen ?? 0).toFixed(1)}%` : "—"}
        </SummaryCard>
        <SummaryCard label="Status Terakhir">{latestInfo?.status ?? "—"}</SummaryCard>
      </div>

      <div className="mb-4">
        <HistoryChart history={history} />
      </div>

      <Card className="before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-primary before:to-transparent before:opacity-40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-muted-foreground before:h-3.5 before:w-[3px] before:rounded before:bg-primary before:content-['']">
            Riwayat Data Lalu Lintas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Waktu</TableHead>
                <TableHead>Kendaraan</TableHead>
                <TableHead>Kepadatan</TableHead>
                <TableHead>Suhu</TableHead>
                <TableHead>Hujan</TableHead>
                <TableHead>Cahaya</TableHead>
                <TableHead>Risiko</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Batas Kecepatan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="py-6 text-center text-muted-foreground">
                    Menunggu data dari sistem...
                  </TableCell>
                </TableRow>
              ) : (
                history.map((d, i) => {
                  const info = labelRisikoDariPersen(d.risiko_persen)
                  const kendaraan = d.jumlah_kendaraan ?? d.kendaraan_terdeteksi ?? "-"
                  return (
                    <TableRow key={`${d.timestamp_ms ?? d.timestamp ?? "row"}-${i}`}>
                      <TableCell>{formatWaktu(d.timestamp)}</TableCell>
                      <TableCell>{kendaraan}</TableCell>
                      <TableCell>{Number(d.kepadatan_persen ?? 0).toFixed(1)}%</TableCell>
                      <TableCell>{Number(d.suhu ?? 0).toFixed(1)}°C</TableCell>
                      <TableCell>{Number(d.intensitas_hujan ?? 0).toFixed(0)}%</TableCell>
                      <TableCell>{Number(d.cahaya ?? 0).toFixed(0)} lx</TableCell>
                      <TableCell>{Number(d.risiko_persen ?? 0).toFixed(1)}%</TableCell>
                      <TableCell>
                        <Badge variant={chipVariant[info.level]}>{info.status}</Badge>
                      </TableCell>
                      <TableCell>{info.batas} KM/J</TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
