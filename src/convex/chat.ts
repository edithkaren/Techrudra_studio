"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { createVlyIntegrations } from "@vly-ai/integrations";

/**
 * Studio assistant.
 *
 * Runs on Convex (Node runtime) and proxies a single chat turn to the AI
 * gateway using the deployment-scoped integration key. The key never reaches
 * the browser: the client only ever calls this action.
 */

const MODEL = "gpt-4o-mini";
const MAX_HISTORY = 12;
const MAX_INPUT_CHARS = 1200;

const SYSTEM_PROMPT = `You are "TR", the assistant for Techrudra Studio (techrudra.studio), a creative technology studio founded by Rudraksh Paliwal (Founder & Creative Technologist).

Voice: warm, concise, confident. You are a studio concierge, not a general chatbot. Keep answers short (2-5 sentences or a tight list). No markdown headings. Plain text with simple dashes for lists.

What the studio offers, with starting prices and typical timelines:
- Full-Stack Web Development - from $2,500 - 2-8 weeks
- AI Chatbots & AI Applications - from $3,000 - 2-6 weeks
- AI Automation - from $1,500 - 1-4 weeks
- UI/UX Design - from $1,800 - 1-4 weeks
- Graphic & Motion Design - from $800 - 1-3 weeks
- Video Creation & Editing - from $1,200 - 1-3 weeks
- Digital Marketing - from $1,500/month - ongoing
- Social Media Marketing - from $1,200/month - ongoing

Stack: React, Next.js, Node.js, TypeScript, Supabase, Firebase, PostgreSQL, plus AI tooling.

How work happens: a short discovery call, a scoped proposal with fixed milestones, design in parallel with engineering, then launch and support.

Where to send people:
- Booking a call: the /booking page (pick a service, a weekday slot, then confirm).
- Email: TRStudio@gmail.com
- Portfolio case studies: the Portfolio section on the home page and /portfolio/<slug> pages.
- About the founder: the /about page.

Rules:
- If asked for a precise quote, say pricing depends on scope and suggest booking a call; quote only the "from" prices above.
- Never promise timelines shorter than listed, never invent clients, awards, team size, or guarantees.
- If a question is unrelated to the studio (coding help, general trivia), answer briefly and steer back to how the studio can help.
- If the visitor is ready to start, end with a nudge to /booking.`;

export const reply = action({
  args: {
    messages: v.array(
      v.object({
        role: v.union(v.literal("user"), v.literal("assistant")),
        content: v.string(),
      }),
    ),
  },
  handler: async (_ctx, args) => {
    const history = args.messages
      .filter((m) => m.content.trim().length > 0)
      .slice(-MAX_HISTORY)
      .map((m) => ({
        role: m.role,
        content: m.content.slice(0, MAX_INPUT_CHARS),
      }));

    if (history.length === 0 || history[history.length - 1].role !== "user") {
      return { ok: false as const, text: "", error: "Ask a question to get started." };
    }

    const token = process.env.VLY_INTEGRATION_KEY;
    if (!token) {
      return {
        ok: false as const,
        text: "",
        error:
          "The assistant is not connected yet. Add your integration key, or email TRStudio@gmail.com.",
      };
    }

    try {
      const vly = createVlyIntegrations({ deploymentToken: token });
      const result = await vly.ai.completion({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
        temperature: 0.6,
        maxTokens: 400,
      });

      if (!result.success) {
        return {
          ok: false as const,
          text: "",
          error: result.error ?? "The assistant could not answer that. Try again in a moment.",
        };
      }

      const text = result.data?.choices?.[0]?.message?.content?.trim() ?? "";
      if (!text) {
        return { ok: false as const, text: "", error: "The assistant returned an empty answer." };
      }

      return { ok: true as const, text, error: null };
    } catch (err) {
      console.error("[chat] completion failed", err);
      return {
        ok: false as const,
        text: "",
        error: "The assistant is unreachable right now. Please try again or email TRStudio@gmail.com.",
      };
    }
  },
});
