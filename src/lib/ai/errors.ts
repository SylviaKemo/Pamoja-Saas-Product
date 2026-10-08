import { ApiError as GeminiApiError } from "@google/genai";
import { ERROR_COPY } from "./errorMessages";
import type { ApiError, ErrorCode } from "./schemas";

const HTTP_STATUS: Record<ErrorCode, number> = {
  invalid_input: 400,
  rate_limited: 429,
  quota_exceeded: 429,
  timeout: 504,
  ai_unavailable: 502,
  invalid_ai_response: 502,
  not_configured: 503,
  network: 502,
};

/** An error with a known code that can be turned into a safe API response. */
export class AiError extends Error {
  constructor(
    readonly code: ErrorCode,
    /** Overrides the default user-facing message, e.g. with a validation hint. */
    readonly userMessage?: string,
    /** Seconds the client should wait before retrying (rate limits). */
    readonly retryAfter?: number,
  ) {
    super(code);
    this.name = "AiError";
  }
}

/** Maps anything thrown while calling Gemini to an AiError. */
export function toAiError(error: unknown): AiError {
  if (error instanceof AiError) return error;

  if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
    return new AiError("timeout");
  }

  if (error instanceof GeminiApiError) {
    if (error.status === 429) return new AiError("quota_exceeded");
    // An invalid or missing key comes back as 400 with an API_KEY_INVALID reason, or as 401/403.
    if (error.status === 401 || error.status === 403 || /api[ _]?key/i.test(error.message)) {
      return new AiError("not_configured");
    }
    if (error.status === 504) return new AiError("timeout");
    return new AiError("ai_unavailable");
  }

  return new AiError("ai_unavailable");
}

/** Builds the JSON error response. Logs only the code and status, never the customer's text. */
export function errorResponse(error: unknown): Response {
  const aiError = toAiError(error);
  const status = HTTP_STATUS[aiError.code];

  if (!(error instanceof AiError)) {
    const upstreamStatus = error instanceof GeminiApiError ? error.status : undefined;
    console.error(`[ai] ${aiError.code}`, { upstreamStatus, name: error instanceof Error ? error.name : typeof error });
  }

  const body: ApiError = {
    error: { code: aiError.code, message: aiError.userMessage ?? ERROR_COPY[aiError.code].message },
  };
  const headers = aiError.retryAfter ? { "Retry-After": String(aiError.retryAfter) } : undefined;
  return Response.json(body, { status, headers });
}
