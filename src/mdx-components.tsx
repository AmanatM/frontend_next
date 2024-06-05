import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: props => <h1 {...props} className="mb-4 text-4xl font-bold" />,
    p: props => <p {...props} className="mb-4" />,
    pre: props => <pre {...props} className="rounded-b-lg mt-0" />, // remove most of our original styles for the code blocks
    CodeHeader, // this component can be entered as-is
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
