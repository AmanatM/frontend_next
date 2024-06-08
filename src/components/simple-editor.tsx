"use client"

import { CodeEditor, FileTabs, SandpackProvider } from "@codesandbox/sandpack-react"
import { useMemo, useState } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"

type SimpleCodeEditorProps = {
  html?: string
  css?: string
  js?: string
}

const SimpleCodeEditor = ({ html = "", css = "", js = "" }: SimpleCodeEditorProps) => {
  const [files, setFiles] = useState<{ [key: string]: { code: string } }>({
    "index.html": { code: html },
    "style.css": { code: css },
    "script.js": { code: js },
  })

  const [activeFile, setActiveFile] = useState("index.html")
  console.log(files)

  const iframeContent = useMemo(() => {
    return `
      <html>
        <head>
          <style>
          body {
              font-family: sans-serif; 
      background-color: white;
          }
  
 ${files["style.css"].code}
          </style>
        </head>
        <body>
          ${files["index.html"].code}
          <script>${files["script.js"].code}</script> 
        </body>
      </html>
    `
  }, [files])

  return (
    <SandpackProvider
      files={files}
      options={{
        autorun: false,
        autoReload: false,
      }}
      theme={"dark"}
      className="min-h-[350px]"
    >
      <ResizablePanelGroup direction={"horizontal"}>
        <ResizablePanel>
          <FileTabs />
          <CodeEditor
            code={files[activeFile].code}
            initMode="user-visible"
            onCodeUpdate={code => {
              setFiles({ ...files, [activeFile]: { code: code } })
            }}
          />
          {/* <SandpackCodeEditor /> */}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <iframe srcDoc={iframeContent} className="w-full flex flex-grow" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </SandpackProvider>
  )
}

export default SimpleCodeEditor
