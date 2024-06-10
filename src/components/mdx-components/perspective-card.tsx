"use client"

import React, { useCallback, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { useContainerContext } from "./component-group"

/**
 * Props for the PerspectiveCard component.
 */
type PerspectiveCardProps = {
  isPerspectiveActive?: boolean
  onPerspectiveChange?: (isPerspective: boolean) => void
  frontElement: JSX.Element
  backElement: JSX.Element
  className?: string
}
/**
 * A card component that provides a perspective effect when toggled.
 */
export function PerspectiveCard({
  isPerspectiveActive,
  onPerspectiveChange,
  frontElement,
  backElement,
  className,
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
    <div
      className={cn(className, "inter-var w-full group/card h-auto rounded-xl flex items-center justify-center px-2")}
    >
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
        <div className="flex justify-center space-x-2 mt-10">
          <Switch id="airplane-mode" checked={isPerspective} onCheckedChange={handleToggle} />
          <Label htmlFor="airplane-mode">3D View</Label>
        </div>
      </div>
    </div>
  )
}

export function PairedItemsPerspectiveCard() {
  const { sliderValue } = useContainerContext()
  const { frontElement, backElement } = generatePairedItemsForPerspective({ numberOfChildren: sliderValue[0] })

  return <PerspectiveCard frontElement={frontElement} backElement={backElement} />
}

export function generatePairedItemsForPerspective({
  numberOfChildren,
  isPerspective,
  containerStyles = "grid gap-2 items-center p-1 rounded-md",
  childrenStyles = "relative h-10 after:content-['Unstyled'] after:text-gray-400",
}: {
  numberOfChildren?: number
  isPerspective?: boolean
  containerStyles?: string
  childrenStyles?: string
}) {
  const backElement = (
    <div className={cn(containerStyles, "rounded-md outline-2 outline-dashed outline-muted-foreground ")}>
      {[...Array(numberOfChildren)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "relative outline-muted-foreground border-dotted border-2 rounded-md after:hidden",
            childrenStyles,
          )}
        ></div>
      ))}
    </div>
  )

  const frontElement = (
    <div className={cn(containerStyles)}>
      <AnimatePresence initial={false}>
        <LayoutGroup>
          {[...Array(numberOfChildren)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(childrenStyles, "bg-gray-500 transition-all rounded-md")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              layout
            ></motion.div>
          ))}
        </LayoutGroup>
      </AnimatePresence>
    </div>
  )

  return { backElement, frontElement }
}
