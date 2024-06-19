import { DashboardContainer } from '@/components/dashboard-container'
import { TypographyH3, TypographyMuted } from '@/components/typography'

import { createClientServer } from '@/supabase-utils/supabase-server'
import SearchFilter from './_components/SearchFilter'
import CodingQuestions from './_components/CodingQuestions'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getCodingQuestions } from './_queries/getCodingQuestions'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coding Questions',
  description: 'Free platform to learn frontend interactively',
}

export default async function Coding() {
  const supabase = createClientServer()
  //const user = (await supabase.auth.getUser()).data.user

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['codingQuestions'],
    queryFn: () => getCodingQuestions(supabase),
  })

  return (
    <DashboardContainer className="space-y-8">
      <div className="space-y-0.5">
        <TypographyH3>Coding Questions</TypographyH3>
        <TypographyMuted>Two layout options</TypographyMuted>
      </div>
      <div className="flex flex-col space-y-4 max-w-[800px]">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SearchFilter />

          <CodingQuestions />
        </HydrationBoundary>
      </div>
    </DashboardContainer>
  )
}
