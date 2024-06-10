"use client"
import React, { useState } from "react"
import { PerspectiveCard } from "@/components/mdx-components/perspective-card"

import CodeHighlighter from "@/components/universalCodeHighliter"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"

type CodeWithPerspectiveProps = {
  code: string
  language?: string
  initialSliderValue?: number
  maxSliderValue?: number
  initialPerspective?: boolean
  frontElement: JSX.Element
  backElement: JSX.Element
}

export function CodeWithPerspective({
  code,
  language = "css",
  initialSliderValue = 3,
  maxSliderValue = 10,
  initialPerspective = false,
  frontElement,
  backElement,
}: CodeWithPerspectiveProps) {
  const [sliderValue, setSliderValue] = useState(initialSliderValue)
  const [isPerspective, setIsPerspective] = useState(initialPerspective || false)

  const isCodeProvided = code && code.length > 0
  const twoColsLayoutStyles = isCodeProvided ? "grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-8" : "grid grid-cols-1"

  return (
    <div className={cn("px-4 rounded-md my-16 py-10", isCodeProvided && "bg-card")}>
      {/* Header Slider */}
      <div className={cn("mb-12")}>
        <div className="max-w-[350px] mx-auto">
          <div className="flex md:mb-6">
            <span>Number of Children</span>
            <span className="ml-auto">{sliderValue}</span>
          </div>
          <Slider
            defaultValue={[sliderValue]}
            onValueChange={([value]) => setSliderValue(value)}
            min={1}
            max={maxSliderValue}
          />
        </div>
      </div>

      {/* Code and preview  */}
      <div className={cn(twoColsLayoutStyles, "pt-0")}>
        {isCodeProvided && (
          <div className="size-full flex flex-col justify-start">
            <CodeHighlighter
              code={code}
              language={language}
              customStyle={{
                background: "#1e1e1e",
              }}
            />
          </div>
        )}

        {/* Perspective compoennt  */}
        <div className={cn(isCodeProvided ? "px-0 md:px-6" : "py-10")}>
          <PerspectiveCard
            isPerspectiveActive={isPerspective}
            onPerspectiveChange={setIsPerspective}
            backElement={backElement}
            frontElement={frontElement}
          />
        </div>
      </div>
    </div>
  )
}
