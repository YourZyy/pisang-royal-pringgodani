import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { formatRupiah, getMenuById, getMenuImageProps, menuList, orderRules } from "../lib/order";
import { trackEvent } from "../lib/analytics";
import { openCustomizerForMix } from "../stores/cart";
import MenuCard from "./MenuCard";

interface MenuCatalogSectionProps {
  source?: "beranda" | "menu";
  showSeeAllLink?: boolean;
  /** Sel keenam: baris Mix 2 Rasa. Dimatikan di beranda karena bagian Mix tampil tepat di bawahnya. */
  showMixStrip?: boolean;
  title?: string;
  intro?: string;
  /** Di halaman /menu judul ini adalah h1; di beranda h2. */
  headingTag?: "h1" | "h2";
}

/** Posisi tiap menu di grid 12 kolom (desktop): 7+5, lalu 4+4+4. */
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];

export default function MenuCatalogSection({
  source = "beranda",
  showSeeAllLink = false,
  showMixStrip = false,
  title = "Menu pisang kembung",
  intro = "Ketuk Pesan untuk pilih satu rasa atau mix dua rasa, lengkap dengan topping gratis.",
  headingTag: Heading = "h2",
}: MenuCatalogSectionProps) {
  useEffect(() => {
    trackEvent("view_menu", { source_page: source });
  }, [source]);

  const mixLeft = getMenuById("coklat") ?? menuList[0];
  const mixRight = getMenuById("matcha") ?? menuList[2];

  return (
    <section id="menu-unggulan" className="section-y scroll-mt-16">
      <div className="wrap">
        <div className="mb-12 lg:mb-16" data-reveal>
          <Heading className="text-[clamp(36px,5.4vw,72px)]">{title}</Heading>
          <p className="mt-5 text-[18px] leading-[1.55] text-ink-2 max-w-[44ch]">{intro}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-14 lg:gap-x-10 lg:gap-y-20">
          {menuList.map((item, i) => (
            <MenuCard
              key={item.id}
              item={item}
              size={i < 2 ? "lg" : "sm"}
              className={i === 0 ? `sm:col-span-2 ${spans[0]}` : (spans[i] ?? "lg:col-span-4")}
            />
          ))}

          {showMixStrip && (
            <article className="sm:col-span-2 lg:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center border-t border-ink/20 pt-10">
              <button
                type="button"
                onClick={() => openCustomizerForMix(["coklat", "matcha"])}
                aria-label="Buka panel racik Mix 2 Rasa"
                className="photo md:col-span-5 grid grid-cols-2 gap-[3px] aspect-[16/9] p-0 border-0 cursor-pointer"
              >
                <img
                  {...getMenuImageProps(mixLeft.foto, "(max-width: 767px) 50vw, 300px")}
                  alt={mixLeft.alt}
                  loading="lazy"
                />
                <img
                  {...getMenuImageProps(mixRight.foto, "(max-width: 767px) 50vw, 300px")}
                  alt={mixRight.alt}
                  loading="lazy"
                />
              </button>

              <div className="md:col-span-7 flex flex-col gap-4 items-start">
                <div className="flex items-baseline justify-between gap-4 w-full">
                  <h3 className="text-[26px] sm:text-[34px]">Pisang Kembung Mix 2 Rasa</h3>
                  <span className="shrink-0 font-display font-extrabold text-[26px] sm:text-[34px] tracking-[-0.02em] tabular-nums">
                    {formatRupiah(orderRules.hargaMix)}
                  </span>
                </div>
                <p className="text-[16px] text-ink-2 max-w-[48ch]">
                  Campur dua rasa pilihanmu dalam satu porsi, gratis hingga dua topping.
                </p>
                <button
                  type="button"
                  onClick={() => openCustomizerForMix(["coklat", "matcha"])}
                  className="btn-base btn-primary"
                >
                  <span>Racik Mix</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          )}
        </div>

        {showSeeAllLink && (
          <div className="mt-14 lg:mt-20">
            <a href="/menu" className="btn-base btn-secondary">
              <span>Lihat semua menu</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
