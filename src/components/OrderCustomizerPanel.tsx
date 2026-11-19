import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import {
  formatRupiah,
  getMenuById,
  getUnitPrice,
  isMixOrder,
  menuList,
  orderRules,
  storeInfo,
  toppingList,
} from "../lib/order";
import { trackEvent } from "../lib/analytics";
import { ShopeeBagIcon } from "./Icons";

interface OrderCustomizerPanelProps {
  initialFlavorIds: string[];
  initialToppings?: string[];
  initialQuantity?: number;
  initialNote?: string;
  isEditing?: boolean;
  showShopeeButton?: boolean;
  layoutMode?: "modal" | "page";
  onSubmitItem: (payload: {
    flavorIds: string[];
    toppings: string[];
    quantity: number;
    note: string;
  }) => void;
}

export default function OrderCustomizerPanel({
  initialFlavorIds,
  initialToppings = [],
  initialQuantity = 1,
  initialNote = "",
  isEditing = false,
  showShopeeButton = false,
  layoutMode = "modal",
  onSubmitItem,
}: OrderCustomizerPanelProps) {
  const availableInitial = initialFlavorIds.filter((id) => getMenuById(id)?.tersedia);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>(availableInitial);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(initialToppings);
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [note, setNote] = useState<string>(initialNote);
  const [limitHint, setLimitHint] = useState<{ type: "flavor" | "topping" | null; text: string; tick: number }>({
    type: null,
    text: "",
    tick: 0,
  });

  useEffect(() => {
    setSelectedFlavors(initialFlavorIds.filter((id) => getMenuById(id)?.tersedia));
    setSelectedToppings(initialToppings);
    setQuantity(initialQuantity);
    setNote(initialNote);
    setLimitHint({ type: null, text: "", tick: 0 });
  }, [initialFlavorIds.join(","), initialToppings.join(","), initialQuantity, initialNote]);

  const activeFlavors = useMemo(
    () => selectedFlavors.map((id) => getMenuById(id)).filter((m): m is NonNullable<typeof m> => Boolean(m)),
    [selectedFlavors],
  );

  const unitPrice = selectedFlavors.length > 0 ? getUnitPrice(selectedFlavors) : 0;
  const subtotal = unitPrice * quantity;
  const isMix = isMixOrder(selectedFlavors);
  const canSubmit = selectedFlavors.length >= 1;

  const toggleFlavor = (id: string) => {
    const item = getMenuById(id);
    if (!item || !item.tersedia) return;

    setLimitHint({ type: null, text: "", tick: 0 });
    if (selectedFlavors.includes(id)) {
      setSelectedFlavors((prev) => prev.filter((f) => f !== id));
      return;
    }

    if (selectedFlavors.length >= orderRules.maksRasaPerPorsi) {
      setLimitHint({
        type: "flavor",
        text: `Maksimal ${orderRules.maksRasaPerPorsi} rasa per porsi. Lepas salah satu rasa untuk mengganti.`,
        tick: Date.now(),
      });
      return;
    }

    const next = [...selectedFlavors, id];
    setSelectedFlavors(next);
    trackEvent("select_flavor", { flavor_id: id, mix: next.length > 1 });
  };

  const toggleTopping = (name: string) => {
    setLimitHint({ type: null, text: "", tick: 0 });
    if (selectedToppings.includes(name)) {
      setSelectedToppings((prev) => prev.filter((t) => t !== name));
      return;
    }

    if (selectedToppings.length >= orderRules.maksToppingPerPorsi) {
      setLimitHint({
        type: "topping",
        text: `Maksimal ${orderRules.maksToppingPerPorsi} topping per porsi. Lepas salah satu untuk mengganti.`,
        tick: Date.now(),
      });
      return;
    }

    setSelectedToppings((prev) => [...prev, name]);
    trackEvent("select_topping", { topping_name: name });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    trackEvent("add_to_cart", {
      jenis: isMix ? "mix" : "tunggal",
      nilai_rupiah: subtotal,
    });
    onSubmitItem({
      flavorIds: selectedFlavors,
      toppings: selectedToppings,
      quantity,
      note: note.trim(),
    });
  };

  const previewTitle =
    activeFlavors.length === 0
      ? "Pilih rasa favoritmu"
      : activeFlavors.length === 1
        ? activeFlavors[0].nama
        : `Pisang Kembung Mix (${activeFlavors.map((f) => f.rasa).join(" + ")})`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div
        className={
          layoutMode === "page"
            ? "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            : "grid grid-cols-1 sm:grid-cols-12 gap-5 items-start"
        }
      >
        {/* Product & Live Mix Visual Preview */}
        <div className={layoutMode === "page" ? "lg:col-span-5 lg:sticky lg:top-24" : "sm:col-span-5"}>
          <div className="relative aspect-[4/3] w-full rounded-ui overflow-hidden bg-paper-2 border border-line">
            {activeFlavors.length === 0 && (
              <img
                src="/images/menu/coklat.webp"
                alt="Pisang Kembung Pisang Royal Pringgodani"
                className="w-full h-full object-cover opacity-50"
              />
            )}

            {activeFlavors.length === 1 && (
              <motion.img
                key={activeFlavors[0].id}
                src={activeFlavors[0].foto}
                alt={activeFlavors[0].alt}
                initial={{ opacity: 0.7, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-cover"
              />
            )}

            {activeFlavors.length >= 2 && (
              <div className="w-full h-full grid grid-cols-2 gap-[2px] bg-paper">
                {activeFlavors.slice(0, 2).map((flavor, idx) => (
                  <motion.div
                    key={flavor.id}
                    initial={{ opacity: 0, x: idx === 0 ? -8 : 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", visualDuration: 0.28, bounce: 0.12 }}
                    className="relative w-full h-full overflow-hidden"
                  >
                    <img
                      src={flavor.foto}
                      alt={flavor.alt}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            )}

            <AnimatePresence>
              {isMix && (
                <motion.span
                  key="mix-pill"
                  initial={{ opacity: 0, scale: 0.88, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ type: "spring", visualDuration: 0.24, bounce: 0.16 }}
                  className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-ui bg-butter border border-ink text-ink text-[13px] font-semibold"
                >
                  <span>Mix 2 Rasa · {formatRupiah(orderRules.hargaMix)}</span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-3 flex items-baseline justify-between gap-3">
            <h2 className="font-display font-extrabold text-[20px] leading-snug text-ink">
              {previewTitle}
            </h2>
            <span className="shrink-0 font-semibold text-[18px] text-ink tabular-nums">
              {canSubmit ? formatRupiah(unitPrice) : "-"}
            </span>
          </div>
          <p className="mt-1 text-[14px] text-ink-2">
            {activeFlavors.length === 1 && activeFlavors[0].id === "ori"
              ? "ORI tunggal Rp17.000. Tambah 1 rasa lagi untuk Mix Rp20.000."
              : "Harga porsi Rp20.000 sudah termasuk hingga 2 topping pilihan."}
          </p>
        </div>

        {/* Interactive Controls */}
        <div className={layoutMode === "page" ? "lg:col-span-7 flex flex-col gap-5" : "sm:col-span-7 flex flex-col gap-5"}>
          {/* 1. Flavor Selection */}
          <fieldset className="border-0 p-0 m-0">
            <div className="flex items-baseline justify-between gap-2 mb-2.5">
              <legend className="font-display font-extrabold text-[16px] text-ink">
                1. Pilih Rasa (boleh mix maks. {orderRules.maksRasaPerPorsi})
              </legend>
              <span className="text-[13px] font-medium text-ink-2 tabular-nums">
                {selectedFlavors.length}/{orderRules.maksRasaPerPorsi} dipilih
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {menuList.map((variant) => {
                const selected = selectedFlavors.includes(variant.id);
                const soldOut = !variant.tersedia;
                const atLimit = !selected && selectedFlavors.length >= orderRules.maksRasaPerPorsi;

                return (
                  <motion.button
                    key={variant.id}
                    type="button"
                    whileTap={!soldOut ? { scale: 0.96 } : undefined}
                    disabled={soldOut}
                    aria-pressed={selected}
                    onClick={() => toggleFlavor(variant.id)}
                    className={[
                      "inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-ui text-[14px] transition-colors cursor-pointer",
                      soldOut
                        ? "bg-paper-2/60 border border-line text-ink-2 opacity-55 cursor-not-allowed line-through"
                        : selected
                          ? "bg-butter border-[1.5px] border-ink text-ink font-semibold"
                          : atLimit
                            ? "bg-raised border border-line text-ink opacity-60 hover:opacity-85"
                            : "bg-raised border border-line text-ink font-medium hover:border-ink/45 hover:bg-paper-2/50",
                    ].join(" ")}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 border border-ink/20"
                      style={{ backgroundColor: variant.warna }}
                      aria-hidden="true"
                    />
                    <span>{variant.rasa}</span>
                    {soldOut ? (
                      <span className="text-[12px] no-underline">(Habis)</span>
                    ) : (
                      <span className="text-[13px] text-ink-2 tabular-nums">
                        {variant.id === "ori" ? "17rb" : "20rb"}
                      </span>
                    )}
                    {selected && <Check className="w-4 h-4 text-ink shrink-0" aria-hidden="true" />}
                  </motion.button>
                );
              })}
            </div>

            {!canSubmit && (
              <p role="status" className="mt-2 text-[14px] font-medium text-error">
                Pilih minimal 1 rasa untuk melanjutkan.
              </p>
            )}

            {limitHint.type === "flavor" && (
              <motion.p
                key={limitHint.tick}
                initial={{ x: -3 }}
                animate={{ x: [0, -4, 4, -2, 0] }}
                transition={{ duration: 0.25 }}
                role="status"
                className="mt-2 text-[14px] font-medium text-error"
              >
                {limitHint.text}
              </motion.p>
            )}
          </fieldset>

          {/* 2. Topping Selection */}
          <fieldset className="border-0 p-0 m-0">
            <div className="flex items-baseline justify-between gap-2 mb-2.5">
              <legend className="font-display font-extrabold text-[16px] text-ink">
                2. Pilih Topping (gratis, maks. {orderRules.maksToppingPerPorsi})
              </legend>
              <span className="text-[13px] font-medium text-ink-2 tabular-nums">
                {selectedToppings.length === 0
                  ? "Opsional"
                  : `${selectedToppings.length}/${orderRules.maksToppingPerPorsi} dipilih`}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {toppingList.map((topping) => {
                const selected = selectedToppings.includes(topping.nama);
                const atLimit = !selected && selectedToppings.length >= orderRules.maksToppingPerPorsi;

                return (
                  <motion.button
                    key={topping.nama}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    aria-pressed={selected}
                    onClick={() => toggleTopping(topping.nama)}
                    className={[
                      "inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-ui text-[14px] transition-colors cursor-pointer",
                      selected
                        ? "bg-butter border-[1.5px] border-ink text-ink font-semibold"
                        : atLimit
                          ? "bg-raised border border-line text-ink opacity-60 hover:opacity-85"
                          : "bg-raised border border-line text-ink font-medium hover:border-ink/45 hover:bg-paper-2/50",
                    ].join(" ")}
                  >
                    <span>{topping.nama}</span>
                    {selected && <Check className="w-4 h-4 text-ink shrink-0" aria-hidden="true" />}
                  </motion.button>
                );
              })}
            </div>

            {limitHint.type === "topping" && (
              <motion.p
                key={limitHint.tick}
                initial={{ x: -3 }}
                animate={{ x: [0, -4, 4, -2, 0] }}
                transition={{ duration: 0.25 }}
                role="status"
                className="mt-2 text-[14px] font-medium text-error"
              >
                {limitHint.text}
              </motion.p>
            )}
          </fieldset>

          {/* 3. Quantity & Note */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
            <div className="sm:col-span-5">
              <label htmlFor="customizer-qty" className="block text-[14px] font-semibold text-ink mb-1.5">
                Jumlah Porsi
              </label>
              <div className="inline-flex items-center rounded-ui bg-raised border border-line p-1">
                <button
                  type="button"
                  aria-label="Kurangi jumlah porsi"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-ui text-ink hover:bg-paper-2 disabled:opacity-40 cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  id="customizer-qty"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={orderRules.maksJumlah}
                  value={quantity}
                  onChange={(e) => {
                    const parsed = Number.parseInt(e.target.value, 10);
                    if (Number.isNaN(parsed)) return setQuantity(1);
                    setQuantity(Math.min(orderRules.maksJumlah, Math.max(1, parsed)));
                  }}
                  className="w-12 text-center bg-transparent text-[16px] font-semibold text-ink tabular-nums focus:outline-none"
                />
                <button
                  type="button"
                  aria-label="Tambah jumlah porsi"
                  disabled={quantity >= orderRules.maksJumlah}
                  onClick={() => setQuantity((q) => Math.min(orderRules.maksJumlah, q + 1))}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-ui text-ink hover:bg-paper-2 disabled:opacity-40 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="sm:col-span-7">
              <div className="flex items-baseline justify-between mb-1.5">
                <label htmlFor="customizer-note" className="text-[14px] font-semibold text-ink">
                  Catatan (opsional)
                </label>
                <span className="text-[13px] text-ink-2 tabular-nums">{note.length}/140</span>
              </div>
              <input
                id="customizer-note"
                type="text"
                maxLength={140}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Contoh: tidak terlalu manis"
                className="w-full min-h-[48px] px-3.5 rounded-ui bg-raised border border-line text-[16px] text-ink placeholder:text-ink-2/70 focus:border-ink"
              />
            </div>
          </div>

          {/* Submit CTA Row */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={!canSubmit}
              className="btn-base btn-primary w-full min-h-[50px] flex-1"
            >
              <ShoppingBag className="w-[18px] h-[18px]" aria-hidden="true" />
              <span>
                {isEditing ? "Simpan Perubahan" : "Tambah ke Keranjang"}
                {canSubmit ? ` (${formatRupiah(subtotal)})` : ""}
              </span>
            </button>

            {showShopeeButton && (
              <a
                href={storeInfo.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_shopee", { location: "detail_menu" })}
                className="btn-base btn-shopee min-h-[50px] shrink-0"
              >
                <ShopeeBagIcon className="w-4 h-4" />
                <span>Beli lewat Shopee</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
