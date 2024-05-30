'use client'
import { TypographyMuted } from '@/components/typography'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, LogIn } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function CreateAccountCTA() {
  const pathname = usePathname()
  return (
    <Link
      className="flex items-center justify-between gap-x-4 border bg-card text-card-foreground p-4 md:ml-auto rounded-xl hover:bg-accent group"
      href={`/login?redirectTo=${pathname}`}
    >
      <p className="text-xs">
        Create a free account to
        <br /> track progress, customize appearance & more.
      </p>
      <ChevronRight className="group-hover:text-muted-foreground" />
    </Link>
  )
}

export default CreateAccountCTA
