import { siGmail, siInstagram, siWhatsapp, type SimpleIcon } from "simple-icons";
import { ChannelIcon } from "@/components/ui/ChannelIcon";

/** Phone-style notifications piling up and fading out: "replies get missed". */
const NOTIFICATIONS: { icon: SimpleIcon; title: string; time: string; body?: string }[] = [
  { icon: siWhatsapp, title: "Sofia Martins", time: "2h ago", body: "Hello?? Is anyone there?" },
  { icon: siInstagram, title: "Instagram", time: "3h ago", body: "4 unread messages" },
  { icon: siGmail, title: "Re: Re: Re: Invoice", time: "Yesterday" },
];

export function NotificationPilePreview() {
  return (
    <div className="absolute inset-x-3.5 top-3 flex flex-col gap-1.5 [mask-image:linear-gradient(180deg,#000_60%,transparent)]">
      {NOTIFICATIONS.map((n) => (
        <div
          key={n.title}
          className="flex items-center gap-[9px] rounded-xl bg-white/95 px-2.5 py-2 shadow-[0_2px_6px_rgba(21,32,26,0.06)]"
        >
          <ChannelIcon glyph={{ kind: "brand", icon: n.icon }} size={18} />
          <div className="min-w-0 flex-1 text-[11px] leading-[1.3]">
            <div className="flex justify-between">
              <strong>{n.title}</strong>
              <span className="text-muted-light">{n.time}</span>
            </div>
            {n.body && <div className="text-body">{n.body}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
