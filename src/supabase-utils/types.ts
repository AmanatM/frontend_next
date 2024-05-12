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

export type SavedCodingQuestionFile = Database['public']['Tables']['user_saved_coding_question_files']['Row']

export type SandpackTemplate =
  | 'angular-cli'
  | 'create-react-app'
  | 'create-react-app-typescript'
  | 'svelte'
  | 'parcel'
  | 'vue-cli'
  | 'static'
  | 'solid'
  | 'nextjs'
  | 'node'
