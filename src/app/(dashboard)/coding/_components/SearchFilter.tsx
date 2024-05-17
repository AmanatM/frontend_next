import { TypographyMuted } from '@/components/typography'
import { Input } from '@/components/ui/input'
import { Toggle } from '@/components/ui/toggle'
import { SquareChevronRight, PanelTop, LayoutGrid, Search } from 'lucide-react'

const SearchFilter = () => {
  return (
    <div className="space-y-3 flex flex-col">
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
  )
}

export default SearchFilter
