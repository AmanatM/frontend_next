import { MenuTopBar } from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { createClient } from '@/utils/supa-server-actions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

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
