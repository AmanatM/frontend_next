"use client"

import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"
import Image from "next/image"

const markdownComponents = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "")

    return !inline && match ? (
      <SyntaxHighlighter style={vscDarkPlus} PreTag="div" language={match[1]} {...props} className={"!m-0"}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
  img({ node, ...props }: any) {
    const { src, alt } = props
    return <Image src={src} alt={alt || ""} width={500} height={300} layout="responsive" objectFit="contain" />
  },
}

/**
 * Renders markdown content using the Markdown component.
 *
 * @param props - The component props.
 * @param props.children - The markdown content to render.
 * @returns The rendered markdown.
 */
export function MarkdownRenderer(props: { children: string | null | undefined }) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
      {props.children}
    </Markdown>
  )
}
