/**
 * Meta (Facebook/Instagram) Pixel.
 *
 * Powers ad measurement for the paid campaigns: without it Meta can only
 * optimise for clicks, and there's no way to retarget visitors who didn't
 * book or to build lookalike audiences.
 *
 * The pixel ID comes from VITE_META_PIXEL_ID. When it's unset every function
 * here is a no-op, so local dev and any build without the ID configured stay
 * completely untracked rather than erroring.
 */

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[] };
    _fbq?: unknown;
  }
}

let initialised = false;

export function isPixelEnabled(): boolean {
  return Boolean(PIXEL_ID);
}

/** Injects the pixel bootstrap and fires the first PageView. Safe to call twice. */
export function initMetaPixel(): void {
  if (initialised || !PIXEL_ID || typeof window === 'undefined') return;
  initialised = true;

  /* eslint-disable */
  // Standard Meta bootstrap: queues calls until the real library loads.
  (function (f: any, b: Document, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function (...args: unknown[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode?.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  window.fbq?.('init', PIXEL_ID);
  window.fbq?.('track', 'PageView');
}

/**
 * SPA route change. The pixel only auto-fires PageView on the initial load,
 * so client-side navigation would otherwise be invisible.
 */
export function trackPageView(): void {
  if (!PIXEL_ID) return;
  window.fbq?.('track', 'PageView');
}

/** A Meta standard event (Lead, Schedule, Purchase, …). */
export function trackEvent(event: string, params?: Record<string, unknown>): void {
  if (!PIXEL_ID) return;
  window.fbq?.('track', event, params);
}
