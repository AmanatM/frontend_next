import { DashboardContainer } from '@/components/dashboard-container'
import TutorialCard from '@/app/(dashboard)/tutorials/_components/TutorialCard'
import { TypographyH3, TypographyMuted } from '@/components/typography'

import { mockTutorials } from '@/mockData/mock_tutorials'

export default function Tutorials() {
  return (
    <DashboardContainer className="space-y-8">
      <div className="space-y-0.5">
        <TypographyH3>Tutorials</TypographyH3>
        <TypographyMuted>Interactive tutorials</TypographyMuted>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {mockTutorials.map(tutorial => (
          <TutorialCard key={tutorial.id} {...tutorial} />
        ))}
      </div>
    </DashboardContainer>
  )
}
