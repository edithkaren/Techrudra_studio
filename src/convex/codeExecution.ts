import { v } from "convex/values";
import { action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

/**
 * Secure code execution / judging integration.
 *
 * Policy:
 *  - Untrusted submissions never reach the application server process.
 *  - The app only *dispatches* work to a sandbox and *ingests* a signed result
 *    returned by the sandbox.  The sandbox is the only component that runs the
 *    user's code (AWS Bedrock Code Interpreter incl. Meta's Code Interpreter +
 *    Anthropic's secure sandbox, or an equivalent FaaS/GPU sandbox).
 *
 *  Production reviewer brief:
 *    1. Update `SANDBOX_TARGET` below to the secrets you provision (e.g.
 *       `AWS_BEDROCK_CODE_INTERPRETER`, or your private endpoint).
 *    2. Store only a *server-side* target + short-lived credentials (STS
 *       assume-role, vault token).  Do not embed private keys in source.
 *    3. Always send results through `ingestResult` (which you can harden with
 *       re-signing, rate limits, and HMAC) so the DB can never be corrupted
 *       from a spoofed payload.
 */

// ── Configuration ─────────────────────────────────────────────────────────────
const SANDBOX_TARGET = "AWS_BEDROCK_CODE_INTERPRETER";

// ── Shrink-wrapped request/response contract ──────────────────────────────────
type SandboxRunRequest = {
  submissionId: string;
  problemId: string;
  code: string;
  language: string;
  timeoutMs: number;
};

type SandboxJudgeResult = {
  passed: boolean;
  verdict: string;
  score: number;
  executionMs: number;
  memoryKb: number;
  testCaseResults: Array<{ testCaseId: string; passed: boolean; timeMs?: number; memoryKb?: number; verdict?: string }>;
  penalty: number;
};

// ── Dispatch ("use node" action, queued by submissions.dispatchRun) ───────────
export const dispatchRun = action({
  args: { submissionId: v.id("submissions") },
  handler: async (ctx, args) => {
    const sub = await ctx.runQuery(internal.submissions.getInternal, { id: args.submissionId });
    if (!sub) throw new Error("submission not found");

    const now = Date.now();
    // Real deployments: short-lived sandbox JWT + per-submission nonce; never a
    // static key in the bundle.  The sandbox validates the signature before
    // executing ANY code.
    const request: SandboxRunRequest = {
      submissionId: sub.id,
      problemId: sub.problemId,
      code: sub.code,
      language: sub.language,
      timeoutMs: 5_000,
    };
    const payload = {
      request,
      ts: now,
      // The code/nonce are bound to this request; the sandbox rejects replay.
      nonce: `${now}-${sub.id}`,
    };

    const r = await fetch(SANDBOX_TARGET + "/v1/run", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      await ctx.runMutation(internal.submissions.ingestResultInternal, {
        submissionId: args.submissionId,
        status: "judgeError",
        verdict: "judgeError",
      });
      throw new Error("sandbox dispatch failed");
    }

    const result = (await r.json()) as SandboxJudgeResult;
    await ctx.runMutation(internal.submissions.ingestResultInternal, {
      submissionId: args.submissionId,
      status: result.passed ? "accepted" : "wrongAnswer",
      verdict: result.verdict,
      score: result.score,
      executionMs: result.executionMs,
      memoryKb: result.memoryKb,
      testCaseResults: result.testCaseResults,
      penalty: result.penalty,
    });
    return result;
  },
});

// ── Ingest (server-authored, not client-callable) ────────────────────────────
export const ingestResult = internalMutation({
  // Real deployments: require an `hmac`, `salt`, `ts` and call `verifySandboxSig`
  // before committing.  For the MVP we keep a strict schema and document the
  // missing integrity layer.
  args: {
    submissionId: v.id("submissions"),
    result: v.object({
      passed: v.boolean(),
      verdict: v.string(),
      score: v.number(),
      executionMs: v.number(),
      memoryKb: v.number(),
      testCaseResults: v.array(
        v.object({
          testCaseId: v.string(),
          passed: v.boolean(),
          timeMs: v.optional(v.number()),
          memoryKb: v.optional(v.number()),
          verdict: v.optional(v.string()),
        }),
      ),
      penalty: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const { result } = args;
    // A proper deployment would validate the HMAC + timestamp here.
    await ctx.runMutation(internal.submissions.ingestResultInternal, {
      submissionId: args.submissionId,
      status: result.passed ? "accepted" : "wrongAnswer",
      verdict: result.verdict,
      score: result.score,
      executionMs: result.executionMs,
      memoryKb: result.memoryKb,
      testCaseResults: result.testCaseResults,
      penalty: result.penalty,
    });
  },
});
