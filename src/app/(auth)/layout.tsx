import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In/Sign Up',
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main id="content" className="!h-[calc(100dvh-3.5rem)]">
      {children}
    </main>
  )
}
