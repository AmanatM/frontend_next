import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CirclePlus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { SelectValue } from "@radix-ui/react-select"

const multiSelectVariants = cva("font-normal", {
  variants: {
    variant: {
      default: "border-foreground/10 text-foreground bg-card hover:bg-card/80",
      secondary: "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      inverted: "inverted",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  onValueChange: (value: string) => void
  selectedValue: string
  placeholder?: string
  asChild?: boolean
  className?: string
  defaultValue: string
}

export const ToggleSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue,
      selectedValue,
      placeholder = "Select options",
      asChild = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <Select value={defaultValue} onValueChange={value => onValueChange(value)}>
        <SelectTrigger className="rounded-md border border-dashed min-h9 h9 w-auto hover:bg-inherit">
          <CirclePlus className="h-4 cursor-pointer" />
          <span className="text-xs mx-2">{placeholder}</span>

          {defaultValue.trim() !== "" && (
            <>
              <Separator orientation="vertical" className="flex min-h-6 h-full mx-2" />
              <Badge className={cn(multiSelectVariants({ variant, className }))} variant={"secondary"}>
                {options.find(option => option.value === defaultValue)?.label}
              </Badge>
            </>
          )}
        </SelectTrigger>
        <SelectContent className="p-0" align="start">
          {options.map(option => {
            return (
              <SelectItem
                key={option.value}
                style={{ pointerEvents: "auto", opacity: 1 }}
                className="cursor-pointer"
                value={option.value}
              >
                {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                <span>{option.label}</span>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    )
  },
)

ToggleSelect.displayName = "ToggleSelect"
