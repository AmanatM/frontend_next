import { DashboardContainer } from '@/components/dashboard-container'
import { TypographyH3, TypographyMuted } from '@/components/typography'
import { createClientServer } from '@/supabase-utils/supabase-server'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Profile',
}

export default async function Profile() {
  const supabase = createClientServer()
  const user = (await supabase.auth.getUser()).data.user

  if (!user) redirect('/login')

  return (
    <DashboardContainer className="space-y-8">
      <div className="space-y-0.5">
        <TypographyH3>Profile</TypographyH3>
        {user ? <TypographyMuted>{user.email}</TypographyMuted> : <TypographyMuted>Not logged in</TypographyMuted>}
      </div>
    </DashboardContainer>
  )
}
