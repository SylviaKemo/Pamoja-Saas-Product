"use client";

import { Panel } from "./Panel";

/** The two-column workspace: customer message on the left, AI results on the right. */
export function Playground() {
  return (
    <div className="relative -mt-[72px] px-4 nav:px-7">
      <div className="mx-auto grid max-w-[1200px] items-start gap-5 split:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <Panel title="Customer message" />
        <Panel title="Pamoja AI analysis" />
      </div>
    </div>
  );
}
