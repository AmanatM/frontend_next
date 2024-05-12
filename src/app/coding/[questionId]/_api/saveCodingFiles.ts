import { QuestionFile, TypedSupabaseClient } from '@/supabase-utils/types'

type saveCodingQuestionFile = {
  id: string
  content: string
  user_id: string
}

export const saveCodingQuestionFile = async (supabase: TypedSupabaseClient, files: saveCodingQuestionFile[]) => {
  const { data: user, error: userError } = await supabase.auth.getUser()
  const user_id = user?.user?.id // Add null check

  if (user_id === null) {
    throw new Error('User ID is null.') // Throw error and stop execution
  }

  const { data, error } = await supabase
    .from('user_saved_coding_question_files')
    .upsert(files.map(({ id, content, user_id }) => ({ id, content, user_id })))

  if (error) throw error
  return data
}
