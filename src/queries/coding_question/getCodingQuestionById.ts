import { TypedSupabaseClient } from "@/supabase-utils/types";


export function getCodingQuestionById(client: TypedSupabaseClient, questionId: string) {
  return client
    .from('coding_questions')
    .select(
      `
      id,
      title
    `
    )
    .eq('id', questionId)
    .throwOnError()
    .single()
}