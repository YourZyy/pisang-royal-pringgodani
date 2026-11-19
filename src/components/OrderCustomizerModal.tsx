import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { X } from "lucide-react";
import {
  $customizerState,
  closeCustomizer,
  upsertCartItem,
} from "../stores/cart";
import OrderCustomizerPanel from "./OrderCustomizerPanel";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export default function OrderCustomizerModal({
  onAdded,
}: {
  onAdded?: (summary: string) => void;
}) {
  const state = useStore($customizerState);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!state.open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCustomizer();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [state.open]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {state.open && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="customizer-dialog-title"
          >
            {/* Backdrop */}
            <motion.div
              key="customizer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={closeCustomizer}
              className="fixed inset-0 bg-ink/45"
              aria-hidden="true"
            />

            {/* Sheet (Mobile) or Modal (Desktop) */}
            <motion.div
              key="customizer-sheet"
              initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.96, y: 8 }}
              animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.97, y: 6 }}
              transition={{ type: "spring", visualDuration: 0.28, bounce: 0.06 }}
              drag={isMobile ? "y" : false}
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0, bottom: 0.35 }}
              onDragEnd={(_, info) => {
                if (isMobile && (info.offset.y > 100 || info.velocity.y > 450)) {
                  closeCustomizer();
                }
              }}
              className="relative z-10 w-full sm:max-w-3xl max-h-[90dvh] flex flex-col bg-paper border border-line rounded-t-[16px] sm:rounded-ui overflow-hidden"
            >
              {/* Drag indicator for mobile */}
              <div className="sm:hidden flex justify-center pt-2.5 pb-1 shrink-0">
                <div className="w-10 h-1.5 rounded-full bg-ink/20" aria-hidden="true" />
              </div>

              <div className="flex items-center justify-between px-5 sm:px-6 py-3 sm:py-4 border-b border-line shrink-0">
                <h2
                  id="customizer-dialog-title"
                  className="font-display font-extrabold text-[18px] sm:text-[20px] text-ink"
                >
                  {state.editingUid ? "Ubah Pilihan Porsi" : "Atur Rasa & Topping"}
                </h2>
                <button
                  type="button"
                  onClick={closeCustomizer}
                  aria-label="Tutup panel kustomisasi"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-ui bg-paper-2 border border-line text-ink cursor-pointer hover:bg-butter"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div data-lenis-prevent className="overflow-y-auto px-5 sm:px-6 py-5">
                <OrderCustomizerPanel
                  initialFlavorIds={state.initialFlavorIds}
                  initialToppings={state.initialToppings}
                  initialQuantity={state.initialQuantity}
                  initialNote={state.initialNote}
                  isEditing={Boolean(state.editingUid)}
                  layoutMode="modal"
                  onSubmitItem={(payload) => {
                    upsertCartItem(payload, state.editingUid);
                    closeCustomizer();
                    if (onAdded) {
                      onAdded(
                        state.editingUid
                          ? "Pilihan porsi diperbarui"
                          : `${payload.quantity} porsi masuk keranjang`,
                      );
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
