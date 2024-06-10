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
  frontElement: JSX.Element
  backElement: JSX.Element
  className?: string
}
/**
 * A card component that provides a perspective effect when toggled.
 */
export function PerspectiveCard({ frontElement, backElement, className }: PerspectiveCardProps) {
  const [internalIsPerspective, setInternalIsPerspective] = useState(false)

  // const handleToggle = useCallback(() => {
  //   if (isInGroup) {
  //     setStateValueByName("isPerspective", !valueFromContext)
  //   } else {
  //     setInternalIsPerspective(prev => !prev)
  //   }
  // }, [isInGroup, setStateValueByName, valueFromContext])

  return (
    <div
      className={cn(className, "inter-var w-full group/card h-auto rounded-xl flex items-center justify-center px-2")}
    >
      <div className="w-full relative max-w-80">
        {/* Background */}
        <div
          className={cn(
            "w-full absolute top-0 left-0 z-10 transition duration-200",
            internalIsPerspective && "skew-y-12 translate-x-[10%] scale-x-90 ",
          )}
        >
          {backElement}
        </div>

        {/* Front */}
        <div className="w-full">
          <div
            className={cn(
              "w-full transition duration-200 z-20 relative",
              internalIsPerspective && "skew-y-12 translate-x-[-10%] scale-x-90",
            )}
          >
            {frontElement}
          </div>
        </div>
        <div className="flex justify-center space-x-2 mt-10">
          <Switch id="airplane-mode" checked={internalIsPerspective} onCheckedChange={setInternalIsPerspective} />
          <Label htmlFor="airplane-mode">3D View</Label>
        </div>
      </div>
    </div>
  )
}

export function PairedItemsPerspectiveCard({
  childrenStyles,
  containerStyles,
}: {
  childrenStyles: string
  containerStyles: string
}) {
  const { getStateValueByName, isInGroup } = useContainerContext()
  console.log("isInGroup", isInGroup)
  const valueFromContext = getStateValueByName("numberOfChildren")

  const { frontElement, backElement } = generatePairedItemsForPerspective({
    numberOfChildren: isInGroup ? valueFromContext : 2,
    childrenStyles: childrenStyles,
    containerStyles: containerStyles,
  })

  return <PerspectiveCard frontElement={frontElement} backElement={backElement} />
}

export function generatePairedItemsForPerspective({
  numberOfChildren = 2,
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
