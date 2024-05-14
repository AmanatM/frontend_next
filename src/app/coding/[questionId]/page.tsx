import { createClientServer } from '@/supabase-utils/supabase-server'
import CodingQuestionContainer from './_components/CodingQuestionContainer'
import { TypedSupabaseClient } from '@/supabase-utils/types'
import { Suspense } from 'react'
import Loading from './loading'

async function getCodingQuestionById({ questionId, client }: { questionId: string; client: TypedSupabaseClient }) {
  const { data: codingQuestion, error } = await client
    .from('coding_questions')
    .select(`*,coding_question_files(*), user_completed_code_question(*)`)
    .eq('id', questionId)
    .single()

  if (error) {
    throw new Error(error.message)
  }
  return codingQuestion
}

export async function getQuestionMarkedComplete({
  questionId,
  client,
}: {
  questionId: string
  client: TypedSupabaseClient
}) {
  const { data: userCompletedCodeQuestion, error } = await client
    .from('user_completed_code_question')
    .select('*')
    .eq('question_id', questionId)
    .single()

  return userCompletedCodeQuestion
}

export default async function CodingQuestion({ params }: { params: { questionId: string } }) {
  const supabase = createClientServer()
  const user = (await supabase.auth.getUser()).data.user
  const questionId = params.questionId

  const codingQuestion = await getCodingQuestionById({ questionId, client: supabase })

  const userCompletedCodeQuestion = !!(await getQuestionMarkedComplete({ questionId, client: supabase }))

  const isQuestionCompletedByUser = userCompletedCodeQuestion
  return (
    <>
      <Suspense fallback={<Loading />}>
        <CodingQuestionContainer
          idFromParams={questionId}
          user={user}
          coding_question={codingQuestion}
          isQuestionMarkedComplete={isQuestionCompletedByUser}
        />
      </Suspense>
    </>
  )
}
