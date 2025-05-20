"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full border border-[#ccb699] flex items-center justify-center">
        <span className="sr-only">Toggle theme</span>
      </div>
    )
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full border border-[#ccb699] flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4 text-[#ccb699]" /> : <Moon className="h-4 w-4 text-[#ccb699]" />}
    </motion.button>
  )
}
