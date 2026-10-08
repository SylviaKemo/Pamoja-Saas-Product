import { generateStructured } from "@/lib/ai/gemini";
import { handleAiRequest } from "@/lib/ai/http";
import { buildRefinePrompt, REFINE_SYSTEM_INSTRUCTION } from "@/lib/ai/prompts";
import { refinedReplySchema, refineRequestSchema } from "@/lib/ai/schemas";

/** Allows for the 25s model timeout plus one retry for malformed output. */
export const maxDuration = 60;

/** POST /api/ai/refine: { customerMessage, businessContext?, currentReply, refinementType } → { reply } */
export async function POST(request: Request) {
  return handleAiRequest(
    request,
    refineRequestSchema,
    ({ customerMessage, businessContext, currentReply, refinementType }) =>
      generateStructured({
        systemInstruction: REFINE_SYSTEM_INSTRUCTION,
        prompt: buildRefinePrompt(customerMessage, businessContext, currentReply, refinementType),
        schema: refinedReplySchema,
        maxOutputTokens: 2048,
        // A little more variety when the agent asks for a fresh alternative.
        temperature: refinementType === "regenerate" ? 0.9 : 0.4,
      }),
  );
}
