import { internalMutation, query } from "./_generated/server"
import { components } from "./_generated/api"
import { v } from "convex/values"
import { resolveBootstrapRole } from "./authBootstrapPolicy"

export const isBootstrapAvailable = query({
  args: {},
  returns: v.boolean(),
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("authBootstrap")
      .withIndex("by_key", (query) => query.eq("key", "singleton"))
      .unique()
    return existing === null
  },
})

/** Promotes the first persisted user, after Better Auth has committed it. */
export const finalizeRoleClaim = internalMutation({
  args: { userId: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(components.betterAuth.adapter.findOne, {
      model: "user",
      where: [{ field: "_id", operator: "eq", value: args.userId }],
    })
    if (user === null) return null

    const existing = await ctx.db
      .query("authBootstrap")
      .withIndex("by_key", (query) => query.eq("key", "singleton"))
      .unique()

    const role = resolveBootstrapRole(
      existing !== null,
      user.bootstrapRoleRequest,
    )
    if (existing === null) {
      await ctx.db.insert("authBootstrap", { key: "singleton", role })
    }

    await ctx.runMutation(components.betterAuth.adapter.updateOne, {
      input: {
        model: "user",
        where: [{ field: "_id", operator: "eq", value: args.userId }],
        update: { role, bootstrapRoleRequest: null },
      },
    })
    return null
  },
})
