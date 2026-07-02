"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTrafficData } from "@/hooks/use-traffic-data"
import { Navbar } from "./navbar"
import { LayerHeading } from "./shared"
import { CctvLayer } from "./cctv-layer"
import { SensorLayer } from "./sensor-layer"
import { HistoryLayer } from "./history-layer"

const TABS = [
  { value: "cctv", no: "01", text: "Live CCTV" },
  { value: "sensor", no: "02", text: "Data Sensor & Prediksi" },
  { value: "histori", no: "03", text: "Histori Lalu Lintas" },
]

export function Dashboard() {
  const { current, history } = useTrafficData()

  return (
    <>
      <Navbar />

      <Tabs defaultValue="cctv" className="w-full">
        <header className="mx-auto mt-4 w-[min(1400px,calc(100%-48px))]">
          <TabsList aria-label="Navigasi layer dashboard">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                <span className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[10px] border border-primary/20 bg-primary/10 font-mono text-xs">
                  {tab.no}
                </span>
                <span className="whitespace-nowrap text-[13px] font-bold">{tab.text}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </header>

        <main className="mx-auto max-w-[1400px] px-4 pb-7 pt-2 md:px-6">
          <TabsContent value="cctv">
            <LayerHeading
              eyebrow="Layer 01"
              title="Pantauan CCTV Realtime"
              desc="Tampilan utama untuk memantau kondisi lalu lintas secara langsung dari kamera Raspberry Pi 5."
            />
            <CctvLayer current={current} />
          </TabsContent>

          <TabsContent value="sensor">
            <SensorLayer current={current} />
          </TabsContent>

          <TabsContent value="histori">
            <HistoryLayer history={history} />
          </TabsContent>
        </main>
      </Tabs>
    </>
  )
}
