import React, { useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { buildDirectWhatsAppUrl, formatRupiah, getMenuImageProps, menuList } from "../lib/order";
import { openCustomizerForFlavor, openCustomizerForMix } from "../stores/cart";
import { trackEvent } from "../lib/analytics";
import { WhatsAppIcon } from "./Icons";

export default function HeroShowcase() {
  const available = menuList.filter((m) => m.tersedia);
  const [activeId, setActiveId] = useState<string>(available[0]?.id ?? "coklat");
  const activeItem = menuList.find((m) => m.id === activeId) ?? menuList[0];

  // Foto bergeser lebih lambat dari halaman: memberi kedalaman tanpa menyembunyikan apa pun.
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="on-forest relative overflow-hidden bg-forest text-bone">
        <div className="grain" aria-hidden="true" />

        <div className="wrap relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center py-12 lg:py-16 lg:min-h-[min(calc(100dvh-64px),820px)]">
          <div className="lg:col-span-7">
            <h1 className="text-[clamp(46px,5.5vw,92px)] text-bone leading-[0.98] lg:whitespace-nowrap">
              <span className="line">
                <span className="line-in" style={{ ["--d" as string]: 0 }}>
                  Pisang kembung,
                </span>
              </span>
              <span className="line">
                <span className="line-in text-banana" style={{ ["--d" as string]: 1 }}>
                  bebas mix rasa.
                </span>
              </span>
            </h1>

            <p
              className="rise mt-8 text-[18px] sm:text-[20px] leading-[1.55] text-bone/80 max-w-[34ch]"
              style={{ ["--d" as string]: 4 }}
            >
              Lima rasa mulai Rp17.000. Campur dua rasa dalam satu porsi tetap Rp20.000, topping gratis.
            </p>

            <div className="rise mt-8 flex flex-col sm:flex-row gap-3" style={{ ["--d" as string]: 5 }}>
              <a href="#menu-unggulan" className="btn-base btn-primary">
                <span>Lihat Menu</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={buildDirectWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_whatsapp", { location: "hero" })}
                className="btn-base btn-ghost-bone"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Pesan via WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div ref={frameRef} className="unmask photo aspect-[4/3] lg:aspect-square w-full !bg-forest-2">
              <motion.div className="absolute inset-[-8%]" style={{ y: parallaxY }}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={activeItem.id}
                    {...getMenuImageProps(activeItem.foto, "(max-width: 1023px) 100vw, 520px")}
                    alt={activeItem.alt}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full object-cover !transition-none"
                  />
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="rise mt-4" style={{ ["--d" as string]: 6 }}>
              <div role="tablist" aria-label="Pratinjau varian rasa pisang kembung" className="flex flex-wrap gap-x-5">
                {menuList.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    role="tab"
                    aria-selected={variant.id === activeId}
                    onClick={() => setActiveId(variant.id)}
                    className="tab-text"
                  >
                    {variant.rasa}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => openCustomizerForMix(["coklat", "matcha"])}
                  className="tab-text !text-banana"
                >
                  Mix 2 rasa
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between gap-4">
                <div className="leading-tight">
                  <p className="font-display font-extrabold text-[20px] tracking-[-0.02em]">{activeItem.nama}</p>
                  <p className="text-[14px] text-bone/70 tabular-nums">{formatRupiah(activeItem.harga)} per porsi</p>
                </div>
                <button
                  type="button"
                  disabled={!activeItem.tersedia}
                  onClick={() => openCustomizerForFlavor(activeItem.id)}
                  className="btn-base btn-bone !min-h-[44px] !px-5 !text-[14px] shrink-0"
                >
                  {activeItem.tersedia ? "Pesan" : "Habis"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
