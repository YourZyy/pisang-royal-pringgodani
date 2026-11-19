export type AnalyticsEventName =
  | "view_menu"
  | "select_flavor"
  | "select_topping"
  | "add_to_cart"
  | "begin_checkout"
  | "click_whatsapp"
  | "click_shopee";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Dispatches PRD Section 13 analytics events safely without transmitting PII.
 */
export function trackEvent(
  name: AnalyticsEventName,
  params: Record<string, string | number | boolean> = {},
): void {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }
    if (typeof window.plausible === "function") {
      window.plausible(name, { props: params });
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...params });
    }
  } catch {
    // Analytics must never interrupt the customer purchase flow.
  }
}
