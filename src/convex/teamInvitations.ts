import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authorize } from "./utils/auth";

export const list = query({
  args: { hackathonId: v.optional(v.id("hackathons")) },
  handler: async (ctx, args) => {
    authorize(ctx, "read");
    let q = ctx.db.query("teamInvitations"); if (args.hackathonId != null) q = q.eq("hackathonId", args.hackathonId);
    const rows = await q.order("desc").limit(100).collect();
    return rows.map((i) => ({
      id: i._id,
      hackathonId: i.hackathonId,
      teamId: i.teamId,
      inviterId: i.inviterId,
      email: i.email,
      status: i.status,
      token: i.token,
      createdAt: i.createdAt,
      expiresAt: i.expiresAt,
    }));
  },
});

export const get = query({
  args: { id: v.id("teamInvitations") },
  handler: async (ctx, args) => {
    authorize(ctx, "read");
    const i = await ctx.db.get(args.id);
    if (!i) return null;
    return {
      id: i._id,
      hackathonId: i.hackathonId,
      teamId: i.teamId,
      inviterId: i.inviterId,
      email: i.email,
      status: i.status,
      token: i.token,
      createdAt: i.createdAt,
      expiresAt: i.expiresAt,
    };
  },
});

export const getByToken = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    authorize(ctx, "read");
    const i = await ctx.db.query("teamInvitations").withIndex("byToken", "token").eq("token", args.token).first();
    if (!i) return null;
    return {
      id: i._id,
      hackathonId: i.hackathonId,
      teamId: i.teamId,
      inviterId: i.inviterId,
      email: i.email,
      status: i.status,
      token: i.token,
      createdAt: i.createdAt,
      expiresAt: i.expiresAt,
    };
  },
});

export const create = mutation({
  args: {
    hackathonId: v.id("hackathons"),
    teamId: v.id("hackathonTeams"),
    inviterId: v.id("users"),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    authorize(ctx, "write");
    const existing = await ctx.db
      .query("teamInvitations")
      .withIndex("byTeam", "teamId")
      .eq("teamId", args.teamId)
      .eq("status", "pending")
      .first();
    if (existing) throw new Error("an invitation is already pending for this team");
    const token = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const now = Date.now();
    const id = await ctx.db.insert("teamInvitations", {
      hackathonId: args.hackathonId,
      teamId: args.teamId,
      inviterId: args.inviterId,
      email: args.email,
      status: "pending",
      token,
      createdAt: now,
      expiresAt: now + 7 * 24 * 60 * 60 * 1000,
    });
    return id;
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("teamInvitations"),
    status: v.union(v.literal("accepted"), v.literal("declined"), v.literal("expired")),
  },
  handler: async (ctx, args) => {
    authorize(ctx, "write");
    const i = await ctx.db.get(args.id);
    if (!i) throw new Error("invitation not found");
    if (i.status !== "pending") throw new Error("invalid transition");
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const accept = mutation({
  args: {
    token: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    authorize(ctx, "write");
    const i = await ctx.db.query("teamInvitations").withIndex("byToken", "token").eq("token", args.token).first();
    if (!i) throw new Error("invalid invitation");
    if (i.status !== "pending") throw new Error("invalid invitation state");
    await ctx.db.patch(i._id, { status: "accepted" });
    await ctx.db.insert("hackathonTeamMembers", {
      teamId: i.teamId,
      userId: args.userId,
      role: "developer",
      joinedAt: Date.now(),
    });
    return i._id;
  },
});

export const decline = mutation({
  args: {
    id: v.id("teamInvitations"),
  },
  handler: async (ctx, args) => {
    authorize(ctx, "write");
    const i = await ctx.db.get(args.id);
    if (!i) throw new Error("invitation not found");
    if (i.status !== "pending") throw new Error("invalid invitation state");
    await ctx.db.patch(args.id, { status: "declined" });
  },
});
