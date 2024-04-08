import { DashboardContainer } from '@/components/dashboard-container'
import { TypographyH3, TypographyMuted } from '@/components/typography'
import { createClientServer } from '@/supabase-utils/supabase-server'

export default async function Profile() {
  const supabase = createClientServer()
  const user = (await supabase.auth.getUser()).data.user

  return (
    <DashboardContainer className="space-y-8">
      <div className="space-y-0.5">
        <TypographyH3>Profile</TypographyH3>
        {user ? <TypographyMuted>{user.email}</TypographyMuted> : <TypographyMuted>Not logged in</TypographyMuted>}
      </div>
    </DashboardContainer>
  )
}
