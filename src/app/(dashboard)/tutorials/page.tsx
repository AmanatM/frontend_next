import { DashboardContainer } from '@/components/dashboard-container'
import TutorialCard from '@/app/(dashboard)/tutorials/_components/TutorialCard'
import { TypographyH3, TypographyMuted } from '@/components/typography'

import { getBlogPosts } from '@/lib/tutorials'

export default function Tutorials() {
  let allBlogs = getBlogPosts()

  console.log(allBlogs)

  return (
    <DashboardContainer className="space-y-8">
      <div className="space-y-0.5">
        <TypographyH3>Tutorials</TypographyH3>
        <TypographyMuted>Interactive tutorials</TypographyMuted>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {allBlogs.map(tutorial => (
          <TutorialCard key={tutorial.slug} {...tutorial} />
        ))}
      </div>
    </DashboardContainer>
  )
}
