import menuConfig from "../data/menu.json";

export interface MenuVariant {
  id: string;
  nama: string;
  rasa: string;
  harga: number;
  foto: string;
  alt: string;
  deskripsi: string;
  warna: string;
  tersedia: boolean;
  favorit: boolean;
}

export interface ToppingOption {
  nama: string;
  keterangan: string;
}

export interface CartItem {
  uid: string;
  flavorIds: string[];
  toppings: string[];
  quantity: number;
  note: string;
}

export interface CheckoutFormValues {
  nama: string;
  metode: "Ambil di tempat" | "Antar";
  alamat: string;
  waktu: string;
  catatan: string;
}

export interface LastOrderSnapshot {
  items: CartItem[];
  customer: CheckoutFormValues;
  totalHarga: number;
  totalPorsi: number;
  whatsappText: string;
  whatsappUrl: string;
  createdAt: string;
}

export const storeInfo = menuConfig.toko;
export const orderRules = menuConfig.aturan;
export const menuList: MenuVariant[] = menuConfig.menu;
export const toppingList: ToppingOption[] = menuConfig.topping;

export function getMenuById(id: string): MenuVariant | undefined {
  return menuList.find((item) => item.id === id);
}

/**
 * Formats an integer Rupiah amount with dot thousands separator (e.g. 20000 -> "Rp20.000").
 */
export function formatRupiah(amount: number): string {
  const safe = Math.round(Number.isFinite(amount) ? amount : 0);
  return `Rp${safe.toLocaleString("id-ID")}`;
}

/**
 * Computes unit price per portion per PRD Section 5 & 12:
 * - Single flavor: uses that flavor's `harga` (ORI = Rp17.000, others = Rp20.000).
 * - Multiple flavors (Mix): always uses `aturan.hargaMix` (Rp20.000).
 * - Toppings never change unit price.
 */
export function getUnitPrice(flavorIds: string[]): number {
  const validIds = flavorIds.filter((id) => {
    const m = getMenuById(id);
    return m && m.tersedia;
  });
  if (validIds.length === 0) {
    // Fallback if calculating for display on an initial selection
    const first = flavorIds[0] ? getMenuById(flavorIds[0]) : undefined;
    return flavorIds.length > 1 ? orderRules.hargaMix : (first?.harga ?? orderRules.hargaMix);
  }
  if (validIds.length > 1) {
    return orderRules.hargaMix;
  }
  return getMenuById(validIds[0])?.harga ?? orderRules.hargaMix;
}

export function isMixOrder(flavorIds: string[]): boolean {
  return flavorIds.length > 1;
}

/**
 * Formats item display name following PRD Section 8.4 & 16:
 * - 1 flavor: "Pisang Kembung Coklat" or "Pisang Kembung ORI"
 * - >1 flavors: "Pisang Kembung Mix (Coklat + Matcha)"
 */
export function formatItemTitle(flavorIds: string[]): string {
  const flavors = flavorIds
    .map((id) => getMenuById(id))
    .filter((m): m is MenuVariant => Boolean(m));

  if (flavors.length === 0) return "Pisang Kembung";
  if (flavors.length === 1) return flavors[0].nama;
  const label = flavors.map((f) => f.rasa).join(" + ");
  return `Pisang Kembung Mix (${label})`;
}

export function computeItemSubtotal(item: Pick<CartItem, "flavorIds" | "quantity">): number {
  return getUnitPrice(item.flavorIds) * Math.max(1, item.quantity);
}

export function computeCartTotals(items: CartItem[]): { totalPorsi: number; totalHarga: number } {
  return items.reduce(
    (acc, item) => {
      const qty = Math.max(1, item.quantity);
      acc.totalPorsi += qty;
      acc.totalHarga += getUnitPrice(item.flavorIds) * qty;
      return acc;
    },
    { totalPorsi: 0, totalHarga: 0 },
  );
}

/**
 * Builds the formatted WhatsApp order message matching PRD Section 16 template.
 */
export function buildWhatsAppMessage(items: CartItem[], customer: CheckoutFormValues): string {
  const lines: string[] = [`Halo ${storeInfo.nama}, saya mau pesan:`, ""];

  items.forEach((item, index) => {
    const unitPrice = getUnitPrice(item.flavorIds);
    const subtotal = unitPrice * item.quantity;
    const title = formatItemTitle(item.flavorIds);
    const toppingText = item.toppings.length > 0 ? item.toppings.join(", ") : "Tanpa topping";

    lines.push(`${index + 1}) ${title} x${item.quantity}`);
    lines.push(`   Topping: ${toppingText}`);
    lines.push(`   Harga: ${formatRupiah(unitPrice)} x ${item.quantity} = ${formatRupiah(subtotal)}`);
    if (item.note.trim()) {
      lines.push(`   Catatan: ${item.note.trim()}`);
    }
    lines.push("");
  });

  const { totalHarga } = computeCartTotals(items);
  lines.push(`TOTAL: ${formatRupiah(totalHarga)}`);
  lines.push("");
  lines.push(`Nama: ${customer.nama.trim()}`);
  lines.push(`Metode: ${customer.metode}`);
  if (customer.metode === "Antar") {
    lines.push(`Alamat: ${customer.alamat.trim()}`);
  }
  lines.push(`Waktu: ${customer.waktu.trim() || "-"}`);
  lines.push(`Catatan: ${customer.catatan.trim() || "-"}`);
  lines.push("");
  lines.push("Sumber: website");

  return lines.join("\n");
}

export function buildWhatsAppOrderUrl(message: string): string {
  return `https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildDirectWhatsAppUrl(prefill = `Halo ${storeInfo.nama}, saya mau pesan pisang kembung.`): string {
  return `https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(prefill)}`;
}

const BUNDLED_RESPONSIVE_PHOTOS = new Set([
  "/images/menu/coklat.webp",
  "/images/menu/stroberi.webp",
  "/images/menu/matcha.webp",
  "/images/menu/tiramisu.webp",
  "/images/menu/ori.webp",
]);

/**
 * Returns responsive srcSet + sizes for bundled 4:3 menu images while gracefully
 * falling back to plain src if the store owner replaces a photo in menu.json.
 */
export function getMenuImageProps(foto: string, sizes: string) {
  if (!BUNDLED_RESPONSIVE_PHOTOS.has(foto)) {
    return { src: foto, width: 736, height: 552 };
  }
  const sm = foto.replace(".webp", "-sm.webp");
  const md = foto.replace(".webp", "-md.webp");
  return {
    src: foto,
    srcSet: `${sm} 352w, ${md} 512w, ${foto} 736w`,
    sizes,
    width: 736,
    height: 552,
  };
}
