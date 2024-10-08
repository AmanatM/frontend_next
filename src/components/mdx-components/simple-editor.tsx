"use client"

import { SandpackProvider, tabButton } from "@codesandbox/sandpack-react"

import { useEffect, useMemo, useRef, useState } from "react"
import { ResizablePanel, ResizablePanelGroup } from "../ui/resizable"
import { Tabs, TabsContent, TabsList } from "../ui/tabs"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { TypographySmall } from "../typography"
import { Card } from "../ui/card"
import { ResizeHandle } from "@/components/ResizableHandleCustom"
import { Code, RotateCcw } from "lucide-react"
import { getIconForLanguage } from "@/app/coding/utils/getIconForLanguage"
import { Editor, Monaco } from "@monaco-editor/react"
import { useIsMobileBreakpoint } from "@/hooks/useIsMobileBreakpoint"
import React from "react"

type SimpleCodeEditorProps = {
  html?: string
  css?: string
  js?: string
}

export default function SimpleCodeEditor({ html = "", css = "", js = "" }: SimpleCodeEditorProps) {
  const isMobileBreakpoint = useIsMobileBreakpoint()

  const [files, setFiles] = useState<{ [key: string]: { code: string } }>({
    "index.html": { code: html },
    "style.css": { code: css },
    "script.js": { code: js },
  })

  const [activeFile, setActiveFile] = useState("index.html")

  const [layoutSize, setLayoutSize] = useState([65, 35])

  const iframeContent = useMemo(() => {
    return `
      <html>
        <head>
          <style>
          body {
              font-family: sans-serif; 
              background-color: white;
              width: 100%;
              height: 100%;
              max-width: 100%;
              max-height: 100%;
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

  const getFileExtension = (fileName: String) => (fileName.includes(".") ? fileName.split(".").pop() : "")

  const handleResetCode = () => {
    setFiles({
      "index.html": { code: html },
      "style.css": { code: css },
      "script.js": { code: js },
    })
  }

  const editorRef = useRef<any | null>(null)

  function handleEditorDidMounteditor(editor: any) {
    editorRef.current = editor
  }

  function formatCode() {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument").run()
    }
  }

  useEffect(() => {
    formatCode()
  }, [activeFile])

  return (
    <SandpackProvider
      files={files}
      options={{
        autorun: false,
        autoReload: false,
      }}
      theme={"dark"}
      className=""
    >
      <ResizablePanelGroup
        direction={isMobileBreakpoint ? "vertical" : "horizontal"}
        className={cn("flex items-stretch", isMobileBreakpoint && "min-h-150px max-h-40px gap-y-2")}
      >
        <ResizablePanel
          className={cn(isMobileBreakpoint && "h-150px !overflow-visible")}
          defaultSize={layoutSize[0]}
          minSize={15}
        >
          <Tabs defaultValue="editor" asChild>
            <Card className="h-full overflow-clip flex flex-col justify-center">
              <TabsList className="bg-inherit w-max">
                {Object.entries(files).map(([fileName, fileContent]) => {
                  const isActiveTab = activeFile === fileName
                  const icon = getIconForLanguage(getFileExtension(fileName) || "")
                  if (fileContent.code.length <= 0) return null
                  return (
                    <Button
                      key={fileName}
                      variant={"ghost"}
                      onClick={() => setActiveFile(fileName)}
                      className={cn(
                        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow !bg-transparent !shadow-none space-x-2",
                        "!bg-transparent !shadow-none space-x-2",
                        isActiveTab ? "text-foreground bg-background shadow" : "bg-transparent",
                      )}
                      role="tab"
                    >
                      {icon ? <>{icon}</> : <Code size={15} />}
                      <TypographySmall className="font-normal">{fileName}</TypographySmall>
                    </Button>
                  )
                })}
              </TabsList>
              <TabsContent value="editor" className="size-full">
                <Editor
                  onMount={handleEditorDidMounteditor}
                  saveViewState={false}
                  width="100%"
                  height="100%"
                  language={getFileExtension(activeFile)}
                  defaultValue={files[activeFile].code}
                  value={files[activeFile].code}
                  theme="vs-dark"
                  onChange={value => {
                    setFiles({ ...files, [activeFile]: { code: value || "" } })
                  }}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 12,
                    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                    scrollBeyondLastLine: false,
                    fixedOverflowWidgets: true,
                    tabSize: 2,

                    automaticLayout: true,
                    overviewRulerLanes: 0, // Disable the overview ruler
                    mouseWheelScrollSensitivity: 0, // Disable mouse wheel scrolling
                    renderWhitespace: "none", // Do not render whitespace
                    readOnly: false, // Make editor read-only if needed
                    scrollbar: {
                      horizontal: "hidden", // Hide horizontal scrollbar
                      vertical: "hidden", // Hide vertical scrollbar
                      alwaysConsumeMouseWheel: false, // Prevent editor from consuming the mouse wheel events
                    },
                  }}
                  className="min-h-[250px]"
                />
              </TabsContent>
            </Card>
          </Tabs>
        </ResizablePanel>
        {!isMobileBreakpoint && <ResizeHandle />}
        <ResizablePanel
          defaultSize={layoutSize[1]}
          minSize={15}
          className={cn(isMobileBreakpoint && "h-150px !overflow-visible")}
        >
          <Card className="overflow-clip size-full flex flex-col">
            <div className="px-2 flex justify-between items-center">
              <p className="font-bold">RESULT</p>
              <Button aria-label="Reset Code" className="" size={"icon"} onClick={handleResetCode} variant={"ghost"}>
                <RotateCcw size={15} />
              </Button>
            </div>
            <div className="grow">
              <iframe srcDoc={iframeContent} className="size-full" />
            </div>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </SandpackProvider>
  )
}
