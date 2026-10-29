import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Role } from "../schema";

export function authorize(ctx: { auth: unknown }, mode: "read" | "write" | "admin" | "roles") {
  // The template's Convex runtime does not expose a shared auth object on the
  // query/mutation context in a stable, version-independent way, so we use the
  // public `ctx.auth.getUserIdentity()` pattern that every Convex deployment
  // supports.  The runtime's generated `server.d.ts` documents that query and
  // mutation ctxs receive the context object directly.
  const identity = ctx.auth.getUserIdentity();
  if (identity === null) {
    throw new Error("unauthorized");
  }
  // identity.subject is "userId|sessionId".  Resolve the user id for members.
  if (typeof identity.subject === "string") {
    identity.subject = identity.subject.split("|")[0];
  }
}

export function requireRole(ctx: { auth: unknown }, roles: Role[]) {
  authorize(ctx, "roles");
  const user = ctx.db.get((ctx.auth.getUserIdentity()?.subject as string) ?? "");
  if (!user || !roles.includes(user.role as Role)) {
    throw new Error("forbidden");
  }
}
