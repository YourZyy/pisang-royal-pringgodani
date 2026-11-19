import React, { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ArrowRight } from "lucide-react";
import { formatRupiah, getMenuById, getMenuImageProps, orderRules, toppingList } from "../lib/order";
import { openCustomizerForMix } from "../stores/cart";

const presetMixes = [
  { id: "coklat-matcha", flavors: ["coklat", "matcha"], label: "Coklat + Matcha" },
  { id: "coklat-tiramisu", flavors: ["coklat", "tiramisu"], label: "Coklat + Tiramisu" },
  { id: "ori-stroberi", flavors: ["ori", "stroberi"], label: "ORI + Stroberi" },
];

export default function HomeMixSection() {
  const [activePresetIdx, setActivePresetIdx] = useState(0);
  const current = presetMixes[activePresetIdx];
  const left = getMenuById(current.flavors[0]);
  const right = getMenuById(current.flavors[1]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="on-forest relative overflow-hidden bg-forest text-bone section-y">
        <div className="grain" aria-hidden="true" />

        <div className="wrap relative grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          <div className="lg:col-span-5" data-reveal>
            <h2 className="text-[clamp(38px,5.2vw,76px)] text-bone">
              Dua rasa, satu porsi, tetap <span className="text-banana">{formatRupiah(orderRules.hargaMix)}</span>.
            </h2>
            <p className="mt-6 text-[18px] leading-[1.55] text-bone/80 max-w-[38ch]">
              Pilih satu rasa atau campur sampai dua dalam satu kotak. Sudah termasuk hingga {orderRules.maksToppingPerPorsi} topping gratis.
            </p>
            <p className="mt-4 text-[15px] text-bone/70 max-w-[44ch]">
              Topping: {toppingList.map((t) => t.nama).join(", ")}.
            </p>

            <button
              type="button"
              onClick={() => openCustomizerForMix(current.flavors)}
              className="btn-base btn-primary mt-8"
            >
              <span>Racik mix ini</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="lg:col-span-7">
            <div role="group" aria-label="Contoh kombinasi mix" className="flex flex-wrap gap-x-6 mb-5">
              {presetMixes.map((preset, idx) => (
                <button
                  key={preset.id}
                  type="button"
                  aria-pressed={idx === activePresetIdx}
                  onClick={() => setActivePresetIdx(idx)}
                  className="tab-text"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Dua foto saling menumpuk diagonal: dua rasa bertemu di satu kotak */}
            {left && right && (
              <div className="relative w-full aspect-[5/4] sm:aspect-[16/11]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={`a-${left.id}`}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="photo absolute left-0 top-0 w-[64%] aspect-[4/3] !bg-forest-2"
                  >
                    <img
                      {...getMenuImageProps(left.foto, "(max-width: 639px) 64vw, 420px")}
                      alt={left.alt}
                      loading="lazy"
                    />
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={`b-${right.id}`}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
                    className="photo absolute right-0 bottom-0 w-[64%] aspect-[4/3] !bg-forest-2 border-[6px] border-forest"
                  >
                    <img
                      {...getMenuImageProps(right.foto, "(max-width: 639px) 64vw, 420px")}
                      alt={right.alt}
                      loading="lazy"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            <div className="mt-5 flex items-baseline justify-between gap-4">
              <p className="font-display font-extrabold text-[20px] tracking-[-0.02em]">
                Mix {current.label}
              </p>
              <p className="font-display font-extrabold text-[26px] tracking-[-0.02em] text-banana tabular-nums">
                {formatRupiah(orderRules.hargaMix)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
