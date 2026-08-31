"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useQuery } from "convex/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { api } from "../../../../../convex/_generated/api"
import { authClient } from "@/lib/auth-client"
import { Button } from "@workspace/ui/components/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"
import { toast } from "@workspace/ui/components/sonner"

const signUpSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.enum(["admin", "user"]).optional(),
})

type SignUpValues = z.infer<typeof signUpSchema>

/**
 * SOURCE OF TRUTH KEYWORDS: bootstrap-aware sign up, Better Auth email sign up
 * WHAT: Registers a workspace account and optionally presents first-user roles.
 * WHY: The server owns role assignment; this query only controls field visibility.
 * WHERE: Users can open /sign-up before signing in.
 */
export default function SignUpPage() {
  const router = useRouter()
  const bootstrapAvailable = useQuery(api.authBootstrap.isBootstrapAvailable)
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", role: "user" },
  })

  const onSubmit = async (values: SignUpValues) => {
    const registration = bootstrapAvailable
      ? values
      : { name: values.name, email: values.email, password: values.password }

    try {
      const result = await authClient.signUp.email(registration)
      if (result.error) {
        toast.error("Could not create your account. Please check your details and try again.")
        return
      }

      toast.success("Account created successfully.")
      router.replace("/dashboard")
    } catch {
      toast.error("Could not create your account. Please try again.")
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-sm flex-col gap-4 rounded-lg border bg-card p-6">
          <div>
            <h1 className="text-xl font-semibold">Create an account</h1>
            <p className="text-sm text-muted-foreground">Set up your workspace account.</p>
          </div>

          <FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input autoComplete="name" {...field} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" autoComplete="email" {...field} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="password" render={({ field }) => <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" autoComplete="new-password" {...field} /></FormControl><FormMessage /></FormItem>} />

          {bootstrapAvailable === true && (
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First user role</FormLabel>
                  <FormControl>
                    <select {...field} className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
                      <option value="admin">Admin - manage the workspace</option>
                      <option value="user">User - standard access</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating account..." : "Create account"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" href="/sign-in">Sign in</Link>
          </p>
        </form>
      </Form>
    </main>
  )
}
