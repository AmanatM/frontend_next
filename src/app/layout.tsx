import type { Metadata, Viewport } from "next"

import { Inter } from "next/font/google"
import "@/styles/globals.css"

import { ThemeProvider } from "@/providers/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { SandpackCSS } from "@/components/sandpack-styles"
import { MenuTopBar } from "@/components/Header/Header"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import Providers from "@/providers/Providers"
import { env } from "process"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Web Coders Lab - Learn web development for free",
  description:
    "Web Coders Lab: The ultimate platform for learning web development. Enhance your skills with interactive tutorials and a hands-on code editor. Master HTML, CSS, JavaScript, React, and more. Join our community of web developers today!",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />

        <SandpackCSS />
      </head>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <MenuTopBar />
            <div className="grow">{children}</div>
            <Toaster
              richColors
              visibleToasts={2}
              toastOptions={{
                style: {
                  bottom: "30px",
                },
              }}
            />
          </ThemeProvider>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
