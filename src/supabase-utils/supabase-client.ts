'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'
import { useMemo } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient<Database> | undefined

function getSupabaseBrowserClient() {
  if (client) {
    return client
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  return client
}

function useSupabaseBrowser() {
  return useMemo(getSupabaseBrowserClient, [])
}

export default useSupabaseBrowser
