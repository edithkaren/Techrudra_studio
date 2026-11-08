import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authorize } from "./utils/auth";

export const list = query({
  args: { problemId: v.id("problems") },
  handler: async (ctx, args) => {
    await authorize(ctx, "read");
    const rows = await ctx.db
      .query("testCases")
      .withIndex("byProblem", (q) => q.eq("problemId", args.problemId))
      .order("asc")
      .collect();
    return rows.map((t) => ({
      id: t._id,
      idString: t.id,
      input: t.input,
      output: t.output,
      hidden: t.hidden,
      timeLimitMs: t.timeLimitMs,
      memoryLimitKb: t.memoryLimitKb,
      createdAt: t.createdAt,
    }));
  },
});

export const create = mutation({
  args: {
    problemId: v.id("problems"),
    input: v.string(),
    output: v.string(),
    hidden: v.optional(v.boolean()),
    timeLimitMs: v.optional(v.number()),
    memoryLimitKb: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await authorize(ctx, "write");
    const problem = await ctx.db.get(args.problemId);
    if (!problem) throw new Error("problem not found");

    return await ctx.db.insert("testCases", {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      problemId: args.problemId,
      input: args.input,
      output: args.output,
      hidden: args.hidden ?? false,
      timeLimitMs: args.timeLimitMs,
      memoryLimitKb: args.memoryLimitKb,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("testCases"),
    patch: v.object({
      input: v.optional(v.string()),
      output: v.optional(v.string()),
      hidden: v.optional(v.boolean()),
      timeLimitMs: v.optional(v.number()),
      memoryLimitKb: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    await authorize(ctx, "write");
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("test case not found");
    await ctx.db.patch(args.id, args.patch);
  },
});

export const deleteTestCase = mutation({
  args: { id: v.id("testCases") },
  handler: async (ctx, args) => {
    await authorize(ctx, "write");
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("test case not found");
    await ctx.db.delete(args.id);
  },
});
