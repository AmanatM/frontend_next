import { DashboardContainer } from '@/components/dashboard-container'
import ProgressSimple from '@/components/progress-simple'

import { TypographyH3, TypographyH4, TypographyMuted } from '@/components/typography'
import { createClientServer } from '@/supabase-utils/supabase-server'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function Home() {
  const supabase = createClientServer()
  const user = (await supabase.auth.getUser()).data.user

  return (
    <DashboardContainer className="space-y-8">
      <div className="space-y-0.5">
        <TypographyH3>{user ? 'Welcome back' : 'Dashboard '}</TypographyH3>
        <TypographyMuted>{user ? user.email : 'Not signed in'}</TypographyMuted>
      </div>
      {user && <ProgressSimple user={user} />}
    </DashboardContainer>
  )
}
