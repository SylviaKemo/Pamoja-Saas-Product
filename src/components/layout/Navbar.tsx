"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "@/data/navigation";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { EASE_OUT } from "@/lib/motion";
import { MenuButton } from "./MenuButton";
import { MobileMenu } from "./MobileMenu";

/** Matches the `nav` breakpoint in globals.css. */
const DESKTOP_QUERY = "(min-width: 900px)";

/**
 * Desktop (≥900px): transparent bar that sits over the hero.
 * Mobile: fixed, blurred bar with a hamburger that opens a full-screen menu.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  useBodyScrollLock(menuOpen);

  // Close the mobile menu if the window grows to desktop width.
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const closeOnDesktop = () => desktop.matches && setMenuOpen(false);
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
        className="fixed inset-x-0 top-0 z-30 border-b border-white/8 bg-forest/94 backdrop-blur-[14px] nav:absolute nav:border-transparent nav:bg-transparent nav:backdrop-blur-none"
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-5 py-3 nav:px-7 nav:py-[26px]">
          <a href="#top" className="relative z-[41]">
            <Logo />
          </a>

          <nav aria-label="Main" className="hidden gap-1.5 text-sm font-medium nav:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-on-dark transition-colors hover:bg-white/8 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 nav:flex">
            <a href="#" className="px-3.5 py-2.5 text-sm font-semibold text-white">
              Log in
            </a>
            <ButtonLink href="#pricing" size="sm">
              Get started free
            </ButtonLink>
          </div>

          <MenuButton open={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="nav:hidden" />
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
