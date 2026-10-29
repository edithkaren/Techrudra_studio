import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authorize } from "./utils/auth";

export const list = query({
  args: {
    difficulty: v.optional(v.union(v.literal("easy"), v.literal("medium"), v.literal("hard"), v.literal("veryHard"))),
    topic: v.optional(v.string()),
    language: v.optional(v.string()),
    status: v.optional(v.union(v.literal("published"), v.literal("draft"), v.literal("archived"))),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    authorize(ctx, "read");
    const q = ctx.db.query("problems").withIndex("byStatus", "status");
    if (args.difficulty) q = q.eq("difficulty", args.difficulty);
    if (args.topic) q = q.eq("topics", args.topic);
    if (args.status) q = q.eq("status", args.status);
    const limit = 24;
    const res = await q.order("desc").limit(limit + 1).paginate(args.cursor);
    return {
      items: res.results.map((p) => ({
        id: p._id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        difficulty: p.difficulty,
        topics: p.topics,
        tags: p.tags,
        suggestedLanguages: p.suggestedLanguages,
        status: p.status,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      })),
      cursor: res.pageCursors.next ?? null,
      hasMore: res.pageCursors.next !== undefined,
    };
  },
});

export const get = query({
  args: { id: v.id("problems") },
  handler: async (ctx, args) => {
    authorize(ctx, "read");
    const p = await ctx.db.get(args.id);
    if (!p) return null;
    return {
      id: p._id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      content: p.content,
      difficulty: p.difficulty,
      topics: p.topics,
      tags: p.tags,
      suggestedLanguages: p.suggestedLanguages,
      constraints: p.constraints,
      examples: p.examples,
      editorial: p.editorial,
      hints: p.hints,
      status: p.status,
      creatorId: p.creatorId,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    };
  },
});

export const getUserProblems = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    authorize(ctx, "read");
    const rows = await ctx.db
      .query("problems")
      .withIndex("byCreator", "creatorId")
      .eq("creatorId", args.userId)
      .order("desc")
      .limit(50);
    return rows.map((p) => ({
      id: p._id,
      title: p.title,
      slug: p.slug,
      difficulty: p.difficulty,
      topics: p.topics,
      status: p.status,
      createdAt: p.createdAt,
    }));
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    authorize(ctx, "read");
    const p = await ctx.db.query("problems").withIndex("bySlug", "slug").eq("slug", args.slug).first();
    if (!p) return null;
    return {
      id: p._id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      content: p.content,
      difficulty: p.difficulty,
      topics: p.topics,
      tags: p.tags,
      suggestedLanguages: p.suggestedLanguages,
      constraints: p.constraints,
      examples: p.examples,
      editorial: p.editorial,
      hints: p.hints,
      status: p.status,
      creatorId: p.creatorId,
      createdAt: p.createdAt,
    };
  },
});

export const search = query({
  args: { q: v.string() },
  handler: async (ctx, args) => {
    authorize(ctx, "read");
    const q = `%${args.q}%`;
    const rows = await ctx.db.query("problems").query({
      filter: {
        or: [
          { title: { contains: q } },
          { description: { contains: q } },
          { content: { contains: q } },
          { topics: { contains: args.q } },
          { tags: { contains: args.q } },
        ],
      },
    }).limit(30);
    return rows.map((p) => ({
      id: p._id,
      title: p.title,
      slug: p.slug,
      difficulty: p.difficulty,
      topics: p.topics,
      tags: p.tags,
    }));
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.string(),
    difficulty: v.union(v.literal("easy"), v.literal("medium"), v.literal("hard"), v.literal("veryHard")),
    topics: v.array(v.string()),
    tags: v.array(v.string()),
    suggestedLanguages: v.array(v.string()),
    constraints: v.string(),
    examples: v.optional(v.string()),
    editorial: v.optional(v.string()),
    hints: v.optional(v.array(v.string())),
    status: v.optional(v.union(v.literal("published"), v.literal("draft"), v.literal("archived"))),
  },
  handler: async (ctx, args) => {
    authorize(ctx, "write");
    const userId = await ctx.auth.getUserIdentity();
    if (!userId) throw new Error("not authenticated");
    const user = await ctx.db.get(userId.subject.split("|")[0] as any);
    if (!user) throw new Error("user not found");
    const id = await ctx.db.insert("problems", {
      title: args.title,
      slug: args.slug,
      description: args.description,
      content: args.content,
      difficulty: args.difficulty,
      topics: args.topics,
      tags: args.tags,
      suggestedLanguages: args.suggestedLanguages,
      constraints: args.constraints,
      examples: args.examples,
      editorial: args.editorial,
      hints: args.hints ?? [],
      status: args.status ?? "draft",
      creatorId: user._id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("problems"),
    patch: v.object({
      title: v.optional(v.string()),
      slug: v.optional(v.string()),
      description: v.optional(v.string()),
      content: v.optional(v.string()),
      difficulty: v.optional(v.union(v.literal("easy"), v.literal("medium"), v.literal("hard"), v.literal("veryHard"))),
      topics: v.optional(v.array(v.string())),
      tags: v.optional(v.array(v.string())),
      suggestedLanguages: v.optional(v.array(v.string())),
      constraints: v.optional(v.string()),
      examples: v.optional(v.string()),
      editorial: v.optional(v.string()),
      hints: v.optional(v.array(v.string())),
      status: v.optional(v.union(v.literal("published"), v.literal("draft"), v.literal("archived"))),
    }),
  },
  handler: async (ctx, args) => {
    authorize(ctx, "write");
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("problem not found");
    // Ownership check is delegated to the caller where relevant.
    await ctx.db.patch(args.id, {
      ...args.patch,
      updatedAt: Date.now(),
    });
  },
});

export const deleteProblem = mutation({
  args: { id: v.id("problems") },
  handler: async (ctx, args) => {
    authorize(ctx, "write");
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("problem not found");
    await ctx.db.delete(args.id);
  },
});
