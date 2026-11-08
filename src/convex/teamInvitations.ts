import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import { authorize } from "./utils/auth";

function toInvite(i: Doc<"teamInvitations">) {
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
}

export const list = query({
  args: { hackathonId: v.optional(v.id("hackathons")) },
  handler: async (ctx, args) => {
    await authorize(ctx, "read");
    const rows = await ctx.db.query("teamInvitations").order("desc").take(200);
    return rows
      .filter((i) => args.hackathonId == null || i.hackathonId === args.hackathonId)
      .slice(0, 100)
      .map(toInvite);
  },
});

export const get = query({
  args: { id: v.id("teamInvitations") },
  handler: async (ctx, args) => {
    await authorize(ctx, "read");
    const i = await ctx.db.get(args.id);
    return i ? toInvite(i) : null;
  },
});

export const getByToken = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await authorize(ctx, "read");
    const i = await ctx.db
      .query("teamInvitations")
      .withIndex("byToken", (q) => q.eq("token", args.token))
      .first();
    return i ? toInvite(i) : null;
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
    await authorize(ctx, "write");
    const teamInvites = await ctx.db
      .query("teamInvitations")
      .withIndex("byTeam", (q) => q.eq("teamId", args.teamId))
      .collect();
    if (teamInvites.some((i) => i.status === "pending")) {
      throw new Error("an invitation is already pending for this team");
    }

    const token = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const now = Date.now();
    return await ctx.db.insert("teamInvitations", {
      hackathonId: args.hackathonId,
      teamId: args.teamId,
      inviterId: args.inviterId,
      email: args.email,
      status: "pending",
      token,
      createdAt: now,
      expiresAt: now + 7 * 24 * 60 * 60 * 1000,
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("teamInvitations"),
    status: v.union(v.literal("accepted"), v.literal("declined"), v.literal("expired")),
  },
  handler: async (ctx, args) => {
    await authorize(ctx, "write");
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
    await authorize(ctx, "write");
    const i = await ctx.db
      .query("teamInvitations")
      .withIndex("byToken", (q) => q.eq("token", args.token))
      .first();
    if (!i) throw new Error("invalid invitation");
    if (i.status !== "pending") throw new Error("invalid invitation state");
    if (i.expiresAt < Date.now()) {
      await ctx.db.patch(i._id, { status: "expired" });
      throw new Error("invitation expired");
    }

    await ctx.db.patch(i._id, { status: "accepted" });
    await ctx.db.insert("hackathonTeamMembers", {
      teamId: i.teamId,
      userId: args.userId,
      role: "developer",
      joinedAt: Date.now(),
    });

    const team = await ctx.db.get(i.teamId);
    if (team && !team.memberIds.includes(args.userId)) {
      await ctx.db.patch(team._id, { memberIds: [...team.memberIds, args.userId] });
    }

    return i._id;
  },
});

export const decline = mutation({
  args: {
    id: v.id("teamInvitations"),
  },
  handler: async (ctx, args) => {
    await authorize(ctx, "write");
    const i = await ctx.db.get(args.id);
    if (!i) throw new Error("invitation not found");
    if (i.status !== "pending") throw new Error("invalid invitation state");
    await ctx.db.patch(args.id, { status: "declined" });
  },
});
