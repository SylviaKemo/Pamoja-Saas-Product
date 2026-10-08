import { generateStructured } from "@/lib/ai/gemini";
import { handleAiRequest } from "@/lib/ai/http";
import { ANALYSIS_SYSTEM_INSTRUCTION, buildAnalysisPrompt } from "@/lib/ai/prompts";
import { analysisSchema, analyzeRequestSchema } from "@/lib/ai/schemas";

/** Allows for the 25s model timeout plus one retry for malformed output. */
export const maxDuration = 60;

/** POST /api/ai/analyze: { customerMessage, businessContext? } → Analysis */
export async function POST(request: Request) {
  return handleAiRequest(request, analyzeRequestSchema, ({ customerMessage, businessContext }) =>
    generateStructured({
      systemInstruction: ANALYSIS_SYSTEM_INSTRUCTION,
      prompt: buildAnalysisPrompt(customerMessage, businessContext),
      schema: analysisSchema,
      maxOutputTokens: 4096,
    }),
  );
}
