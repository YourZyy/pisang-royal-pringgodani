import React, { useState } from "react";
import { motion, MotionConfig } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { $isCartDrawerOpen, upsertCartItem } from "../stores/cart";
import OrderCustomizerPanel from "./OrderCustomizerPanel";

export default function MenuDetailClient({
  initialFlavorId,
}: {
  initialFlavorId: string;
}) {
  const [addedBanner, setAddedBanner] = useState<string | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col gap-5">
        {addedBanner && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
            className="p-4 rounded-ui bg-paper-2 border border-ink/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5 text-ink font-semibold text-[15px]">
              <CheckCircle2 className="w-5 h-5 text-wa shrink-0" aria-hidden="true" />
              <span>{addedBanner}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => $isCartDrawerOpen.set(true)}
                className="btn-base btn-secondary !min-h-[42px] !text-[14px] !px-4"
              >
                Lihat Keranjang
              </button>
              <a href="/checkout" className="btn-base btn-primary !min-h-[42px] !text-[14px] !px-4">
                Lanjut ke Checkout
              </a>
            </div>
          </motion.div>
        )}

        <OrderCustomizerPanel
          initialFlavorIds={[initialFlavorId]}
          layoutMode="page"
          showShopeeButton={true}
          onSubmitItem={(payload) => {
            upsertCartItem(payload);
            setAddedBanner(`${payload.quantity} porsi berhasil ditambahkan ke keranjang.`);
          }}
        />
      </div>
    </MotionConfig>
  );
}
