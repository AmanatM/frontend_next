import { createClientServer } from '@/supabase-utils/supabase-server'
import { TypedSupabaseClient } from '@/supabase-utils/types'
import CodingQuestionContainer from './_components/CodingQuestionContainer'

async function getCodingQuestionById({ questionId, client }: { questionId: string; client: TypedSupabaseClient }) {
  const { data: codingQuestion, error } = await client
    .from('coding_questions')
    .select(`*, coding_question_files_code(*)`)
    .eq('id', questionId)
    .single()

  if (error) {
    throw new Error(error.message)
  }
  return codingQuestion
}

export default async function CodingQuestion({ params }: { params: { questionId: string } }) {
  const supabase = createClientServer()
  const user = (await supabase.auth.getUser()).data.user
  const questionId = params.questionId

  const codingQuestion = await getCodingQuestionById({ questionId, client: supabase })
  const questionType = codingQuestion?.question_type || 'user_interface'

  return (
    <>
      <CodingQuestionContainer idFromParams={questionId} user={user} coding_question={codingQuestion} />
    </>
  )
}
