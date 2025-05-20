import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { CountryProvider } from "@/components/country-provider"
import { ClientWrapper } from "@/components/client-wrapper"

// Dynamically import components that are below the fold
const WhyChooseUs = dynamic(() => import("@/components/why-choose-us").then((mod) => ({ default: mod.WhyChooseUs })), {
  ssr: true,
})
const HowWeDoIt = dynamic(() => import("@/components/how-we-do-it").then((mod) => ({ default: mod.HowWeDoIt })), {
  ssr: true,
})
const Clients = dynamic(() => import("@/components/clients").then((mod) => ({ default: mod.Clients })), { ssr: true })
const Franchise = dynamic(() => import("@/components/franchise").then((mod) => ({ default: mod.Franchise })), {
  ssr: true,
})
const ContactSection = dynamic(
  () => import("@/components/contact-section").then((mod) => ({ default: mod.ContactSection })),
  { ssr: true },
)
const Footer = dynamic(() => import("@/components/footer").then((mod) => ({ default: mod.Footer })), { ssr: true })

export default function Home() {
  return (
    <CountryProvider>
      <ClientWrapper>
        <Header />
        <main>
          <Hero />
          <Stats />
          <WhyChooseUs />
          <HowWeDoIt />
          <Clients />
          <Franchise />
          <ContactSection />
        </main>
        <Footer />
      </ClientWrapper>
    </CountryProvider>
  )
}
