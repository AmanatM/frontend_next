import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import CodeHighlighter from "./components/universalCodeHighliter"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: props => <h1 {...props} className="mb-4 text-4xl font-bold" />,
    p: props => <p {...props} className="mb-4" />,
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "")

      return !inline && match ? (
        <CodeHighlighter language={match[1]} code={children} />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
    pre: props => <pre {...props} className="rounded-b-lg mt-0" />, // remove most of our original styles for the code blocks
    CodeHeader, // this component can be entered as-is
    img({ node, ...props }: any) {
      const { src, alt } = props
      return <Image src={src} alt={alt || ""} width={500} height={300} layout="responsive" objectFit="contain" />
    },
    ...components,
  }
}

interface CodeHeaderProps {
  text: string
}

export default function CodeHeader({ text }: CodeHeaderProps) {
  return (
    <div className=" relative bottom-[-10px] rounded-t-md bg-[#282c34] px-4 py-2 font-mono text-sm text-neutral-300">
      {text}
    </div>
  )
}
