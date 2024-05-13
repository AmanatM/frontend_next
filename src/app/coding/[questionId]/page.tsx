import { createClientServer } from '@/supabase-utils/supabase-server'
import CodingQuestionContainer from './_components/CodingQuestionContainer'

export default async function CodingQuestion({ params }: { params: { questionId: string } }) {
  const supabase = createClientServer()
  const user = (await supabase.auth.getUser()).data.user

  const questionId = params.questionId

  const { data, error } = await supabase
    .from('coding_questions')
    .select(`*,coding_question_files(*)`)
    .eq('id', questionId)
    .single()

  return (
    <>
      <CodingQuestionContainer idFromParams={questionId} user={user} />
    </>
  )
}
