import { DashboardContainer } from '@/components/dashboard-container'
import { TypographyH3, TypographyMuted } from '@/components/typography'

export default function Profile() {
  return (
    <DashboardContainer className="space-y-8">
      <div className="space-y-0.5">
        <TypographyH3>Profile</TypographyH3>
        <TypographyMuted>Overview page</TypographyMuted>
      </div>
    </DashboardContainer>
  )
}
