import { Button } from '@/components/custom/button'
import { DashboardContainer } from '@/components/dashboard-container'
import ProgressSimple from '@/components/progress-simple'

import { TypographyH3, TypographyH4, TypographyMuted } from '@/components/typography'
import { Separator } from '@/components/ui/separator'

import { AlignHorizontalSpaceAround, CodeXml, Dock } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <DashboardContainer className="space-y-8">
      <div className="space-y-0.5">
        <TypographyH3>Home</TypographyH3>
        <TypographyMuted>Updated page</TypographyMuted>
      </div>
      <ProgressSimple />
      <ProgressSimple />
      <ProgressSimple />
      <ProgressSimple />
      <ProgressSimple />
    </DashboardContainer>
  )
}
