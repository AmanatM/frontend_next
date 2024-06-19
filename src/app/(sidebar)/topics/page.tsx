import { DashboardContainer } from '@/components/dashboard-container'
import { TypographyH3, TypographyMuted } from '@/components/typography'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Topics',
}

export default function Topics() {
  return (
    <DashboardContainer className="space-y-8">
      <div className="space-y-0.5">
        <TypographyH3>Topics</TypographyH3>
        <TypographyMuted>Overview page</TypographyMuted>
      </div>
    </DashboardContainer>
  )
}
