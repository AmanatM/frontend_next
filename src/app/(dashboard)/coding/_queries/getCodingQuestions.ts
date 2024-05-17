import { TypedSupabaseClient } from '@/supabase-utils/types'

export async function getCodingQuestions(client: TypedSupabaseClient) {
  const { data: codingQuestions, error } = await client
    .from('coding_questions')
    .select(`*,coding_question_files(*), user_completed_code_question(*)`)
    .limit(10)

  if (error) {
    throw new Error(error.message)
  }
  return codingQuestions
}
