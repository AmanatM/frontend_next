'use client'
import { SandpackPreview, SandpackProvider, SandpackConsole, SandpackThemeProp } from '@codesandbox/sandpack-react'
import { cn } from '@/lib/utils'
import { ResizablePanelGroup } from '@/components/ui/resizable'
import { useIsMobileBreakpoint } from '@/hooks/useIsMobileBreakpoint'
import { TypographyH4, TypographyP } from '@/components/typography'

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
import { Skeleton } from '@/components/ui/skeleton'

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
  const supabase = useSupabaseBrowser()
  const isMobileBreakpoint = useIsMobileBreakpoint()
  const isMobileAgent = useIsMobileAgent()
  const currentUrl = useGetCurrentUrl()

  const [defaultSize, setDefaultSize] = useState<number[]>([30, 40, 30])
  const [popupOpen, setPopupOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | undefined>(undefined)

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

  const filesObject = useMemo(() => {
    return coding_question?.coding_question_files.reduce((obj: FilesObject, file) => {
      if (file.path !== null && file.content !== null) {
        obj[file.path] = { code: file.content, id: file.id, path: file.path }
      }
      return obj
    }, {})
  }, [coding_question?.coding_question_files])

  async function copyUrlAndClose() {
    try {
      await navigator.clipboard.writeText(currentUrl)
      toast.success('Copied to clipboard!')
    } catch (e) {
      toast.error('Failed to copy to clipboard.')
    }
  }

  if (!isMounted) return null

  return (
    <main id="content" className={cn('flex size-full pt-3 px-3 overflow-scroll flex-col !h-[calc(100dvh-3.5rem)]')}>
      <SandpackProvider
        template={coding_question?.sandpack_template}
        theme={currentTheme === undefined ? 'auto' : (currentTheme as SandpackThemeProp)}
        className={'!size-full !overflow-hidden !flex !flex-col'}
        files={filesObject}
        options={{
          recompileDelay: 1000,
        }}
      >
        <ResizablePanelGroup
          direction={isMobileBreakpoint ? 'vertical' : 'horizontal'}
          className="relative size-full grow"
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
            <CustomTabsContent value="solution" className="p-4">
              <TypographyH4>Solution</TypographyH4>
              <TypographyP>Content</TypographyP>
            </CustomTabsContent>
            <CustomTabsContent value="saved_code" className="p-4 space-y-4">
              <TypographyH4>Saved Code</TypographyH4>
              <SavedCode questionId={idFromParams} />
            </CustomTabsContent>
          </ResizablePanelTabs>

          <ResizeHandle />

          {/* Editor Panel*/}
          <ResizablePanelTabs
            defaultSize={defaultSize[1]}
            setDefaultSize={setDefaultSize}
            minSize={15}
            defaultValue="editor"
          >
            <CustomTabsContent value="editor" className="p-0 size-full">
              {/* <SandpackCodeEditor className="size-full" /> */}
              <MonacoEditor currentTheme={currentTheme} />
            </CustomTabsContent>
          </ResizablePanelTabs>

          <ResizeHandle />
          {/* Preview Panel*/}
          <ResizablePanelTabs
            extraClassName={isMobileBreakpoint ? '!flex-none h-full' : ''}
            defaultSize={defaultSize[2]}
            setDefaultSize={setDefaultSize}
            minSize={15}
            defaultValue="browser"
            tabs={browserTabs}
          >
            <CustomTabsContent value="browser" className="p-0 size-full">
              <SandpackPreview
                showSandpackErrorOverlay={true}
                showNavigator={true}
                showOpenInCodeSandbox={false}
                className={'size-full'}
              />
              {/* <SandpackPreviewClient /> */}
            </CustomTabsContent>
            <CustomTabsContent value="console" className="p-0 size-full">
              <SandpackConsole className={'size-full'} standalone={false} />
            </CustomTabsContent>
          </ResizablePanelTabs>
        </ResizablePanelGroup>

        <BottomToolbar supabase={supabase} filesObject={filesObject} />
        <InfoPopUp
          open={popupOpen}
          setOpen={setPopupOpen}
          title={'Editor is not available on mobile devices'}
          description="Copy link and continue on laptop"
          closeAction={copyUrlAndClose}
          closeText={'Copy Link & Close'}
        />
      </SandpackProvider>
    </main>
  )
}
