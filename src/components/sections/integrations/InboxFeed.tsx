import { AnimatePresence, motion } from "framer-motion";
import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { getChannel } from "@/data/channels";
import { FEED_INTERVAL_MS, type FeedMessage } from "@/hooks/useLiveFeed";
import { cn } from "@/lib/cn";

type InboxFeedProps = {
  connectedCount: number;
  tick: number;
  messages: FeedMessage[];
};

/** The "Shared inbox" card that receives messages from the connected channels. */
export function InboxFeed({ connectedCount, tick, messages }: InboxFeedProps) {
  return (
    <div className="flex-[1_1_440px] overflow-hidden rounded-[22px] border border-sand bg-white shadow-panel">
      <div className="flex items-center justify-between border-b border-sand-50 px-[18px] py-3.5 text-[13px] font-bold">
        <span>Shared inbox</span>
        <span className="flex items-center gap-1.5 text-xs text-emerald">
          <span className="size-[7px] animate-blink rounded-full bg-leaf-bright" />
          Live · {connectedCount} channels
        </span>
      </div>

      {connectedCount === 0 && (
        <div className="px-[18px] py-12 text-center text-[13px] text-muted-light">
          Turn on a channel to start receiving messages.
        </div>
      )}

      <AnimatePresence initial={false}>
        {messages.map((message) => (
          <FeedRow key={message.id} message={message} ticksAgo={tick - message.arrivedAt} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function FeedRow({ message, ticksAgo }: { message: FeedMessage; ticksAgo: number }) {
  const channel = getChannel(message.channelId);
  const isNew = ticksAgo === 0;
  const secondsAgo = Math.round((ticksAgo * FEED_INTERVAL_MS) / 1000);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "flex items-center gap-3 border-b border-[#F0EDE4] px-[18px] py-[13px] transition-colors duration-1000",
        isNew ? "bg-[#F3F8F3]" : "bg-white",
      )}
    >
      <span className="flex size-9 flex-none items-center justify-center rounded-[11px] bg-cream">
        <ChannelIcon glyph={channel.glyph} size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between text-[13px]">
          <strong>{message.customer}</strong>
          <span className="text-[11px] text-muted-light">{isNew ? "just now" : `${secondsAgo}s ago`}</span>
        </div>
        <div className="mt-0.5 truncate text-xs text-body">{channel.sampleMessage}</div>
      </div>
      <span className="flex-none rounded-full bg-cream px-2 py-[3px] text-[10px] font-bold text-body">
        {channel.name}
      </span>
    </motion.div>
  );
}
