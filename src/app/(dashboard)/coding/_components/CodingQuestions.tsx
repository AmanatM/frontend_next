"use client"
import { TypographyMuted, TypographyP } from "@/components/typography"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { AppWindow, CircleIcon, Code, Gauge, StarIcon } from "lucide-react"
import Link from "next/link"
import React, { useMemo } from "react"
import { getCodingQuestions } from "../_queries/getCodingQuestions"
import useSupabaseBrowser from "@/supabase-utils/supabase-client"
import { Badge } from "@/components/ui/badge"
import { usePathname, useSearchParams } from "next/navigation"
import useIsClient from "@/hooks/useIsClient"
import { Button } from "@/components/custom/button"

const CodingQuestions = () => {
  const supabase = useSupabaseBrowser()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const type = searchParams.get("type")
  const search = searchParams.get("search")

  const { data: codingQuestions, isSuccess } = useQuery({
    queryKey: ["codingQuestions"],
    queryFn: () => getCodingQuestions(supabase),
  })

  const filteredCodingQuestions = useMemo(() => {
    if (codingQuestions) {
      return codingQuestions.filter(question => {
        const matchesType = !type || question.question_type === type
        const matchesSearch =
          !search ||
          question.title.toLowerCase().includes(search.toLowerCase()) ||
          (question.short_description && question.short_description.toLowerCase().includes(search.toLowerCase()))
        return matchesType && matchesSearch
      })
    }
    return codingQuestions
  }, [codingQuestions, type, search])

  const resetFilters = () => {
    const sp = new URLSearchParams(searchParams)
    sp.delete("type")
    sp.delete("search")
    window.history.replaceState(null, "", `${pathname}?${sp.toString()}`)
  }

  if ((filteredCodingQuestions ?? []).length <= 0) {
    return (
      <Card className="flex flex-col py-6 items-center">
        <TypographyP>No questions found</TypographyP>
        <Button variant="secondary" size="sm" className="mt-4" onClick={resetFilters}>
          Reset Filters
        </Button>
      </Card>
    )
  }

  if (filteredCodingQuestions && codingQuestions)
    return (
      <Card className="flex flex-col overflow-clip">
        {filteredCodingQuestions.map(question => (
          <Link
            key={question.id}
            href={`/coding/${question.question_type === "user_interface" ? "/ui/" : "/code/"}${question.id}`}
            className="flex border-b"
          >
            <div className="size-full space-y-2 px-6 py-4 hover:bg-muted">
              <div className="flex flex-row space-x-4">
                <TypographyP>{question.title}</TypographyP>
                {question.user_completed_code_question.length > 0 && (
                  <Badge variant="outline" className="">
                    Completed
                  </Badge>
                )}
              </div>
              <TypographyMuted>{question.short_description}</TypographyMuted>
              <div>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center min-w-[140px]">
                    {question.question_type === "user_interface" ? (
                      <>
                        <AppWindow size={15} className={cn("mr-2")} />
                        <TypographyMuted>User Interface</TypographyMuted>
                      </>
                    ) : (
                      <>
                        <Code size={15} className={cn("mr-2")} />
                        <TypographyMuted>Coding</TypographyMuted>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Gauge size={15} className={cn("mr-2")} />
                    <TypographyMuted
                      className={cn(
                        question.difficulty === "Easy" && "text-green-500",
                        question.difficulty === "Medium" && "text-yellow-500",
                        question.difficulty === "Hard" && "text-red-500",
                      )}
                    >
                      {question.difficulty}
                    </TypographyMuted>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Card>
    )
}

export default CodingQuestions
