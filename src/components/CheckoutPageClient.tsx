import React, { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ChevronDown, ChevronUp, MapPin, Store } from "lucide-react";
import {
  $cart,
  initCartStore,
  saveLastOrder,
} from "../stores/cart";
import {
  buildWhatsAppMessage,
  buildWhatsAppOrderUrl,
  type CheckoutFormValues,
  computeCartTotals,
  computeItemSubtotal,
  formatItemTitle,
  formatRupiah,
} from "../lib/order";
import { trackEvent } from "../lib/analytics";
import CartItemVisual from "./CartItemVisual";
import { WhatsAppIcon } from "./Icons";

interface FormErrors {
  nama?: string;
  metode?: string;
  alamat?: string;
}

export default function CheckoutPageClient() {
  const cart = useStore($cart);
  const [hydrated, setHydrated] = useState(false);

  const [nama, setNama] = useState("");
  const [metode, setMetode] = useState<"" | "Ambil di tempat" | "Antar">("");
  const [alamat, setAlamat] = useState("");
  const [waktu, setWaktu] = useState("");
  const [catatan, setCatatan] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPreview, setShowPreview] = useState(false);

  const namaRef = useRef<HTMLInputElement>(null);
  const metodeRef = useRef<HTMLButtonElement>(null);
  const alamatRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    initCartStore();
    setHydrated(true);
  }, []);

  const { totalPorsi, totalHarga } = computeCartTotals(cart);

  useEffect(() => {
    if (hydrated && cart.length > 0) {
      trackEvent("begin_checkout", { total_rupiah: totalHarga });
    }
  }, [hydrated]);

  const formValues: CheckoutFormValues = useMemo(
    () => ({
      nama,
      metode: metode || "Ambil di tempat",
      alamat,
      waktu,
      catatan,
    }),
    [nama, metode, alamat, waktu, catatan],
  );

  const whatsappPreviewText = useMemo(
    () => buildWhatsAppMessage(cart, formValues),
    [cart, formValues],
  );

  if (!hydrated) {
    return (
      <div className="p-8 rounded-ui bg-paper-2 border border-line text-ink-2">
        Memuat formulir checkout...
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="py-14 px-6 rounded-ui bg-paper-2 border border-line text-center flex flex-col items-center gap-4">
        <h2 className="font-display font-extrabold text-[22px] text-ink">
          Keranjangmu masih kosong
        </h2>
        <p className="text-[16px] text-ink-2">
          Tambahkan minimal satu porsi pisang kembung sebelum mengisi formulir pesanan.
        </p>
        <a href="/menu" className="btn-base btn-primary !min-h-[48px]">
          Lihat Menu
        </a>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: FormErrors = {};

    if (!nama.trim()) {
      nextErrors.nama = "Tulis nama pemesan supaya toko mudah memanggil pesananmu.";
    }
    if (!metode) {
      nextErrors.metode = "Pilih metode pengambilan atau pengantaran.";
    }
    if (metode === "Antar" && !alamat.trim()) {
      nextErrors.alamat = "Tulis alamat lengkap beserta patokan untuk pengantaran.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.nama) namaRef.current?.focus();
      else if (nextErrors.metode) metodeRef.current?.focus();
      else if (nextErrors.alamat) alamatRef.current?.focus();
      return;
    }

    const finalValues: CheckoutFormValues = {
      nama: nama.trim(),
      metode: metode as "Ambil di tempat" | "Antar",
      alamat: alamat.trim(),
      waktu: waktu.trim(),
      catatan: catatan.trim(),
    };

    const whatsappText = buildWhatsAppMessage(cart, finalValues);
    const whatsappUrl = buildWhatsAppOrderUrl(whatsappText);

    saveLastOrder({
      items: cart,
      customer: finalValues,
      totalHarga,
      totalPorsi,
      whatsappText,
      whatsappUrl,
      createdAt: new Date().toISOString(),
    });

    trackEvent("click_whatsapp", {
      total_rupiah: totalHarga,
      jumlah_porsi: totalPorsi,
    });

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    window.location.assign("/pesanan-terkirim");
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Order Summary (Top on mobile, right column on desktop) */}
        <aside className="lg:col-span-5 lg:order-2 rounded-ui bg-paper-2 border border-line p-5 sm:p-6 flex flex-col gap-4 lg:sticky lg:top-24">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="font-display font-extrabold text-[20px] text-ink">
              Ringkasan Pesanan
            </h2>
            <a
              href="/keranjang"
              className="text-[14px] font-semibold text-ink underline underline-offset-4"
            >
              Ubah keranjang
            </a>
          </div>

          <ul className="flex flex-col divide-y divide-line list-none p-0 m-0">
            {cart.map((item) => (
              <li key={item.uid} className="py-3 flex items-start gap-3">
                <CartItemVisual flavorIds={item.flavorIds} className="w-14 h-14" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-semibold text-[15px] text-ink leading-snug">
                      {formatItemTitle(item.flavorIds)} × {item.quantity}
                    </p>
                    <span className="font-semibold text-[15px] text-ink tabular-nums shrink-0">
                      {formatRupiah(computeItemSubtotal(item))}
                    </span>
                  </div>
                  <p className="text-[13px] text-ink-2">
                    {item.toppings.length > 0 ? item.toppings.join(", ") : "Tanpa topping"}
                  </p>
                  {item.note && (
                    <p className="text-[13px] text-ink-2 italic">Catatan: {item.note}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-line flex items-baseline justify-between">
            <span className="font-semibold text-[16px] text-ink">
              Total ({totalPorsi} porsi)
            </span>
            <span className="font-display font-extrabold text-[24px] text-ink tabular-nums">
              {formatRupiah(totalHarga)}
            </span>
          </div>

          {/* Live WhatsApp Message Preview Toggle */}
          <div className="pt-2 border-t border-line">
            <button
              type="button"
              aria-expanded={showPreview}
              onClick={() => setShowPreview((v) => !v)}
              className="w-full min-h-[44px] flex items-center justify-between text-[14px] font-semibold text-ink cursor-pointer"
            >
              <span>Intip format pesan WhatsApp</span>
              {showPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence initial={false}>
              {showPreview && (
                <motion.pre
                  key="wa-preview"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="mt-2 p-3.5 rounded-ui bg-raised border border-line text-[13px] leading-relaxed text-ink whitespace-pre-wrap font-sans overflow-x-auto m-0"
                >
                  {whatsappPreviewText}
                </motion.pre>
              )}
            </AnimatePresence>
          </div>
        </aside>

        {/* Customer Checkout Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="lg:col-span-7 lg:order-1 rounded-ui bg-paper-2 border border-line p-5 sm:p-7 flex flex-col gap-5"
        >
          <h2 className="font-display font-extrabold text-[22px] text-ink">
            Data Pemesan
          </h2>

          {/* Nama */}
          <div>
            <label htmlFor="checkout-nama" className="block text-[15px] font-semibold text-ink mb-1.5">
              Nama lengkap <span className="text-error">*</span>
            </label>
            <input
              ref={namaRef}
              id="checkout-nama"
              name="nama"
              type="text"
              autoComplete="name"
              required
              value={nama}
              onChange={(e) => {
                setNama(e.target.value);
                if (errors.nama) setErrors((prev) => ({ ...prev, nama: undefined }));
              }}
              aria-invalid={Boolean(errors.nama)}
              aria-describedby={errors.nama ? "error-nama" : undefined}
              placeholder="Contoh: Budi"
              className="w-full min-h-[48px] px-4 rounded-ui bg-raised border border-line text-[16px] text-ink placeholder:text-ink-2/70 focus:border-ink"
            />
            {errors.nama && (
              <p id="error-nama" role="alert" className="mt-1.5 text-[14px] font-medium text-error">
                {errors.nama}
              </p>
            )}
          </div>

          {/* Metode */}
          <fieldset className="border-0 p-0 m-0">
            <legend className="text-[15px] font-semibold text-ink mb-2">
              Metode pengambilan / pengantaran <span className="text-error">*</span>
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                ref={metodeRef}
                type="button"
                aria-pressed={metode === "Ambil di tempat"}
                onClick={() => {
                  setMetode("Ambil di tempat");
                  setErrors((prev) => ({ ...prev, metode: undefined, alamat: undefined }));
                }}
                className={[
                  "flex items-center gap-3 min-h-[54px] px-4 py-3 rounded-ui text-left cursor-pointer transition-colors",
                  metode === "Ambil di tempat"
                    ? "bg-butter border-[1.5px] border-ink text-ink font-semibold"
                    : "bg-raised border border-line text-ink hover:border-ink/40",
                ].join(" ")}
              >
                <Store className="w-5 h-5 shrink-0" aria-hidden="true" />
                <div>
                  <span className="block text-[15px] leading-tight">Ambil di tempat</span>
                  <span className="block text-[13px] text-ink-2 font-normal">
                    Ambil langsung saat siap
                  </span>
                </div>
              </button>

              <button
                type="button"
                aria-pressed={metode === "Antar"}
                onClick={() => {
                  setMetode("Antar");
                  setErrors((prev) => ({ ...prev, metode: undefined }));
                }}
                className={[
                  "flex items-center gap-3 min-h-[54px] px-4 py-3 rounded-ui text-left cursor-pointer transition-colors",
                  metode === "Antar"
                    ? "bg-butter border-[1.5px] border-ink text-ink font-semibold"
                    : "bg-raised border border-line text-ink hover:border-ink/40",
                ].join(" ")}
              >
                <MapPin className="w-5 h-5 shrink-0" aria-hidden="true" />
                <div>
                  <span className="block text-[15px] leading-tight">Antar</span>
                  <span className="block text-[13px] text-ink-2 font-normal">
                    Ongkir dikonfirmasi via WA
                  </span>
                </div>
              </button>
            </div>
            {errors.metode && (
              <p role="alert" className="mt-1.5 text-[14px] font-medium text-error">
                {errors.metode}
              </p>
            )}
          </fieldset>

          {/* Alamat (shown when Antar selected) */}
          <AnimatePresence initial={false}>
            {metode === "Antar" && (
              <motion.div
                key="field-alamat"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <label
                  htmlFor="checkout-alamat"
                  className="block text-[15px] font-semibold text-ink mb-1.5"
                >
                  Alamat lengkap pengantaran <span className="text-error">*</span>
                </label>
                <textarea
                  ref={alamatRef}
                  id="checkout-alamat"
                  name="alamat"
                  rows={3}
                  required
                  value={alamat}
                  onChange={(e) => {
                    setAlamat(e.target.value);
                    if (errors.alamat) setErrors((prev) => ({ ...prev, alamat: undefined }));
                  }}
                  aria-invalid={Boolean(errors.alamat)}
                  aria-describedby={errors.alamat ? "error-alamat" : undefined}
                  placeholder="Nama jalan, nomor rumah, patokan atau gang"
                  className="w-full p-3.5 rounded-ui bg-raised border border-line text-[16px] text-ink placeholder:text-ink-2/70 focus:border-ink"
                />
                {errors.alamat && (
                  <p id="error-alamat" role="alert" className="mt-1.5 text-[14px] font-medium text-error">
                    {errors.alamat}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Waktu */}
          <div>
            <label htmlFor="checkout-waktu" className="block text-[15px] font-semibold text-ink mb-1.5">
              Waktu ambil atau antar (opsional)
            </label>
            <input
              id="checkout-waktu"
              name="waktu"
              type="text"
              value={waktu}
              onChange={(e) => setWaktu(e.target.value)}
              placeholder="Contoh: Hari ini jam 16.00"
              className="w-full min-h-[48px] px-4 rounded-ui bg-raised border border-line text-[16px] text-ink placeholder:text-ink-2/70 focus:border-ink"
            />
          </div>

          {/* Catatan pesanan */}
          <div>
            <div className="flex items-baseline justify-between mb-1.5">
              <label htmlFor="checkout-catatan" className="text-[15px] font-semibold text-ink">
                Catatan pesanan (opsional)
              </label>
              <span className="text-[13px] text-ink-2 tabular-nums">{catatan.length}/280</span>
            </div>
            <textarea
              id="checkout-catatan"
              name="catatan"
              rows={2}
              maxLength={280}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Catatan tambahan untuk penjual"
              className="w-full p-3.5 rounded-ui bg-raised border border-line text-[16px] text-ink placeholder:text-ink-2/70 focus:border-ink"
            />
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button type="submit" className="btn-base btn-wa !min-h-[52px] w-full">
              <WhatsAppIcon className="w-5 h-5" />
              <span>Kirim ke WhatsApp ({formatRupiah(totalHarga)})</span>
            </button>
            <p className="text-[14px] text-ink-2 leading-relaxed">
              Ongkos kirim (bila antar) dan ketersediaan dikonfirmasi toko lewat WhatsApp. Data pesanan hanya dikirim langsung ke WhatsApp Pisang Royal Pringgodani.
            </p>
          </div>
        </form>
      </div>
    </MotionConfig>
  );
}
