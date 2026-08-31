import { expect, test } from "bun:test"
import { resolveBootstrapRole } from "../convex/authBootstrapPolicy"

test("the first requested admin is promoted", () => {
  expect(resolveBootstrapRole(false, "admin")).toBe("admin")
})

test("the first requested user remains a user", () => {
  expect(resolveBootstrapRole(false, "user")).toBe("user")
})

test("later users are forced to user", () => {
  expect(resolveBootstrapRole(true, "admin")).toBe("user")
})

test("forged or malformed roles do not elevate", () => {
  expect(resolveBootstrapRole(false, "owner")).toBe("user")
  expect(resolveBootstrapRole(false, { role: "admin" })).toBe("user")
})

test("serialized contenders have one bootstrap winner", () => {
  const first = resolveBootstrapRole(false, "admin")
  const second = resolveBootstrapRole(true, "admin")
  expect([first, second]).toEqual(["admin", "user"])
})
