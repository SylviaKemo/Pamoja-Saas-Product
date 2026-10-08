"use client";

import { useState } from "react";
import { MessagePanel } from "./MessagePanel";
import { Panel } from "./Panel";

/** The two-column workspace: customer message on the left, AI results on the right. */
export function Playground() {
  const [message, setMessage] = useState("");
  const [businessContext, setBusinessContext] = useState("");

  return (
    <div className="relative -mt-[72px] px-4 nav:px-7">
      <div className="mx-auto grid max-w-[1200px] items-start gap-5 split:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <MessagePanel
          message={message}
          onMessageChange={setMessage}
          businessContext={businessContext}
          onBusinessContextChange={setBusinessContext}
          onAnalyze={() => {}}
          isAnalyzing={false}
        />
        <Panel title="Pamoja AI analysis" />
      </div>
    </div>
  );
}
