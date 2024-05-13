import { TypedSupabaseClient } from '@/supabase-utils/types'

export async function getQuestionById(client: TypedSupabaseClient, questionId: string) {
  const { data, error } = await client
    .from('coding_questions')
    .select(
      `*,
       coding_question_files(*)`,
    )
    .eq('id', questionId)
    .single()

  if (error) {
    throw error
  }
  return data
}
