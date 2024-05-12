import { CodingQuestion, TypedSupabaseClient } from '@/supabase-utils/types'
import { QueryKey, UseQueryOptions } from '@tanstack/react-query'

export function getQuestionById(client: TypedSupabaseClient, questionId: string) {
  return client
    .from('coding_questions')
    .select(
      `*,
       coding_question_files(*)`,
    )
    .eq('id', questionId)
    .single()
}
