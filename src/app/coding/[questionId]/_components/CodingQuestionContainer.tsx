'use client'
import {
  SandpackPreview,
  SandpackProvider,
  SandpackConsole,
  SandpackThemeProp,
  useSandpack,
  ErrorOverlay,
  Sandpack,
  SandpackLayout,
  SandpackCodeEditor,
} from '@codesandbox/sandpack-react'
import { cn } from '@/lib/utils'
import { ResizablePanelGroup } from '@/components/ui/resizable'
import { useIsMobileBreakpoint } from '@/hooks/useIsMobileBreakpoint'
import { TypographyH4, TypographyMuted, TypographyP } from '@/components/typography'

import { useTheme } from 'next-themes'
import useSupabaseBrowser from '@/supabase-utils/supabase-client'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useIsMobileAgent } from '@/hooks/useUserAgent'
import InfoPopUp from '@/components/InfoPopUp'
import { useGetCurrentUrl } from '@/hooks/useGetCurrentUrl'
import { MarkdownRenderer } from '@/components/markdown'
import { descriptionTabs, browserTabs } from '../utils/tabs-data'
import { BottomToolbar } from './BottomToolBar'
import { CustomTabsContent } from './CustomTabComponents'
import { MonacoEditor } from './MonacoEditor'
import { ResizeHandle } from './ResizableHandleCustom'
import { ResizablePanelTabs } from './ResizablePanelTabs'
import SavedCode from './SavedCode'
import { User } from '@supabase/auth-js/dist/module/lib/types'
import { CodingQuestion } from '@/supabase-utils/types'
import { Button } from '@/components/custom/button'
import SolutionTab from './SolutionTab'
import SandpackPreviewClient from './SandpackPreview'

type FilesObject = {
  [key: string]: {
    code: string
    id: string
    path: string
  }
}

type CodingQuestionProps = {
  idFromParams: string
  user: User | null
  coding_question: CodingQuestion
}

export default function CodingQuestionContainer({ idFromParams, user, coding_question }: CodingQuestionProps) {
  const { resolvedTheme } = useTheme()
  const isMobileBreakpoint = useIsMobileBreakpoint()
  const isMobileAgent = useIsMobileAgent()
  const currentUrl = useGetCurrentUrl()

  const [defaultSize, setDefaultSize] = useState<number[]>([30, 40, 30])
  const [popupOpen, setPopupOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | undefined>(undefined)
  const [isSolution, setIsSolution] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      setCurrentTheme('dark')
    } else if (resolvedTheme === 'light') {
      setCurrentTheme('light')
    } else {
      setCurrentTheme(undefined)
    }
  }, [resolvedTheme])

  useEffect(() => {
    setPopupOpen(isMobileAgent)
  }, [isMobileAgent])

  async function copyUrlAndClose() {
    try {
      await navigator.clipboard.writeText(currentUrl)
      toast.success('Copied to clipboard!')
    } catch (e) {
      toast.error('Failed to copy to clipboard.')
    }
  }

  const filesObject = useMemo(() => {
    return coding_question?.coding_question_files.reduce((obj: FilesObject, file) => {
      if (file.path !== null && file.content !== null) {
        obj[file.path] = { code: file.content, id: file.id, path: file.path }
      }
      return obj
    }, {})
  }, [])

  if (!isMounted) return null
  if (!coding_question) return null
  return (
    <main
      id="content"
      className={cn(
        'flex size-full pt-3 px-3 overflow-scroll flex-col',
        isMobileBreakpoint ? '!min-h-[calc(100dvh-3.5rem)]' : '!h-[calc(100dvh-3.5rem)]',
      )}
    >
      <SandpackProvider
        template={'vanilla'}
        theme={currentTheme === undefined ? 'auto' : (currentTheme as SandpackThemeProp)}
        className={'!size-full !overflow-hidden !flex !flex-col'}
        files={filesObject}
      >
        <SandpackLayout className={'!size-full !overflow-hidden !flex !flex-col !bg-transparent !border-none'}>
          <ResizablePanelGroup
            direction={isMobileBreakpoint ? 'vertical' : 'horizontal'}
            className={cn('relative size-full grow', isMobileBreakpoint && 'pb-16 space-y-2')}
            onResize={() => {
              if (isMobileBreakpoint) {
                setDefaultSize([100, 100, 100])
              } else {
                setDefaultSize([30, 40, 30])
              }
            }}
          >
            {/* Descripition Panel*/}
            <ResizablePanelTabs
              extraClassName={isMobileBreakpoint ? '!flex-none ' : ''}
              defaultSize={defaultSize[0]}
              setDefaultSize={setDefaultSize}
              minSize={15}
              defaultValue="description"
              tabs={descriptionTabs}
            >
              <CustomTabsContent value="description" className="p-4 space-y-4 justify-center">
                <TypographyH4>{coding_question?.title}</TypographyH4>
                <article className={'prose dark:prose-invert prose-pre:p-0'}>
                  <MarkdownRenderer>{coding_question?.description}</MarkdownRenderer>
                </article>
              </CustomTabsContent>
              <CustomTabsContent value="solution" className="p-4 space-y-4 justify-center">
                <SolutionTab originalFiles={coding_question?.coding_question_files} setIsSolution={setIsSolution} />
                <article className={'prose dark:prose-invert prose-pre:p-0'}>
                  <MarkdownRenderer>{coding_question?.solution}</MarkdownRenderer>
                </article>
              </CustomTabsContent>
              <CustomTabsContent value="saved_code" className="p-4 space-y-4 min-h-full flex">
                <SavedCode questionId={idFromParams} user={user} />
              </CustomTabsContent>
            </ResizablePanelTabs>

            <ResizeHandle />

            {/* Editor Panel*/}
            <ResizablePanelTabs
              extraClassName={isMobileBreakpoint ? '!flex-none ' : ''}
              defaultSize={defaultSize[1]}
              setDefaultSize={setDefaultSize}
              minSize={15}
              defaultValue="editor"
            >
              <CustomTabsContent value="editor" className="p-0 size-full">
                {isMobileBreakpoint ? (
                  <SandpackCodeEditor className="size-full h-[400px]" />
                ) : (
                  <MonacoEditor currentTheme={currentTheme} isSolution={isSolution} setIsSolution={setIsSolution} />
                )}
              </CustomTabsContent>
            </ResizablePanelTabs>

            <ResizeHandle />
            {/* Preview Panel*/}
            <ResizablePanelTabs
              extraClassName={isMobileBreakpoint ? '!flex-none h-[500px]' : ''}
              defaultSize={defaultSize[2]}
              setDefaultSize={setDefaultSize}
              minSize={15}
              defaultValue="browser"
              tabs={browserTabs}
            >
              <CustomTabsContent value="browser" className="p-0 size-full">
                <SandpackPreviewClient />
              </CustomTabsContent>
              <CustomTabsContent value="console" className="p-0 size-full">
                <SandpackConsole className={'size-full'} standalone={false} />
              </CustomTabsContent>
            </ResizablePanelTabs>
          </ResizablePanelGroup>
        </SandpackLayout>

        <BottomToolbar filesObject={filesObject} user={user} questionId={idFromParams} />
        {/* <InfoPopUp
          open={popupOpen}
          setOpen={setPopupOpen}
          title={'Editor is not available on mobile devices'}
          description="Copy link and continue on laptop"
          closeAction={copyUrlAndClose}
          closeText={'Copy Link & Close'}
        /> */}
      </SandpackProvider>
    </main>
  )
}
