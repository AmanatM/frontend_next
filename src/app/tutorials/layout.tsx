import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="container mx-auto px-4 py-10">
      <article className={"prose dark:prose-invert prose-pre:p-0 mx-auto"}>{children}</article>
    </div>
  )
}
