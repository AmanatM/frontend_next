import { TypographySmall } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CustomTabsContentProps, TabProps } from '../utils/tabs-data'

type TabTriggerCustomProps = {
  tab: TabProps
  handleTabChange: (newTab: string) => void
  activeTab: string
}
export const TabTriggerCustom = ({ tab, handleTabChange, activeTab }: TabTriggerCustomProps) => {
  const isActive = activeTab === tab.value + '_tab'
  return (
    <Button
      variant={'ghost'}
      onClick={() => handleTabChange(tab.value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow !bg-transparent !shadow-none space-x-2',
        '!bg-transparent !shadow-none space-x-2',
        isActive ? 'text-foreground bg-background shadow' : 'bg-transparent',
      )}
    >
      {tab.icon && <>{tab.icon}</>}
      <TypographySmall className="font-normal">{tab.label}</TypographySmall>
    </Button>
  )
}

export const CustomTabsContent = ({ children, className, isActiveTab }: CustomTabsContentProps) => {
  return <div className={cn(isActiveTab ? '' : 'hidden', className)}>{children}</div>
}
