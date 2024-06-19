import { cn } from "@/lib/utils"
import React from "react"

export const DashboardContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DashboardContainer({ className, ...props }, ref) {
    return <div ref={ref} className={cn("container h-full grow px-4 py-6 md:px-6 lg:px-14", className)} {...props} />
  },
)
DashboardContainer.displayName = "DashboardContainer"
