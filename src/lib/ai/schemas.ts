import { z } from "zod";

/**
 * Shared contract between the AI Playground UI and the /api/ai routes.
 * The same schemas validate incoming requests and the model's structured output.
 */

/** Input length limits, enforced in the browser and again on the server. */
export const LIMITS = {
  customerMessage: 2000,
  businessContext: 1500,
  reply: 3000,
} as const;

export const INTENTS = [
  "Billing Issue",
  "Refund Request",
  "Technical Support",
  "Delivery Problem",
  "Product Inquiry",
  "Account Issue",
  "General Inquiry",
] as const;

export const SENTIMENTS = ["Positive", "Neutral", "Negative"] as const;
export const PRIORITIES = ["Low", "Medium", "High"] as const;

export const REFINEMENT_TYPES = ["shorter", "empathetic", "professional", "simplify", "regenerate"] as const;

export type Intent = (typeof INTENTS)[number];
export type Sentiment = (typeof SENTIMENTS)[number];
export type Priority = (typeof PRIORITIES)[number];
export type RefinementType = (typeof REFINEMENT_TYPES)[number];

// ---------- Requests ----------

const customerMessage = z
  .string()
  .trim()
  .min(1, "Enter a customer message.")
  .max(LIMITS.customerMessage, `Keep the customer message under ${LIMITS.customerMessage} characters.`);

const businessContext = z
  .string()
  .trim()
  .max(LIMITS.businessContext, `Keep the business context under ${LIMITS.businessContext} characters.`)
  .default("");

export const analyzeRequestSchema = z.object({ customerMessage, businessContext });

export const refineRequestSchema = z.object({
  customerMessage,
  businessContext,
  currentReply: z
    .string()
    .trim()
    .min(1, "The reply is empty.")
    .max(LIMITS.reply, `Keep the reply under ${LIMITS.reply} characters.`),
  refinementType: z.enum(REFINEMENT_TYPES),
});

export type AnalyzeRequest = z.input<typeof analyzeRequestSchema>;
export type RefineRequest = z.input<typeof refineRequestSchema>;

// ---------- Responses ----------

export const analysisSchema = z.object({
  intent: z.enum(INTENTS).describe("The customer's main reason for contacting support."),
  sentiment: z.enum(SENTIMENTS).describe("The overall tone of the customer's message."),
  priority: z.enum(PRIORITIES).describe("How urgently a support agent should handle this."),
  priorityReason: z.string().min(1).max(400).describe("One or two sentences explaining the priority."),
  summary: z.string().min(1).max(800).describe("A concise summary of the issue and relevant details."),
  recommendedAction: z
    .string()
    .min(1)
    .max(1000)
    .describe("What the support agent should do next, based only on the message and business context."),
  suggestedReply: z
    .string()
    .min(1)
    .max(LIMITS.reply)
    .describe("A professional, empathetic reply for the agent to review before sending."),
});

export const refinedReplySchema = z.object({
  reply: z.string().min(1).max(LIMITS.reply).describe("The revised customer support reply."),
});

export type Analysis = z.infer<typeof analysisSchema>;
export type RefinedReply = z.infer<typeof refinedReplySchema>;

// ---------- Errors ----------

export const ERROR_CODES = [
  "invalid_input",
  "rate_limited",
  "quota_exceeded",
  "timeout",
  "ai_unavailable",
  "invalid_ai_response",
  "not_configured",
  "network",
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

/** Which limit was hit: the short per-minute one or the daily one. */
export type LimitWindow = "minute" | "day";

/** Body of every non-2xx response from /api/ai/*. */
export type ApiError = { error: { code: ErrorCode; message: string; retryAfterSeconds?: number } };

/** Per-visitor request limits for the public demo (enforced best-effort on the server). */
export const VISITOR_LIMITS = {
  perMinute: 8,
  perDay: 60,
} as const;
