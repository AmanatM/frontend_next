import { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'
import { SandpackFile } from '@codesandbox/sandpack-react'

export type TypedSupabaseClient = SupabaseClient<Database>

//     *********  User Interface question *************
export type QuestionFile_UI = Database['public']['Tables']['coding_question_files_ui']['Row']

export type Question_UI = Database['public']['Tables']['coding_questions']['Row'] & {
  coding_question_files_ui: QuestionFile_UI[]
}

export interface SandpackFile_UI {
  [key: string]: {
    id: string
    path: string
    name: string
    language: string | null
  } & SandpackFile
}
//     ****************************************

//     *********  Coding  question *************

export type QuestionFile_CODE = Database['public']['Tables']['coding_question_files_code']['Row']
export type Question_CODE = Database['public']['Tables']['coding_questions']['Row'] & {
  coding_question_files_code: QuestionFile_CODE[]
}

export interface SandpackFile_CODE {
  [key: string]: {
    code: string
  } & SandpackFile
}

//     ****************************************

export type CodingQuestion = Database['public']['Tables']['coding_questions']['Row']

export interface FilesObjectWithSandpack {
  [key: string]: {
    id: string
    path: string
    name: string
    language: string | null
  } & SandpackFile
}

export type QuestionsSearchResults = {
  id: string
  title: string
}

export type SavedCodingQuestionFiles = Database['public']['Tables']['user_saved_question_files']['Row']

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
