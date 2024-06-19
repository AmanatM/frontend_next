import Sidebar from '@/components/Sidebar'
import { createClientServer } from '@/supabase-utils/supabase-server'

export default async function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = createClientServer()
  const user = (await supabase.auth.getUser()).data.user

  return (
    <>
      <div className="flex flex-row">
        <Sidebar user={user} />

        <main id="content" className="grow">
          {children}
        </main>
      </div>
    </>
  )
}
