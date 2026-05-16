"use client"

import { useState, useEffect } from "react"
import { DustEffect } from "@/dump/dust-effect"

export function EffectsWrapper() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Wait for effects to render completely before showing
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 100) // Reduced delay to 100ms for faster fade-in

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-300 ${
        isReady ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <DustEffect />
    </div>
  )
}
