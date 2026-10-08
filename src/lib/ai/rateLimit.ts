import { VISITOR_LIMITS, type LimitWindow } from "./schemas";

/**
 * Best-effort, in-memory rate limiting per IP address.
 *
 * LIMITATION: on Vercel each serverless instance keeps its own memory, and instances are
 * started and stopped freely. A visitor whose requests reach several instances gets
 * a separate allowance on each, and counts reset on a cold start. This slows down casual
 * abuse but is NOT a hard guarantee. The real ceiling is the Gemini free-tier quota,
 * which Google enforces per project. For a reliable limit, swap this for a shared store
 * such as Upstash Redis.
 */

const WINDOWS: { window: LimitWindow; limit: number; ms: number }[] = [
  { window: "minute", limit: VISITOR_LIMITS.perMinute, ms: 60_000 },
  { window: "day", limit: VISITOR_LIMITS.perDay, ms: 24 * 60 * 60_000 },
];

const LONGEST_WINDOW_MS = Math.max(...WINDOWS.map((w) => w.ms));
/** Stops the map from growing without bound on a busy instance. */
const MAX_TRACKED_CLIENTS = 5_000;

const requestLog = new Map<string, number[]>();

export type RateLimitResult = { ok: true } | { ok: false; window: LimitWindow; retryAfterSeconds: number };

/** Records a request for `clientId` and reports whether it is within the limits. */
export function checkRateLimit(clientId: string, now = Date.now()): RateLimitResult {
  const recent = (requestLog.get(clientId) ?? []).filter((t) => now - t < LONGEST_WINDOW_MS);

  for (const { window, limit, ms } of WINDOWS) {
    const inWindow = recent.filter((t) => now - t < ms);
    if (inWindow.length >= limit) {
      const oldest = inWindow[0];
      requestLog.set(clientId, recent);
      return { ok: false, window, retryAfterSeconds: Math.max(1, Math.ceil((oldest + ms - now) / 1000)) };
    }
  }

  recent.push(now);
  requestLog.delete(clientId); // re-insert so the map stays ordered by last activity
  requestLog.set(clientId, recent);

  if (requestLog.size > MAX_TRACKED_CLIENTS) {
    const leastRecent = requestLog.keys().next().value;
    if (leastRecent !== undefined) requestLog.delete(leastRecent);
  }

  return { ok: true };
}

/** The visitor's IP as reported by Vercel's proxy, or a shared bucket when it's unknown. */
export function getClientId(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}
