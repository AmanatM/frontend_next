import type { Metadata, Viewport } from 'next'

import { Inter } from 'next/font/google'
import '@/styles/globals.css'

import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ReactQueryClientProvider } from '@/providers/query-provider'
import { SandpackCSS } from '@/components/sandpack-styles'
import { MenuTopBar } from '@/components/Header/Header'
import { cn } from '@/lib/utils'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Learn Frontend Interactively',
  description: 'Platform to learn frontend interactively',
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
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />

        <SandpackCSS />
      </Head>
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <MenuTopBar />
            <div className="grow">{children}</div>
            <Toaster richColors visibleToasts={3} />
          </ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}
