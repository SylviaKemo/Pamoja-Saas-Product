"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { NAV_LINKS } from "@/data/navigation";
import { EASE_OUT } from "@/lib/motion";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

/** Full-screen menu shown below the mobile header. Tapping any link closes it. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[29] flex flex-col overflow-hidden bg-forest px-7 pt-[110px] pb-9 nav:hidden"
        >
          <Image
            src="/images/orb.png"
            alt=""
            width={420}
            height={420}
            className="pointer-events-none absolute -right-[140px] -bottom-[120px] size-[420px] max-w-none opacity-50"
          />

          <nav aria-label="Mobile" className="relative flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.05, ease: EASE_OUT }}
                className="flex items-center justify-between border-b border-white/10 py-3.5 font-heading text-[34px] font-extrabold tracking-[-0.03em] text-white"
              >
                {link.label}
                <span aria-hidden className="text-xl text-mint">
                  →
                </span>
              </motion.a>
            ))}
          </nav>

          <div className="relative mt-auto flex flex-col gap-2.5">
            <ButtonLink href="#pricing" size="menu" onClick={onClose}>
              Get started free
            </ButtonLink>
            <ButtonLink href="#" variant="ghost" size="menu" onClick={onClose}>
              Log in
            </ButtonLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
