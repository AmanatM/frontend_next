'use client'
import Editor, { useMonaco } from '@monaco-editor/react'
import { useActiveCode, SandpackStack, FileTabs, useSandpack, SandpackFileExplorer } from '@codesandbox/sandpack-react'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

/**
 * Renders a Monaco Editor component.
 *
 * @returns The rendered Monaco Editor component.
 */
export function MonacoEditor() {
  const { code, updateCode } = useActiveCode()
  const { sandpack } = useSandpack()
  const { resolvedTheme } = useTheme()

  const fileExtenstion = sandpack.activeFile.split('.').pop()
  const resolvedLanguage = fileExtenstion === 'jsx' ? 'javascript' : fileExtenstion

  return (
    <SandpackStack className="size-full">
      {/* <SandpackFileExplorer /> */}
      <FileTabs />
      <div className="size-full">
        <Editor
          width="100%"
          height="100%"
          language={resolvedLanguage}
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
