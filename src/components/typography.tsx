import { cn } from '@/lib/utils'
import React from 'react'

export const TypographyH2 = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn('scroll-m-20 text-3xl font-semibold tracking-tight ', className)} {...props} />
  ),
)
TypographyH2.displayName = 'TypographyH2'

export const TypographyH3 = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...props} />
  ),
)
TypographyH3.displayName = 'TypographyH3'

export const TypographyH4 = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <h4 ref={ref} className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props} />
  ),
)
TypographyH4.displayName = 'TypographyH4'

export const TypographyP = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
  ),
)

TypographyP.displayName = 'TypographyP'

export const TypographySmall = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <small ref={ref} className={cn('text-sm font-medium leading-none', className)} {...props} />
  ),
)
TypographySmall.displayName = 'TypographySmall'

/** P tag with `text-sm text-muted-foreground` tailwind classes */
export const TypographyMuted = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  ),
)
TypographyMuted.displayName = 'TypographyMuted'
