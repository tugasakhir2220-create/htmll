import type { Metadata, Viewport } from "next"
import { Inter, Rajdhani, Share_Tech_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
})

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
})

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-share-tech",
})

export const metadata: Metadata = {
  title: "TRAFFIC CARE — Dashboard Monitoring",
  description:
    "Dashboard monitoring lalu lintas realtime: Live CCTV, data sensor & prediksi risiko kecelakaan, serta histori kepadatan kendaraan di Jalan Pantura Karawang.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#0a0f1e",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${rajdhani.variable} ${shareTechMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
