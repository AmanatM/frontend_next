import type { Metadata, Viewport } from 'next'

import { Inter } from 'next/font/google'
import '@/styles/globals.css'

import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { ReactQueryClientProvider } from '@/providers/query-provider'
import { SandpackCSS } from '@/components/sandpack-styles'
import { MenuTopBar } from '@/components/Header'
import { cn } from '@/lib/utils'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SandpackCSS />
      </head>
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <MenuTopBar />
            <div className="pt-14 min-h-dvh">{children}</div>
            <Toaster />
          </ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}
