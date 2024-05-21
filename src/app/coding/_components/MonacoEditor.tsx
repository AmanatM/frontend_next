'use client'
import Editor from '@monaco-editor/react'
import { useActiveCode, useSandpack } from '@codesandbox/sandpack-react'
import { useIsMobileBreakpoint } from '@/hooks/useIsMobileBreakpoint'
import { FilesObject } from '../ui/[questionId]/_components/UserInterfaceContainer'
import { getIconForLanguage } from '../utils/getIconForLanguage'

/**
 * Renders a ResizablePanelTabs component with a Monaco Editor.
 *
 * @returns ResizablePanelTabs
 */
function MonacoEditor({ currentTheme }: { currentTheme: string | undefined }) {
  const { code, updateCode } = useActiveCode()
  const { sandpack } = useSandpack()

  const fileExtenstion = sandpack.activeFile.split('.').pop()
  const resolvedLanguage = fileExtenstion === 'js' ? 'javascript' : fileExtenstion

  return (
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
  )
}

export default MonacoEditor
