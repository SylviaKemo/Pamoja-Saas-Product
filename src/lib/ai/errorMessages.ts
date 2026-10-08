import type { ErrorCode } from "./schemas";

/** User-facing copy for every error the playground can show. Shared by the API routes and the UI. */
export const ERROR_COPY: Record<ErrorCode, { title: string; message: string; retryable: boolean }> = {
  invalid_input: {
    title: "Check your input",
    message: "Something about the message or context isn't valid. Please review it and try again.",
    retryable: false,
  },
  rate_limited: {
    title: "Slow down a little",
    message: "You've sent a lot of requests in a short time. Please wait a minute and try again.",
    retryable: true,
  },
  quota_exceeded: {
    title: "Demo limit reached",
    message: "This public demo has used up its free Gemini quota for now. Please try again later.",
    retryable: true,
  },
  timeout: {
    title: "That took too long",
    message: "Pamoja AI didn't respond in time. Please try again.",
    retryable: true,
  },
  ai_unavailable: {
    title: "Pamoja AI is unavailable",
    message: "The AI service had a problem handling this request. Please try again in a moment.",
    retryable: true,
  },
  invalid_ai_response: {
    title: "Pamoja AI got confused",
    message: "The AI returned an answer we couldn't use. Please try again.",
    retryable: true,
  },
  not_configured: {
    title: "AI isn't set up yet",
    message: "The playground's AI connection hasn't been configured. Please try again later.",
    retryable: false,
  },
  network: {
    title: "Connection problem",
    message: "We couldn't reach Pamoja AI. Check your internet connection and try again.",
    retryable: true,
  },
};
