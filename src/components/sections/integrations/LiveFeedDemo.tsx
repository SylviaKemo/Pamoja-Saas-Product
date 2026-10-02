"use client";

import { useState } from "react";
import { INITIALLY_CONNECTED } from "@/data/channels";
import { useLiveFeed } from "@/hooks/useLiveFeed";
import { ChannelPicker } from "./ChannelPicker";
import { InboxFeed } from "./InboxFeed";

/** "Live feed" layout: switch channels on and off and watch messages arrive in the shared inbox. */
export function LiveFeedDemo() {
  const [connectedIds, setConnectedIds] = useState(INITIALLY_CONNECTED);
  const feed = useLiveFeed(connectedIds);

  const toggleChannel = (id: string) =>
    setConnectedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  return (
    <div className="flex flex-wrap items-stretch gap-5 text-left">
      <ChannelPicker connectedIds={connectedIds} onToggle={toggleChannel} />
      <InboxFeed connectedCount={connectedIds.length} tick={feed.tick} messages={feed.messages} />
    </div>
  );
}
