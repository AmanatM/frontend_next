import { DashboardContainer } from "@/components/dashboard-container"
import TutorialCard from "@/app/(dashboard)/tutorials/_components/TutorialCard"
import { TypographyH3, TypographyMuted } from "@/components/typography"

import { Metadata } from "next"
import { getPaginatedPosts, postsPerPage } from "@/tutorials"

export const metadata: Metadata = {
  title: "Tutorials",
}

export default async function Tutorials() {
  // const { posts, total } = await getPaginatedPosts({ page: 1, limit: postsPerPage })

  // if (!posts) return null

  return (
    <DashboardContainer className="space-y-8">
      <div className="space-y-0.5">
        <TypographyH3>Tutorials</TypographyH3>
        <TypographyMuted>Interactive tutorials</TypographyMuted>
      </div>
      <div className="grid gap-6 lg:grid-cols-2 align-baseline">
        {/* {posts.map(tutorial => (
          <TutorialCard key={tutorial.slug} {...tutorial} />
        ))} */}
      </div>
    </DashboardContainer>
  )
}
