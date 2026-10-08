import type { z } from "zod";
import { AiError, errorResponse } from "./errors";
import { checkRateLimit, getClientId } from "./rateLimit";

/** Generous upper bound for a request body; the field limits are far smaller. */
const MAX_BODY_BYTES = 16_000;

/**
 * Shared pipeline for the /api/ai routes:
 * rate limit → read and size-check the body → validate with zod → run → JSON response.
 * Any failure becomes a friendly `{ error: { code, message } }` response.
 */
export async function handleAiRequest<S extends z.ZodType>(
  request: Request,
  schema: S,
  run: (input: z.output<S>) => Promise<unknown>,
): Promise<Response> {
  try {
    const limit = checkRateLimit(getClientId(request));
    if (!limit.ok) throw new AiError("rate_limited", { retryAfter: limit.retryAfterSeconds, window: limit.window });

    const input = await readValidatedBody(request, schema);
    return Response.json(await run(input));
  } catch (error) {
    return errorResponse(error);
  }
}

async function readValidatedBody<S extends z.ZodType>(request: Request, schema: S): Promise<z.output<S>> {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) throw new AiError("invalid_input", { message: "That request is too large." });

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) throw new AiError("invalid_input", { message: "That request is too large." });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    throw new AiError("invalid_input", { message: "The request body must be JSON." });
  }

  const result = schema.safeParse(body);
  if (!result.success) throw new AiError("invalid_input", { message: result.error.issues[0]?.message });
  return result.data;
}
