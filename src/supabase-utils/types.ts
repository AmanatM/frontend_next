import { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

export type TypedSupabaseClient = SupabaseClient<Database>

export type QuestionFile = Database['public']['Tables']['coding_question_files']['Row']

export type CodingQuestion = Database['public']['Tables']['coding_questions']['Row'] & {
  coding_question_files: QuestionFile[]
}


export type QuestionsSearchResults = {
  id: string
  title: string
}
