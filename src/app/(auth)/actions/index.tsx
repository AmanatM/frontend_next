'use server'

import { createClientServer } from '@/supabase-utils/supabase-server'
import { Provider } from '@supabase/supabase-js'

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

export async function signInWithOAuth(data: { provider: Provider; email: string; password: string }) {
  const supabase = await createClientServer()

  const result = await supabase.auth.signInWithOAuth({
    provider: data.provider,
    options: {
      redirectTo: 'http://example.com/auth/callback',
    },
  })
  return JSON.stringify(result)
}

export async function logout() {
  const supabase = await createClientServer()
  await supabase.auth.signOut()
}
