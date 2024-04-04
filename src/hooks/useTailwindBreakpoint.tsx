'use client'
import { useState, useEffect } from 'react'
// pages/index.js

export const useTailwindBreakpoint = () => {
  // Define your Tailwind breakpoints
  const breakpoints = {
    sm: 640, // Tailwind's default sm breakpoint
    md: 768, // Tailwind's default md breakpoint
    lg: 1024, // Tailwind's default lg breakpoint
    xl: 1280, // Tailwind's default xl breakpoint
    '2xl': 1536, // Tailwind's default 2xl breakpoint
  }

  const getBreakpoint = (width: number) => {
    if (width < breakpoints.sm) return { width: width, tailwindName: 'xs' } // Extra small (below Tailwind's sm)
    if (width >= breakpoints.sm && width < breakpoints.md) return { width: width, tailwindName: 'sm' }
    if (width >= breakpoints.md && width < breakpoints.lg) return { width: width, tailwindName: 'md' }
    if (width >= breakpoints.lg && width < breakpoints.xl) return { width: width, tailwindName: 'lg' }
    if (width >= breakpoints.xl && width < breakpoints['2xl']) return { width: width, tailwindName: 'xl' }
    return { width: width, tailwindName: '2xl' }
  }

  const [breakpoint, setBreakpoint] = useState({ width: 0, tailwindName: 'xs' })

  useEffect(() => {
    // Ensure this runs only in the browser
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setBreakpoint(getBreakpoint(window.innerWidth))
      }

      // Set initial value once in the client
      handleResize()

      window.addEventListener('resize', handleResize)
      // Cleanup the event listener on component unmount
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const isMobileBreakpoint = !(breakpoint.width > breakpoints.md)

  return { breakpoint, isMobileBreakpoint }
}
