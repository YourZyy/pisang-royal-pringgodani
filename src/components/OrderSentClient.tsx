import React, { useEffect, useState } from "react";
import { Check, Copy, Trash2 } from "lucide-react";
import { clearCart, readLastOrder } from "../stores/cart";
import {
  type LastOrderSnapshot,
  computeItemSubtotal,
  formatItemTitle,
  formatRupiah,
} from "../lib/order";
import { WhatsAppIcon } from "./Icons";

export default function OrderSentClient() {
  const [snapshot, setSnapshot] = useState<LastOrderSnapshot | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSnapshot(readLastOrder());
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="p-8 rounded-ui bg-paper-2 border border-line text-ink-2">
        Memuat ringkasan pesanan...
      </div>
    );
  }

  if (!snapshot) {
    return (
      <div className="p-8 rounded-ui bg-paper-2 border border-line text-center flex flex-col items-center gap-4">
        <h2 className="font-display font-extrabold text-[22px] text-ink">
          Belum ada pesanan terbaru
        </h2>
        <p className="text-[16px] text-ink-2">
          Silakan pilih menu terlebih dulu atau lanjutkan dari keranjang belanjamu.
        </p>
        <a href="/menu" className="btn-base btn-primary !min-h-[48px]">
          Lihat Menu
        </a>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snapshot.whatsappText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback select
      const area = document.createElement("textarea");
      area.value = snapshot.whatsappText;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 rounded-ui bg-paper-2 border border-line p-5 sm:p-7 flex flex-col gap-5">
        <div className="inline-flex items-center self-start gap-2 px-3.5 py-1.5 rounded-ui bg-wa text-white text-[14px] font-semibold">
          <WhatsAppIcon className="w-4 h-4" />
          <span>Langkah Terakhir</span>
        </div>

        <h1 className="font-display font-extrabold text-[28px] sm:text-[34px] leading-tight text-ink">
          WhatsApp sedang dibuka. Tekan Kirim di WhatsApp agar pesananmu diproses.
        </h1>

        <p className="text-[16px] text-ink-2 leading-relaxed">
          Jika aplikasi atau tab WhatsApp tidak terbuka otomatis di perangkatmu, gunakan salah satu tombol cadangan di bawah ini.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={snapshot.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base btn-wa !min-h-[48px]"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span>Buka WhatsApp Lagi</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="btn-base btn-secondary !min-h-[48px]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-wa" aria-hidden="true" />
                <span>Pesan Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" aria-hidden="true" />
                <span>Salin Isi Pesan</span>
              </>
            )}
          </button>
        </div>

        <div className="pt-4 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-[14px] text-ink-2">
            Sudah berhasil menekan Kirim di WhatsApp?
          </p>
          <button
            type="button"
            onClick={() => {
              clearCart();
              window.location.assign("/menu");
            }}
            className="btn-base btn-primary !min-h-[46px]"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            <span>Kosongkan Keranjang & Kembali ke Menu</span>
          </button>
        </div>
      </div>

      <aside className="lg:col-span-5 rounded-ui bg-paper-2 border border-line p-5 sm:p-6 flex flex-col gap-4">
        <h2 className="font-display font-extrabold text-[20px] text-ink">
          Ringkasan Pesanan Terakhir
        </h2>

        <dl className="text-[15px] flex flex-col gap-1.5 border-b border-line pb-4 m-0">
          <div className="flex justify-between gap-2">
            <dt className="text-ink-2">Pemesan</dt>
            <dd className="font-semibold text-ink m-0">{snapshot.customer.nama}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-ink-2">Metode</dt>
            <dd className="font-semibold text-ink m-0">{snapshot.customer.metode}</dd>
          </div>
          {snapshot.customer.metode === "Antar" && (
            <div className="flex justify-between gap-2">
              <dt className="text-ink-2">Alamat</dt>
              <dd className="font-semibold text-ink text-right m-0">
                {snapshot.customer.alamat}
              </dd>
            </div>
          )}
        </dl>

        <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
          {snapshot.items.map((item) => (
            <li key={item.uid} className="flex items-baseline justify-between gap-2 text-[15px]">
              <div>
                <p className="font-semibold text-ink">
                  {formatItemTitle(item.flavorIds)} × {item.quantity}
                </p>
                <p className="text-[13px] text-ink-2">
                  {item.toppings.length > 0 ? item.toppings.join(", ") : "Tanpa topping"}
                </p>
              </div>
              <span className="font-semibold text-ink tabular-nums shrink-0">
                {formatRupiah(computeItemSubtotal(item))}
              </span>
            </li>
          ))}
        </ul>

        <div className="pt-3 border-t border-line flex items-baseline justify-between">
          <span className="font-semibold text-[16px] text-ink">Total</span>
          <span className="font-display font-extrabold text-[22px] text-ink tabular-nums">
            {formatRupiah(snapshot.totalHarga)}
          </span>
        </div>
      </aside>
    </div>
  );
}
