import {  TypedSupabaseClient } from "@/supabase-utils/types";


export function getQuestionById (client: TypedSupabaseClient, questionId: string){
  return client
    .from('coding_questions')
    .select(
      ` *,
      coding_question_files(*)
    `,
    )
    .eq('id', questionId) // Use .eq for exact match instead of .match
    .throwOnError()
    .single()
}


