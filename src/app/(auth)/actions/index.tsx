'use server'

import { createClient } from '@/supabase-utils/supabase-server'
import { redirect } from 'next/navigation'

export async function loginWithEmailAndPassword(data: { email: string; password: string }) {
  const supabase = await createClient()

  const result = await supabase.auth.signInWithPassword(data)
  return JSON.stringify(result)
}

export async function signUpWithEmailAndPassword(data: { email: string; password: string }) {
  const supabase = await createClient()

  const result = await supabase.auth.signUp(data)
  return JSON.stringify(result)
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/auth')
}
