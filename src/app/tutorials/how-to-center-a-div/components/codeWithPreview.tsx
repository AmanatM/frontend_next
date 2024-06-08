"use client"
import CodeHighlighter from "@/components/universalCodeHighliter"
import { cn } from "@/lib/utils"
import React, { useState } from "react"
import { Slider } from "@/components/ui/slider"

const CodeWithPreview = ({ code }: { code: string }) => {
  const [width, setWidth] = useState([100])
  const [height, setHeight] = useState([100])

  return (
    <div className="py-6 px-4 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4 mb-12">
        <div>
          <div>
            Container width: <span>{width + "%"}</span>
          </div>
          <Slider defaultValue={width} onValueChange={setWidth} min={30} />
        </div>
        <div>
          <div>
            Container height: <span>{height + "%"}</span>
          </div>
          <Slider defaultValue={height} onValueChange={setHeight} min={30} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4 mb-8 md:mb-4">
        <div className="size-full">
          <CodeHighlighter
            code={code}
            language={"css"}
            customStyle={{
              height: "100%",
              background: "#1e1e1e",
            }}
          />
        </div>
        <div className="size-full bg-[#1e1e1e] rounded-md flex justify-center items-center min-h-full relative">
          <div
            className={cn("bg-slate-50 rounded-md text-neutral-900", "flex items-center justify-center")}
            style={{
              width: `${width}%`,
              height: `${height}%`,
            }}
          >
            <div className="border border-stone-950 h-24 w-24 flex justify-center items-center">Child </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeWithPreview
