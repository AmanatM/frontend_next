import useSupabaseBrowser from '@/supabase-utils/supabase-client'
import { SavedCodingQuestionFiles } from '@/supabase-utils/types'
import { User } from '@supabase/supabase-js'
import { useMutation } from '@tanstack/react-query'

type SaveFilesParams = {
  content: string
  file_id: string
  user_id: string
  question_id: string
  path: string
}[]

export const useSaveFiles = () => {
  const supabase = useSupabaseBrowser()

  return useMutation({
    mutationFn: async ({ user, updatedFiles }: { user: User | null; updatedFiles: SaveFilesParams }) => {
      if (!user) {
        throw new Error('Please login to save code')
      }

      if (!updatedFiles) return

      const { status, error } = await supabase.from('user_saved_question_files').upsert(updatedFiles)
      if (error) throw error
      console.log(status)
      return status
    },
  })
}
