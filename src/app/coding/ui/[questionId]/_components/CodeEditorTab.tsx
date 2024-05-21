'use client'
import Editor from '@monaco-editor/react'
import {
  useActiveCode,
  FileTabs,
  useSandpack,
  SandpackFileExplorer,
  SandpackCodeEditor,
  SandpackFile,
} from '@codesandbox/sandpack-react'
import { TypographyMuted, TypographyP } from '@/components/typography'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { ResizablePanelTabs } from '../../../_components/ResizablePanelTabs'
import { CustomTabsContent } from '../../../_components/CustomTabComponents'
import { useIsMobileBreakpoint } from '@/hooks/useIsMobileBreakpoint'
import { FilesObject } from './UserInterfaceContainer'
import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c'
import { Braces, Code } from 'lucide-react'
import { getIconForLanguage } from '../../../utils/getIconForLanguage'
import MonacoEditor from '../../../_components/MonacoEditor'

/**
 * Renders a ResizablePanelTabs component with a Monaco Editor.
 *
 * @returns ResizablePanelTabs
 */
function CodeEditorTab({
  currentTheme,
  isSolution,
  setIsSolution,
  defaultSize,
}: {
  currentTheme: string | undefined
  isSolution: boolean
  setIsSolution: (value: boolean) => void
  defaultSize: number
}) {
  const { code, updateCode } = useActiveCode()
  const { sandpack } = useSandpack()

  const fileExtenstion = sandpack.activeFile.split('.').pop()
  const resolvedLanguage = fileExtenstion === 'js' ? 'javascript' : fileExtenstion

  const isMobileBreakpoint = useIsMobileBreakpoint()

  const handleResetCode = () => {
    sandpack.resetAllFiles()
    setIsSolution(false)
  }

  const filteredFiles = Object.values(sandpack.files as FilesObject).filter(file => file.id)
  const filesTabs = filteredFiles.map(file => {
    return {
      value: file.path,
      label: file.name,
      icon: getIconForLanguage(file.language),
    }
  })

  return (
    <ResizablePanelTabs defaultSize={defaultSize} defaultValue="editor" tabs={filesTabs} overrideDefaultBehavior={true}>
      <CustomTabsContent value="editor" className="p-0 size-full">
        {isMobileBreakpoint ? (
          <SandpackCodeEditor className="size-full h-[400px]" showTabs={false} />
        ) : (
          <div className="size-full">
            {/* <SandpackFileExplorer /> */}
            {/* <FileTabs /> */}
            <div className={cn('items-center text-center py-1 bg-orange-600', isSolution ? 'block' : 'hidden')}>
              <TypographyP className="text-center ">
                You are viewing the solution code.{' '}
                <span onClick={handleResetCode} className="cursor-pointer underline">
                  Reset code
                </span>
              </TypographyP>
            </div>
            <div className="size-full">
              <MonacoEditor currentTheme={currentTheme} />
            </div>
          </div>
        )}
      </CustomTabsContent>
    </ResizablePanelTabs>
  )
}

export default CodeEditorTab
