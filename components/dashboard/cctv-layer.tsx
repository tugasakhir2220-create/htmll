"use client"

import { useEffect, useState } from "react"
import { MapPin, Video } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TrafficRecord } from "@/lib/types"

// Ganti dengan IP Raspberry Pi 5 kamu, atau set NEXT_PUBLIC_CCTV_STREAM_URL.
const STREAM_URL = process.env.NEXT_PUBLIC_CCTV_STREAM_URL ?? "http://192.168.1.25:5000/video_feed"

type StreamState = "connecting" | "live" | "offline"

export function CctvLayer({ current }: { current: TrafficRecord | null }) {
  const [stream, setStream] = useState<StreamState>("connecting")

  useEffect(() => {
    setStream("connecting")
  }, [])

  const kendaraan = current?.jumlah_kendaraan ?? current?.kendaraan_terdeteksi
  const kepadatan = Number(current?.kepadatan_persen ?? 0)
  const badgeText = stream === "live" ? "● LIVE" : stream === "offline" ? "● OFFLINE" : "● CONNECTING"
  const badgeColor = stream === "offline" ? "bg-red" : stream === "live" ? "bg-red" : "bg-muted"

  return (
    <div>
      <Card className="min-h-[620px] before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-primary before:to-transparent before:opacity-40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-muted-foreground before:h-3.5 before:w-[3px] before:rounded before:bg-primary before:content-['']">
            Live CCTV — Pantauan Lalu Lintas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative flex aspect-[16/9] min-h-[240px] items-center justify-center overflow-hidden rounded-lg border border-border bg-[#050a12] md:aspect-[16/7] md:min-h-[480px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={STREAM_URL || "/placeholder.svg"}
              alt="Live CCTV Traffic Care — Jalan Pantura Karawang"
              className={`h-full w-full object-cover transition-opacity ${
                stream === "live" ? "opacity-100" : "opacity-0"
              }`}
              crossOrigin="anonymous"
              onLoad={() => setStream("live")}
              onError={() => setStream("offline")}
            />

            {stream !== "live" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05),rgba(5,10,18,0.95))] p-4 text-center text-muted-foreground">
                <Video className="h-12 w-12 opacity-35 text-primary" aria-hidden="true" />
                <p className="font-mono text-xs tracking-wide">MENUNGGU STREAM CCTV</p>
                <p className="font-mono text-[10px] opacity-50">
                  Pastikan Raspberry Pi aktif dan URL stream sudah benar
                </p>
              </div>
            )}

            <div
              className={`absolute left-3 top-3 z-10 rounded px-2 py-0.5 font-mono text-[10px] tracking-widest text-white animate-pulse-soft ${badgeColor}`}
            >
              {badgeText}
            </div>

            <div className="absolute right-3 top-3 z-10 rounded-md border border-border bg-black/70 px-2 py-1.5 font-mono text-[10px] tracking-wide text-primary backdrop-blur-sm">
              {stream === "live" ? "Stream Raspberry Pi aktif" : "Menghubungkan stream..."}
            </div>

            <div className="absolute bottom-3 left-3 z-10 rounded-md border border-border bg-black/70 px-3 py-1 font-mono text-[11px] text-primary backdrop-blur-sm">
              Kendaraan Terdeteksi:{" "}
              <span>{kendaraan != null ? `${kendaraan} unit` : `${kepadatan.toFixed(1)}%`}</span>
            </div>
          </div>

          <div className="mt-2.5 flex flex-col items-start justify-between gap-1.5 px-1 md:flex-row md:items-center">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
              <MapPin className="h-3 w-3" aria-hidden="true" /> Jalan Pantura Karawang
            </span>
            <span className="font-mono text-[11px] text-muted-foreground">
              {current?.timestamp ?? "Menunggu data..."}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
