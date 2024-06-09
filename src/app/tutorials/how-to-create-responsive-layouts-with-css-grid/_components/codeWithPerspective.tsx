"use client"
import React, { useState } from "react"
import PerspectiveCard from "@/components/mdx-components/perspective-card"

import CodeHighlighter from "@/components/universalCodeHighliter"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

type CodeWithPerspectiveProps = {
  code: string
  containerStyle?: string
  language?: string
  childCount?: number
  maxChildrenCount?: number
  isPerspectiveActive?: boolean
}

function CodeWithPerspective({
  code,
  language = "css",
  childCount = 3,
  maxChildrenCount = 5,
  isPerspectiveActive = false,
}: CodeWithPerspectiveProps) {
  const [numberOfChildren, setNumberOfChildren] = useState(childCount)

  const isCodeProvided = code && code.length > 0

  const twoColsLayoutStyles = isCodeProvided ? "grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-8" : "grid grid-cols-1"

  return (
    <div className={cn("px-4 rounded-md my-24 py-10", isCodeProvided && "bg-card")}>
      {/* Header  */}
      <div className={cn("mb-12")}>
        <SizeSlider
          value={numberOfChildren}
          maxValue={maxChildrenCount}
          setValue={setNumberOfChildren}
          label="Number Of Children"
        />
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
          <PerspectiveCard numberOfChildren={numberOfChildren} isPerspectiveActive={isPerspectiveActive} />
        </div>
      </div>
    </div>
  )
}

function SizeSlider({
  value,
  maxValue,
  setValue,
  label,
}: {
  value: number
  maxValue: number
  setValue: (value: number) => void
  label: string
}) {
  return (
    <div className="max-w-[350px] mx-auto">
      <div className="flex md:mb-6">
        <span>{label}</span>
        <span className="ml-auto">{value.toString()}</span>
      </div>
      <Slider defaultValue={[value]} onValueChange={([value]) => setValue(value)} min={1} max={maxValue} />
    </div>
  )
}

export default CodeWithPerspective
