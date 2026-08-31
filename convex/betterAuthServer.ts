import { betterAuth } from "better-auth"
import { internal } from "./_generated/api"
import type { GenericCtx } from "@convex-dev/better-auth"
import { createAuthOptions } from "./betterAuthOptions"

export const createAuth = (ctx: GenericCtx) =>
  betterAuth({
    ...createAuthOptions(ctx, false),
    databaseHooks: {
      user: {
        create: {
          before: async (user: Record<string, unknown>) => {
            const requestedRole = user.role === "admin" ? "admin" : "user"
            return {
              data: {
                ...user,
                role: "user",
                bootstrapRoleRequest: requestedRole,
              },
            }
          },
          after: async (user: Record<string, unknown>) => {
            if (!("runMutation" in ctx)) throw new Error("Better Auth user creation requires a mutation-capable context")
            if (typeof user.id !== "string") return
            await ctx.runMutation(internal.authBootstrap.finalizeRoleClaim, {
              userId: user.id,
            })
          },
        },
        update: {
          before: async (user: Record<string, unknown>) => {
            if (Object.prototype.hasOwnProperty.call(user, "role")) return false
          },
        },
      },
    },
  })
