import type React from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Optimized image loading helper
export function getImageProps(src: string, width: number, height: number, quality = 90) {
  return {
    src,
    width,
    height,
    quality,
    loading: "lazy" as const,
    style: { objectFit: "contain" as const },
    onLoad: (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.classList.remove("opacity-0")
      e.currentTarget.classList.add("opacity-100")
    },
    className: "transition-opacity duration-300 opacity-0",
  }
}

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for performance optimization
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
