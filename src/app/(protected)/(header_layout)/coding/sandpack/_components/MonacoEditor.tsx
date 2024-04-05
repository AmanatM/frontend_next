'use client'
import Editor from '@monaco-editor/react'
import { useActiveCode, SandpackStack, FileTabs, useSandpack, useSandpackTheme } from '@codesandbox/sandpack-react'

export function MonacoEditor() {
  const { code, updateCode } = useActiveCode()
  const { sandpack } = useSandpack()

  return (
    <SandpackStack className="size-full">
      <FileTabs />
      <div className="size-full">
        <Editor
          width="100%"
          height="100%"
          language="html"
          theme="vs-dark"
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={value => updateCode(value || '')}
        />
      </div>
    </SandpackStack>
  )
}
