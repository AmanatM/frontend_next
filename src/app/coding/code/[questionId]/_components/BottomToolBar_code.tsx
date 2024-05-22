'use client'
import { Button } from '@/components/custom/button'
import { useIsMobileBreakpoint } from '@/hooks/useIsMobileBreakpoint'
import { cn } from '@/lib/utils'
import { useSandpack, useSandpackNavigation } from '@codesandbox/sandpack-react'
import { List, Save, RotateCcw, Play } from 'lucide-react'

import { User } from '@supabase/auth-js'
import { ModalTrigger } from '@/components/modal'
import ToggleCompleteButton from '@/app/coding/_components/MarkCompleteButton'
import { getPanelElement, ImperativePanelHandle } from 'react-resizable-panels'
import { useEffect, useRef } from 'react'

export function BottomToolbar_code({
  user,
  questionId,
  setVerticalLayout,
}: {
  user: User | null
  questionId: string
  setVerticalLayout: (numbers: number[]) => void
}) {
  const isMobileBreakpoint = useIsMobileBreakpoint()

  const sandpack = useSandpack()
  const { refresh } = useSandpackNavigation()

  const runCode = () => {
    // refresh()
    // sandpack.dispatch({ type: 'start' })
    setVerticalLayout([60, 40])
    sandpack.dispatch({ type: 'run-all-tests' })
  }

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-2 px-3 py-3 bg-background dark:text-white',
        isMobileBreakpoint ? 'fixed bottom-0 left-0 right-0' : '',
      )}
    >
      <div className="flex">
        <ModalTrigger
          type="confirm-danger"
          action={() => sandpack.sandpack.resetAllFiles()}
          options={{
            title: 'Reset code',
            description: 'Are you sure you want to reset the code?',
          }}
        >
          <Button variant="outline" size="icon">
            <RotateCcw size={15} />
          </Button>
        </ModalTrigger>
      </div>
      <div className={cn('flex gap-x-2  md:absolute md:left-1/2 md:-translate-x-1/2', isMobileBreakpoint && 'hidden')}>
        <Button className="gap-x-1" variant={'outline'}>
          <List size={17} />
          Questions list
        </Button>
      </div>
      <div className="flex space-x-2">
        <ToggleCompleteButton questionId={questionId} user={user} />
        <Button variant={'outline'} size={'sm'} className={cn('flex align-center space-x-2')} onClick={runCode}>
          <Play size={15} />
          {!isMobileBreakpoint && <div>Run</div>}
        </Button>
      </div>
    </div>
  )
}
