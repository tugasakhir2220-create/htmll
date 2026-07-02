"use client"

import { useEffect, useRef, useState } from "react"
import { ref, onValue, query as dbQuery, limitToLast } from "firebase/database"
import { db } from "@/lib/firebase"
import type { TrafficRecord } from "@/lib/types"

const MAX_HISTORY_ROWS = 100

export interface TrafficState {
  current: TrafficRecord | null
  history: TrafficRecord[]
  connected: boolean
}

export function useTrafficData(): TrafficState {
  const [current, setCurrent] = useState<TrafficRecord | null>(null)
  const [history, setHistory] = useState<TrafficRecord[]>([])
  const [connected, setConnected] = useState(false)

  // Whether Firebase /histori path is providing data. If not, we build a
  // temporary local history from status_terkini snapshots.
  const historiFromFirebase = useRef(false)
  const localHistory = useRef<TrafficRecord[]>([])

  useEffect(() => {
    // ── Live status ────────────────────────────────────────
    const statusRef = ref(db, "/traffic_care/status_terkini")
    const unsubStatus = onValue(statusRef, (snapshot) => {
      const data = snapshot.val() as TrafficRecord | null
      if (!data) return

      setCurrent(data)
      setConnected(true)

      if (!historiFromFirebase.current) {
        localHistory.current = [data, ...localHistory.current].slice(0, MAX_HISTORY_ROWS)
        setHistory([...localHistory.current])
      }
    })

    // ── History path ───────────────────────────────────────
    const historiRef = dbQuery(ref(db, "/traffic_care/histori"), limitToLast(MAX_HISTORY_ROWS))
    const unsubHistori = onValue(historiRef, (snapshot) => {
      const data = snapshot.val() as Record<string, TrafficRecord> | null
      if (!data) return

      historiFromFirebase.current = true

      const list = Object.values(data)
        .filter(Boolean)
        .sort((a, b) => {
          const aTime = Number(a.timestamp_ms ?? 0)
          const bTime = Number(b.timestamp_ms ?? 0)
          if (aTime || bTime) return bTime - aTime
          return String(b.timestamp ?? "").localeCompare(String(a.timestamp ?? ""))
        })
        .slice(0, MAX_HISTORY_ROWS)

      setHistory(list)
    })

    return () => {
      unsubStatus()
      unsubHistori()
    }
  }, [])

  return { current, history, connected }
}
