import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { z } from "zod";
import { AiError, toAiError } from "./errors";

/**
 * Server-only Gemini client. Never import this from a client component:
 * it reads GEMINI_API_KEY, which must stay on the server.
 */

/**
 * A stable, lightweight Flash-Lite model on the Gemini API free tier.
 * Chosen over gemini-3.5-flash, whose free tier allows only 20 requests per day per project
 * (October 2026). Each model has its own quota; check yours at https://aistudio.google.com/rate-limit.
 * Override with GEMINI_MODEL without changing code.
 */
export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

const REQUEST_TIMEOUT_MS = 25_000;
/** One retry when the model returns JSON that doesn't match the schema. */
const MAX_ATTEMPTS = 2;

let client: GoogleGenAI | undefined;

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new AiError("not_configured");
  client ??= new GoogleGenAI({ apiKey });
  return client;
}

/**
 * Converts a zod schema to the JSON Schema Gemini expects.
 * Length limits are left out (Gemini supports only part of JSON Schema); zod still enforces them afterwards.
 */
function toGeminiSchema(schema: z.ZodType) {
  const strip = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(strip);
    if (node && typeof node === "object") {
      return Object.fromEntries(
        Object.entries(node)
          .filter(([key]) => !["$schema", "minLength", "maxLength"].includes(key))
          .map(([key, value]) => [key, strip(value)]),
      );
    }
    return node;
  };
  return strip(z.toJSONSchema(schema));
}

type GenerateOptions<T extends z.ZodType> = {
  systemInstruction: string;
  prompt: string;
  schema: T;
  /** Caps the response size, including the model's internal thinking. */
  maxOutputTokens: number;
  temperature?: number;
};

/** Asks Gemini for JSON matching `schema`, validates it, and retries once if it doesn't match. */
export async function generateStructured<T extends z.ZodType>({
  systemInstruction,
  prompt,
  schema,
  maxOutputTokens,
  temperature = 0.4,
}: GenerateOptions<T>): Promise<z.infer<T>> {
  const responseJsonSchema = toGeminiSchema(schema);

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let text: string | undefined;
    try {
      const response = await getClient().models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseJsonSchema,
          maxOutputTokens,
          temperature,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          abortSignal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        },
      });
      text = response.text;
    } catch (error) {
      throw toAiError(error);
    }

    const result = schema.safeParse(parseJson(text));
    if (result.success) return result.data;
  }

  throw new AiError("invalid_ai_response");
}

function parseJson(text: string | undefined): unknown {
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}
