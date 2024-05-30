import { DashboardContainer } from '@/components/dashboard-container'
import ProgressSimple from '@/components/progress-simple'

import { TypographyH3, TypographyH4, TypographyMuted } from '@/components/typography'
import { Card } from '@/components/ui/card'
import { createClientServer } from '@/supabase-utils/supabase-server'
import { Metadata } from 'next'
import CreateAccountCTA from './_components/CreateAccountCTA'

export const metadata: Metadata = {
  title: 'Web Coders Lab - Learn web development for free',
}

export default async function Home() {
  const supabase = createClientServer()
  const user = (await supabase.auth.getUser()).data.user

  return (
    <DashboardContainer className="space-y-8">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row">
        <div className="space-y-0.5 md:mr-2">
          <TypographyH3>{user ? 'Welcome back' : 'Web Coders Lab'}</TypographyH3>
          <TypographyMuted>{user ? user.email : 'Learn web development for free'}</TypographyMuted>
        </div>
        {!user && <CreateAccountCTA />}
      </div>

      {user && <ProgressSimple user={user} />}
    </DashboardContainer>
  )
}
