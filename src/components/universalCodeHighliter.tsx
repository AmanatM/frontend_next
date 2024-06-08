import { CSSProperties } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

import { dracula, vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"

type CodeHighlighterProps = {
  code: string
  language?: string
  style?: { [key: string]: React.CSSProperties }
  customStyle?: CSSProperties | undefined
}

export default function CodeHighlighter({ code, language, style, customStyle }: CodeHighlighterProps) {
  const highlightStyle = style ? style : vscDarkPlus
  return (
    <SyntaxHighlighter
      style={highlightStyle}
      language={language}
      className={"!m-0"}
      customStyle={{
        ...customStyle,
      }}
    >
      {code}
    </SyntaxHighlighter>
  )
}