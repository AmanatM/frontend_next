'use client'
import {
  SandpackProvider,
  SandpackConsole,
  SandpackThemeProp,
  SandpackLayout,
  SandpackPreview,
  SandpackFile,
  SandpackFileExplorer,
  SandpackTests,
  SandpackCodeEditor,
} from '@codesandbox/sandpack-react'
import { cn } from '@/lib/utils'
import { ResizablePanelGroup } from '@/components/ui/resizable'
import { useIsMobileBreakpoint } from '@/hooks/useIsMobileBreakpoint'
import { TypographyH4 } from '@/components/typography'

import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'
import { MarkdownRenderer } from '@/components/markdown'

import { User } from '@supabase/auth-js/dist/module/lib/types'
import {
  CodingQuestion,
  SandpackFile_CODE,
  Question_CODE,
  SandpackFile_UI,
  QuestionFile_CODE,
} from '@/supabase-utils/types'
import { CustomTabsContent } from '@/app/coding/_components/CustomTabComponents'
import { ResizeHandle } from '@/app/coding/_components/ResizableHandleCustom'
import { ResizablePanelTabs } from '@/app/coding/_components/ResizablePanelTabs'
import { CODE_description_tabs, CODE_editor_tabs, CODE_result_tabs } from '@/app/coding/utils/tabs-data'
import Submissions from './Submissions'
import MonacoEditor from '@/app/coding/_components/MonacoEditor'
import { BottomToolbar_code } from './BottomToolBar_code'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'

type CodingQuestionProps = {
  idFromParams: string
  user: User | null
  coding_question: Question_CODE
}

export default function CodingQuestionContainer({ idFromParams, user, coding_question }: CodingQuestionProps) {
  const { resolvedTheme } = useTheme()
  const isMobileBreakpoint = useIsMobileBreakpoint()

  const [defaultSize, setDefaultSize] = useState<number[]>([30, 40, 30])
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
    if (!isMounted) return
    if (
      !coding_question ||
      !coding_question.coding_question_files_code ||
      coding_question.coding_question_files_code.length === 0
    ) {
      console.error('Error: Invalid coding question data.')
    }
  }, [isMounted, coding_question])

  const filesObject = {
    '/add.ts': {
      code: coding_question.coding_question_files_code[0].code || 'null',
    },
    '/add.test.ts': {
      code: coding_question.coding_question_files_code[0].tests || 'null',
    },
  }

  if (!isMounted) return null
  return (
    <main
      id="content"
      className={cn(
        'flex size-full pt-3 px-3 overflow-scroll flex-col',
        isMobileBreakpoint ? '!min-h-[calc(100dvh-3.5rem)]' : '!h-[calc(100dvh-3.5rem)]',
      )}
    >
      <SandpackProvider
        template={'test-ts'}
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
              defaultValue="code"
              tabs={CODE_editor_tabs}
            >
              <CustomTabsContent value="code" className="p-0 size-full">
                <SandpackFileExplorer />
                <SandpackCodeEditor />
                {/* <MonacoEditor currentTheme={currentTheme} /> */}
              </CustomTabsContent>
              <CustomTabsContent value="test_cases" className="p-0 size-full">
                Test cases
              </CustomTabsContent>
            </ResizablePanelTabs>
            <ResizeHandle />

            {/* Preview Panel*/}
            <ResizablePanelTabs
              extraClassName={cn(isMobileBreakpoint && 'h-[500px]')}
              defaultSize={defaultSize[2]}
              defaultValue="tests"
              tabs={CODE_result_tabs}
            >
              <CustomTabsContent value="console" className="p-0 size-full">
                <SandpackConsole className={'size-full'} standalone resetOnPreviewRestart showHeader={false} />
              </CustomTabsContent>
              <CustomTabsContent value="tests" className="p-0 size-full">
                <SandpackTests hideTestsAndSupressLogs />
              </CustomTabsContent>
            </ResizablePanelTabs>
          </ResizablePanelGroup>
        </SandpackLayout>

        <BottomToolbar_code user={user} questionId={idFromParams} />
      </SandpackProvider>
    </main>
  )
}
