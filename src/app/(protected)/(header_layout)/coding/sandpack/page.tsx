'use client'
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  SandpackConsole,
  SandpackTheme,
} from '@codesandbox/sandpack-react'
import { cn } from '@/lib/utils'
import { ResizablePanelGroup } from '@/components/ui/resizable'
import { useIsMobileBreakpoint } from '@/hooks/useIsMobileBreakpoint'
import { TypographyH4, TypographyP } from '@/components/typography'
import { TabsContent } from '@radix-ui/react-tabs'
import { MarkdownRenderer } from '../[questionId]/_components/markdown'
import { ResizeHandle } from '../[questionId]/_components/ResizableHandleCustom'
import { ResizablePanelTabs } from '../[questionId]/_components/ResizablePanelTabs'
import { BottomToolbar } from './_components/BottomToolBar'
import { browserTabs, descriptionTabs } from './utils/tabs-data'
import { mockFiles } from './utils/mockFiles'
import { useTheme } from 'next-themes'
import { useSandpack } from '@codesandbox/sandpack-react'
import { MonacoEditor } from './_components/MonacoEditor'

// const SimpleCodeViewer = () => {
//   const { sandpack } = useSandpack()
//   const { files, activeFile } = sandpack

//   const code = files[activeFile].code
//   return <pre>{code}</pre>
// }

const files = {
  '/App.js': `
import React from 'react';
function App() {
  const [count, setCount] = React.useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
export default App;
  `,
}

export default function Example() {
  const isMobileBreakpoint = useIsMobileBreakpoint()
  // const { theme } = useTheme()
  // const globalTheme = theme === 'system' ? 'auto' : theme
  return (
    <main id="content" className={cn('flex size-full pt-3 px-3 overflow-scroll md:flex-col')}>
      <SandpackProvider
        template="static"
        className={'!size-full'}
        files={{
          '/index.html': '<div id="root"><h1>Hello title mitle</h1></div>',
          '/style.css': 'body { background-color: red; }',
        }}
      >
        <ResizablePanelGroup direction={isMobileBreakpoint ? 'vertical' : 'horizontal'} className="relative">
          {/* Descripition Panel*/}
          <ResizablePanelTabs defaultSize={30} minSize={15} defaultValue="description" tabs={descriptionTabs}>
            <TabsContent value="description" className="p-4 space-y-4 justify-center">
              <TypographyH4>Title</TypographyH4>
              <article className={'prose dark:prose-invert prose-pre:p-0'}>
                <MarkdownRenderer>MarkDown</MarkdownRenderer>
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
              <SandpackCodeEditor className="size-full" />
            </TabsContent>
          </ResizablePanelTabs>

          <ResizeHandle />
          {/* Preview Panel*/}
          <ResizablePanelTabs defaultSize={30} minSize={15} defaultValue="browser" tabs={browserTabs}>
            <TabsContent value="browser" className="p-0 size-full">
              <SandpackPreview
                showNavigator
                showRefreshButton={true}
                showOpenInCodeSandbox={false}
                className={'size-full'}
              />
            </TabsContent>
            <TabsContent value="console" className="p-0 size-full">
              <SandpackConsole />
            </TabsContent>
          </ResizablePanelTabs>
        </ResizablePanelGroup>
      </SandpackProvider>

      <BottomToolbar handleSaveCode={() => console.log('save')} />
    </main>
  )
}
