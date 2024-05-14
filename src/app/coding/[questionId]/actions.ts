'use server'

import { createClientServer } from '@/supabase-utils/supabase-server'
import { revalidatePath } from 'next/cache'

export async function toggleUserComplete(question_id: string, isMarkedComplete: boolean) {
  const supabase = await createClientServer()
  const user = (await supabase.auth.getUser()).data.user

  if (!user) {
    throw new Error('User not found')
  }

  const user_id = user.id
  if (isMarkedComplete) {
    const data = await supabase
      .from('user_completed_code_question')
      .delete()
      .eq('user_id', user_id)
      .eq('question_id', question_id)
    if (data.error) {
      return new Error(data.error.message)
    }
    revalidatePath(`/coding/${question_id}`)
    return 'Marked as incomplete'
  } else {
    const data = await supabase.from('user_completed_code_question').upsert({ user_id, question_id })
    if (data.error) {
      return new Error(data.error.message)
    }
    revalidatePath(`/coding/${question_id}`)

    return 'Marked as completed'
  }
}
