'use client'
import { ResizableHandle } from '@/components/ui/resizable'
import { useIsMobileBreakpoint } from '@/hooks/useIsMobileBreakpoint'
import { cn } from '@/lib/utils'

export function ResizeHandle({ vertical }: { vertical?: boolean }) {
  const isMobileBreakpoint = useIsMobileBreakpoint()
  return (
    <ResizableHandle
      disabled={isMobileBreakpoint}
      hitAreaMargins={{ coarse: 30, fine: 10 }}
      className={cn(
        'bg-background after:transition-all after:rounded-full after:hover:bg-muted-foreground ',
        vertical ? '!h-3 !after:h-1 translate-y-0 after:top-[6px]' : 'w-3 after:w-1',
      )}
    />
  )
}
