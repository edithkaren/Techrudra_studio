import { v } from "convex/values";
import { mutation, query, type QueryCtx, type MutationCtx } from "./_generated/server";
import type { Role } from "../schema";

export function authorize(ctx: QueryCtx | MutationCtx, mode: "read" | "write" | "admin" | "roles") {
  const identity = ctx.auth.getUserIdentity();
  if (identity === null) throw new Error("unauthorized");
  if (typeof identity.subject === "string") identity.subject = identity.subject.split("|")[0];
}

export function requireRole(ctx: MutationCtx, roles: Role[]) {
  authorize(ctx, "roles");
  const user = ctx.db.get((ctx.auth.getUserIdentity()?.subject as string) ?? "");
  if (!user || !roles.includes(user.role as Role)) throw new Error("forbidden");
}
