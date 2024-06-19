"use client"

import React, { useCallback, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Switch } from "../../ui/switch"
import { Label } from "../../ui/label"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { useContainerContext } from "./component-group"

type PerspectiveCardProps = {
  frontElement: JSX.Element
  backElement: JSX.Element
  className?: string
  isPerspective?: boolean
  setIsPerspective?: (value: any) => void
}

export function PerspectiveCard({
  frontElement,
  backElement,
  className,
  isPerspective,
  setIsPerspective,
}: PerspectiveCardProps) {
  const [internalIsPerspective, setInternalIsPerspective] = useState(false)

  const isPerspectiveActive = isPerspective !== undefined ? isPerspective : internalIsPerspective
  const setIsPerspectiveActive = setInternalIsPerspective

  const isInternalToggleHidden = isPerspective === undefined

  return (
    <div
      className={cn(className, "inter-var w-full group/card h-auto rounded-xl flex items-center justify-center px-2")}
    >
      <div className="w-full relative max-w-80">
        {/* Background */}
        <div
          className={cn(
            "w-full absolute top-0 left-0 z-10 transition duration-200",
            isPerspectiveActive && "skew-y-12 translate-x-[10%] scale-x-90 ",
          )}
        >
          {backElement}
        </div>

        {/* Front */}
        <div className="w-full">
          <div
            className={cn(
              "w-full transition duration-200 z-20 relative",
              isPerspectiveActive && "skew-y-12 translate-x-[-10%] scale-x-90",
            )}
          >
            {frontElement}
          </div>
        </div>
        {isInternalToggleHidden && (
          <div className="flex justify-center space-x-2 mt-10">
            <Switch id="airplane-mode" checked={isPerspectiveActive} onCheckedChange={setIsPerspectiveActive} />
            <Label htmlFor="airplane-mode">3D View</Label>
          </div>
        )}
      </div>
    </div>
  )
}

export function PairedItemsPerspectiveCard({
  childrenStyles,
  containerStyles,
  groupIsPerspectiveName,
  groupValueName,
}: {
  childrenStyles?: string
  containerStyles?: string
  groupIsPerspectiveName: string
  groupValueName: string
}) {
  const { getStateValueByName, isInGroup, getSetterByName } = useContainerContext()
  const valueFromContext = getStateValueByName(groupValueName)

  const toggledValue = getStateValueByName(groupIsPerspectiveName)
  const setToggleValue = getSetterByName(groupIsPerspectiveName)

  const { frontElement, backElement } = generatePairedItemsForPerspective({
    numberOfChildren: isInGroup ? valueFromContext : 2,
    childrenStyles: childrenStyles,
    containerStyles: containerStyles,
  })

  return (
    <PerspectiveCard
      frontElement={frontElement}
      backElement={backElement}
      isPerspective={toggledValue}
      setIsPerspective={setToggleValue}
    />
  )
}

export function generatePairedItemsForPerspective({
  numberOfChildren = 2,
  isPerspective,
  containerStyles = "grid gap-2 items-center rounded-md",
  childrenStyles = "relative h-10 after:content-['Unstyled'] after:text-gray-400 after:text-xs",
}: {
  numberOfChildren?: number
  isPerspective?: boolean
  containerStyles?: string
  childrenStyles?: string
}) {
  const backElement = (
    <div className={cn("p-1 rounded-md outline-2 outline-dashed outline-muted-foreground", containerStyles)}>
      {[...Array(numberOfChildren)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "relative outline-muted-foreground border-dotted border-2 rounded-md after:hidden ",
            childrenStyles,
          )}
        ></div>
      ))}
    </div>
  )

  const frontElement = (
    <div className={cn("p-1", containerStyles)}>
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
            ></motion.div>
          ))}
        </LayoutGroup>
      </AnimatePresence>
    </div>
  )

  return { backElement, frontElement }
}
