'use client'
import Editor from '@monaco-editor/react'
import { useActiveCode, useSandpack } from '@codesandbox/sandpack-react'
import { useIsMobileBreakpoint } from '@/hooks/useIsMobileBreakpoint'
import { getIconForLanguage } from '../utils/getIconForLanguage'
import { FilesObjectWithSandpack } from '@/supabase-utils/types'

export const getLanguageFromExtension = (language: string | undefined) => {
  if (!language) return ''

  switch (language) {
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
      return 'javascript'
    case 'vue':
    case 'html':
      return 'html'
    case 'css':
    case 'scss':
    case 'less':
      return 'css'
    default:
      return
  }
}

/**
 * Renders a ResizablePanelTabs component with a Monaco Editor.
 *
 * @returns ResizablePanelTabs
 */
function MonacoEditor({ currentTheme }: { currentTheme: string | undefined }) {
  const { code, updateCode } = useActiveCode()
  const { sandpack } = useSandpack()

  const fileExtenstion = sandpack.activeFile.split('.').pop()
  const filteredFiles = sandpack.files as FilesObjectWithSandpack

  return (
    <Editor
      width="100%"
      height="100%"
      language={filteredFiles[sandpack.activeFile].language || getLanguageFromExtension(fileExtenstion)}
      defaultValue={code}
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
