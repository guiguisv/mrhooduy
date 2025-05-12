"use client"

import type React from "react"

import Image from "next/image"
import { useCountry } from "./country-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Clients() {
  const { language } = useCountry()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const autoplayTimeRef = useRef<NodeJS.Timeout | null>(null)

  // Autoplay duration in milliseconds - changed to 1.5 seconds
  const autoplayDuration = 1500

  // Detectar tamaño de pantalla para responsive
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  // Updated clients array with the new logos
  const clients = [
    {
      name: "Piso 40 Restaurant",
      logo: "/images/piso40.png",
    },
    {
      name: "Vie",
      logo: "/images/vie.jpeg",
    },
    {
      name: "Tsunami",
      logo: "/images/tsunami.jpeg",
    },
    {
      name: "Antonino Ristorante",
      logo: "/images/antonino.png",
    },
    {
      name: "La Piccolina",
      logo: "/images/piccolina.jpeg",
    },
    {
      name: "Chillout Resto",
      logo: "/images/chillout.png",
    },
    {
      name: "Banco Santander",
      logo: "/images/santander-new.png",
    },
    {
      name: "Shark Club",
      logo: "/images/sharkclub.png",
    },
  ]

  // Updated to show 3 items per slide on mobile
  const getItemsPerSlide = () => {
    if (isMobile) return 3
    if (isTablet) return 3
    return 4 // Desktop
  }

  const itemsPerSlide = getItemsPerSlide()
  const totalSlides = Math.ceil(clients.length / itemsPerSlide)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }, [totalSlides])

  // Handle touch events for swipe
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current

    // If the swipe is significant enough (more than 50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go to next slide
        nextSlide()
      } else {
        // Swipe right, go to previous slide
        prevSlide()
      }
    }
  }

  // Simplified autoplay without progress tracking
  useEffect(() => {
    if (!autoplay) {
      // Clear interval when autoplay is paused
      if (autoplayTimeRef.current) {
        clearTimeout(autoplayTimeRef.current)
      }
      return
    }

    // Clear any existing interval
    if (autoplayTimeRef.current) {
      clearTimeout(autoplayTimeRef.current)
    }

    // Set up slide transition
    autoplayTimeRef.current = setTimeout(() => {
      nextSlide()
    }, autoplayDuration)

    return () => {
      if (autoplayTimeRef.current) {
        clearTimeout(autoplayTimeRef.current)
      }
    }
  }, [autoplay, currentSlide, nextSlide, autoplayDuration])

  // Resetear el slide actual cuando cambia el número de items por slide
  useEffect(() => {
    setCurrentSlide(0)
  }, [itemsPerSlide])

  // Handle autoplay pause/resume
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)
  const handleFocus = () => setAutoplay(false)
  const handleBlur = () => setAutoplay(true)

  // Updated to handle 3 items per slide on mobile
  const getLogoWidth = () => {
    switch (itemsPerSlide) {
      case 3:
        return "w-1/3"
      case 4:
        return "w-1/4"
      default:
        return "w-1/3"
    }
  }

  return (
    <section id="clientes" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          {language === "es" ? "NUESTROS CLIENTES" : "OUR CLIENTS"}
        </motion.h2>

        <motion.div
          className="relative max-w-6xl mx-auto px-6 sm:px-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full flex justify-center gap-2 sm:gap-4 md:gap-6 py-4">
                  {clients.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((client, index) => (
                    <motion.div
                      key={index}
                      className={`flex justify-center ${getLogoWidth()}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="h-16 sm:h-20 md:h-24 w-full max-w-[100px] sm:max-w-[120px] md:max-w-[160px] relative flex items-center justify-center filter grayscale hover:grayscale-0 transition-all duration-300 bg-white/50 p-2 rounded-lg">
                        <Image
                          src={client.logo || "/placeholder.svg"}
                          alt={client.name}
                          fill
                          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
                          style={{ objectFit: "contain" }}
                          className="p-1"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows - made smaller on mobile */}
          <button
            onClick={() => {
              prevSlide()
              setAutoplay(false)
              setTimeout(() => setAutoplay(true), 5000) // Resume autoplay after 5 seconds
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 sm:p-2 shadow-md z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-gray-700" />
          </button>

          <button
            onClick={() => {
              nextSlide()
              setAutoplay(false)
              setTimeout(() => setAutoplay(true), 5000) // Resume autoplay after 5 seconds
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 sm:p-2 shadow-md z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-gray-700" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 sm:mt-8 gap-2 flex-wrap">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  setAutoplay(false)
                  setTimeout(() => setAutoplay(true), 5000) // Resume autoplay after 5 seconds
                }}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? "w-6 bg-[#ccb699]" : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
