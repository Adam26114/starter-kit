"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

/**
 * SOURCE OF TRUTH KEYWORDS: dashboard auth boundary, Better Auth session, protected queries, redirect
 * WHAT: Resolves the Better Auth session before mounting protected dashboard children.
 * WHY: Convex queries must never execute for an unresolved or unauthenticated dashboard visitor.
 * WHERE: The dashboard route layout wraps all protected feature pages with this boundary.
 */
export function DashboardAuthBoundary({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && !session) router.replace("/sign-in")
  }, [isPending, router, session])

  if (isPending || !session)
    return (
      <div className="flex min-h-svh items-center justify-center p-6 text-sm text-muted-foreground">
        Loading your workspace...
      </div>
    )
  return children
}
