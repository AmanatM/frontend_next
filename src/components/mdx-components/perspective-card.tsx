"use client"

import React, { useCallback, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"

/**
 * Props for the PerspectiveCard component.
 */
type PerspectiveCardProps = {
  isPerspectiveActive?: boolean
  onPerspectiveChange?: (isPerspective: boolean) => void
  frontElement: JSX.Element
  backElement: JSX.Element
}
/**
 * A card component that provides a perspective effect when toggled.
 */
export default function PerspectiveCard({
  isPerspectiveActive,
  onPerspectiveChange,
  frontElement,
  backElement,
}: PerspectiveCardProps) {
  const isControlled = isPerspectiveActive !== undefined && onPerspectiveChange !== undefined

  const [internalIsPerspective, setInternalIsPerspective] = useState(isPerspectiveActive ?? false)

  // Update internal state if prop changes
  useEffect(() => {
    if (isControlled) {
      setInternalIsPerspective(isPerspectiveActive!)
    }
  }, [isPerspectiveActive, isControlled])

  const handleToggle = useCallback(() => {
    if (isControlled) {
      onPerspectiveChange!(!isPerspectiveActive)
    } else {
      setInternalIsPerspective(prev => !prev)
    }
  }, [isControlled, isPerspectiveActive, onPerspectiveChange])

  const isPerspective = isControlled ? isPerspectiveActive : internalIsPerspective

  return (
    <div className="inter-var w-full group/card h-auto rounded-xl flex items-center justify-center">
      <div className="w-full relative max-w-80">
        {/* Background */}
        <div
          className={cn(
            "w-full absolute top-0 left-0 z-10 transition duration-200",
            isPerspective && "skew-y-12 translate-x-[10%] scale-x-90 ",
          )}
        >
          {backElement}
        </div>

        {/* Front */}
        <div className="w-full">
          <div
            className={cn(
              "w-full transition duration-200 z-20 relative",
              isPerspective && "skew-y-12 translate-x-[-10%] scale-x-90",
            )}
          >
            {frontElement}
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 mt-10">
          <Switch id="airplane-mode" checked={isPerspective} onCheckedChange={handleToggle} />
          <Label htmlFor="airplane-mode">3D View</Label>
        </div>
      </div>
    </div>
  )
}
