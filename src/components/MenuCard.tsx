import React from "react";
import { ArrowRight } from "lucide-react";
import { type MenuVariant, formatRupiah, getMenuImageProps } from "../lib/order";
import { openCustomizerForFlavor } from "../stores/cart";

/**
 * Satu menu = foto besar + teks di bawahnya. Tidak ada kotak pembungkus:
 * hierarki dibentuk oleh ukuran foto, tipografi, dan jarak.
 * lg: dua menu pembuka. sm: sisanya. xs: daftar "menu lainnya" yang ringkas.
 */
export default function MenuCard({
  item,
  size = "sm",
  className = "",
}: {
  item: MenuVariant;
  size?: "lg" | "sm" | "xs";
  className?: string;
}) {
  const soldOut = !item.tersedia;
  const big = size === "lg";
  const tiny = size === "xs";
  const imgProps = getMenuImageProps(
    item.foto,
    big
      ? "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 640px"
      : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 420px",
  );

  const titleSize = big
    ? "text-[26px] sm:text-[30px]"
    : tiny
      ? "text-[20px]"
      : "text-[22px] sm:text-[24px]";

  return (
    <article
      className={["menu-item flex flex-col", soldOut ? "menu-item--soldout" : "", className].join(" ")}
    >
      <a
        href={`/menu/${item.id}`}
        aria-label={`Lihat detail ${item.nama}`}
        className={[
          "photo block w-full aspect-[4/3]",
          big ? "lg:aspect-auto lg:h-[440px]" : tiny ? "" : "lg:aspect-auto lg:h-[300px]",
        ].join(" ")}
      >
        <img {...imgProps} alt={item.alt} loading="lazy" />
      </a>

      <div
        className={[
          "mt-5 flex gap-x-4",
          tiny ? "flex-col gap-y-1" : "items-start justify-between",
        ].join(" ")}
      >
        <h3 className={titleSize}>
          <a href={`/menu/${item.id}`} className="text-inherit no-underline link-draw">
            {item.nama}
          </a>
          {soldOut ? (
            <span className="tag tag--muted ml-2 -translate-y-[3px]">Habis</span>
          ) : (
            item.favorit && <span className="tag ml-2 -translate-y-[3px]">Favorit</span>
          )}
        </h3>
        <span
          className={[
            "shrink-0 font-display font-extrabold tracking-[-0.02em] tabular-nums",
            titleSize,
          ].join(" ")}
        >
          {formatRupiah(item.harga)}
        </span>
      </div>

      {!tiny && (
        <p className="mt-2 text-[16px] text-ink-2 leading-relaxed max-w-[44ch]">{item.deskripsi}</p>
      )}

      <div className="mt-5 flex items-center gap-5">
        <button
          type="button"
          disabled={soldOut}
          onClick={() => openCustomizerForFlavor(item.id)}
          className="btn-base btn-primary min-w-[140px]"
        >
          <span>{soldOut ? "Stok Habis" : "Pesan"}</span>
        </button>

        <a
          href={`/menu/${item.id}`}
          className="inline-flex items-center gap-1.5 min-h-[44px] text-[15px] font-bold text-ink no-underline link-draw"
        >
          <span>Detail</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
