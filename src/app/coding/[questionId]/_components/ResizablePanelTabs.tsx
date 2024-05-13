'use client'
import { Button } from '@/components/custom/button'
import { Card } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ResizablePanel } from '@/components/ui/resizable'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsList } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

import { Ellipsis, Maximize, Minimize, PanelLeftClose } from 'lucide-react'
import React from 'react'
import { useState } from 'react'

import { TabTriggerCustom } from './CustomTabComponents'
import { CustomTabsContentProps, TabProps } from '../utils/tabs-data'

type ResizablePanelTabsProps = {
  children: React.ReactNode
  tabs?: TabProps[]
  defaultValue: string
  minSize?: number
  defaultSize?: number
  setDefaultSize: (size: number[]) => void
  extraClassName?: string
}

export function ResizablePanelTabs({
  children,
  tabs,
  defaultValue,
  minSize,
  defaultSize,
  setDefaultSize,
  extraClassName,
}: ResizablePanelTabsProps) {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const tabsLayout = tabs !== undefined && tabs !== null

  const [activeTab, setActiveTab] = useState(defaultValue + '_tab')

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab + '_tab') // Ensure consistency in tab state.
  }
  return (
    <ResizablePanel
      minSize={minSize}
      defaultSize={defaultSize}
      className={cn('inset-0 overflow-hidden md:flex-auto', isFullScreen ? 'absolute z-20 ' : '', extraClassName)}
    >
      <Tabs defaultValue={defaultValue + '_tab'} asChild onValueChange={handleTabChange}>
        <Card className="h-full overflow-clip flex flex-col">
          <div
            className={cn('h-10 relative flex flex-none items-center justify-between py-0 px-2', !tabsLayout && 'h-0')}
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

          <div className="h-full overflow-scroll">
            {React.Children.map(children, child => {
              if (React.isValidElement<CustomTabsContentProps>(child)) {
                // Ensure child is a valid React element and expects ChildProps
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
