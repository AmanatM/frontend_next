'use client'
import { Button } from '@/components/custom/button'
import { useIsMobileBreakpoint } from '@/hooks/useIsMobileBreakpoint'
import { cn } from '@/lib/utils'
import { useActiveCode, useSandpack } from '@codesandbox/sandpack-react'
import { Settings, ChevronLeft, List, ChevronRight, Save } from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'sonner'
import { TypedSupabaseClient } from '@/supabase-utils/types'
import { useRouter, usePathname } from 'next/navigation'
import { saveCodingQuestionFile } from '../_api/saveCodingFiles'

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
}: {
  supabase: TypedSupabaseClient
  filesObject: FilesObject | undefined
}) {
  const isMobileBreakpoint = useIsMobileBreakpoint()
  const router = useRouter()
  const pathname = usePathname()

  // Save code function
  const { sandpack } = useSandpack()
  const { files, activeFile } = sandpack
  const { code } = useActiveCode()

  const handleSaveCode = async () => {
    const { data: user, error: userError } = await supabase.auth.getUser()
    if (userError) {
      toast.error('Please login to save code', {
        action: { label: 'Login', onClick: () => router.push(`/login?redirectTo=${pathname}`) },
      })
      return
    }

    if (!filesObject) return

    const filesArray = Object.values(filesObject).map(file => ({
      content: files[file.path].code, // Fix: Use file.code instead of file
      id: file.id,
      user_id: user.user.id,
    }))

    toast.promise(saveCodingQuestionFile(supabase, filesArray), {
      loading: 'Logging out...',
      success: 'Code saved successfully',
      error: error => `${error.message}`,
    })
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
        'flex flex-wrap items-center justify-between gap-2 px-3 py-3 bg-background',
        isMobileBreakpoint ? 'fixed bottom-0 left-0 right-0' : '',
      )}
    >
      <div className="flex">
        <Button variant="outline" size="icon">
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
      <div className="flex">
        <Button variant={'secondary'} size={'sm'} className="flex align-center space-x-2" onClick={handleSaveCode}>
          <Save size={15} />
          <div>Save</div>
        </Button>
      </div>
    </div>
  )
}
