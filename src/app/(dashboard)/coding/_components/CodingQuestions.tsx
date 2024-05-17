'use client'
import { TypographyP } from '@/components/typography'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { CircleIcon, StarIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { getCodingQuestions } from '../_queries/getCodingQuestions'
import useSupabaseBrowser from '@/supabase-utils/supabase-client'
import { Badge } from '@/components/ui/badge'

const CodingQuestions = () => {
  const supabase = useSupabaseBrowser()

  const { data: codingQuestions, isSuccess } = useQuery({
    queryKey: ['codingQuestions'],
    queryFn: () => getCodingQuestions(supabase),
  })

  if (!isSuccess) return null

  return (
    <div>
      {codingQuestions.map(question => (
        <Link key={question.id} href={`/coding/${question.id}`} className="flex">
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
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default CodingQuestions
