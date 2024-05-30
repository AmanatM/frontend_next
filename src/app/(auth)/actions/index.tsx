'use server'

import { createClientServer } from '@/supabase-utils/supabase-server'
import { Provider } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export async function loginWithEmailAndPassword(data: { email: string; password: string }) {
  const supabase = await createClientServer()

  const result = await supabase.auth.signInWithPassword(data)
  return JSON.stringify(result)
}

export async function signUpWithEmailAndPassword(data: { email: string; password: string }) {
  const supabase = await createClientServer()

  const result = await supabase.auth.signUp(data)
  return JSON.stringify(result)
}

// export async function signInWithGithub({ redirectURL }: { redirectURL: string }) {
//   const supabase = await createClientServer()

//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'github',
//   })
// }

export async function logout() {
  const supabase = await createClientServer()
  await supabase.auth.signOut()
}
