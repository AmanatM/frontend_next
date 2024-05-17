import useSupabaseBrowser from '@/supabase-utils/supabase-client'
import { User } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useToggleMarkComplete = () => {
  const supabase = useSupabaseBrowser()

  return useMutation({
    mutationFn: async ({
      questionId,
      user,
      isMarkedComplete,
    }: {
      questionId: string
      user: User | null
      isMarkedComplete: boolean | undefined
    }) => {
      if (!user) {
        throw new Error('Login to first')
      }

      if (isMarkedComplete) {
        const data = await supabase
          .from('user_completed_code_question')
          .delete()
          .eq('user_id', user.id)
          .eq('question_id', questionId)
        if (data.error && data.error.code !== '23505') {
          //if error code is not unique_violation
          throw new Error(data.error.code)
        }
        return data.status
      } else {
        const data = await supabase
          .from('user_completed_code_question')
          .insert({ user_id: user.id, question_id: questionId })
        if (data.error && data.error.code !== '23505') {
          throw new Error(data.error.code)
        }

        return data.status
      }
    },
  })
}
