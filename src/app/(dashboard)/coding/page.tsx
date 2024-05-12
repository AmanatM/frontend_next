import { Button } from '@/components/custom/button'
import { DashboardContainer } from '@/components/dashboard-container'
import { TypographyH3, TypographyH4, TypographyMuted } from '@/components/typography'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Toggle } from '@/components/ui/toggle'
import { CodeXml, Dock, LayoutGrid, PanelTop, Search, SquareChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function Coding() {
  return (
    <DashboardContainer className="space-y-8">
      <div className="space-y-0.5">
        <TypographyH3>Coding Questions</TypographyH3>
        <TypographyMuted>Two layout options</TypographyMuted>
      </div>
      <div className="space-y-3">
        <Button asChild size="lg" variant={'default'}>
          <Link href="/coding/e36d78a8-dbcd-4fdd-9627-f0b7368476cb">Example coding question 1</Link>
        </Button>
        <Separator />
        <Button asChild size="lg" variant={'default'}>
          <Link href="/coding/1f0721e3-3569-498d-a071-0e697e0e6ccf">Example coding question 2</Link>
        </Button>
        <Separator />

        <Button asChild size="lg" variant={'default'}>
          <Link href="/coding/03b3a5ab-da32-4a4e-8d06-2bdadcc59dd3">Example React question</Link>
        </Button>
      </div>

      <div className="hidden">
        <div className="space-y-3">
          <div className="flex space-x-3">
            <Toggle variant={'outline'} className="space-x-2">
              <SquareChevronRight size={15} className="text-muted-foreground" />
              <TypographyMuted className="text-sm">JavaScript</TypographyMuted>
            </Toggle>
            <Toggle variant={'outline'} className="space-x-2">
              <PanelTop size={15} className="text-muted-foreground" />
              <TypographyMuted className="text-sm">User Interface</TypographyMuted>
            </Toggle>
            <Toggle variant={'outline'} className="space-x-2">
              <LayoutGrid size={15} className="text-muted-foreground" />
              <TypographyMuted className="text-sm">Other</TypographyMuted>
            </Toggle>
          </div>
          <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>
            </form>
          </div>
        </div>
        <div className="mt-3 flex flex-col space-y-3">
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} className="h-14" />
          ))}
        </div>
      </div>
    </DashboardContainer>
  )
}
