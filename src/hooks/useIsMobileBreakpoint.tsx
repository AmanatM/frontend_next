'use client'
import { useEffect, useState } from 'react'

export const useIsMobileBreakpoint = () => {
  const [isMobileBreakpoint, setIsMobileBreakpoint] = useState(false)

  useEffect(() => {
    const updateWindowSize = () => {
      const width = window.innerWidth
      setIsMobileBreakpoint(width <= 768)
    }

    updateWindowSize()
    window.addEventListener('resize', updateWindowSize)

    return () => window.removeEventListener('resize', updateWindowSize)
  }, [])

  return isMobileBreakpoint
}
