'use server'

import { createClientServer } from '@/supabase-utils/supabase-server'

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

export async function logout() {
  const supabase = await createClientServer()
  await supabase.auth.signOut()
}

export async function getUser() {
  const supabase = await createClientServer()
  const { data: user, error: AuthError } = await supabase.auth.getUser()
  return JSON.stringify({ user, AuthError })
}
