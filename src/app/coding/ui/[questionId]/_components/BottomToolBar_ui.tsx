"use client"
import { Button } from "@/components/custom/button"
import { useIsMobileBreakpoint } from "@/hooks/useIsMobileBreakpoint"
import { cn } from "@/lib/utils"
import { useSandpack } from "@codesandbox/sandpack-react"
import { List, Save, FileCheck, RotateCcw } from "lucide-react"
import { useHotkeys } from "react-hotkeys-hook"
import { toast } from "sonner"

import { useQueryClient } from "@tanstack/react-query"
import { User } from "@supabase/auth-js"
import { useSaveFiles } from "../../../_hooks/useSaveFiles"
import { ModalTrigger } from "@/components/modal"
import ToggleCompleteButton from "@/app/coding/_components/MarkCompleteButton"

type FilesObject = {
  [key: string]: {
    code: string
    id: string
    path: string
  }
}
export function BottomToolbar_ui({
  filesObject,
  user,
  questionId,
}: {
  filesObject: FilesObject | undefined
  user: User | null
  questionId: string
}) {
  const isMobileBreakpoint = useIsMobileBreakpoint()

  const { sandpack } = useSandpack()
  const { files } = sandpack
  const queryClient = useQueryClient()
  const { mutate: saveCode } = useSaveFiles()

  const handleSaveCode = () => {
    if (!filesObject) return
    if (!user) {
      toast.error("Please sign in to save your code")
      return
    }

    const updatedFiles = Object.values(filesObject).map(file => ({
      content: files[file.path].code,
      file_id: file.id,
      user_id: user.id,
      question_id: questionId,
      path: file.path,
    }))

    saveCode(
      { user, updatedFiles },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["savedCode", questionId, user?.id] })
          toast.success("Code saved successfully", {
            icon: <FileCheck size={15} />,
          })
        },
        onError: error => {
          toast.error(`${error.message}`)
        },
      },
    )
  }

  // Save code shortcut(cmd+s)
  useHotkeys(
    "meta+s",
    event => {
      event.preventDefault()
      handleSaveCode()
    },
    { enableOnFormTags: true },
  )

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 px-3 py-3 bg-background dark:text-white",
        isMobileBreakpoint ? "fixed bottom-0 left-0 right-0" : "",
      )}
    >
      <div className="flex">
        <ModalTrigger
          type="confirm-danger"
          action={() => sandpack.resetAllFiles()}
          options={{
            title: "Reset code",
            description: "Are you sure you want to reset the code?",
          }}
        >
          <Button variant="outline" size="icon" aria-label="Reset code">
            <RotateCcw size={15} />
          </Button>
        </ModalTrigger>
      </div>
      <div className={cn("flex gap-x-2  md:absolute md:left-1/2 md:-translate-x-1/2", isMobileBreakpoint && "hidden")}>
        {/* <Button variant={'outline'} size={'icon'}>
          <ChevronLeft size={17} />
        </Button> */}
        <Button className="gap-x-1" variant={"outline"}>
          <List size={17} />
          Questions list
        </Button>
        {/* <Button variant={'outline'} size={'icon'}>
          <ChevronRight size={17} />
        </Button> */}
      </div>
      <div className="flex space-x-2">
        <ToggleCompleteButton questionId={questionId} user={user} />
        <Button variant={"outline"} size={"sm"} className={cn("flex align-center space-x-2")} onClick={handleSaveCode}>
          <Save size={15} />
          {!isMobileBreakpoint && <div>Save</div>}
        </Button>
      </div>
    </div>
  )
}
