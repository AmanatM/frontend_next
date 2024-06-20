import { cn } from "@/lib/utils"
import { LucideIcon, Zap } from "lucide-react"
import React from "react"

type IconCircleProps = {
  size?: number
  strokeWidth?: number
  color?: "blue" | "red" | "green" | "yellow"
  icon?: LucideIcon
}

function IconCircle({ size = 19, strokeWidth = 2, color, icon: Icon }: IconCircleProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-muted text-muted-foreground shadow-sm",
        color === "blue" && "border-blue-800/50 text-blue-800",
        color === "red" && "border-red-800/50 text-red-800",
        color === "green" && "border-teal-600/50 text-teal-600",
        color === "yellow" && "border-yellow-800/50 text-yellow-800",
      )}
    >
      {Icon ? (
        <Icon size={size} strokeWidth={strokeWidth} className="text-inherit" />
      ) : (
        <Zap size={size} strokeWidth={strokeWidth} className="text-inherit" />
      )}
    </div>
  )
}

export default IconCircle
