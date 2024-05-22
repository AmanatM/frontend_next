import useSupabaseBrowser from '@/supabase-utils/supabase-client'
import { User } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'

export const useGetSavedFiles = ({ questionId, user }: { questionId: string; user: User | null }) => {
  const supabase = useSupabaseBrowser()
  return useQuery({
    queryKey: ['savedCode', questionId, user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from('user_saved_question_files').select(`*`).eq('question_id', questionId)
      if (error) {
        throw error
      }
      return data
    },
    enabled: !!user,
  })
}
