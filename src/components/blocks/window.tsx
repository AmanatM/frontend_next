import { cn } from "@/lib/utils"
import { Globe, LucideIcon } from "lucide-react"
import React from "react"

type WindowProps = {
  className?: string
  header?: {
    title?: string
    icon?: LucideIcon
    grayscaleBtn?: boolean
    content?: React.ReactNode
  }
  children?: React.ReactNode
}

export default function Window({ header, children = null, className }: WindowProps) {
  const { title = "webcoderslab.com", icon: Icon, grayscaleBtn, content: headerContent } = header || {}

  return (
    <div
      className={cn(
        "flex h-full w-[250px] flex-col gap-y-2 overflow-hidden rounded-lg border bg-popover p-2",
        "max-h-full max-w-full",
        className,
      )}
    >
      <Header title={title} icon={Icon} grayscaleBtn={grayscaleBtn} headerContent={headerContent} />

      <Body>{children}</Body>
    </div>
  )
}

type HeaderProps = {
  title?: string
  icon?: LucideIcon
  grayscaleBtn?: boolean
  headerContent?: React.ReactNode
}

function Header({ title, icon: Icon, grayscaleBtn, headerContent }: HeaderProps) {
  const btnColors = [{ color: "bg-red-500" }, { color: "bg-yellow-500" }, { color: "bg-green-500" }]

  return (
    <div className="relative flex h-4 items-center justify-center">
      {!headerContent ? (
        <>
          <div className="absolute left-0 top-0 flex h-full items-center justify-between gap-x-1">
            {btnColors.map(({ color }, i) => (
              <span key={i} className={cn("h-2 w-2 rounded-full bg-muted", !grayscaleBtn && color)}></span>
            ))}
          </div>
          <div className="flex items-center gap-x-1 text-xs text-muted-foreground">
            <span>{Icon ? <Icon size={14} /> : <Globe size={14} />}</span>
            <span>{title}</span>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-x-1 text-xs text-muted-foreground">{headerContent}</div>
      )}
    </div>
  )
}

function Body({ children }: { children?: React.ReactNode }) {
  return (
    <div className={cn("z-20 flex min-h-[100px] flex-grow items-center justify-center", !children && "p-4")}>
      {!children ? (
        <div className="dark:bg-dot-white/10 bg-dot-black/10 h-full min-h-[50px] w-full"></div>
      ) : (
        <>{children}</>
      )}
    </div>
  )
}
