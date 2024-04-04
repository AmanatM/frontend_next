'use client'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export function MarkdownRenderer(props: { children: string | null | undefined }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '')

          return !inline && match ? (
            <SyntaxHighlighter style={vscDarkPlus} PreTag="div" language={match[1]} {...props} className={'!m-0'}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
    >
      {props.children}
    </Markdown>
  )
}

// export default function MarkdownRender({ mdString }: MarkdownRenderProps) {
//   10  return (
//   11    <ReactMarkdown
//   12      components={{
//   13        code({ inline, className, ...props }) {
//   14          const hasLang = /language-(\w+)/.exec(className || "");
//   15          return !inline && hasLang ? (
//   16            <SyntaxHighlighter
//   17              style={oneDark}
//   18              language={hasLang[1]}
//   19              PreTag="div"
//   20              className="mockup-code scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded"
//   21              showLineNumbers={true}
//   22              useInlineStyles={true}
//   23            >
//   24              {String(props.children).replace(/\n$/, "")}
//   25            </SyntaxHighlighter>
//   26          ) : (
//   27            <code className={className} {...props} />
//   28          );
//   29        },
//   30      }}
//   31    >
//   32      {mdString}
//   33    </ReactMarkdown>
//   34  );
//   35}
