"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AiLabel } from "@/components/ui/AiLabel";

const REPLY = "Good news, Amina — your parcel is at our local depot and should reach you tomorrow. Sorry for the wait!";
const MS_PER_CHARACTER = 80;
/** Ticks to wait before typing starts; the remaining ticks after the reply is complete act as a pause. */
const PAUSE_BEFORE_TYPING = 10;
const TICKS_PER_LOOP = 150;

const CUSTOMER_MESSAGES = ["Hi! My order #4821 hasn't arrived yet.", "Will it come this week?"];

/** A conversation card where Pamoja AI types out a suggested reply, on a loop, while it's on screen. */
export function TypingReplyCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.05 });
  const reduceMotion = useReducedMotion();
  const typedCount = useTypingLoop(inView && !reduceMotion);
  const typed = reduceMotion ? REPLY : REPLY.slice(0, typedCount);

  return (
    <div ref={ref} className="flex flex-col gap-3.5 rounded-2xl bg-white p-[22px] text-ink">
      <div className="flex flex-col gap-2">
        {CUSTOMER_MESSAGES.map((message) => (
          <div
            key={message}
            className="max-w-[82%] self-start rounded-xl bg-cream px-2.5 py-[7px] text-xs leading-[1.4] text-secondary"
          >
            <strong>Amina</strong> {message}
          </div>
        ))}
      </div>

      <div className="rounded-[14px] border border-[#DCE7DE] bg-[#FCFBF7] px-3.5 py-3">
        <div className="flex items-center justify-between">
          <AiLabel tone="light">PAMOJA AI IS DRAFTING</AiLabel>
          <TypingDots />
        </div>
        <p className="mt-2 min-h-[66px] text-sm leading-[1.55] text-secondary">
          <span className="sr-only">{REPLY}</span>
          <span aria-hidden>
            {typed}
            <span className="ml-px inline-block h-4 w-0.5 animate-caret bg-leaf align-[-3px]" />
          </span>
        </p>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-light">
          <kbd className="rounded-[5px] border border-sand-200 px-1.5 py-px font-sans font-bold text-body">Tab</kbd> to
          accept
        </span>
        <span className="flex gap-2 font-semibold">
          <span className="rounded-lg border border-sand-200 px-3 py-[7px]">Edit</span>
          <span className="rounded-lg bg-pine px-3 py-[7px] text-white">Send</span>
        </span>
      </div>
    </div>
  );
}

/** Returns how many characters of the reply should be visible, advancing every 80ms while `running`. */
function useTypingLoop(running: boolean) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setTick((t) => (t + 1) % TICKS_PER_LOOP), MS_PER_CHARACTER);
    return () => clearInterval(timer);
  }, [running]);

  return Math.max(0, tick - PAUSE_BEFORE_TYPING);
}

function TypingDots() {
  return (
    <span aria-hidden className="flex gap-[3px]">
      {[0, 0.2, 0.4].map((delay) => (
        <span
          key={delay}
          className="size-[5px] animate-blink rounded-full bg-leaf"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}
