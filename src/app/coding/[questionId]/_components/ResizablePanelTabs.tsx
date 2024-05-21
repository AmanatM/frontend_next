'use client'
import { Button } from '@/components/custom/button'
import { Card } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ResizablePanel } from '@/components/ui/resizable'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsList } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

import { Ellipsis, Maximize, Minimize, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import React, { useRef } from 'react'
import { useState } from 'react'

import { TabTriggerCustom } from './CustomTabComponents'
import { CustomTabsContentProps, TabProps } from '../utils/tabs-data'
import { useIsMobileBreakpoint } from '@/hooks/useIsMobileBreakpoint'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type ResizablePanelTabsProps = {
  children: React.ReactNode
  tabs?: TabProps[]
  defaultValue: string
  defaultSize?: number
  setDefaultSize: (size: number[]) => void
  extraClassName?: string
}

export function ResizablePanelTabs({
  children,
  tabs,
  defaultValue,
  defaultSize,
  setDefaultSize,
  extraClassName,
}: ResizablePanelTabsProps) {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState(defaultValue + '_tab')
  const tabsLayout = tabs !== undefined && tabs !== null

  const isMobileBreakpoint = useIsMobileBreakpoint()
  const panelRef = useRef<ImperativePanelHandle>(null)

  const handleTabChange = (newTab: string) => {
    if (panelRef.current?.isCollapsed()) {
      panelRef.current?.expand()
    }
    setActiveTab(newTab + '_tab') // Ensure consistency in tab state.
  }

  const handleCollapse = () => {
    if (panelRef.current) {
      panelRef.current.collapse()
    }
  }

  const handleExpand = () => {
    if (panelRef.current) {
      panelRef.current.expand()
    }
  }

  return (
    <ResizablePanel
      ref={panelRef}
      defaultSize={defaultSize}
      onCollapse={() => setCollapsed(true)}
      onExpand={() => setCollapsed(false)}
      collapsedSize={5}
      minSize={10}
      collapsible={true}
      className={cn(
        'inset-0 overflow-hidden md:flex-auto',
        extraClassName,
        isFullScreen && 'absolute z-20 ',
        isMobileBreakpoint && '!flex-none ',
      )}
    >
      <Tabs defaultValue={defaultValue + '_tab'} asChild onValueChange={handleTabChange}>
        <Card className="h-full overflow-clip flex flex-col">
          {/******** Collapsed Tab ********/}
          {collapsed && !isMobileBreakpoint && (
            <div className={cn('size-full px-2 py-2 flex flex-col items-center')}>
              <Button variant={'ghost'} size={'icon'} onClick={handleExpand}>
                <PanelLeftOpen size={17} />
              </Button>
              <Separator className="my-2" />
              <div className="flex flex-col mt-4">
                {tabs?.map(tab => (
                  <TooltipProvider key={tab.value} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          key={tab.value}
                          variant={'ghost'}
                          onClick={() => handleTabChange(tab.value)}
                          className={'my-2'}
                        >
                          {tab.icon && <>{tab.icon}</>}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent align="center" avoidCollisions={true} side="right" sideOffset={10}>
                        {tab.label}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          )}

          {/******** Normal Tab ********/}
          {(isMobileBreakpoint || !collapsed) && (
            <div
              className={cn(
                'h-10 relative flex flex-none items-center justify-between py-0 px-2',
                !tabsLayout && 'h-0',
              )}
            >
              {tabsLayout && (
                <ScrollArea className="whitespace-nowrap">
                  <TabsList className="bg-inherit w-max">
                    {tabs?.map(tab => (
                      <TabTriggerCustom
                        key={tab.value}
                        tab={tab}
                        handleTabChange={handleTabChange}
                        activeTab={activeTab}
                      ></TabTriggerCustom>
                    ))}
                  </TabsList>
                  <ScrollBar orientation="horizontal" className="h-1.5" />
                </ScrollArea>
              )}

              <div
                className={cn(
                  'flex flex-none space-x-1 z-10 transition-none',
                  !tabsLayout && 'absolute top-[2px] right-[10px]',
                  isMobileBreakpoint && 'hidden',
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
                    <DropdownMenuItem className="space-x-2 cursor-pointer" onClick={() => setIsFullScreen(true)}>
                      <Maximize size={17} />
                      <div>Full Screen</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="space-x-2 cursor-pointer" onClick={handleCollapse}>
                      <PanelLeftClose size={17} />
                      <div>Collapse</div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}

          <div className={cn('h-full overflow-scroll', collapsed && !isMobileBreakpoint && 'hidden')}>
            {React.Children.map(children, child => {
              if (React.isValidElement<CustomTabsContentProps>(child)) {
                return React.cloneElement(child, {
                  isActiveTab: activeTab === child.props.value + '_tab',
                })
              }
              return child
            })}
          </div>
        </Card>
      </Tabs>
    </ResizablePanel>
  )
}
