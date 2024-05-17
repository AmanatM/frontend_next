import { Button } from '@/components/custom/button'
import { DashboardContainer } from '@/components/dashboard-container'
import { TypographyH3, TypographyH4, TypographyMuted, TypographyP } from '@/components/typography'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

import { Toggle } from '@/components/ui/toggle'
import { TypedSupabaseClient } from '@/supabase-utils/types'
import { CircleIcon, CodeXml, Dock, LayoutGrid, PanelTop, Search, SquareChevronRight, StarIcon } from 'lucide-react'
import Link from 'next/link'
import { createClientServer } from '@/supabase-utils/supabase-server'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

async function getCodingQuestions({ client }: { client: TypedSupabaseClient }) {
  const { data: codingQuestions, error } = await client
    .from('coding_questions')
    .select(`*,coding_question_files(*), user_completed_code_question(*)`)
    .limit(10)

  if (error) {
    throw new Error(error.message)
  }
  return codingQuestions
}

export default async function Coding() {
  const supabase = createClientServer()
  const user = (await supabase.auth.getUser()).data.user

  const codingQuestions = await getCodingQuestions({ client: supabase })

  return (
    <DashboardContainer className="space-y-8">
      <div className="space-y-0.5">
        <TypographyH3>Coding Questions</TypographyH3>
        <TypographyMuted>Two layout options</TypographyMuted>
      </div>
      <div className="space-y-3 flex flex-col">
        <div className="flex space-x-3">
          <Toggle variant={'outline'} className="space-x-2">
            <SquareChevronRight size={15} className="text-muted-foreground" />
            <TypographyMuted className="text-sm">JavaScript</TypographyMuted>
          </Toggle>
          <Toggle variant={'outline'} className="space-x-2">
            <PanelTop size={15} className="text-muted-foreground" />
            <TypographyMuted className="text-sm">User Interface</TypographyMuted>
          </Toggle>
          <Toggle variant={'outline'} className="space-x-2">
            <LayoutGrid size={15} className="text-muted-foreground" />
            <TypographyMuted className="text-sm">Other</TypographyMuted>
          </Toggle>
        </div>
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </form>
        </div>
        {codingQuestions.map(question => (
          <Link key={question.id} href={`/coding/${question.id}`} className="flex max-w-[700px]">
            <Card className="size-full px-1 py-1">
              <CardHeader className="flex flex-row space-x-2 items-middle justify-between">
                <TypographyP>{question.title}</TypographyP>
                {question.user_completed_code_question.length > 0 && <Badge variant="secondary">Completed</Badge>}
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CircleIcon
                      className={cn(
                        'mr-1 h-3 w-3 fill-sky-400 text-sky-400',
                        question.with_browser ? 'text-sky-400' : 'text-amber-700-500',
                      )}
                    />
                    {question.with_browser ? 'User Interface' : 'Java Script'}
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="mr-1 h-3 w-3" />
                    20k
                  </div>
                  {/* <div>{JSON.stringify(question.user_completed_code_question)}</div> */}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="hidden">
        <div className="space-y-3">
          <div className="flex space-x-3">
            <Toggle variant={'outline'} className="space-x-2">
              <SquareChevronRight size={15} className="text-muted-foreground" />
              <TypographyMuted className="text-sm">JavaScript</TypographyMuted>
            </Toggle>
            <Toggle variant={'outline'} className="space-x-2">
              <PanelTop size={15} className="text-muted-foreground" />
              <TypographyMuted className="text-sm">User Interface</TypographyMuted>
            </Toggle>
            <Toggle variant={'outline'} className="space-x-2">
              <LayoutGrid size={15} className="text-muted-foreground" />
              <TypographyMuted className="text-sm">Other</TypographyMuted>
            </Toggle>
          </div>
          <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>
            </form>
          </div>
        </div>
        <div className="mt-3 flex flex-col space-y-3">
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} className="h-14" />
          ))}
        </div>
      </div>
    </DashboardContainer>
  )
}
