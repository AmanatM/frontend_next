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

export async function getUsersSavedCodingFileByQuestionId(client: TypedSupabaseClient, questionId: string) {
  const {
    data: { user },
    error: userError,
  } = await client.auth.getUser()
  if (userError) {
    throw userError
  }

  const { data: savedFiles, error } = await client
    .from('user_saved_coding_question_files')
    .select(`*, coding_question_files!inner(*)`)
    .eq('coding_question_files.question_id', questionId)

  if (error) {
    throw error
  }

  return savedFiles
}
