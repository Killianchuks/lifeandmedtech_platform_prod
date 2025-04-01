"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold tracking-tight">Something went wrong</h1>
        <p className="mt-4 text-muted-foreground">An unexpected error occurred. Our team has been notified.</p>
        <div className="mt-8 flex gap-4">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

