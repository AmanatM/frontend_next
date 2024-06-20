import { cn } from "@/lib/utils"
import { Card } from "./card"

export const BentoGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return (
    <div className={cn("mx-auto grid grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3", className)}>
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
}) => {
  return (
    <Card
      className={cn(
        "group/bento row-span-1 flex flex-col justify-center gap-y-6 overflow-hidden bg-background p-4 transition duration-200",
        className,
      )}
    >
      <div className="flex size-full justify-center p-4">{header}</div>

      <div className="transition duration-200">
        <span className="text-muted-foreground">{icon}</span>
        <div className="mb-2 mt-2 font-sans font-bold">{title}</div>
        <div className="text-xs font-normal">{description}</div>
      </div>
    </Card>
  )
}
