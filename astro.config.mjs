import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// URL publik situs, dipakai untuk canonical, Open Graph, sitemap, dan robots.txt.
// Urutan: SITE_URL (domain sendiri) > domain produksi Vercel > placeholder.
// Setelah punya domain, isi variabel SITE_URL di Vercel (mis. https://pisangroyal.id).
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site =
  process.env.SITE_URL ||
  (vercelHost ? `https://${vercelHost}` : "https://pisangroyalpringgodani.example");

export default defineConfig({
  site,
  output: "static",
  integrations: [
    react(),
    // Halaman transaksi tidak perlu diindeks mesin pencari.
    sitemap({ filter: (page) => !/\/(checkout|keranjang|pesanan-terkirim)\/?$/.test(page) }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
