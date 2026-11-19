import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import {
  $cart,
  $customizerState,
  $isCartDrawerOpen,
  $mobileMenuOpen,
  initCartStore,
} from "../stores/cart";
import { buildDirectWhatsAppUrl, computeCartTotals, formatRupiah } from "../lib/order";
import { trackEvent } from "../lib/analytics";
import OrderCustomizerModal from "./OrderCustomizerModal";
import CartDrawer from "./CartDrawer";
import { WhatsAppIcon } from "./Icons";

interface GlobalOverlaysProps {
  hideFloatingAndSticky?: boolean;
}

export default function GlobalOverlays({ hideFloatingAndSticky = false }: GlobalOverlaysProps) {
  const cart = useStore($cart);
  const [hydrated, setHydrated] = useState(false);
  const customizer = useStore($customizerState);
  const drawerOpen = useStore($isCartDrawerOpen);
  const mobileMenuOpen = useStore($mobileMenuOpen);
  const [toastText, setToastText] = useState<string | null>(null);

  useEffect(() => {
    initCartStore();
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!toastText) return;
    const id = window.setTimeout(() => setToastText(null), 3500);
    return () => window.clearTimeout(id);
  }, [toastText]);

  const { totalPorsi, totalHarga } = computeCartTotals(cart);
  const modalBusy = customizer.open || drawerOpen || mobileMenuOpen;
  const showStickyBar = !hideFloatingAndSticky && !modalBusy && hydrated && totalPorsi > 0;
  const showFloatingWa = !hideFloatingAndSticky && !modalBusy;

  return (
    <MotionConfig reducedMotion="user">
      <OrderCustomizerModal onAdded={(msg) => setToastText(msg)} />
      <CartDrawer />

      {/* Non-intrusive Add-to-Cart confirmation pill */}
      <AnimatePresence>
        {toastText && (
          <motion.div
            key="added-toast"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            role="status"
            className="fixed left-1/2 -translate-x-1/2 bottom-24 md:bottom-8 z-40 max-w-[calc(100vw-32px)] inline-flex items-center gap-3 pl-3.5 pr-2 py-2 rounded-ui bg-ink text-paper border border-ink"
          >
            <CheckCircle2 className="w-4 h-4 text-butter shrink-0" aria-hidden="true" />
            <span className="text-[14px] font-medium whitespace-nowrap">{toastText}</span>
            <button
              type="button"
              onClick={() => {
                setToastText(null);
                $isCartDrawerOpen.set(true);
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-ui bg-butter text-ink text-[13px] font-semibold cursor-pointer hover:bg-banana"
            >
              Lihat Keranjang
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Cart Bar (only when cart has items & never on /keranjang, /checkout, /pesanan-terkirim) */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            key="mobile-cart-bar"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", visualDuration: 0.26, bounce: 0.05 }}
            className="fixed inset-x-0 bottom-0 z-30 md:hidden bg-paper border-t border-line px-4 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))]"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-ink-2 leading-tight">
                  {totalPorsi} porsi di keranjang
                </p>
                <p className="font-display font-extrabold text-[18px] text-ink tabular-nums leading-tight">
                  {formatRupiah(totalHarga)}
                </p>
              </div>
              <a
                href="/keranjang"
                className="btn-base btn-primary !min-h-[46px] !px-5 shrink-0"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span>Lihat Keranjang</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button (auto-lifts above MobileCartBar so controls never collide) */}
      <AnimatePresence>
        {showFloatingWa && (
          <motion.a
            key="floating-wa"
            href={buildDirectWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_whatsapp", { location: "floating_button" })}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            aria-label="Chat dan pesan via WhatsApp"
            className={[
              "fixed right-4 md:right-6 z-30 inline-flex items-center gap-2 min-h-[48px] px-4 rounded-ui bg-wa text-white font-semibold text-[15px] no-underline border border-wa-deep hover:bg-wa-deep transition-all",
              showStickyBar
                ? "bottom-[calc(80px+env(safe-area-inset-bottom))] md:bottom-6"
                : "bottom-5 md:bottom-6",
            ].join(" ")}
          >
            <WhatsAppIcon className="w-5 h-5 shrink-0" />
            <span className="hidden sm:inline">WhatsApp</span>
          </motion.a>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
