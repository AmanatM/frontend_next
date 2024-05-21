'use client'
import Editor from '@monaco-editor/react'
import { useActiveCode, FileTabs, useSandpack, SandpackFileExplorer } from '@codesandbox/sandpack-react'
import { TypographyMuted } from '@/components/typography'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

/**
 * Renders a Monaco Editor component.
 *
 * @returns The rendered Monaco Editor component.
 */
export function MonacoEditor({
  currentTheme,
  isSolution,
  setIsSolution,
}: {
  currentTheme: string | undefined
  isSolution: boolean
  setIsSolution: (value: boolean) => void
}) {
  const { code, updateCode } = useActiveCode()
  const { sandpack } = useSandpack()

  const fileExtenstion = sandpack.activeFile.split('.').pop()
  const resolvedLanguage = fileExtenstion === 'js' ? 'javascript' : fileExtenstion

  const handleResetCode = () => {
    sandpack.resetAllFiles()
    setIsSolution(false)
  }

  return (
    <div className="size-full">
      {/* <SandpackFileExplorer /> */}
      <FileTabs />
      <div className={cn('items-center text-center py-2 bg-card', isSolution ? 'block' : 'hidden')}>
        <TypographyMuted className="text-center">
          You are viewing the solution code.{' '}
          <span onClick={handleResetCode} className="cursor-pointer underline">
            Reset code
          </span>
        </TypographyMuted>
      </div>
      <div className="size-full">
        <Editor
          width="100%"
          height="100%"
          language={resolvedLanguage}
          theme={currentTheme === 'dark' ? 'vs-dark' : 'vs-light'}
          path={sandpack.activeFile}
          value={code}
          onChange={value => updateCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 12,
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            scrollBeyondLastLine: true,
            fixedOverflowWidgets: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  )
}
