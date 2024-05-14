'use client'
import { Button } from '@/components/custom/button'
import { useIsMobileBreakpoint } from '@/hooks/useIsMobileBreakpoint'
import { cn } from '@/lib/utils'
import { useActiveCode, useSandpack } from '@codesandbox/sandpack-react'
import { Settings, ChevronLeft, List, ChevronRight, Save, Check } from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'sonner'
import { TypedSupabaseClient } from '@/supabase-utils/types'
import { useRouter, usePathname } from 'next/navigation'
import { saveCodingQuestionFile } from '../_api/saveCodingFiles'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@supabase/auth-js'

type FilesObject = {
  [key: string]: {
    code: string
    id: string
    path: string
  }
}
export function BottomToolbar({
  supabase,
  filesObject,
  user,
  questionId,
}: {
  supabase: TypedSupabaseClient
  filesObject: FilesObject | undefined
  user: User | null
  questionId: string
}) {
  const isMobileBreakpoint = useIsMobileBreakpoint()
  const router = useRouter()
  const pathname = usePathname()

  // Save code function
  const { sandpack } = useSandpack()
  const { files } = sandpack

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      if (!filesObject) return

      const filesArray = Object.values(filesObject).map(file => ({
        content: files[file.path].code,
        id: file.id,
        user_id: user?.id,
      }))

      const { status, error } = await supabase.from('user_saved_coding_question_files').upsert(filesArray)
      if (error) throw error
      console.log(status)
      return status
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedCode', questionId] })
      toast.success('Code saved successfully')
    },
    onError: error => {
      toast.error(`${error.message}`)
    },
  })

  const handleSaveCode = () => {
    if (!user) {
      toast.error('Please login to save code')
      return
    }
    mutation.mutate()
  }

  const handleMarkCompleted = async () => {
    console.log('Mark completed')
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
        <Button variant="outline" size="icon" className={cn(isMobileBreakpoint && 'hidden')}>
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
      <div className="flex space-x-2">
        <Button
          variant={'secondary'}
          size={'sm'}
          className={cn('flex align-center space-x-2', isMobileBreakpoint && 'hidden')}
          onClick={handleMarkCompleted}
        >
          <Check size={15} />

          <div>Mark Completed</div>
        </Button>
        <Button
          variant={'secondary'}
          size={'sm'}
          className={cn('flex align-center space-x-2', isMobileBreakpoint && 'hidden')}
          onClick={handleSaveCode}
        >
          <Save size={15} />
          <div>Save</div>
        </Button>
      </div>
    </div>
  )
}
