import { DashboardContainer } from '@/components/dashboard-container'
import ProgressSimple from '@/components/progress-simple'

import { TypographyH3, TypographyH4, TypographyMuted } from '@/components/typography'

export default async function Home() {
  return (
    <DashboardContainer className="space-y-8">
      <div className="space-y-0.5">
        <TypographyH3>Home</TypographyH3>
        <TypographyMuted>Updated page</TypographyMuted>
      </div>
      <ProgressSimple />
    </DashboardContainer>
  )
}
