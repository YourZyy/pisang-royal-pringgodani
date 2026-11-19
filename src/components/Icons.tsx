import React from "react";

/** Monogram toko: huruf PR di atas kuning pisang. Teks, bukan ilustrasi. */
export function BrandMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`${className} inline-flex items-center justify-center rounded-ui bg-banana text-ink font-display font-extrabold text-[13px] leading-none tracking-[-0.05em] select-none`}
    >
      PR
    </span>
  );
}

export function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.98.58 3.91 1.69 5.56L2 22l4.66-1.76a9.87 9.87 0 0 0 5.38 1.58h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2Zm5.77 14.08c-.24.68-1.4 1.3-1.94 1.38-.5.07-1.14.1-1.84-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.91-4.29-5.06-4.49-.15-.2-1.21-1.61-1.21-3.07 0-1.46.76-2.18 1.03-2.48.27-.3.59-.38.79-.38.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.6.83 2.07.9 2.22.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.77 1.27 1.65 2.06 1.14 1.01 2.09 1.33 2.4 1.48.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.75.83 2.05.98.3.15.5.22.57.35.08.13.08.73-.16 1.41Z" />
    </svg>
  );
}

export function ShopeeBagIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 7.5h14l-.9 11.4a2 2 0 0 1-2 1.85H7.9a2 2 0 0 1-2-1.85L5 7.5Z"
        fill="#EE4D2D"
        fillOpacity="0.14"
        stroke="#EE4D2D"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 7.5V6.25a3.25 3.25 0 0 1 6.5 0V7.5"
        stroke="#EE4D2D"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M14.2 12.2c-.35-.5-.95-.75-1.65-.75-1.05 0-1.75.55-1.75 1.3 0 .85.75 1.15 1.7 1.4 1.1.28 1.9.65 1.9 1.65 0 .95-.85 1.6-2.05 1.6-.95 0-1.75-.35-2.25-.95"
        stroke="#EE4D2D"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
