import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authorize } from "./utils/auth";

const teamRole = v.union(
  v.literal("owner"),
  v.literal("developer"),
  v.literal("designer"),
  v.literal("reviewer"),
);

export const list = query({
  args: { hackathonId: v.optional(v.id("hackathons")) },
  handler: async (ctx, args) => {
    await authorize(ctx, "read");
    const rows =
      args.hackathonId != null
        ? await ctx.db
            .query("hackathonTeams")
            .withIndex("byHackathon", (q) => q.eq("hackathonId", args.hackathonId!))
            .take(100)
        : await ctx.db.query("hackathonTeams").order("desc").take(100);
    return rows.map((t) => ({
      id: t._id,
      hackathonId: t.hackathonId,
      name: t.name,
      description: t.description,
      ownerId: t.ownerId,
      memberIds: t.memberIds,
      projectId: t.projectId,
      createdAt: t.createdAt,
    }));
  },
});

export const get = query({
  args: { id: v.id("hackathonTeams") },
  handler: async (ctx, args) => {
    await authorize(ctx, "read");
    const t = await ctx.db.get(args.id);
    if (!t) return null;
    return {
      id: t._id,
      hackathonId: t.hackathonId,
      name: t.name,
      description: t.description,
      ownerId: t.ownerId,
      memberIds: t.memberIds,
      projectId: t.projectId,
      createdAt: t.createdAt,
    };
  },
});

export const getByOwner = query({
  args: { ownerId: v.id("users"), hackathonId: v.optional(v.id("hackathons")) },
  handler: async (ctx, args) => {
    await authorize(ctx, "read");
    const rows = await ctx.db
      .query("hackathonTeams")
      .withIndex("byOwner", (q) => q.eq("ownerId", args.ownerId))
      .take(50);
    return rows
      .filter((t) => args.hackathonId == null || t.hackathonId === args.hackathonId)
      .slice(0, 20)
      .map((t) => ({
        id: t._id,
        hackathonId: t.hackathonId,
        name: t.name,
        description: t.description,
        projectId: t.projectId,
        createdAt: t.createdAt,
      }));
  },
});

export const create = mutation({
  args: {
    hackathonId: v.id("hackathons"),
    name: v.string(),
    description: v.optional(v.string()),
    ownerId: v.id("users"),
    memberIds: v.array(v.id("users")),
    password: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await authorize(ctx, "write");
    const now = Date.now();
    const id = await ctx.db.insert("hackathonTeams", {
      hackathonId: args.hackathonId,
      name: args.name,
      description: args.description,
      ownerId: args.ownerId,
      memberIds: args.memberIds,
      password: args.password,
      createdAt: now,
    });
    for (const memberId of args.memberIds) {
      if (memberId === args.ownerId) continue;
      await ctx.db.insert("hackathonTeamMembers", {
        teamId: id,
        userId: memberId,
        role: "developer",
        joinedAt: now,
      });
    }
    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("hackathonTeams"),
    patch: v.object({
      name: v.optional(v.string()),
      description: v.optional(v.string()),
      password: v.optional(v.string()),
      memberIds: v.optional(v.array(v.id("users"))),
    }),
  },
  handler: async (ctx, args) => {
    await authorize(ctx, "write");
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("team not found");
    await ctx.db.patch(args.id, {
      ...args.patch,
      memberIds: args.patch.memberIds ?? existing.memberIds,
    });
  },
});

export const deleteTeam = mutation({
  args: { id: v.id("hackathonTeams") },
  handler: async (ctx, args) => {
    await authorize(ctx, "write");
    await ctx.db.delete(args.id);
  },
});

export const addMember = mutation({
  args: {
    teamId: v.id("hackathonTeams"),
    userId: v.id("users"),
    role: teamRole,
  },
  handler: async (ctx, args) => {
    await authorize(ctx, "write");
    const team = await ctx.db.get(args.teamId);
    if (!team) throw new Error("team not found");
    if (team.memberIds.includes(args.userId)) return;

    await ctx.db.insert("hackathonTeamMembers", {
      teamId: args.teamId,
      userId: args.userId,
      role: args.role,
      joinedAt: Date.now(),
    });
    await ctx.db.patch(args.teamId, { memberIds: [...team.memberIds, args.userId] });
  },
});

export const removeMember = mutation({
  args: { teamId: v.id("hackathonTeams"), userId: v.id("users") },
  handler: async (ctx, args) => {
    await authorize(ctx, "write");
    const team = await ctx.db.get(args.teamId);
    if (!team) throw new Error("team not found");

    const memberships = await ctx.db
      .query("hackathonTeamMembers")
      .withIndex("byTeam", (q) => q.eq("teamId", args.teamId))
      .collect();
    for (const membership of memberships) {
      if (membership.userId === args.userId) await ctx.db.delete(membership._id);
    }
    await ctx.db.patch(args.teamId, {
      memberIds: team.memberIds.filter((id) => id !== args.userId),
    });
  },
});

export const getMembers = query({
  args: { teamId: v.id("hackathonTeams") },
  handler: async (ctx, args) => {
    await authorize(ctx, "read");
    const rows = await ctx.db
      .query("hackathonTeamMembers")
      .withIndex("byTeam", (q) => q.eq("teamId", args.teamId))
      .collect();
    return rows.map((m) => ({
      id: m._id,
      userId: m.userId,
      role: m.role,
      joinedAt: m.joinedAt,
    }));
  },
});
