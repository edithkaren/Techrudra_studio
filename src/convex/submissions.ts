import { v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
  type MutationCtx,
} from "./_generated/server";
import { api } from "./_generated/api";
import type { Doc } from "./_generated/dataModel";
import { authorize } from "./utils/auth";

/**
 * Submission reading/writing.
 *
 * `list`/`get` are client-facing; the `*Internal` variants exist so the
 * sandbox dispatcher action can read a submission and write back a verdict
 * without going through a public endpoint.
 */

const SCAN_LIMIT = 500;
const PAGE_SIZE = 50;

const submissionStatus = v.union(
  v.literal("compiling"),
  v.literal("accepted"),
  v.literal("wrongAnswer"),
  v.literal("timeLimitExceeded"),
  v.literal("memoryLimitExceeded"),
  v.literal("runtimeError"),
  v.literal("compileError"),
  v.literal("judgePending"),
  v.literal("judgeError"),
  v.literal("submissionError"),
);

const testCaseResultsValidator = v.array(
  v.object({
    testCaseId: v.string(),
    passed: v.boolean(),
    timeMs: v.optional(v.number()),
    memoryKb: v.optional(v.number()),
    verdict: v.optional(v.string()),
  }),
);

export const list = query({
  args: {
    userId: v.optional(v.id("users")),
    problemId: v.optional(v.id("problems")),
    competitionId: v.optional(v.id("competitions")),
    hackathonId: v.optional(v.id("hackathons")),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await authorize(ctx, "read");

    // Narrow with an index when we have the owner; otherwise scan a bounded
    // window of recent submissions and filter the remaining predicates.
    const base =
      args.userId != null
        ? ctx.db
            .query("submissions")
            .withIndex("byUser", (q) => q.eq("userId", args.userId!))
        : ctx.db.query("submissions");

    const rows = await base.order("desc").take(SCAN_LIMIT);

    const filtered = rows.filter(
      (s) =>
        (args.problemId == null || s.problemId === args.problemId) &&
        (args.competitionId == null || s.competitionId === args.competitionId) &&
        (args.hackathonId == null || s.hackathonId === args.hackathonId) &&
        (args.status == null || s.status === args.status),
    );

    return {
      items: filtered.slice(0, PAGE_SIZE).map((s) => ({
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
      cursor: null,
      hasMore: filtered.length > PAGE_SIZE,
    };
  },
});

export const get = query({
  args: { id: v.id("submissions") },
  handler: async (ctx, args) => {
    await authorize(ctx, "read");
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

/** Same shape as `get`, callable only from other Convex functions. */
export const getInternal = internalQuery({
  args: { id: v.id("submissions") },
  handler: async (ctx, args) => {
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
    await authorize(ctx, "write");
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

    // Judging happens out of process; the mutation only enqueues the job.
    await ctx.scheduler.runAfter(0, api.codeExecution.dispatchRun, { submissionId: id });

    return id;
  },
});

export const ingestResult = mutation({
  args: {
    submissionId: v.id("submissions"),
    status: submissionStatus,
    verdict: v.optional(v.string()),
    score: v.optional(v.number()),
    executionMs: v.optional(v.number()),
    memoryKb: v.optional(v.number()),
    testCaseResults: v.optional(testCaseResultsValidator),
    penalty: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await authorize(ctx, "write");
    await applyResult(ctx, args);
  },
});

export const ingestResultInternal = internalMutation({
  args: {
    submissionId: v.id("submissions"),
    status: submissionStatus,
    verdict: v.optional(v.string()),
    score: v.optional(v.number()),
    executionMs: v.optional(v.number()),
    memoryKb: v.optional(v.number()),
    testCaseResults: v.optional(testCaseResultsValidator),
    penalty: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await applyResult(ctx, args);
  },
});

type IngestArgs = {
  submissionId: Doc<"submissions">["_id"];
  status: Doc<"submissions">["status"];
  verdict?: string;
  score?: number;
  executionMs?: number;
  memoryKb?: number;
  testCaseResults?: Array<{
    testCaseId: string;
    passed: boolean;
    timeMs?: number;
    memoryKb?: number;
    verdict?: string;
  }>;
  penalty?: number;
};

async function applyResult(ctx: MutationCtx, args: IngestArgs) {
  const s = await ctx.db.get(args.submissionId);
  if (!s) throw new Error("submission not found");
  await ctx.db.patch(args.submissionId, {
    status: args.status,
    verdict: args.verdict,
    score: args.score,
    executionMs: args.executionMs,
    memoryKb: args.memoryKb,
    testCaseResults: args.testCaseResults,
    penalty: args.penalty ?? s.penalty ?? 0,
    updatedAt: Date.now(),
  });
}

export const deleteSubmission = mutation({
  args: { id: v.id("submissions") },
  handler: async (ctx, args) => {
    await authorize(ctx, "write");
    await ctx.db.delete(args.id);
  },
});
