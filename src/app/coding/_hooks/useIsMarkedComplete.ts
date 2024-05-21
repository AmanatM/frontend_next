import useSupabaseBrowser from '@/supabase-utils/supabase-client'
import { User } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'

export const useIsMarkedComplete = ({ questionId, user }: { questionId: string; user: User | null }) => {
  const supabase = useSupabaseBrowser()
  return useQuery({
    queryKey: ['isMarkedComplete', questionId, user?.id],
    queryFn: async () => {
      if (!user) return

      const { data, error } = await supabase
        .from('user_completed_code_question')
        .select(`*`)
        .eq('question_id', questionId)
        .eq('user_id', user?.id)
      if (error) throw new Error(error.message)
      if (!data || data.length === 0) {
        return false
      }
      return true
    },
    enabled: !!user,
  })
}
