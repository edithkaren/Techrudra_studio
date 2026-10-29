import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId, authTables } from "@convex-dev/auth/server";

/** Profile shape returned by the public profile query. */
export const userProfile = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;
    return {
      id: user._id,
      name: user.name,
      handle: user.handle,
      username: user.username,
      avatar: user.avatar,
      banner: user.banner,
      bio: user.bio,
      location: user.location,
      links: user.links,
      avatarColor: user.avatarColor,
      reputationScore: user.reputationScore,
      marketingOptIn: user.marketingOptIn,
      lastActiveAt: user.lastActiveAt,
      email: user.email,
      role: user.role,
    };
  },
});

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    const user = await ctx.db.get(userId);
    if (!user) return null;
    return {
      id: user._id,
      name: user.name,
      handle: user.handle,
      username: user.username,
      avatar: user.avatar,
      banner: user.banner,
      bio: user.bio,
      location: user.location,
      links: user.links,
      avatarColor: user.avatarColor,
      reputationScore: user.reputationScore,
      marketingOptIn: user.marketingOptIn,
      lastActiveAt: user.lastActiveAt,
      email: user.email,
      role: user.role,
    };
  },
});

export const me = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return { id: null };
    const user = await ctx.db.get(userId);
    return { id: user?._id ?? null };
  },
});

export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    handle: v.optional(v.string()),
    username: v.optional(v.string()),
    avatar: v.optional(v.string()),
    banner: v.optional(v.string()),
    bio: v.optional(v.string()),
    location: v.optional(v.string()),
    links: v.optional(v.record(v.string(), v.string())),
    avatarColor: v.optional(v.string()),
    marketingOptIn: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("not authenticated");
    const user = await ctx.db.get(userId);
    if (!user) throw new Error("user not found");
    await ctx.db.patch(userId, {
      name: args.name ?? user.name,
      handle: args.handle ?? user.handle,
      username: args.username ?? user.username,
      avatar: args.avatar ?? user.avatar,
      banner: args.banner ?? user.banner,
      bio: args.bio ?? user.bio,
      location: args.location ?? user.location,
      links: args.links ?? user.links,
      avatarColor: args.avatarColor ?? user.avatarColor,
      marketingOptIn: args.marketingOptIn ?? user.marketingOptIn,
    });
  },
});
