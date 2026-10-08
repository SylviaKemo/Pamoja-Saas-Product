import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** Clears the message, context, results and reply. */
export function StartOverButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <Button variant="outline" size="xs" onClick={onClick} disabled={disabled}>
      <RotateCcw aria-hidden size={14} />
      Start over
    </Button>
  );
}
