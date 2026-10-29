import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authorize } from "./utils/auth";

export const list = query({
  args: { userId: v.id("users"), unread: v.optional(v.boolean()) },
  handler: async (ctx, args) => {
    authorize(ctx, "read");
    const q = ctx.db.query("notifications").withIndex("byUser", "userId").eq("userId", args.userId);
    if (args.unread === true) q = q.eq("readAt", undefined);
    const rows = await q.order("desc").limit(50).collect();
    return rows.map((n) => ({
      id: n._id,
      userId: n.userId,
      type: n.type,
      title: n.title,
      body: n.body,
      data: n.data,
      readAt: n.readAt,
      createdAt: n.createdAt,
    }));
  },
});

export const countUnread = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    authorize(ctx, "read");
    const rows = await ctx.db
      .query("notifications")
      .withIndex("byUser", "userId")
      .eq("userId", args.userId)
      .eq("readAt", undefined)
      .limit(1)
      .collect();
    return rows.length;
  },
});

export const markRead = mutation({
  args: { userId: v.id("users"), id: v.id("notifications") },
  handler: async (ctx, args) => {
    authorize(ctx, "write");
    const n = await ctx.db.get(args.id);
    if (!n) throw new Error("notification not found");
    if (n.userId !== args.userId) throw new Error("unauthorized");
    await ctx.db.patch(args.id, { readAt: Date.now() });
  },
});

export const createForOrganizer = mutation({
  args: {
    userId: v.id("users"),
    type: v.string(),
    title: v.string(),
    body: v.string(),
    data: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    authorize(ctx, "write");
    const now = Date.now();
    await ctx.db.insert("notifications", {
      userId: args.userId,
      type: args.type,
      title: args.title,
      body: args.body,
      data: args.data,
      readAt: undefined,
      createdAt: now,
    });
  },
});
