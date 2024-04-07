import Sidebar from '@/components/Sidebar'

export default async function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />

        <main id="content" className="grow">
          {children}
        </main>
      </div>
    </>
  )
}
