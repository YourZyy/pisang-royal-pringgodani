import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ArrowRight, Minus, Pencil, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  $cart,
  initCartStore,
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

export default function CartPageClient() {
  const cart = useStore($cart);
  const [hydrated, setHydrated] = useState(false);
  const [recentlyRemoved, setRecentlyRemoved] = useState<CartItem | null>(null);

  useEffect(() => {
    initCartStore();
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!recentlyRemoved) return;
    const id = window.setTimeout(() => setRecentlyRemoved(null), 5000);
    return () => window.clearTimeout(id);
  }, [recentlyRemoved]);

  if (!hydrated) {
    return (
      <div className="p-8 rounded-ui bg-paper-2 border border-line text-ink-2">
        Memuat keranjang...
      </div>
    );
  }

  const { totalPorsi, totalHarga } = computeCartTotals(cart);

  if (cart.length === 0) {
    return (
      <MotionConfig reducedMotion="user">
        <div className="flex flex-col gap-4">
          {recentlyRemoved && (
            <div
              role="status"
              className="p-4 rounded-ui bg-paper-2 border border-line flex items-center justify-between gap-3"
            >
              <span className="text-[15px] text-ink">
                {formatItemTitle(recentlyRemoved.flavorIds)} dihapus dari keranjang.
              </span>
              <button
                type="button"
                onClick={() => {
                  restoreCartItem(recentlyRemoved);
                  setRecentlyRemoved(null);
                }}
                className="font-semibold text-ink underline underline-offset-4 cursor-pointer min-h-[44px] px-2"
              >
                Urungkan
              </button>
            </div>
          )}

          <div className="py-14 px-6 rounded-ui bg-paper-2 border border-line text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-ui bg-paper border border-line flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-ink-2" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-[22px] text-ink">
                Keranjangmu masih kosong
              </h2>
              <p className="mt-1.5 text-[16px] text-ink-2">
                Pilih menu pisang kembung atau racik mix dua rasa favoritmu terlebih dulu.
              </p>
            </div>
            <a href="/menu" className="btn-base btn-primary !min-h-[48px]">
              Lihat Menu
            </a>
          </div>
        </div>
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col gap-4">
          {recentlyRemoved && (
            <div
              role="status"
              className="p-3.5 rounded-ui bg-paper-2 border border-line flex items-center justify-between gap-3 text-[15px]"
            >
              <span className="text-ink">
                {formatItemTitle(recentlyRemoved.flavorIds)} dihapus.
              </span>
              <button
                type="button"
                onClick={() => {
                  restoreCartItem(recentlyRemoved);
                  setRecentlyRemoved(null);
                }}
                className="font-semibold text-ink underline underline-offset-4 cursor-pointer min-h-[40px] px-2"
              >
                Urungkan
              </button>
            </div>
          )}

          <ul className="rounded-ui bg-paper-2 border border-line divide-y divide-line list-none p-0 m-0">
            <AnimatePresence initial={false}>
              {cart.map((item) => {
                const unitPrice = getUnitPrice(item.flavorIds);
                const subtotal = computeItemSubtotal(item);
                const title = formatItemTitle(item.flavorIds);

                return (
                  <motion.li
                    key={item.uid}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 sm:p-5"
                  >
                    <div className="flex gap-4 items-start">
                      <CartItemVisual flavorIds={item.flavorIds} className="w-20 h-20" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <h2 className="font-display font-extrabold text-[18px] text-ink leading-snug">
                            {title}
                          </h2>
                          <span className="font-semibold text-[17px] text-ink tabular-nums shrink-0">
                            {formatRupiah(subtotal)}
                          </span>
                        </div>

                        <p className="mt-1 text-[15px] text-ink-2">
                          {item.toppings.length > 0
                            ? `Topping: ${item.toppings.join(", ")}`
                            : "Tanpa topping"}{" "}
                          · {formatRupiah(unitPrice)} / porsi
                        </p>

                        {item.note && (
                          <p className="mt-1 text-[14px] text-ink-2 italic">
                            Catatan: {item.note}
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <div className="inline-flex items-center rounded-ui bg-raised border border-line p-0.5">
                            <button
                              type="button"
                              aria-label={`Kurangi jumlah ${title}`}
                              onClick={() => updateCartQuantity(item.uid, item.quantity - 1)}
                              className="inline-flex items-center justify-center w-11 h-11 rounded-ui text-ink hover:bg-paper-2 cursor-pointer"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-9 text-center text-[15px] font-semibold text-ink tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`Tambah jumlah ${title}`}
                              disabled={item.quantity >= orderRules.maksJumlah}
                              onClick={() => updateCartQuantity(item.uid, item.quantity + 1)}
                              className="inline-flex items-center justify-center w-11 h-11 rounded-ui text-ink hover:bg-paper-2 disabled:opacity-40 cursor-pointer"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => openCustomizerToEdit(item)}
                              className="inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-ui text-[14px] font-semibold text-ink hover:bg-paper cursor-pointer"
                            >
                              <Pencil className="w-4 h-4" aria-hidden="true" />
                              <span>Ubah</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const removed = removeCartItem(item.uid);
                                if (removed) setRecentlyRemoved(removed);
                              }}
                              aria-label={`Hapus ${title}`}
                              className="inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-ui text-[14px] font-semibold text-error hover:bg-error/10 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" aria-hidden="true" />
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

          <div>
            <a
              href="/menu"
              className="inline-flex items-center gap-1.5 min-h-[44px] text-[16px] font-semibold text-ink underline underline-offset-4 hover:text-ink-2"
            >
              <span>Tambah menu lain</span>
            </a>
          </div>
        </div>

        {/* Summary Card */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24 rounded-ui bg-paper-2 border border-line p-5 sm:p-6 flex flex-col gap-4">
          <h2 className="font-display font-extrabold text-[20px] text-ink">
            Ringkasan Belanja
          </h2>

          <dl className="flex flex-col gap-2.5 text-[16px] border-y border-line py-4 m-0">
            <div className="flex items-center justify-between">
              <dt className="text-ink-2">Jumlah porsi</dt>
              <dd className="font-semibold text-ink tabular-nums m-0">{totalPorsi} porsi</dd>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <dt className="font-semibold text-ink">Total harga</dt>
              <dd className="font-display font-extrabold text-[24px] text-ink tabular-nums m-0">
                {formatRupiah(totalHarga)}
              </dd>
            </div>
          </dl>

          <p className="text-[14px] text-ink-2">
            Topping sudah termasuk dalam harga porsi. Ongkir (jika antar) dikonfirmasi saat chat di WhatsApp.
          </p>

          <div className="flex flex-col gap-3 pt-1">
            <a href="/checkout" className="btn-base btn-primary !min-h-[50px] w-full">
              <span>Lanjut ke Checkout</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href={storeInfo.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_shopee", { location: "keranjang" })}
              className="btn-base btn-shopee !min-h-[48px] w-full"
            >
              <ShopeeBagIcon className="w-4 h-4" />
              <span>Pesan via Shopee</span>
            </a>
          </div>
        </aside>
      </div>
    </MotionConfig>
  );
}
