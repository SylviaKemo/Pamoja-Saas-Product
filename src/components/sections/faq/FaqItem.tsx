import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/cn";

type FaqItemProps = {
  id: string;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
};

/** One accordion row: the question toggles the answer, with a +/− square on the right. */
export function FaqItem({ id, question, answer, open, onToggle }: FaqItemProps) {
  return (
    <div className="border-b border-sand-100">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-answer`}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-1 py-[22px] text-left text-base font-bold text-ink"
      >
        <span>{question}</span>
        <span
          aria-hidden
          className={cn(
            "flex size-7 flex-none items-center justify-center rounded-lg text-base transition-colors duration-200",
            open ? "bg-pine text-white" : "bg-cream text-emerald",
          )}
        >
          {open ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-answer`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p className="pr-12 pb-[22px] pl-1 text-[15px] leading-[1.65] text-body">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
