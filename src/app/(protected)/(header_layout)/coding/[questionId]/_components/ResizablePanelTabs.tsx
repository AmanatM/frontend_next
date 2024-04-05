'use client'
import { Button } from '@/components/custom/button'
import { TypographySmall } from '@/components/typography'
import { Card } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ResizablePanel } from '@/components/ui/resizable'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

import { Ellipsis, LucideIcon, Maximize, Minimize, PanelLeftClose } from 'lucide-react'
import { useState } from 'react'

type tabs = {
  value: string
  label: string
  icon?: JSX.Element | LucideIcon | null
}

type ResizablePanelTabsProps = {
  children: React.ReactNode
  tabs?: tabs[]
  defaultValue: string
  minSize?: number
  defaultSize?: number
}

export function ResizablePanelTabs({ children, tabs, defaultValue, minSize, defaultSize }: ResizablePanelTabsProps) {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const tabsLayout = tabs !== undefined && tabs !== null

  return (
    <ResizablePanel
      minSize={minSize}
      defaultSize={defaultSize}
      className={cn('inset-0 md:overflow-auto md:flex-auto', isFullScreen ? 'absolute z-20 ' : '')}
    >
      <Tabs defaultValue={defaultValue} asChild>
        <Card className="h-full overflow-clip flex flex-col">
          <div
            className={cn('h-10 relative flex flex-none items-center justify-between py-0 px-2', !tabsLayout && 'h-0')}
          >
            {tabsLayout && (
              <ScrollArea className="whitespace-nowrap">
                <TabsList className=" bg-inherit w-max">
                  {tabs?.map(tab => (
                    <TabsTrigger key={tab.value} value={tab.value} className="!bg-transparent !shadow-none space-x-2">
                      {tab.icon && <>{tab.icon}</>}
                      <TypographySmall className="font-normal">{tab.label}</TypographySmall>
                    </TabsTrigger>
                  ))}
                </TabsList>
                <ScrollBar orientation="horizontal" className="h-1.5" />
              </ScrollArea>
            )}

            <div
              className={cn(
                'flex flex-none space-x-1 z-10 transition-none',
                !tabsLayout && 'absolute top-[2px] right-[10px]',
              )}
            >
              <DropdownMenu>
                {!isFullScreen ? (
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Ellipsis size={17} />
                    </Button>
                  </DropdownMenuTrigger>
                ) : (
                  <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsFullScreen(false)}>
                    <Minimize size={17} />
                  </Button>
                )}
                <DropdownMenuContent align="end" forceMount>
                  <DropdownMenuItem className="space-x-2" onClick={() => setIsFullScreen(true)}>
                    <Maximize size={17} />
                    <div>Full Screen</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="space-x-2">
                    <PanelLeftClose size={17} />
                    <div>Collapse</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="h-full overflow-scroll">{children}</div>
        </Card>
      </Tabs>
    </ResizablePanel>
  )
}
