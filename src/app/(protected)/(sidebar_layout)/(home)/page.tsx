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
        <TypographyH3>Updated Home</TypographyH3>
        <TypographyMuted>Updated page</TypographyMuted>
      </div>
      <ProgressSimple />
      <div className="space-y-3">
        <TypographyH4>1. Interactive tutorials: </TypographyH4>
        <Button className="gap-x-2 mr-2" leftIcon={<AlignHorizontalSpaceAround size={17} />} asChild>
          <Link href="/">How to center a Div</Link>
        </Button>
      </div>
      <Separator />
      <div className="space-y-3">
        <TypographyH4>2. Coding questions: </TypographyH4>
        <Button className="gap-x-2 mr-2" leftIcon={<Dock size={17} />} asChild>
          <Link href="/">Creating a navbar</Link>
        </Button>
        <Button className="gap-x-2 mr-2" leftIcon={<Dock size={17} />} asChild>
          <Link href="/">Styling text with CSS</Link>
        </Button>
        <Button className="gap-x-2" leftIcon={<CodeXml size={17} />} asChild>
          <Link href="/">Javascript layout</Link>
        </Button>
      </div>
    </DashboardContainer>
  )
}
