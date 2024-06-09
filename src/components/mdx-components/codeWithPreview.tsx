"use client"
import CodeHighlighter from "@/components/universalCodeHighliter"
import { cn } from "@/lib/utils"
import React, { useState } from "react"
import { Slider } from "@/components/ui/slider"

type CodeWithPreviewProps = {
  code: string
  containerStyle?: string
  childStyle?: string
  headerSingleColumn?: boolean
  childContent?: React.ReactNode | string
  language?: string
}

export default function CodeWithPreview({
  code,
  containerStyle,
  childStyle,
  headerSingleColumn,
  childContent = "Child",
  language = "css",
}: CodeWithPreviewProps) {
  const [containerWidth, setContainerWidth] = useState([100])
  const [containerHight, setContainerHeight] = useState([100])

  const twoColsLayoutStyles = "grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-8"

  return (
    <div className="py-6 px-4 rounded-md bg-card">
      {/* Header  */}
      <div className={cn(twoColsLayoutStyles, "mb-12", headerSingleColumn && "md:grid-cols-1 grid-cols-1")}>
        <SizeSlider value={containerWidth[0]} setValue={setContainerWidth} label="Container width" />
        {!headerSingleColumn && (
          <SizeSlider value={containerHight[0]} setValue={setContainerHeight} label="Container height" />
        )}
      </div>

      {/* Code and preview  */}
      <div className={cn(twoColsLayoutStyles, "mb-8 md:mb-4")}>
        <div className="size-full">
          <CodeHighlighter
            code={code}
            language={language}
            customStyle={{
              height: "100%",
              background: "#1e1e1e",
            }}
          />
        </div>
        <div className="size-full bg-[#1e1e1e] rounded-md flex justify-center items-center relative min-h-[150px]">
          <div
            className={cn("bg-zinc-300 rounded-md text-neutral-900", containerStyle && containerStyle)}
            style={{
              width: `${containerWidth}%`,
              height: `${containerHight}%`,
            }}
          >
            <div
              className={cn(
                "border-4 border-stone-950 h-24 w-24 flex justify-center items-center",
                childStyle && childStyle,
              )}
            >
              {childContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SizeSlider({ value, setValue, label }: { value: number; setValue: (value: number[]) => void; label: string }) {
  return (
    <div>
      <div className="flex md:mb-6">
        <span>Container width: </span>
        <span className="ml-auto">{value + "%"}</span>
      </div>
      <Slider defaultValue={[value]} onValueChange={setValue} min={30} />
    </div>
  )
}
