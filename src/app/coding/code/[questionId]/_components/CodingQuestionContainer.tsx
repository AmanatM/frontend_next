'use client'
import {
  SandpackProvider,
  SandpackConsole,
  SandpackThemeProp,
  SandpackLayout,
  SandpackPreview,
  SandpackFile,
} from '@codesandbox/sandpack-react'
import { cn } from '@/lib/utils'
import { ResizablePanelGroup } from '@/components/ui/resizable'
import { useIsMobileBreakpoint } from '@/hooks/useIsMobileBreakpoint'
import { TypographyH4 } from '@/components/typography'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MarkdownRenderer } from '@/components/markdown'

import { User } from '@supabase/auth-js/dist/module/lib/types'
import { CodingQuestion } from '@/supabase-utils/types'
import { CustomTabsContent } from '@/app/coding/_components/CustomTabComponents'
import { ResizeHandle } from '@/app/coding/_components/ResizableHandleCustom'
import { ResizablePanelTabs } from '@/app/coding/_components/ResizablePanelTabs'
import { CODE_description_tabs, CODE_result_tabs } from '@/app/coding/utils/tabs-data'
import Submissions from './Submissions'
import MonacoEditor from '@/app/coding/_components/MonacoEditor'
import { BottomToolbar_code } from './BottomToolBar'

export interface FilesObject {
  [key: string]: {
    id: string
    path: string
    name: string
    language: string | null
  } & SandpackFile
}

type CodingQuestionProps = {
  idFromParams: string
  user: User | null
  coding_question: CodingQuestion
}

export default function CodingQuestionContainer({ idFromParams, user, coding_question }: CodingQuestionProps) {
  const { resolvedTheme } = useTheme()
  const isMobileBreakpoint = useIsMobileBreakpoint()

  const [defaultSize, setDefaultSize] = useState<number[]>([30, 40, 30])
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

  // const filesObject = useMemo(() => {
  //   return coding_question?.coding_question_files.reduce((obj: FilesObject, file) => {
  //     if (file.path !== null && file.content !== null) {
  //       obj[file.path] = { code: file.content, id: file.id, path: file.path, name: file.name, language: file.language }
  //     }
  //     return obj
  //   }, {})
  // }, [])

  const files = {
    'index.js': {
      code: `console.log('Hello World')`,
      language: 'javascript',
    },
  }

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
        template={coding_question?.sandpack_template || 'vanilla'}
        theme={currentTheme === undefined ? 'auto' : (currentTheme as SandpackThemeProp)}
        className={'!size-full !overflow-hidden !flex !flex-col'}
        files={files}
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
            <ResizablePanelTabs defaultSize={defaultSize[0]} defaultValue="description" tabs={CODE_description_tabs}>
              <CustomTabsContent value="description" className="p-4 space-y-4 justify-center">
                <TypographyH4>{coding_question?.title}</TypographyH4>
                <article className={'prose dark:prose-invert prose-pre:p-0'}>
                  <MarkdownRenderer>{coding_question?.description}</MarkdownRenderer>
                </article>
              </CustomTabsContent>
              <CustomTabsContent value="solution" className="p-4 space-y-4 justify-center">
                {/* <SolutionTab
                  originalFiles={coding_question?.coding_question_files}
                  setIsSolution={setIsSolution}
                  isSolution={isSolution}
                /> */}
                <article className={'prose dark:prose-invert prose-pre:p-0'}>
                  <MarkdownRenderer>{coding_question?.solution}</MarkdownRenderer>
                </article>
              </CustomTabsContent>
              <CustomTabsContent value="submissions" className="p-4 space-y-4 min-h-full flex">
                <Submissions questionId={idFromParams} user={user} />
              </CustomTabsContent>
            </ResizablePanelTabs>

            <ResizeHandle />

            {/* Editor Panel*/}
            <ResizablePanelTabs
              extraClassName={cn(isMobileBreakpoint && 'h-[500px]')}
              defaultSize={defaultSize[1]}
              defaultValue="console"
              tabs={CODE_result_tabs}
            >
              <MonacoEditor currentTheme={currentTheme} />
            </ResizablePanelTabs>
            <ResizeHandle />

            {/* Preview Panel*/}
            <ResizablePanelTabs
              extraClassName={cn(isMobileBreakpoint && 'h-[500px]')}
              defaultSize={defaultSize[2]}
              defaultValue="console"
              tabs={CODE_result_tabs}
            >
              <CustomTabsContent value="console" className="p-0 size-full">
                <SandpackConsole className={'size-full'} standalone={false} />
              </CustomTabsContent>
              <CustomTabsContent value="browser" className="p-0 size-full">
                <SandpackPreview
                  showSandpackErrorOverlay={true}
                  showNavigator={true}
                  showOpenInCodeSandbox={false}
                  className={'size-full'}
                />
              </CustomTabsContent>
            </ResizablePanelTabs>
          </ResizablePanelGroup>
        </SandpackLayout>

        <BottomToolbar_code user={user} questionId={idFromParams} />
      </SandpackProvider>
    </main>
  )
}