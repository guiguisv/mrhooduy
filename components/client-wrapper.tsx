"use client"

import dynamic from "next/dynamic"
import type { ReactNode } from "react"

// Dynamically import components that need ssr: false
const ScrollToTop = dynamic(() => import("@/components/scroll-to-top").then((mod) => ({ default: mod.ScrollToTop })), {
  ssr: false,
})
const WhatsAppButton = dynamic(
  () => import("@/components/whatsapp-button").then((mod) => ({ default: mod.WhatsAppButton })),
  { ssr: false },
)

export function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  )
}
