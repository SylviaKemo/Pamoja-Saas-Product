import { ApiError as GeminiApiError } from "@google/genai";
import { ERROR_COPY, limitMessage } from "./errorMessages";
import type { ApiError, ErrorCode, LimitWindow } from "./schemas";

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

type AiErrorOptions = {
  /** Overrides the default user-facing message, e.g. with a validation hint. */
  message?: string;
  /** Seconds the client should wait before retrying (rate limits and quotas). */
  retryAfter?: number;
  /** Whether a per-minute or a daily limit was hit. */
  window?: LimitWindow;
};

/** An error with a known code that can be turned into a safe API response. */
export class AiError extends Error {
  readonly userMessage?: string;
  readonly retryAfter?: number;
  readonly window?: LimitWindow;

  constructor(
    readonly code: ErrorCode,
    options: AiErrorOptions = {},
  ) {
    super(code);
    this.name = "AiError";
    this.userMessage = options.message;
    this.retryAfter = options.retryAfter;
    this.window = options.window;
  }
}

/** Maps anything thrown while calling Gemini to an AiError. */
export function toAiError(error: unknown): AiError {
  if (error instanceof AiError) return error;

  if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
    return new AiError("timeout");
  }

  if (error instanceof GeminiApiError) {
    if (error.status === 429) return quotaError(error.message);
    // An invalid or missing key comes back as 400 with an API_KEY_INVALID reason, or as 401/403.
    if (error.status === 401 || error.status === 403 || /api[ _]?key/i.test(error.message)) {
      console.error(`[ai] not_configured: Google rejected GEMINI_API_KEY (status ${error.status}); check the key's value`);
      return new AiError("not_configured");
    }
    if (error.status === 504) return new AiError("timeout");
    return new AiError("ai_unavailable");
  }

  return new AiError("ai_unavailable");
}

/**
 * Reads which free-tier quota Gemini says was exceeded and when to retry.
 * The 429 error message embeds details such as
 * "quotaId": "GenerateRequestsPerDayPerProjectPerModel-FreeTier" and "retryDelay": "14768s".
 */
function quotaError(details: string): AiError {
  const quotaId = details.match(/"quotaId":\s*"([^"]+)"/)?.[1] ?? "";
  const retryDelay = Number(details.match(/"retryDelay":\s*"(\d+(?:\.\d+)?)s"/)?.[1]);
  const window: LimitWindow = /PerDay/i.test(quotaId) ? "day" : "minute";

  let retryAfter = Number.isFinite(retryDelay) && retryDelay > 0 ? Math.ceil(retryDelay) : undefined;
  if (!retryAfter) retryAfter = window === "day" ? secondsUntilPacificMidnight() : 60;

  return new AiError("quota_exceeded", { retryAfter, window });
}

/** Gemini's daily quotas reset at midnight Pacific time. */
function secondsUntilPacificMidnight(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const elapsed = get("hour") * 3600 + get("minute") * 60 + get("second");
  return Math.max(60, 24 * 3600 - elapsed);
}

/** Builds the JSON error response. Logs only the code and status, never the customer's text. */
export function errorResponse(error: unknown): Response {
  const aiError = toAiError(error);
  const status = HTTP_STATUS[aiError.code];

  if (!(error instanceof AiError)) {
    const upstreamStatus = error instanceof GeminiApiError ? error.status : undefined;
    console.error(`[ai] ${aiError.code}`, { upstreamStatus, name: error instanceof Error ? error.name : typeof error });
  }

  const { code, retryAfter, window } = aiError;
  const message =
    aiError.userMessage ??
    (retryAfter && window && (code === "rate_limited" || code === "quota_exceeded")
      ? limitMessage(code, window, retryAfter)
      : ERROR_COPY[code].message);

  const body: ApiError = { error: { code, message, retryAfterSeconds: retryAfter } };
  const headers = retryAfter ? { "Retry-After": String(retryAfter) } : undefined;
  return Response.json(body, { status, headers });
}
