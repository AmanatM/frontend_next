import CodeHighlighter from "@/components/universalCodeHighliter"
import React from "react"

function GroupCodeView({ code = "", language = "css" }: { code: string; language?: string }) {
  return (
    <div className="size-full flex flex-col justify-start">
      <CodeHighlighter
        code={code}
        language={language}
        customStyle={{
          background: "#1e1e1e",
        }}
      />
    </div>
  )
}

export default GroupCodeView
