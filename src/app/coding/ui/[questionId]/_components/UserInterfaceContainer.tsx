"use client"
import {
  SandpackProvider,
  SandpackConsole,
  SandpackThemeProp,
  SandpackLayout,
  SandpackPreview,
  SandpackFile,
} from "@codesandbox/sandpack-react"
import { cn } from "@/lib/utils"
import { ResizablePanelGroup } from "@/components/ui/resizable"
import { useIsMobileBreakpoint } from "@/hooks/useIsMobileBreakpoint"
import { TypographyH4 } from "@/components/typography"

import { useTheme } from "next-themes"
import { useEffect, useMemo, useState } from "react"
import { MarkdownRenderer } from "@/components/markdown"
import { descriptionTabs, browserTabs } from "../../../utils/tabs-data"
import { BottomToolbar_ui } from "./BottomToolBar_ui"
import { CustomTabsContent } from "../../../_components/CustomTabComponents"
import { ResizeHandle } from "../../../../../components/ResizableHandleCustom"
import { ResizablePanelTabs } from "../../../_components/ResizablePanelTabs"
import SavedCode from "./SavedCode"
import { User } from "@supabase/auth-js/dist/module/lib/types"
import { CodingQuestion, SandpackFile_UI, Question_UI } from "@/supabase-utils/types"
import SolutionTab from "./SolutionTab"
import CodeEditorTab from "./CodeEditorTab"

type CodingQuestionProps = {
  idFromParams: string
  user: User | null
  coding_question: Question_UI
}

export default function UserInterfaceContainer({ idFromParams, user, coding_question }: CodingQuestionProps) {
  const { resolvedTheme } = useTheme()
  const isMobileBreakpoint = useIsMobileBreakpoint()

  const [defaultSize, setDefaultSize] = useState<number[]>([30, 40, 30])
  const [isMounted, setIsMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark" | undefined>(undefined)
  const [isSolution, setIsSolution] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setCurrentTheme("dark")
    } else if (resolvedTheme === "light") {
      setCurrentTheme("light")
    } else {
      setCurrentTheme(undefined)
    }
  }, [resolvedTheme])

  const filesObject = useMemo(() => {
    return coding_question?.coding_question_files_ui.reduce((obj: SandpackFile_UI, file) => {
      if (file.path !== null && file.content !== null) {
        obj[file.path] = { code: file.content, id: file.id, path: file.path, name: file.name, language: file.language }
      }
      return obj
    }, {})
  }, [])

  // console.log(filesObject)

  if (!isMounted) return null
  if (!coding_question) return null
  return (
    <main
      id="content"
      className={cn(
        "flex size-full pt-3 px-3 overflow-scroll flex-col",
        isMobileBreakpoint ? "!min-h-[calc(100dvh-3.5rem)]" : "!h-[calc(100dvh-3.5rem)]",
      )}
    >
      <SandpackProvider
        template={coding_question?.sandpack_template || "vannilla"}
        theme={currentTheme === undefined ? "auto" : (currentTheme as SandpackThemeProp)}
        className={"!size-full !overflow-hidden !flex !flex-col"}
        files={filesObject}
      >
        <SandpackLayout className={"!size-full !overflow-hidden !flex !flex-col !bg-transparent !border-none"}>
          <ResizablePanelGroup
            direction={isMobileBreakpoint ? "vertical" : "horizontal"}
            className={cn("relative size-full grow", isMobileBreakpoint && "pb-16 space-y-2")}
            onResize={() => {
              if (isMobileBreakpoint) {
                setDefaultSize([100, 100, 100])
              } else {
                setDefaultSize([30, 40, 30])
              }
            }}
          >
            {/* Descripition Panel*/}
            <ResizablePanelTabs defaultSize={defaultSize[0]} defaultValue="description" tabs={descriptionTabs}>
              <CustomTabsContent value="description" className="p-4 space-y-4 justify-center">
                <TypographyH4>{coding_question?.title}</TypographyH4>
                <article className={"prose dark:prose-invert prose-pre:p-0"}>
                  <MarkdownRenderer>{coding_question?.description}</MarkdownRenderer>
                </article>
              </CustomTabsContent>
              <CustomTabsContent value="solution" className="p-4 space-y-4 justify-center">
                <SolutionTab
                  originalFiles={coding_question?.coding_question_files_ui}
                  setIsSolution={setIsSolution}
                  isSolution={isSolution}
                />
                <article className={"prose dark:prose-invert prose-pre:p-0"}>
                  <MarkdownRenderer>{coding_question?.solution}</MarkdownRenderer>
                </article>
              </CustomTabsContent>
              <CustomTabsContent value="saved_code" className="p-4 space-y-4 min-h-full flex">
                <SavedCode questionId={idFromParams} user={user} />
              </CustomTabsContent>
            </ResizablePanelTabs>

            <ResizeHandle />

            {/* Editor Panel*/}
            <CodeEditorTab
              defaultSize={defaultSize[1]}
              currentTheme={currentTheme}
              isSolution={isSolution}
              setIsSolution={setIsSolution}
            />

            <ResizeHandle />

            {/* Preview Panel*/}
            <ResizablePanelTabs
              extraClassName={cn(isMobileBreakpoint && "h-[500px]")}
              defaultSize={defaultSize[2]}
              defaultValue="browser"
              tabs={browserTabs}
            >
              <CustomTabsContent value="browser" className="p-0 size-full">
                <SandpackPreview
                  showSandpackErrorOverlay={true}
                  showNavigator={true}
                  showOpenInCodeSandbox={false}
                  className={"size-full"}
                />
              </CustomTabsContent>
              <CustomTabsContent value="console" className="p-0 size-full">
                <SandpackConsole className={"size-full"} standalone={false} />
              </CustomTabsContent>
            </ResizablePanelTabs>
          </ResizablePanelGroup>
        </SandpackLayout>

        <BottomToolbar_ui filesObject={filesObject} user={user} questionId={idFromParams} />
      </SandpackProvider>
    </main>
  )
}
