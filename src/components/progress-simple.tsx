"use client"
import { User } from "@supabase/auth-js"
import { Card } from "./ui/card"
import { Progress } from "./ui/progress"
import { createClientServer } from "@/supabase-utils/supabase-server"
import useSupabaseBrowser from "@/supabase-utils/supabase-client"
import { useQuery } from "@tanstack/react-query"
import { getCodingQuestions } from "@/app/(dashboard)/coding/_queries/getCodingQuestions"
import { useMemo } from "react"

function ProgressSimple({ user }: { user: User | null }) {
  const supabase = useSupabaseBrowser()

  const { data: codingQuestions, isSuccess } = useQuery({
    queryKey: ["codingQuestions"],
    queryFn: () => getCodingQuestions(supabase),
  })

  const getQuestionCount = ({ type, userCompleted }: { type: string; userCompleted?: boolean }) => {
    if (userCompleted) {
      return (
        codingQuestions?.filter(
          question => question.question_type === type && question.user_completed_code_question.length > 0,
        ).length || 0
      )
    }
    return codingQuestions?.filter(question => question.question_type === type).length || 0
  }

  const templateData = [
    {
      title: "User Interface",
      completed: getQuestionCount({ type: "user_interface", userCompleted: true }),
      totalAmount: getQuestionCount({ type: "user_interface" }),
    },
    {
      title: "JavaScript",
      completed: getQuestionCount({ type: "javascript", userCompleted: true }),
      totalAmount: getQuestionCount({ type: "javascript" }),
    },
    {
      title: "Total",
      completed: codingQuestions?.filter(question => question.user_completed_code_question.length > 0).length || 0,
      totalAmount: codingQuestions?.length || 0,
    },
  ]

  if (!user) return null

  return (
    <Card className="grid md:grid-cols-3 grid-cols-1 gap-y-6 gap-x-6 px-6 py-4">
      {templateData.map((data, index) => (
        <div key={index} className="grid grid-row gap-y-2">
          <p className="text-sm font-medium mb-2">{data.title}</p>
          <div className="flex flex-column items-center gap-x-4">
            <Progress
              value={Math.floor((data.completed / data.totalAmount) * 100)}
              aria-valuenow={Math.floor((data.completed / data.totalAmount) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              role="progressbar"
              aria-label={`${data.title} progress bar`}
            />
            <p className="text-sm">{Math.floor((data.completed / data.totalAmount) * 100)}%</p>
          </div>

          <p className="text-muted-foreground text-xs">
            <span className="text-primary font-bold">{data.completed}</span>/{data.totalAmount} completed
          </p>
        </div>
      ))}
    </Card>
  )
}

export default ProgressSimple
