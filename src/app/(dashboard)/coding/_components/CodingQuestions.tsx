'use client'
import { TypographyMuted, TypographyP } from '@/components/typography'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { AppWindow, CircleIcon, Code, Gauge, StarIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { getCodingQuestions } from '../_queries/getCodingQuestions'
import useSupabaseBrowser from '@/supabase-utils/supabase-client'
import { Badge } from '@/components/ui/badge'
import { useSearchParams } from 'next/navigation'

const CodingQuestions = () => {
  const supabase = useSupabaseBrowser()
  const params = useSearchParams()
  const type = params.get('type')

  const { data: codingQuestions, isSuccess } = useQuery({
    queryKey: ['codingQuestions'],
    queryFn: () => getCodingQuestions(supabase),
  })

  const filteredCodingQuestions = useMemo(() => {
    if (type && codingQuestions) {
      return codingQuestions.filter(question => question.question_type === type)
    }
    return codingQuestions
  }, [codingQuestions, type])

  if (filteredCodingQuestions && codingQuestions)
    return (
      <div className="flex flex-col space-y-2">
        {filteredCodingQuestions.map(question => (
          <Link
            key={question.id}
            href={`/coding/${question.question_type === 'user_interface' ? '/ui/' : '/code/'}${question.id}`}
            className="flex"
          >
            <Card className="size-full space-y-2 px-6 py-4 bg-primary-foreground rounded-sm">
              <div className="flex flex-row space-x-4">
                <TypographyP>{question.title}</TypographyP>
                {question.user_completed_code_question.length > 0 && (
                  <Badge variant="outline" className="">
                    Completed
                  </Badge>
                )}
              </div>
              <CardDescription>{question.short_description}</CardDescription>
              <div>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center min-w-[140px]">
                    {question.question_type === 'user_interface' ? (
                      <>
                        <AppWindow size={15} className={cn('mr-2')} />
                        <TypographyMuted>User Interface</TypographyMuted>
                      </>
                    ) : (
                      <>
                        <Code size={15} className={cn('mr-2')} />
                        <TypographyMuted>Coding</TypographyMuted>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Gauge size={15} className={cn('mr-2')} />
                    <TypographyMuted
                      className={cn(
                        question.difficulty === 'Easy' && 'text-green-500',
                        question.difficulty === 'Medium' && 'text-yellow-500',
                        question.difficulty === 'Hard' && 'text-red-500',
                      )}
                    >
                      {question.difficulty}
                    </TypographyMuted>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    )
}

export default CodingQuestions
