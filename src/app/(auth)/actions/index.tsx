'use server'

import { createClientServer } from '@/supabase-utils/supabase-server'
import { Provider } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url
}

export async function loginWithEmailAndPassword(data: { email: string; password: string }) {
  const supabase = await createClientServer()

  const result = await supabase.auth.signInWithPassword(data)
  return JSON.stringify(result)
}

export async function signUpWithEmailAndPassword({ email, password }: { email: string; password: string }) {
  const supabase = await createClientServer()

  const result = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: `${getURL()}`,
    },
  })
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
