export type BootstrapRole = "admin" | "user"

export function resolveBootstrapRole(
  hasBootstrapClaim: boolean,
  requestedRole: unknown,
): BootstrapRole {
  if (hasBootstrapClaim) return "user"
  return requestedRole === "admin" ? "admin" : "user"
}
