"use client"

import { useEffect, useState } from "react"

export function Clock() {
  const [time, setTime] = useState("--:--:--")

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, "0")
      const m = String(now.getMinutes()).padStart(2, "0")
      const s = String(now.getSeconds()).padStart(2, "0")
      setTime(`${h}:${m}:${s} WIB`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <span className="font-mono text-[15px] tracking-widest text-primary">{time}</span>
}
