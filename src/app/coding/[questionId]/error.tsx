'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { use, useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  const router = useRouter()

  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">500</h1>
        <span className="font-medium">Oops! Something went wront!</span>
        <p className="text-center text-muted-foreground">
          We apologize for the inconvenience.
          <br />
          Please try again later.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
          <Button onClick={() => router.push('/')}>Home Page</Button>
        </div>
      </div>
    </div>
  )
}
