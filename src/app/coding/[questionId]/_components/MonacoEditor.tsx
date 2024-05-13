'use client'
import Editor from '@monaco-editor/react'
import { useActiveCode, FileTabs, useSandpack } from '@codesandbox/sandpack-react'

/**
 * Renders a Monaco Editor component.
 *
 * @returns The rendered Monaco Editor component.
 */
export function MonacoEditor({ currentTheme }: { currentTheme: string | undefined }) {
  const { code, updateCode } = useActiveCode()
  const { sandpack } = useSandpack()

  const fileExtenstion = sandpack.activeFile.split('.').pop()
  const resolvedLanguage = fileExtenstion === 'jsx' ? 'javascript' : fileExtenstion

  return (
    <div className="size-full">
      {/* <SandpackFileExplorer /> */}
      <FileTabs />
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
