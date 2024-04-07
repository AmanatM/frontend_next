'use client'
import Editor from '@monaco-editor/react'
import { useActiveCode, SandpackStack, FileTabs, useSandpack, SandpackFileExplorer } from '@codesandbox/sandpack-react'
import { useTheme } from 'next-themes'

/**
 * Renders a Monaco Editor component.
 *
 * @returns The rendered Monaco Editor component.
 */
export function MonacoEditor() {
  const { code, updateCode } = useActiveCode()
  const { sandpack } = useSandpack()
  const { resolvedTheme } = useTheme()
  return (
    <SandpackStack className="size-full">
      <FileTabs />

      <div className="size-full">
        <Editor
          width="100%"
          height="100%"
          language={sandpack.activeFile.split('.').pop()}
          theme={resolvedTheme === 'dark' ? 'vs-dark' : 'vs-light'}
          path={sandpack.activeFile}
          defaultValue={code}
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
    </SandpackStack>
  )
}