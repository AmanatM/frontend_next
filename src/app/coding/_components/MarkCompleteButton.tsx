"use client"

import { Button } from "@/components/custom/button"
import React from "react"
import { useIsMarkedComplete } from "../_hooks/useIsMarkedComplete"
import { cn } from "@/lib/utils"
import { User } from "@supabase/supabase-js"
import { useToggleMarkComplete } from "../_hooks/useToggleMarkedComplete"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Check } from "lucide-react"
import { useIsMobileBreakpoint } from "@/hooks/useIsMobileBreakpoint"

function ToggleCompleteButton({ questionId, user }: { questionId: string; user: User | null }) {
  const { data: isMarkedComplete } = useIsMarkedComplete({ questionId, user })
  const { mutate: toggleMarkedComplete, isPending: isMarkingComplete } = useToggleMarkComplete()

  const queryClient = useQueryClient()
  const router = useRouter()
  const isMobileBreakpoint = useIsMobileBreakpoint()

  const handleMarkCompleted = () => {
    toggleMarkedComplete(
      { questionId, user, isMarkedComplete },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["isMarkedComplete", questionId, user?.id] })
          router.refresh()
        },
        onError: error => {
          toast.error(`${error.message}`)
        },
      },
    )
  }

  return (
    <Button
      variant={"outline"}
      size={"sm"}
      className={cn(
        "flex align-center space-x-0 md:space-x-1 transition",
        isMarkedComplete && "bg-green-700 hover:bg-green-700",
      )}
      disabled={isMarkingComplete}
      leftIcon={isMarkedComplete ? <Check size={15} /> : undefined}
      onClick={handleMarkCompleted}
      aria-label={isMarkedComplete ? "Completed" : "Mark as complete"}
    >
      {isMobileBreakpoint ? (
        <>{!isMarkedComplete && <Check size={15} />}</>
      ) : (
        <div>{isMarkedComplete ? "Completed" : "Mark as complete"}</div>
      )}
    </Button>
  )
}

export default ToggleCompleteButton
