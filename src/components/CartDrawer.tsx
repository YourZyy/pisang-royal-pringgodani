import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ArrowRight, Minus, Pencil, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import {
  $cart,
  $isCartDrawerOpen,
  openCustomizerToEdit,
  removeCartItem,
  restoreCartItem,
  updateCartQuantity,
} from "../stores/cart";
import {
  type CartItem,
  computeCartTotals,
  computeItemSubtotal,
  formatItemTitle,
  formatRupiah,
  getUnitPrice,
  orderRules,
  storeInfo,
} from "../lib/order";
import { trackEvent } from "../lib/analytics";
import CartItemVisual from "./CartItemVisual";
import { ShopeeBagIcon } from "./Icons";

export default function CartDrawer() {
  const open = useStore($isCartDrawerOpen);
  const cart = useStore($cart);
  const [recentlyRemoved, setRecentlyRemoved] = useState<CartItem | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") $isCartDrawerOpen.set(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!recentlyRemoved) return;
    const id = window.setTimeout(() => setRecentlyRemoved(null), 5000);
    return () => window.clearTimeout(id);
  }, [recentlyRemoved]);

  const { totalPorsi, totalHarga } = computeCartTotals(cart);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-50 flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
          >
            <motion.div
              key="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => $isCartDrawerOpen.set(false)}
              className="fixed inset-0 bg-ink/45"
              aria-hidden="true"
            />

            <motion.aside
              key="cart-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", visualDuration: 0.28, bounce: 0 }}
              className="relative z-10 w-full max-w-md h-full bg-paper border-l border-line flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-line shrink-0">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-ink" aria-hidden="true" />
                  <h2 id="cart-drawer-title" className="font-display font-extrabold text-[19px] text-ink">
                    Keranjang {totalPorsi > 0 ? `(${totalPorsi})` : ""}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => $isCartDrawerOpen.set(false)}
                  aria-label="Tutup panel keranjang"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-ui bg-paper-2 border border-line text-ink cursor-pointer hover:bg-butter"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div data-lenis-prevent className="flex-1 overflow-y-auto px-5 py-4">
                {recentlyRemoved && (
                  <div
                    role="status"
                    className="mb-4 px-3.5 py-2.5 rounded-ui bg-paper-2 border border-line flex items-center justify-between gap-2 text-[14px]"
                  >
                    <span className="text-ink truncate">
                      {formatItemTitle(recentlyRemoved.flavorIds)} dihapus.
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        restoreCartItem(recentlyRemoved);
                        setRecentlyRemoved(null);
                      }}
                      className="font-semibold text-ink underline underline-offset-2 shrink-0 min-h-[36px] px-2 cursor-pointer"
                    >
                      Urungkan
                    </button>
                  </div>
                )}

                {cart.length === 0 ? (
                  <div className="py-12 text-center flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-ui bg-paper-2 border border-line flex items-center justify-center">
                      <ShoppingBag className="w-7 h-7 text-ink-2" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-display font-extrabold text-[18px] text-ink">
                        Keranjangmu masih kosong
                      </p>
                      <p className="mt-1 text-[16px] text-ink-2">
                        Pilih varian pisang kembung atau mix 2 rasa favoritmu.
                      </p>
                    </div>
                    <a
                      href="/menu"
                      onClick={() => $isCartDrawerOpen.set(false)}
                      className="btn-base btn-primary"
                    >
                      Lihat Menu
                    </a>
                  </div>
                ) : (
                  <ul className="flex flex-col divide-y divide-line list-none p-0 m-0">
                    <AnimatePresence initial={false}>
                      {cart.map((item) => {
                        const unitPrice = getUnitPrice(item.flavorIds);
                        const subtotal = computeItemSubtotal(item);
                        return (
                          <motion.li
                            key={item.uid}
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 24 }}
                            transition={{ duration: 0.2 }}
                            className="py-4 first:pt-1"
                          >
                            <div className="flex gap-3.5 items-start">
                              <CartItemVisual flavorIds={item.flavorIds} className="w-16 h-16" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <h3 className="font-display font-extrabold text-[16px] leading-snug text-ink">
                                    {formatItemTitle(item.flavorIds)}
                                  </h3>
                                  <span className="font-semibold text-[15px] text-ink tabular-nums shrink-0">
                                    {formatRupiah(subtotal)}
                                  </span>
                                </div>

                                <p className="mt-0.5 text-[14px] text-ink-2">
                                  {item.toppings.length > 0
                                    ? `Topping: ${item.toppings.join(", ")}`
                                    : "Tanpa topping"}{" "}
                                  · {formatRupiah(unitPrice)}/porsi
                                </p>

                                {item.note && (
                                  <p className="mt-1 text-[13px] text-ink-2 italic">
                                    Catatan: {item.note}
                                  </p>
                                )}

                                <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
                                  <div className="inline-flex items-center rounded-ui bg-raised border border-line p-0.5">
                                    <button
                                      type="button"
                                      aria-label={`Kurangi jumlah ${formatItemTitle(item.flavorIds)}`}
                                      onClick={() => updateCartQuantity(item.uid, item.quantity - 1)}
                                      className="inline-flex items-center justify-center w-11 h-11 rounded-ui text-ink hover:bg-paper-2 cursor-pointer"
                                    >
                                      <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="w-8 text-center text-[14px] font-semibold text-ink tabular-nums">
                                      {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      aria-label={`Tambah jumlah ${formatItemTitle(item.flavorIds)}`}
                                      disabled={item.quantity >= orderRules.maksJumlah}
                                      onClick={() => updateCartQuantity(item.uid, item.quantity + 1)}
                                      className="inline-flex items-center justify-center w-11 h-11 rounded-ui text-ink hover:bg-paper-2 disabled:opacity-40 cursor-pointer"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => openCustomizerToEdit(item)}
                                      className="inline-flex items-center gap-1 min-h-[44px] px-3 rounded-ui text-[13px] font-semibold text-ink hover:bg-paper-2 cursor-pointer"
                                    >
                                      <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                                      <span>Ubah</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const removed = removeCartItem(item.uid);
                                        if (removed) setRecentlyRemoved(removed);
                                      }}
                                      aria-label={`Hapus ${formatItemTitle(item.flavorIds)}`}
                                      className="inline-flex items-center gap-1 min-h-[44px] px-3 rounded-ui text-[13px] font-semibold text-error hover:bg-error/10 cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                                      <span>Hapus</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

              {cart.length > 0 && (
                <div className="px-5 py-4 bg-paper-2 border-t border-line shrink-0 flex flex-col gap-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[15px] font-medium text-ink-2">
                      Total ({totalPorsi} porsi)
                    </span>
                    <span className="font-display font-extrabold text-[22px] text-ink tabular-nums">
                      {formatRupiah(totalHarga)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <a
                      href="/checkout"
                      onClick={() => $isCartDrawerOpen.set(false)}
                      className="btn-base btn-primary w-full min-h-[48px]"
                    >
                      <span>Lanjut ke Checkout</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="/keranjang"
                        onClick={() => $isCartDrawerOpen.set(false)}
                        className="btn-base btn-secondary !text-[14px] !px-3"
                      >
                        Lihat Keranjang
                      </a>
                      <a
                        href={storeInfo.shopeeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent("click_shopee", { location: "cart_drawer" })}
                        className="btn-base btn-shopee !text-[14px] !px-3"
                      >
                        <ShopeeBagIcon className="w-4 h-4 shrink-0" />
                        <span>Via Shopee</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
