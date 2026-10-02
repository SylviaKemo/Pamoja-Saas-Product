import { useEffect, useRef, useState } from "react";
import { SAMPLE_CUSTOMERS } from "@/data/channels";

export type FeedMessage = {
  id: number;
  channelId: string;
  customer: string;
  /** Tick on which the message arrived; used to show "just now / Ns ago". */
  arrivedAt: number;
};

export const FEED_INTERVAL_MS = 1800;
const MAX_MESSAGES = 5;

const randomItem = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

/**
 * Simulates an inbox: every 1.8s a message arrives from a random connected channel.
 * Newest first, keeping the latest five.
 */
export function useLiveFeed(connectedIds: string[]) {
  const [feed, setFeed] = useState<{ tick: number; messages: FeedMessage[] }>({ tick: 0, messages: [] });

  // The timer reads the latest connected channels without being restarted on every toggle.
  const connectedRef = useRef(connectedIds);
  useEffect(() => {
    connectedRef.current = connectedIds;
  }, [connectedIds]);

  useEffect(() => {
    const timer = setInterval(() => {
      const channels = connectedRef.current;
      const channelId = channels.length > 0 ? randomItem(channels) : null;
      const customer = randomItem(SAMPLE_CUSTOMERS);

      setFeed(({ tick, messages }) => {
        const next = tick + 1;
        if (!channelId) return { tick: next, messages };

        const message: FeedMessage = { id: next, channelId, customer, arrivedAt: next };
        return { tick: next, messages: [message, ...messages].slice(0, MAX_MESSAGES) };
      });
    }, FEED_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return feed;
}
