'use client'
import { ResizableHandle } from '@/components/ui/resizable'
import { useTailwindBreakpoint } from '@/hooks/useTailwindBreakpoint'

export function ResizeHandle() {
  const { isMobileBreakpoint } = useTailwindBreakpoint()
  return (
    <ResizableHandle
      disabled={isMobileBreakpoint}
      hitAreaMargins={{ coarse: 30, fine: 10 }}
      className="w-3 bg-background after:transition-all after:rounded-full after:hover:bg-muted-foreground after:w-1"
    />
  )
}
