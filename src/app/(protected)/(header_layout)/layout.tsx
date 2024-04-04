import { MenuTopBar } from '@/components/Header'
import { cn } from '@/lib/utils'

export default async function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative bg-background">
      <MenuTopBar />

      <div className={cn('pt-14 ', false ? '' : 'h-dvh')}>{children}</div>
    </div>
  )
}
