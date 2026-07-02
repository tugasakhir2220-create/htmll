import type { BadgeTone, RiskInfo } from "./types"

// ── Risk label based on percentage ─────────────────────────
export function labelRisikoDariPersen(persen: number | undefined | null): RiskInfo {
  const nilai = Number(persen ?? 0)

  if (nilai >= 70) {
    return { level: 3, teks: "BAHAYA — MAX 20 KM/J", status: "Bahaya", batas: 20 }
  }
  if (nilai >= 40) {
    return { level: 2, teks: "SEDANG / WASPADA — MAX 40 KM/J", status: "Sedang", batas: 40 }
  }
  return { level: 1, teks: "RENDAH / AMAN — MAX 60 KM/J", status: "Rendah", batas: 60 }
}

export function rekomendasiLevel(level: number): string {
  if (level === 3) return "Bahaya, kurangi kecepatan dan beri peringatan pengguna jalan."
  if (level === 2) return "Sedang, pantau kepadatan dan kondisi lingkungan."
  return "Rendah, sistem berjalan normal."
}

// ── Sensor status badges ───────────────────────────────────
export function badgeSuhu(s: number): [string, BadgeTone] {
  if (s > 36) return ["PANAS EKSTREM", "red"]
  if (s > 33) return ["PANAS", "amber"]
  return ["NORMAL", "green"]
}

export function badgeHum(h: number): [string, BadgeTone] {
  if (h > 85) return ["LEMBAB", "amber"]
  if (h < 40) return ["KERING", "amber"]
  return ["NORMAL", "green"]
}

export function badgeHujan(i: number): [string, BadgeTone] {
  if (i >= 75) return ["LEBAT", "red"]
  if (i >= 45) return ["SEDANG", "amber"]
  if (i >= 15) return ["RINGAN", "amber"]
  return ["KERING", "green"]
}

export function badgeCahaya(l: number): [string, BadgeTone] {
  if (l >= 10000) return ["SIANG TERIK", "green"]
  if (l >= 1000) return ["SIANG NORMAL", "green"]
  if (l >= 200) return ["MENDUNG", "amber"]
  return ["GELAP", "red"]
}

// ── Battery derived state ──────────────────────────────────
export function batteryPercent(volt: number): number {
  return Math.min(Math.max(((volt - 10.5) / (12.6 - 10.5)) * 100, 0), 100)
}

export function batteryStatus(volt: number): { text: string; tone: BadgeTone } {
  if (volt >= 12.5) return { text: "PENUH — Sistem Optimal", tone: "green" }
  if (volt >= 11.5) return { text: "NORMAL — Operasi Normal", tone: "green" }
  if (volt >= 10.5) return { text: "RENDAH — Periksa Panel Surya!", tone: "amber" }
  return { text: "KRITIS — Sistem Berisiko Mati!", tone: "red" }
}

// ── Format helpers ─────────────────────────────────────────
export function formatWaktu(timestamp?: string): string {
  if (!timestamp) return "-"
  const parts = String(timestamp).split(" ")
  return parts.length > 1 ? parts[1] : timestamp
}

export const riskColor: Record<number, string> = {
  1: "var(--green)",
  2: "var(--amber)",
  3: "var(--red)",
}

export const toneClass: Record<BadgeTone, string> = {
  green: "bg-green/15 text-green",
  amber: "bg-amber/15 text-amber",
  red: "bg-red/15 text-red",
}
