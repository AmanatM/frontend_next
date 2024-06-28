import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "../custom/button"
import Link, { LinkProps } from "next/link"
import * as React from "react"

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonProps & LinkProps>(
  ({ variant, size, children, className, href, ...props }, ref) => {
    return (
      <Link href={href} className={cn(buttonVariants({ variant, size }), className)} ref={ref}>
        {children}
      </Link>
    )
  },
)

ButtonLink.displayName = "ButtonLink"
