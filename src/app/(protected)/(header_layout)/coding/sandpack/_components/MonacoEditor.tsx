'use client'
import Editor from '@monaco-editor/react'
import { useActiveCode, SandpackStack, FileTabs, useSandpack } from '@codesandbox/sandpack-react'
import { useTheme } from 'next-themes'

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
          language={sandpack.activeFile.split('.').pop() || 'javascript'}
          theme={resolvedTheme === 'dark' ? 'vs-dark' : 'vs-light'}
          path={sandpack.activeFile}
          defaultValue={code}
          onChange={value => updateCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            scrollBeyondLastLine: true,
            fixedOverflowWidgets: true,
            tabSize: 2,
          }}
        />
        {/* <Editor
          theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
          options={{
            minimap: { enabled: false },
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            scrollBeyondLastLine: true,
            fixedOverflowWidgets: true,
            tabSize: 2,
          }}
          language={files.find(file => file.name === currentFile)?.language || ''}
          value={files.find(file => file.name === currentFile)?.content || ''}
          path={files.find(file => file.name === currentFile)?.name || ''}
          onChange={(value: string | undefined) => updateFileContent(value || '')}
        /> */}
      </div>
    </SandpackStack>
  )
}
