"use client"
import { Button } from "@/components/ui/button"
import { useCountry } from "./country-provider"
import { MapPin, Phone, Mail, Send, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function ContactSection() {
  const { language, contactInfo } = useCountry()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const formatPhoneForWhatsApp = (phone: string) => {
    return phone.replace(/\+/g, "").replace(/\s/g, "")
  }

  // Update the openWhatsApp function to use the specific URL
  const openWhatsApp = () => {
    if (contactInfo.whatsapp) {
      // Trigger conversion event for WhatsApp
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", { send_to: "AW-16466325038/zBc-CJXvk5QZEK7c4Ks9" })
      }
      window.open("https://web.whatsapp.com/send?l=en&phone=+59892696828", "_blank")
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="contacto" className="py-20 bg-[#222222] text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          {language === "es" ? "CONTACTO" : "CONTACT"}
        </motion.h2>

        <motion.div
          className="max-w-3xl mx-auto"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.div variants={item} className="bg-[#2a2a2a] rounded-xl p-8 mb-10">
            <h3 className="text-2xl font-bold mb-8 border-b border-[#ccb699] pb-2 inline-block">
              {language === "es" ? "Información de Contacto" : "Contact Information"}
            </h3>

            <motion.div
              className="space-y-8"
              variants={container}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              {/* Update the address section with the new address and Google Maps link */}
              <motion.div className="flex items-start" variants={item} whileHover={{ x: 5 }}>
                <MapPin className="h-6 w-6 text-[#ccb699] mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">{language === "es" ? "Dirección" : "Address"}</h4>
                  <a
                    href="https://www.google.com/maps/place/Constituyente+1555,+11200+Montevideo,+Departamento+de+Montevideo,+Uruguay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#ccb699] transition-colors flex items-center"
                  >
                    <span>Constituyente 1555, 11200 Montevideo, Departamento de Montevideo</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              {/* Update the phone section with the new phone number */}
              <motion.div className="flex items-start" variants={item} whileHover={{ x: 5 }}>
                <Phone className="h-6 w-6 text-[#ccb699] mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">{language === "es" ? "Teléfono" : "Phone"}</h4>
                  <a
                    href="tel:+59892696828"
                    className="text-gray-300 hover:text-[#ccb699] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +598 92 696 828
                  </a>
                </div>
              </motion.div>

              {/* Update the email section with the new email address */}
              <motion.div className="flex items-start" variants={item} whileHover={{ x: 5 }}>
                <Mail className="h-6 w-6 text-[#ccb699] mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">{language === "es" ? "Correo Electrónico" : "Email"}</h4>
                  <a
                    href="mailto:ventas@limpiezadecampanas.com.uy"
                    className="text-gray-300 hover:text-[#ccb699] transition-colors"
                  >
                    ventas@limpiezadecampanas.com.uy
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div variants={item} className="text-center" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={openWhatsApp}
              className="bg-black hover:bg-gray-800 text-white font-medium px-8 py-6 text-xl w-full md:w-auto md:min-w-[300px] rounded-lg flex items-center justify-center border border-[#ccb699]"
            >
              {language === "es" ? "SOLICITAR PRESUPUESTO" : "REQUEST A QUOTE"}
              <Send className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
