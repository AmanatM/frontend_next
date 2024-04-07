import { Button } from '@/components/custom/button'
import { DashboardContainer } from '@/components/dashboard-container'
import { TypographyH3, TypographyH4, TypographyMuted } from '@/components/typography'
import { Separator } from '@/components/ui/separator'
import { CodeXml, Dock } from 'lucide-react'
import Link from 'next/link'

export default function Coding() {
  return (
    <DashboardContainer className="space-y-8">
      <div className="space-y-0.5">
        <TypographyH3>Coding Questions</TypographyH3>
        <TypographyMuted>Two layout options</TypographyMuted>
      </div>
      <div className="space-y-3">
        <TypographyH4>1. User interface layout: </TypographyH4>
        <Button className="gap-x-2 mr-2" leftIcon={<Dock size={17} />} asChild>
          <Link href={'/coding/1'}>Styling Text with css</Link>
        </Button>

        <Button className="gap-x-2" leftIcon={<Dock size={17} />} asChild>
          <Link href={'/coding/2'}>Creating a navbar</Link>
        </Button>

        <Button className="gap-x-2" leftIcon={<Dock size={17} />} asChild>
          <Link href={'/coding/9283'}>Sandpack</Link>
        </Button>
      </div>
      <Separator />
      <div className="space-y-3">
        <TypographyH4>2. Javascript layout: </TypographyH4>
        <Button className="gap-x-2" leftIcon={<CodeXml size={17} />} asChild>
          <Link href={'/'}>Javascript layout</Link>
        </Button>
      </div>
    </DashboardContainer>
  )
}
