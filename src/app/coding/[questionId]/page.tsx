'use client'
import {
  SandpackPreview,
  SandpackProvider,
  SandpackConsole,
  SandpackFileExplorer,
  SandpackCodeEditor,
} from '@codesandbox/sandpack-react'
import { cn } from '@/lib/utils'
import { ResizablePanelGroup } from '@/components/ui/resizable'
import { useIsMobileBreakpoint } from '@/hooks/useIsMobileBreakpoint'
import { TypographyH4, TypographyP } from '@/components/typography'
import { TabsContent } from '@radix-ui/react-tabs'
import { MarkdownRenderer } from './_components/markdown'
import { ResizeHandle } from './_components/ResizableHandleCustom'
import { ResizablePanelTabs } from './_components/ResizablePanelTabs'
import { BottomToolbar } from './_components/BottomToolBar'
import { browserTabs, descriptionTabs } from './utils/tabs-data'
import { useTheme } from 'next-themes'
import { MonacoEditor } from './_components/MonacoEditor'
import { useEffect, useState } from 'react'
import { PanelTop } from 'lucide-react'
import useSupabaseBrowser from '@/supabase-utils/supabase-client'
import { set } from 'react-hook-form'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { getQuestionById } from './_api/getQuestionById'
import { SandpackTemplate } from '@/supabase-utils/types'

type FilesObject = {
  [key: string]: {
    code: string
  }
}

export default function Example({ params }: { params: { questionId: string } }) {
  const { resolvedTheme } = useTheme()
  const supabase = useSupabaseBrowser()

  const isMobileBreakpoint = useIsMobileBreakpoint()
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const {
    data: coding_question,
    isLoading,
    isError,
    error,
  } = useQuery(getQuestionById(supabase, params.questionId), {
    retry: 1,
    staleTime: 0,
  })

  const filesObject = coding_question?.coding_question_files.reduce((obj: FilesObject, file) => {
    if (file.path !== null && file.content !== null) {
      obj[file.path] = { code: file.content }
    }
    return obj
  }, {})

  console.log(filesObject)

  if (isLoading)
    return (
      <main
        id="content"
        className={cn(
          'flex size-full justify-center items-center space-y-3 pt-3 px-3 overflow-scroll flex-col !h-[calc(100dvh-3.5rem)]',
        )}
      >
        <TypographyH4>Loading...</TypographyH4>
      </main>
    )

  if (isError || !coding_question)
    return (
      <main
        id="content"
        className={cn(
          'flex size-full justify-center items-center space-y-3 pt-3 px-3 overflow-scroll flex-col !h-[calc(100dvh-3.5rem)]',
        )}
      >
        <TypographyH4>Something Went Wrong</TypographyH4>
        <TypographyP className="text-center">{error?.message}</TypographyP>
      </main>
    )

  return (
    <main id="content" className={cn('flex size-full pt-3 px-3 overflow-scroll flex-col !h-[calc(100dvh-3.5rem)]')}>
      <SandpackProvider
        template={coding_question?.sandpack_template}
        theme={isMounted && resolvedTheme === 'dark' ? 'dark' : 'dark'}
        className={'!size-full !overflow-hidden'}
        files={filesObject}
      >
        <ResizablePanelGroup
          direction={isMobileBreakpoint ? 'vertical' : 'horizontal'}
          className="relative size-full grow"
        >
          {/* Descripition Panel*/}
          <ResizablePanelTabs defaultSize={30} minSize={15} defaultValue="description" tabs={descriptionTabs}>
            <TabsContent value="description" className="p-4 space-y-4 justify-center">
              <TypographyH4>{coding_question?.title}</TypographyH4>
              <article className={'prose dark:prose-invert prose-pre:p-0'}>
                <MarkdownRenderer>{coding_question?.description}</MarkdownRenderer>
              </article>
            </TabsContent>
            <TabsContent value="solution" className="p-4">
              <TypographyH4>Solution</TypographyH4>
              <TypographyP>Content</TypographyP>
            </TabsContent>
            <TabsContent value="saved_code" className="p-4">
              <TypographyH4>Saved Code</TypographyH4>
            </TabsContent>
          </ResizablePanelTabs>

          <ResizeHandle />

          {/* Editor Panel*/}
          <ResizablePanelTabs defaultSize={40} minSize={15} defaultValue="editor">
            <TabsContent value="editor" className="p-0 size-full">
              {/* <SandpackCodeEditor className="size-full" /> */}
              <MonacoEditor />
            </TabsContent>
          </ResizablePanelTabs>

          <ResizeHandle />
          {/* Preview Panel*/}
          <ResizablePanelTabs
            defaultSize={30}
            minSize={15}
            defaultValue="browser"
            tabs={[
              {
                value: 'browser',
                label: 'Browser',
                icon: <PanelTop size={15} />,
              },
            ]}
          >
            <TabsContent value="browser" className="p-0 size-full">
              <SandpackPreview
                showSandpackErrorOverlay={true}
                showNavigator={true}
                showOpenInCodeSandbox={true}
                className={'size-full'}
              />
            </TabsContent>
          </ResizablePanelTabs>
        </ResizablePanelGroup>
      </SandpackProvider>

      <BottomToolbar handleSaveCode={() => console.log('save')} />
    </main>
  )
}
