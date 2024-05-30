'use client'
import { DashboardContainer } from '@/components/dashboard-container'
import { TypographyH3, TypographyMuted } from '@/components/typography'
import { createClientServer } from '@/supabase-utils/supabase-server'
import { Metadata } from 'next'
import { redirect, useSearchParams } from 'next/navigation'

export default function EmailVerification() {
  // const supabase = createClientServer()
  const params = useSearchParams()
  const email = params.get('email')
  return (
    <DashboardContainer className="space-y-8">
      <div className="space-y-0.5 text-center">
        <TypographyH3>Verification link sent to: </TypographyH3>
        <TypographyH3> {email} </TypographyH3>
      </div>
    </DashboardContainer>
  )
}
