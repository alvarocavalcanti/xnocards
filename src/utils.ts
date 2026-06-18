/* Analytics wrapper — no-op when gtag is absent (dev) */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const analytics = {
  track(event: string, params?: Record<string, unknown>) {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params);
    }
  },
  page() {
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view");
    }
  },
};

export const ID = "com.alvarocavalcanti.xnocards";
export const BROADCAST_CHANNEL = `${ID}/card`;

