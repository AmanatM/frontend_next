import useSupabaseBrowser from '@/supabase-utils/supabase-client'
import { User } from '@supabase/supabase-js'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useDeleteSavedFiles = () => {
  const supabase = useSupabaseBrowser()

  return useMutation({
    mutationFn: async ({ idsToDelete }: { idsToDelete: string[] | undefined }) => {
      if (!idsToDelete) return
      const { data, error } = await supabase
        .from('user_saved_coding_question_files')
        .delete()
        .in('file_id', idsToDelete)
      if (error) {
        throw new Error(error.message)
      }
      return data
    },
  })
}
