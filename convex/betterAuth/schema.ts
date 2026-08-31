import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"
import { tables } from "./generatedSchema"

const roleValidator = v.union(v.literal("admin"), v.literal("user"))

const user = defineTable({
  ...tables.user.validator.fields,
  role: roleValidator,
})

const schema = defineSchema({
  ...tables,
  user,
})

export default schema
