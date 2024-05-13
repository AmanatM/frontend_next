'use client'

import { useEffect, useState } from 'react'

export const useIsMobileAgent = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : ''
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

    setIsMobile(mobileRegex.test(userAgent))
  }, [])

  return isMobile
}
