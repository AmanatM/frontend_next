'use client'
import { Button } from '@/components/custom/button'
import { useIsMobileBreakpoint } from '@/hooks/useIsMobileBreakpoint'
import { cn } from '@/lib/utils'
import { useSandpack } from '@codesandbox/sandpack-react'
import { Settings, ChevronLeft, List, ChevronRight, Save, Check, FileCheck, RotateCcw, Circle } from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'sonner'
import { CodingQuestion, TypedSupabaseClient } from '@/supabase-utils/types'

import { useQueryClient } from '@tanstack/react-query'
import { User } from '@supabase/auth-js'
import { useRouter } from 'next/navigation'
import { useIsMarkedComplete } from '../_hooks/useIsMarkedComplete'
import { useToggleMarkComplete } from '../_hooks/useToggleMarkedComplete'
import { useSaveFiles } from '../_hooks/useSaveFiles'
import { ResetIcon } from '@radix-ui/react-icons'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '@/components/ui/credenza'
import { useState } from 'react'
import { ModalTrigger } from '@/components/modal'

type FilesObject = {
  [key: string]: {
    code: string
    id: string
    path: string
  }
}
export function BottomToolbar({
  filesObject,
  user,
  questionId,
}: {
  filesObject: FilesObject | undefined
  user: User | null
  questionId: string
}) {
  const isMobileBreakpoint = useIsMobileBreakpoint()

  const { sandpack } = useSandpack()
  const { files } = sandpack
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: isMarkedComplete } = useIsMarkedComplete({ questionId, user })

  const { mutate: toggleMarkedComplete, isPending: isMarkingComplete } = useToggleMarkComplete()
  const { mutate: saveCode } = useSaveFiles()

  const handleSaveCode = () => {
    if (!filesObject) return
    if (!user) {
      toast.error('Please sign in to save your code')
      return
    }

    const updatedFiles = Object.values(filesObject).map(file => ({
      content: files[file.path].code,
      file_id: file.id,
      user_id: user.id,
      question_id: questionId,
      path: file.path,
    }))

    saveCode(
      { user, updatedFiles },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['savedCode', questionId, user?.id] })
          toast.success('Code saved successfully', {
            icon: <FileCheck size={15} />,
          })
        },
        onError: error => {
          toast.error(`${error.message}`)
        },
      },
    )
  }

  const handleMarkCompleted = () => {
    toggleMarkedComplete(
      { questionId, user, isMarkedComplete },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['isMarkedComplete', questionId, user?.id] })
          router.refresh()
        },
        onError: error => {
          toast.error(`${error.message}`)
        },
      },
    )
  }

  // Save code shortcut(cmd+s)
  useHotkeys(
    'meta+s',
    event => {
      event.preventDefault()
      handleSaveCode()
    },
    { enableOnFormTags: true },
  )

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
          action={() => sandpack.resetAllFiles()}
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
        {/* <Button variant={'outline'} size={'icon'}>
          <ChevronLeft size={17} />
        </Button> */}
        <Button className="gap-x-1" variant={'outline'}>
          <List size={17} />
          Questions list
        </Button>
        {/* <Button variant={'outline'} size={'icon'}>
          <ChevronRight size={17} />
        </Button> */}
      </div>
      <div className="flex space-x-2">
        <Button
          variant={'outline'}
          size={'sm'}
          className={cn(
            'flex align-center space-x-0 md:space-x-1 transition',
            isMarkedComplete && 'bg-green-700 hover:bg-green-700',
          )}
          disabled={isMarkingComplete}
          leftIcon={isMarkedComplete ? <Check size={15} /> : undefined}
          onClick={handleMarkCompleted}
        >
          {isMobileBreakpoint ? (
            <>{!isMarkedComplete && <Check size={15} />}</>
          ) : (
            <div>{isMarkedComplete ? 'Completed' : 'Mark as complete'}</div>
          )}
        </Button>
        <Button variant={'outline'} size={'sm'} className={cn('flex align-center space-x-2')} onClick={handleSaveCode}>
          <Save size={15} />
          {!isMobileBreakpoint && <div>Save</div>}
        </Button>
      </div>
    </div>
  )
}
