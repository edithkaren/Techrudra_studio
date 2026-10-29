import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authorize } from "./utils/auth";

export const list = query({
  args: {
    userId: v.optional(v.id("users")),
    problemId: v.optional(v.id("problems")),
    competitionId: v.optional(v.id("competitions")),
    hackathonId: v.optional(v.id("hackathons")),
    status: v.optional(v.string()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    authorize(ctx, "read");
    const q = ctx.db.query("submissions").withIndex("byStatus", "status");
    if (args.userId) q = q.eq("userId", args.userId);
    if (args.problemId) q = q.eq("problemId", args.problemId);
    if (args.competitionId) q = q.eq("competitionId", args.competitionId);
    if (args.hackathonId) q = q.eq("hackathonId", args.hackathonId);
    if (args.status) q = q.eq("status", args.status);
    const limit = 50;
    const res = await q.order("desc").limit(limit + 1).paginate(args.cursor);
    return {
      items: res.results.map((s) => ({
        id: s._id,
        problemId: s.problemId,
        competitionId: s.competitionId,
        hackathonId: s.hackathonId,
        language: s.language,
        status: s.status,
        verdict: s.verdict,
        score: s.score,
        executionMs: s.executionMs,
        memoryKb: s.memoryKb,
        testCaseResults: s.testCaseResults,
        penalty: s.penalty,
        createdAt: s.createdAt,
      })),
      cursor: res.pageCursors.next ?? null,
      hasMore: res.pageCursors.next !== undefined,
    };
  },
});

export const get = query({
  args: { id: v.id("submissions") },
  handler: async (ctx, args) => {
    authorize(ctx, "read");
    const s = await ctx.db.get(args.id);
    if (!s) return null;
    return {
      id: s._id,
      userId: s.userId,
      problemId: s.problemId,
      competitionId: s.competitionId,
      hackathonId: s.hackathonId,
      teamId: s.teamId,
      code: s.code,
      language: s.language,
      status: s.status,
      verdict: s.verdict,
      score: s.score,
      executionMs: s.executionMs,
      memoryKb: s.memoryKb,
      testCaseResults: s.testCaseResults,
      penalty: s.penalty,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
    };
  },
});

export const submit = mutation({
  args: {
    userId: v.id("users"),
    problemId: v.id("problems"),
    competitionId: v.optional(v.id("competitions")),
    hackathonId: v.optional(v.id("hackathons")),
    teamId: v.optional(v.id("hackathonTeams")),
    code: v.string(),
    language: v.string(),
  },
  handler: async (ctx, args) => {
    authorize(ctx, "write");
    const id = await ctx.runMutation("submissions:dispatchRun", {
      userId: args.userId,
      problemId: args.problemId,
      competitionId: args.competitionId,
      hackathonId: args.hackathonId,
      teamId: args.teamId,
      code: args.code,
      language: args.language,
    });
    return id;
  },
});

export const dispatchRun = mutation({
  args: {
    userId: v.id("users"),
    problemId: v.id("problems"),
    competitionId: v.optional(v.id("competitions")),
    hackathonId: v.optional(v.id("hackathons")),
    teamId: v.optional(v.id("hackathonTeams")),
    code: v.string(),
    language: v.string(),
  },
  handler: async (ctx, args) => {
    // Guard: never accept the real harness task in a convex mutation.
    const now = Date.now();
    const id = await ctx.db.insert("submissions", {
      userId: args.userId,
      problemId: args.problemId,
      competitionId: args.competitionId,
      hackathonId: args.hackathonId,
      teamId: args.teamId,
      code: args.code,
      language: args.language,
      status: "compiling",
      createdAt: now,
      updatedAt: now,
    });
    // Dispatch to the secure sandbox in a background action.
    void ctx.runAction("codeExecution:dispatchRun", {
      submissionId: id,
    });
    return id;
  },
});

export const ingestResult = mutation({
  args: {
    submissionId: v.id("submissions"),
    status: v.union(
      v.literal("accepted"),
      v.literal("wrongAnswer"),
      v.literal("timeLimitExceeded"),
      v.literal("memoryLimitExceeded"),
      v.literal("runtimeError"),
      v.literal("compileError"),
      v.literal("judgePending"),
      v.literal("judgeError"),
      v.literal("submissionError")
    ),
    verdict: v.optional(v.string()),
    score: v.optional(v.number()),
    executionMs: v.optional(v.number()),
    memoryKb: v.optional(v.number()),
    testCaseResults: v.optional(v.array(v.object({
      testCaseId: v.string(),
      passed: v.boolean(),
      timeMs: v.optional(v.number()),
      memoryKb: v.optional(v.number()),
      verdict: v.optional(v.string()),
    }))),
    penalty: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const s = await ctx.db.get(args.submissionId);
    if (!s) throw new Error("submission not found");
    // Recompute penalty-like fields derived from timing (observed in DB mock).
    if (s.status === "accepted" && s.competitionId != null) {
      // competition scoring is recomputed server-side from recorded evaluations.
    }
    await ctx.db.patch(args.submissionId, {
      status: args.status,
      verdict: args.verdict,
      score: args.score,
      executionMs: args.executionMs,
      memoryKb: args.memoryKb,
      testCaseResults: args.testCaseResults,
      penalty: args.penalty ?? (s.penalty ?? 0),
      updatedAt: Date.now(),
    });
  },
});

export const deleteSubmission = mutation({
  args: { id: v.id("submissions") },
  handler: async (ctx, args) => {
    authorize(ctx, "write");
    await ctx.db.delete(args.id);
  },
});
