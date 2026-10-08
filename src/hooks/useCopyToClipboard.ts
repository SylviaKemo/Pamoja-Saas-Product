import { useEffect, useRef, useState } from "react";

type CopyStatus = "idle" | "copied" | "failed";

const RESET_AFTER_MS = 2000;

/** Copies text to the clipboard and reports "copied" or "failed" for two seconds. */
export function useCopyToClipboard() {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      // Clipboard access can be blocked by the browser or an insecure context.
      setStatus("failed");
    }
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus("idle"), RESET_AFTER_MS);
  };

  return { status, copy };
}
