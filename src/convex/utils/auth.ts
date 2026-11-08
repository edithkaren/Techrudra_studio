import { type MutationCtx, type QueryCtx } from "../_generated/server";
import type { Id } from "../_generated/dataModel";
import type { Role } from "../schema";

export async function authorize(
  ctx: QueryCtx | MutationCtx,
  _mode: "read" | "write" | "admin" | "roles",
) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) throw new Error("unauthorized");
}

export async function requireRole(ctx: MutationCtx, roles: Role[]) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("unauthorized");

  const subject = identity.subject.split("|")[0] as Id<"users">;
  const user = await ctx.db.get(subject);
  if (!user || !roles.includes(user.role as Role)) throw new Error("forbidden");
}
