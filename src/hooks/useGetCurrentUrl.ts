'use client'
import { usePathname } from 'next/navigation'

export const useGetCurrentUrl = () => {
  const pathname = usePathname()
  const domainUrl = typeof window !== 'undefined' ? window.location.origin : ''

  return `${domainUrl}${pathname}`
}
