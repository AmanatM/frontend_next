import { MenuTopBar } from '@/components/Header'
import { cn } from '@/lib/utils'
import { createClient } from '@/supabase-utils/supabase-server'
import { redirect } from 'next/navigation'

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  return <>{children}</>
}
