"use client"
import React, { useState } from "react"
import PerspectiveCard from "@/components/mdx-components/perspective-card"

import CodeHighlighter from "@/components/universalCodeHighliter"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"

type CodeWithPerspectiveProps = {
  code: string
  language?: string
  childCount?: number
  maxChildrenCount?: number
  initialPerspective?: boolean
}

function CodeWithPerspective({
  code,
  language = "css",
  childCount = 3,
  maxChildrenCount = 5,
  initialPerspective = false,
}: CodeWithPerspectiveProps) {
  const [numberOfChildren, setNumberOfChildren] = useState(childCount)

  const [isPerspective, setIsPerspective] = useState(initialPerspective || false)

  const { background, front } = generateItemsForPerspective({
    numberOfChildren: numberOfChildren,
    isPerspective: isPerspective,
  })

  const isCodeProvided = code && code.length > 0
  const twoColsLayoutStyles = isCodeProvided ? "grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-8" : "grid grid-cols-1"

  return (
    <div className={cn("px-4 rounded-md my-16 py-10", isCodeProvided && "bg-card")}>
      {/* Header Slider */}
      <div className={cn("mb-12")}>
        <div className="max-w-[350px] mx-auto">
          <div className="flex md:mb-6">
            <span>Number of Children</span>
            <span className="ml-auto">{numberOfChildren}</span>
          </div>
          <Slider
            defaultValue={[numberOfChildren]}
            onValueChange={([value]) => setNumberOfChildren(value)}
            min={1}
            max={maxChildrenCount}
          />
        </div>
      </div>

      {/* Code and preview  */}
      <div className={cn(twoColsLayoutStyles, "pt-0")}>
        {isCodeProvided && (
          <div className="size-full flex flex-col justify-center">
            <CodeHighlighter
              code={code}
              language={language}
              customStyle={{
                background: "#1e1e1e",
              }}
            />
          </div>
        )}
        <div className={cn(isCodeProvided ? "px-0 md:px-6" : "py-10")}>
          <PerspectiveCard
            isPerspectiveActive={isPerspective}
            onPerspectiveChange={setIsPerspective}
            backElement={background}
            frontElement={front}
          />
        </div>
      </div>
    </div>
  )
}

function generateItemsForPerspective({
  numberOfChildren = 3,
  isPerspective,
}: {
  numberOfChildren?: number
  isPerspective?: boolean
}) {
  const itemHeight = 50

  const background = (
    <div className="grid gap-2 items-center p-1 rounded-md outline-2 outline-dashed outline-muted-foreground ">
      {[...Array(numberOfChildren)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "relative",
            isPerspective && "border-muted-foreground border-dotted border-2 rounded-md",
            !isPerspective &&
              i !== 0 && // Hide the first line
              "after:absolute after:left-0 after:right-0 after:top-[-5px] after:w-full after:bg-muted-foreground after:h-[1px]",
          )}
          style={{
            height: `${itemHeight}px`,
          }}
        ></div>
      ))}
    </div>
  )

  const front = (
    <div className="grid gap-2 items-center p-1">
      <AnimatePresence>
        <LayoutGroup>
          {[...Array(numberOfChildren)].map((_, i) => (
            <motion.div
              key={i}
              className={cn("bg-gray-500 opacity-60 transition-all rounded-md rel")}
              style={{
                height: `${itemHeight}px`,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              layout
            ></motion.div>
          ))}
        </LayoutGroup>
      </AnimatePresence>
    </div>
  )

  return { background, front }
}

export default CodeWithPerspective
