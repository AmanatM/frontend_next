"use client"
import CodeHighlighter from "@/components/universalCodeHighliter"
import React, { useState } from "react"

const CodeWithPreview = ({ code }: { code: string }) => {
  const [width, setWidth] = useState(50)

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(event.target.value))
  }

  return (
    <div className="py-6 px-4 rounded-md">
      <div className="flex flex-col md:flex-row md:gap-x-4">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <CodeHighlighter code={code} language={"css"} />
        </div>
        <div className="md:w-1/2 bg-[#171717] rounded-md ">
          <div className="bg-slate-50 h-full rounded-md text-neutral-900">Preview</div>
        </div>
      </div>
    </div>
  )
}

export default CodeWithPreview
