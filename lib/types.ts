// Raw data shape stored in Firebase Realtime Database under
// /traffic_care/status_terkini and /traffic_care/histori/{id}
export interface TrafficRecord {
  timestamp?: string
  timestamp_ms?: number
  jumlah_kendaraan?: number
  kendaraan_terdeteksi?: number
  kepadatan_persen?: number
  suhu?: number
  kelembaban?: number
  intensitas_hujan?: number
  cahaya?: number
  tegangan?: number
  arus?: number
  risiko_persen?: number
  prob_rendah?: number
  prob_sedang?: number
  prob_bahaya?: number
}

export type RiskLevel = 1 | 2 | 3

export interface RiskInfo {
  level: RiskLevel
  teks: string
  status: "Rendah" | "Sedang" | "Bahaya"
  batas: number
}

export type BadgeTone = "green" | "amber" | "red"
