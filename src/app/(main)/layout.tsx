import { MenuTopBar } from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative h-full bg-background">
      <MenuTopBar />

      <div className="flex flex-row pt-14">
        <Sidebar />

        <main id="content" className="grow">
          {children}
        </main>
      </div>
    </div>
  )
}
