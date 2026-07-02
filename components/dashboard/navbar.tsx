import { MapPin, TrafficCone } from "lucide-react"
import { Clock } from "./clock"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex flex-col items-start gap-3 border-b border-border bg-card/95 px-4 py-3.5 backdrop-blur-md md:h-[60px] md:flex-row md:items-center md:justify-between md:gap-4 md:px-7 md:py-0">
      <div className="flex items-center gap-2.5 font-head text-xl font-bold tracking-[2px] text-primary">
        <TrafficCone className="h-5 w-5" aria-hidden="true" />
        <span>
          TRAFFIC<span className="text-foreground">CARE</span>
        </span>
      </div>

      <div className="flex items-center gap-1.5 font-mono text-xs tracking-wide text-muted-foreground md:text-center">
        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
        JALAN PANTURA KARAWANG
      </div>

      <div className="flex items-center gap-3.5">
        <span className="h-2 w-2 rounded-full bg-green animate-pulse-ring" aria-hidden="true" />
        <Clock />
      </div>
    </nav>
  )
}
