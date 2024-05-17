'use client'
import { Button } from '@/components/custom/button'
import { useIsMobileBreakpoint } from '@/hooks/useIsMobileBreakpoint'
import { cn } from '@/lib/utils'
import { useSandpack } from '@codesandbox/sandpack-react'
import { Settings, ChevronLeft, List, ChevronRight, Save, Check, FileCheck } from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'sonner'
import { CodingQuestion, TypedSupabaseClient } from '@/supabase-utils/types'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { User } from '@supabase/auth-js'
import { useTransition } from 'react'

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
  coding_question,
  isQuestionMarkedComplete,
}: {
  supabase: TypedSupabaseClient
  filesObject: FilesObject | undefined
  user: User | null
  questionId: string
  coding_question: CodingQuestion
  isQuestionMarkedComplete: boolean
}) {
  const isMobileBreakpoint = useIsMobileBreakpoint()

  const { sandpack } = useSandpack()
  const { files } = sandpack
  const queryClient = useQueryClient()

  const { data: isMarkedComplete } = useQuery({
    queryKey: ['isMarkedComplete', questionId, user?.id],
    queryFn: async () => {
      if (!user) return

      const { data, error } = await supabase
        .from('user_completed_code_question')
        .select(`*`)
        .eq('question_id', questionId)
        .eq('user_id', user?.id)
      if (error) throw new Error(error.message)
      if (!data || data.length === 0) {
        return false
      }
      return true
    },
    enabled: !!user,
  })

  const saveCodeMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error('Please login to save code')
      }
      if (!filesObject) return

      const filesArray = Object.values(filesObject).map(file => ({
        content: files[file.path].code,
        file_id: file.id,
        user_id: user?.id,
        question_id: questionId,
        path: file.path,
      }))

      const { status, error } = await supabase.from('user_saved_coding_question_files').upsert(filesArray)
      if (error) throw error
      console.log(status)
      return status
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedCode', questionId, user?.id] })
      toast.success('Code saved successfully', {
        icon: <FileCheck size={15} />,
      })
    },
    onError: error => {
      toast.error(`${error.message}`)
    },
  })

  const handleSaveCode = () => {
    saveCodeMutation.mutate()
  }

  const toggleUserCompleteMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error('Login to first')
      }

      if (isMarkedComplete) {
        const data = await supabase
          .from('user_completed_code_question')
          .delete()
          .eq('user_id', user.id)
          .eq('question_id', questionId)
        if (data.error && data.error.code !== '23505') {
          //if error code is not unique_violation
          throw new Error(data.error.code)
        }
        return data.status
      } else {
        const data = await supabase
          .from('user_completed_code_question')
          .insert({ user_id: user.id, question_id: questionId })
        if (data.error && data.error.code !== '23505') {
          throw new Error(data.error.code)
        }

        return data.status
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isMarkedComplete', questionId, user?.id] })
    },
    onError: error => {
      toast.error(`${error.message}`)
    },
  })

  const handleMarkCompleted = async () => {
    toggleUserCompleteMutation.mutate()
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
      <div className="flex gap-x-2  md:absolute md:left-1/2 md:-translate-x-1/2">
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
          className={cn(
            'flex align-center space-x-1 transition',
            isMobileBreakpoint && 'hidden',
            isMarkedComplete && 'bg-green-700 hover:bg-green-700',
          )}
          disabled={toggleUserCompleteMutation.isPending}
          leftIcon={isMarkedComplete ? <Check size={15} /> : undefined}
          onClick={handleMarkCompleted}
        >
          <div>{isMarkedComplete ? 'Completed' : 'Mark as complete'}</div>
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
