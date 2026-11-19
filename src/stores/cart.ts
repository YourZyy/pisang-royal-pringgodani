import { atom } from "nanostores";
import type { CartItem, LastOrderSnapshot } from "../lib/order";
import { orderRules } from "../lib/order";

const CART_STORAGE_KEY = "prp_cart_v1";
const LAST_ORDER_STORAGE_KEY = "prp_last_order_v1";

export const $cart = atom<CartItem[]>([]);
export const $isCartDrawerOpen = atom<boolean>(false);
export const $customizerState = atom<{
  open: boolean;
  initialFlavorIds: string[];
  initialToppings: string[];
  initialQuantity: number;
  initialNote: string;
  editingUid: string | null;
}>({
  open: false,
  initialFlavorIds: [],
  initialToppings: [],
  initialQuantity: 1,
  initialNote: "",
  editingUid: null,
});

export const $mobileMenuOpen = atom<boolean>(false);
export const $lastAddedTick = atom<number>(0);

let initialized = false;

export function initCartStore(): void {
  if (typeof window === "undefined") return;
  if (!initialized) {
    initialized = true;
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          $cart.set(parsed);
        }
      }
    } catch {
      $cart.set([]);
    }

    window.addEventListener("storage", (e) => {
      if (e.key === CART_STORAGE_KEY) {
        try {
          const parsed = e.newValue ? JSON.parse(e.newValue) : [];
          $cart.set(Array.isArray(parsed) ? parsed : []);
        } catch {
          // ignore malformed external storage change
        }
      }
    });
  }
}

function persistCart(items: CartItem[]): void {
  $cart.set(items);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota failures
    }
  }
}

function makeUid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Merges identical flavor+topping+note combinations or appends a new portion entry.
 */
export function upsertCartItem(
  payload: Omit<CartItem, "uid">,
  editingUid: string | null = null,
): void {
  const cleanFlavors = [...payload.flavorIds];
  const cleanToppings = [...payload.toppings];
  const cleanNote = payload.note.trim().slice(0, 140);
  const qty = Math.min(orderRules.maksJumlah, Math.max(1, Math.round(payload.quantity)));

  const current = $cart.get();

  if (editingUid) {
    const updated = current.map((item) =>
      item.uid === editingUid
        ? {
            ...item,
            flavorIds: cleanFlavors,
            toppings: cleanToppings,
            quantity: qty,
            note: cleanNote,
          }
        : item,
    );
    persistCart(updated);
    $lastAddedTick.set(Date.now());
    return;
  }

  const sameKey = (a: CartItem) =>
    [...a.flavorIds].sort().join(",") === [...cleanFlavors].sort().join(",") &&
    [...a.toppings].sort().join(",") === [...cleanToppings].sort().join(",") &&
    a.note.trim() === cleanNote;

  const existing = current.find(sameKey);
  if (existing) {
    const updated = current.map((item) =>
      item.uid === existing.uid
        ? {
            ...item,
            quantity: Math.min(orderRules.maksJumlah, item.quantity + qty),
          }
        : item,
    );
    persistCart(updated);
  } else {
    persistCart([
      ...current,
      {
        uid: makeUid(),
        flavorIds: cleanFlavors,
        toppings: cleanToppings,
        quantity: qty,
        note: cleanNote,
      },
    ]);
  }
  $lastAddedTick.set(Date.now());
}

export function updateCartQuantity(uid: string, nextQty: number): void {
  const current = $cart.get();
  if (nextQty <= 0) {
    persistCart(current.filter((item) => item.uid !== uid));
    return;
  }
  const clamped = Math.min(orderRules.maksJumlah, Math.max(1, Math.round(nextQty)));
  persistCart(current.map((item) => (item.uid === uid ? { ...item, quantity: clamped } : item)));
}

export function removeCartItem(uid: string): CartItem | undefined {
  const current = $cart.get();
  const target = current.find((item) => item.uid === uid);
  persistCart(current.filter((item) => item.uid !== uid));
  return target;
}

export function restoreCartItem(item: CartItem): void {
  const current = $cart.get();
  if (current.some((i) => i.uid === item.uid)) return;
  persistCart([...current, item]);
}

export function clearCart(): void {
  persistCart([]);
}

export function openCustomizerForFlavor(flavorId: string): void {
  $customizerState.set({
    open: true,
    initialFlavorIds: flavorId ? [flavorId] : [],
    initialToppings: [],
    initialQuantity: 1,
    initialNote: "",
    editingUid: null,
  });
}

export function openCustomizerForMix(flavorIds: string[] = ["coklat", "matcha"], toppings: string[] = []): void {
  $customizerState.set({
    open: true,
    initialFlavorIds: flavorIds,
    initialToppings: toppings,
    initialQuantity: 1,
    initialNote: "",
    editingUid: null,
  });
}

export function openCustomizerToEdit(item: CartItem): void {
  $isCartDrawerOpen.set(false);
  $customizerState.set({
    open: true,
    initialFlavorIds: [...item.flavorIds],
    initialToppings: [...item.toppings],
    initialQuantity: item.quantity,
    initialNote: item.note,
    editingUid: item.uid,
  });
}

export function closeCustomizer(): void {
  $customizerState.set({
    ...$customizerState.get(),
    open: false,
    editingUid: null,
  });
}

export function saveLastOrder(snapshot: LastOrderSnapshot): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // ignore storage errors
  }
}

export function readLastOrder(): LastOrderSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LAST_ORDER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LastOrderSnapshot) : null;
  } catch {
    return null;
  }
}
