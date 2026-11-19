import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { Menu, ShoppingBag, X } from "lucide-react";
import {
  $cart,
  $isCartDrawerOpen,
  $lastAddedTick,
  $mobileMenuOpen,
  initCartStore,
} from "../stores/cart";
import { buildDirectWhatsAppUrl, computeCartTotals, storeInfo } from "../lib/order";
import { trackEvent } from "../lib/analytics";
import { BrandMark, ShopeeBagIcon, WhatsAppIcon } from "./Icons";

interface SiteHeaderProps {
  currentPath: string;
}

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/menu", label: "Menu" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

export default function SiteHeader({ currentPath }: SiteHeaderProps) {
  const cart = useStore($cart);
  const [hydrated, setHydrated] = useState(false);
  const mobileOpen = useStore($mobileMenuOpen);
  const lastAddedTick = useStore($lastAddedTick);
  const [pulseBadge, setPulseBadge] = useState(false);

  useEffect(() => {
    initCartStore();
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!lastAddedTick) return;
    setPulseBadge(true);
    const id = window.setTimeout(() => setPulseBadge(false), 380);
    return () => window.clearTimeout(id);
  }, [lastAddedTick]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") $mobileMenuOpen.set(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const { totalPorsi } = computeCartTotals(cart);

  const isActive = (href: string) => {
    if (href === "/") return currentPath === "/" || currentPath === "";
    return currentPath.startsWith(href);
  };

  return (
    <MotionConfig reducedMotion="user">
      <header className="sticky top-0 z-40 w-full bg-paper border-b border-line">
        <div className="wrap flex items-center justify-between h-16 gap-3">
          <a
            href="/"
            className="inline-flex items-center gap-2.5 min-h-[44px] pr-1 text-ink no-underline min-w-0"
          >
            <BrandMark className="w-9 h-9 shrink-0" />
            <span className="font-display font-extrabold text-[16px] sm:text-[18px] tracking-[-0.03em] leading-none truncate">
              {storeInfo.nama}
            </span>
          </a>

          <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={storeInfo.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_shopee", { location: "header" })}
              className="hidden lg:inline-flex btn-base btn-shopee !min-h-[44px] !px-4 !text-[14px]"
            >
              <ShopeeBagIcon className="w-4 h-4 shrink-0" />
              <span>Shopee</span>
            </a>

            <button
              type="button"
              onClick={() => $isCartDrawerOpen.set(true)}
              aria-label={
                hydrated && totalPorsi > 0
                  ? `Buka keranjang (${totalPorsi} porsi)`
                  : "Buka keranjang belanja"
              }
              className="relative inline-flex items-center justify-center gap-2 min-w-[44px] min-h-[44px] px-3.5 rounded-ui bg-ink text-paper font-bold text-[14px] cursor-pointer transition-colors hover:bg-forest"
            >
              <ShoppingBag className="w-[18px] h-[18px]" aria-hidden="true" />
              <span className="hidden sm:inline">Keranjang</span>
              {hydrated && totalPorsi > 0 && (
                <motion.span
                  animate={pulseBadge ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ duration: 0.28 }}
                  className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-banana text-ink text-[13px] font-extrabold tabular-nums leading-none"
                >
                  {totalPorsi}
                </motion.span>
              )}
            </button>

            <button
              type="button"
              onClick={() => $mobileMenuOpen.set(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-ui border border-line text-ink cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav-sheet"
            data-lenis-prevent
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 z-50 md:hidden bg-forest text-bone on-forest overflow-y-auto"
          >
            <div className="wrap py-8 flex flex-col gap-2 min-h-full">
              <nav aria-label="Menu seluler" className="flex flex-col">
                {[...navItems, { href: "/keranjang", label: "Keranjang" }].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => $mobileMenuOpen.set(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex items-center justify-between min-h-[64px] border-b border-bone/15 font-display font-extrabold text-[34px] tracking-[-0.04em] text-bone no-underline aria-[current=page]:text-banana"
                  >
                    <span>{item.label}</span>
                    {item.href === "/keranjang" && hydrated && totalPorsi > 0 && (
                      <span className="px-2.5 py-1 rounded-ui bg-banana text-ink text-[13px] font-sans font-bold tabular-nums tracking-normal">
                        {totalPorsi} porsi
                      </span>
                    )}
                  </a>
                ))}
              </nav>

              <div className="mt-auto pt-8 flex flex-col gap-3">
                <a
                  href={buildDirectWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent("click_whatsapp", { location: "mobile_menu" });
                    $mobileMenuOpen.set(false);
                  }}
                  className="btn-base btn-primary w-full"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Pesan via WhatsApp</span>
                </a>
                <a
                  href={storeInfo.shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent("click_shopee", { location: "mobile_menu" });
                    $mobileMenuOpen.set(false);
                  }}
                  className="btn-base btn-ghost-bone w-full"
                >
                  <ShopeeBagIcon className="w-5 h-5" />
                  <span>Pesan via Shopee</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
