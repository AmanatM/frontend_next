'use client'
import { DashboardContainer } from '@/components/dashboard-container'
import { TypographyH3, TypographyMuted } from '@/components/typography'
import { Card } from '@/components/ui/card'
import { createClientServer } from '@/supabase-utils/supabase-server'
import { Mail } from 'lucide-react'
import { Metadata } from 'next'
import { redirect, useSearchParams } from 'next/navigation'

export default function EmailVerification() {
  // const supabase = createClientServer()
  const params = useSearchParams()
  const email = params.get('email')
  return (
    <div className="mx-auto flex justify-center items-center h-full px-3">
      <Card className="p-6 max-w-full w-[500px]">
        <div className="flex flex-col space-y-4 text-left mb-4">
          <Mail className="mx-auto w-12 h-12 text-primary" />
          <p className="text-xl font-semibold tracking-tight text-center">Verification link sent to:</p>
          <p className="text-xl font-semibold tracking-tight text-center">{email}</p>
        </div>
      </Card>
    </div>
  )
}
