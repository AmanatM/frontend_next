import { cn } from "@/lib/utils"
import React from "react"

export const DashboardContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DashboardContainer({ className, ...props }, ref) {
    return (
      <div ref={ref} className={cn("h-full mx-auto grow px-4 md:px-6 lg:px-14 py-6 max-w-7xl", className)} {...props} />
    )
  },
)
DashboardContainer.displayName = "DashboardContainer"
