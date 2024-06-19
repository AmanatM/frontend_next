import { cn } from "@/lib/utils"
import { Card } from "./card"

export const BentoGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return (
    <div className={cn("mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3", className)}>
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
        "group/bento row-span-1 flex flex-col justify-between space-y-4 bg-background p-4 transition duration-200",
        className,
      )}
    >
      {header}
      <div className="transition duration-200">
        {icon}
        <div className="mb-2 mt-2 font-sans font-bold">{title}</div>
        <div className="text-xs font-normal">{description}</div>
      </div>
    </Card>
  )
}
