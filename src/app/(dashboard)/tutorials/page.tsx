import { Button } from '@/components/custom/button'
import { DashboardContainer } from '@/components/dashboard-container'

import { TypographyH3, TypographyH4, TypographyMuted } from '@/components/typography'

import { AlignHorizontalSpaceAround } from 'lucide-react'
import Link from 'next/link'

export default function Tutorials() {
  return (
    <DashboardContainer className="space-y-8">
      <div className="space-y-0.5">
        <TypographyH3>Tutorials</TypographyH3>
        <TypographyMuted>Overview page</TypographyMuted>
      </div>
      <div className="space-y-3">
        <TypographyH4>1. Interactive tutorials: </TypographyH4>
        <Button className="gap-x-2 mr-2" leftIcon={<AlignHorizontalSpaceAround size={17} />} asChild>
          <Link href="/">How to center a Div</Link>
        </Button>
      </div>
    </DashboardContainer>
  )
}
