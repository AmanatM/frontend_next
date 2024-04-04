'use client'
import { Button } from '@/components/custom/button'
import { useTailwindBreakpoint } from '@/hooks/useTailwindBreakpoint'
import { cn } from '@/lib/utils'
import { Settings, ChevronLeft, List, ChevronRight, Save } from 'lucide-react'

export function BottomToolbar({ handleSaveCode }: { handleSaveCode: () => void }) {
  const { isMobileBreakpoint } = useTailwindBreakpoint()
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-2 px-3 py-3 bg-background',
        isMobileBreakpoint ? 'fixed bottom-0 left-0 right-0' : '',
      )}
    >
      <div className="flex">
        <Button variant="outline" size="icon">
          <Settings size={17} />
        </Button>
      </div>
      <div className="flex gap-x-2">
        <Button variant={'outline'} size={'icon'}>
          <ChevronLeft size={17} />
        </Button>
        <Button className="gap-x-1" variant={'outline'}>
          <List size={17} />
          Questions list
        </Button>
        <Button variant={'outline'} size={'icon'}>
          <ChevronRight size={17} />
        </Button>
      </div>
      <div className="flex">
        <Button variant={'secondary'} size={'sm'} className="flex align-center space-x-2" onClick={handleSaveCode}>
          <Save size={15} />
          <div>Save</div>
        </Button>
      </div>
    </div>
  )
}
