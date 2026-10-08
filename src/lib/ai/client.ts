import type { z } from "zod";
import {
  analysisSchema,
  ERROR_CODES,
  refinedReplySchema,
  type AnalyzeRequest,
  type ApiError,
  type ErrorCode,
  type RefineRequest,
} from "./schemas";

/** A failed playground request, with a code the UI can turn into friendly copy. */
export class PlaygroundRequestError extends Error {
  constructor(
    readonly code: ErrorCode,
    /** Specific message from the server, e.g. a validation hint. */
    readonly serverMessage?: string,
    /** How long the server says to wait before retrying (rate limits and quotas). */
    readonly retryAfterSeconds?: number,
  ) {
    super(code);
    this.name = "PlaygroundRequestError";
  }
}

/** Slightly longer than the server's own limit, so the server's timeout error normally wins. */
const CLIENT_TIMEOUT_MS = 65_000;

export function analyzeMessage(request: AnalyzeRequest, signal?: AbortSignal) {
  return postJson("/api/ai/analyze", request, analysisSchema, signal);
}

export async function refineReply(request: RefineRequest, signal?: AbortSignal) {
  const { reply } = await postJson("/api/ai/refine", request, refinedReplySchema, signal);
  return reply;
}

export function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

async function postJson<S extends z.ZodType>(
  url: string,
  body: unknown,
  schema: S,
  signal?: AbortSignal,
): Promise<z.output<S>> {
  const timeout = AbortSignal.timeout(CLIENT_TIMEOUT_MS);
  const combinedSignal = signal ? AbortSignal.any([signal, timeout]) : timeout;

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: combinedSignal,
    });
  } catch (error) {
    if (signal?.aborted) throw error; // cancelled on purpose (e.g. Start over)
    if (timeout.aborted) throw new PlaygroundRequestError("timeout");
    throw new PlaygroundRequestError("network");
  }

  const data: unknown = await response.json().catch(() => undefined);

  if (!response.ok) {
    const error = (data as Partial<ApiError> | undefined)?.error;
    const code = ERROR_CODES.find((c) => c === error?.code) ?? "ai_unavailable";
    throw new PlaygroundRequestError(code, error?.message, error?.retryAfterSeconds);
  }

  const result = schema.safeParse(data);
  if (!result.success) throw new PlaygroundRequestError("invalid_ai_response");
  return result.data;
}
