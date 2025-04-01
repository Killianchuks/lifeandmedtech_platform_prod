"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ErrorBoundary({ children, fallback = <DefaultErrorFallback /> }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Caught error:", error)
      setError(error.error)
      setHasError(true)

      // Optionally log to an error tracking service like Sentry
      // if (typeof window.Sentry !== 'undefined') {
      //   window.Sentry.captureException(error.error);
      // }
    }

    window.addEventListener("error", errorHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  if (hasError) {
    return typeof fallback === "function" ? fallback({ error, reset: () => setHasError(false) }) : fallback
  }

  return children
}

function DefaultErrorFallback({
  reset,
}: {
  reset?: () => void
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="mt-2 text-muted-foreground">An unexpected error occurred. Our team has been notified.</p>
        <div className="mt-4 flex items-center gap-2">
          <Button onClick={() => window.location.reload()}>Refresh the page</Button>
          {reset && (
            <Button variant="outline" onClick={reset}>
              Try again
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

