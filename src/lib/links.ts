/**
 * Central place for outbound/brand links so CTAs stay consistent and carry
 * attribution into the booking app (the social-funnel attribution the app reads).
 */

const BOOKING_APP = "https://wash.rogueautomotiveja.com";

const REF_STORAGE_KEY = "rogue_ref_code";

/**
 * The affiliate/referral code for this visit (?ref=CODE), if any. A visitor
 * arrives on this landing page via a partner's link; we forward the code to the
 * booking app so the discount can be applied at checkout. Internal SPA
 * navigation (e.g. home → /car-wash) drops the query string, so the code is
 * persisted to sessionStorage on first sight and read back from there — a "Book"
 * click anywhere in the session still carries it.
 */
function currentRefCode(): string | null {
  if (typeof window === "undefined") return null;
  let fromUrl: string | null = null;
  try {
    fromUrl = new URLSearchParams(window.location.search).get("ref");
  } catch {
    fromUrl = null;
  }
  try {
    if (fromUrl) {
      window.sessionStorage.setItem(REF_STORAGE_KEY, fromUrl);
      return fromUrl;
    }
    return window.sessionStorage.getItem(REF_STORAGE_KEY);
  } catch {
    // storage unavailable/blocked — best effort with the URL value only
    return fromUrl;
  }
}

// Capture the ref immediately on module load, while the landing URL still has
// its query string — before the router or any internal navigation strips it.
currentRefCode();

const UTM_STORAGE_KEY = "rogue_inbound_utm";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
type InboundUtm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/**
 * The UTM params this visit arrived with — e.g. from a paid Instagram ad.
 *
 * Persisted for the same reason as the ref code: internal SPA navigation drops
 * the query string, so by the time someone clicks "Book" the original campaign
 * params are gone from the URL.
 */
function inboundUtm(): InboundUtm {
  if (typeof window === "undefined") return {};
  let fromUrl: InboundUtm = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) fromUrl[key] = value;
    }
  } catch {
    fromUrl = {};
  }

  try {
    if (Object.keys(fromUrl).length > 0) {
      window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const stored = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as InboundUtm) : {};
  } catch {
    return fromUrl;
  }
}

// Same reasoning as the ref code — capture before the router strips the query.
inboundUtm();

/** Append UTM params so the booking app can attribute traffic from this site. */
export function bookingUrl(
  path = "/book-a-detail",
  opts: { source?: string; medium?: string; campaign?: string; content?: string; service?: string } = {},
): string {
  // A visitor who arrived from an ad keeps that campaign all the way into the
  // booking app. Without this the hardcoded landing/hub defaults below would
  // overwrite the real origin at the handoff, and every ad-driven booking would
  // be attributed to the landing page instead of the campaign that paid for it.
  const inbound = inboundUtm();

  const params = new URLSearchParams({
    utm_source: inbound.utm_source ?? opts.source ?? "landing",
    utm_medium: inbound.utm_medium ?? opts.medium ?? "web",
    utm_campaign: inbound.utm_campaign ?? opts.campaign ?? "hub",
    // Prefer the inbound content (which ad creative) over the CTA label.
    ...(inbound.utm_content || opts.content
      ? { utm_content: inbound.utm_content ?? opts.content! }
      : {}),
    // Pre-select a specific service/tier in the booking flow when provided.
    ...(opts.service ? { service: opts.service } : {}),
  });

  // Carry an affiliate/referral code through to the booking app.
  const ref = currentRefCode();
  if (ref) params.set("ref", ref);

  return `${BOOKING_APP}${path}?${params.toString()}`;
}

/** WhatsApp click-to-chat (business line (876) 597-4550). */
export function whatsappUrl(message?: string): string {
  const base = "https://wa.me/18765974550";
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const CONTACT = {
  phone: "(876) 597-4550",
  phoneHref: "tel:+18765974550",
  email: "rogueautomotiveja@gmail.com",
  emailHref: "mailto:rogueautomotiveja@gmail.com",
  address: "17 Westminster Rd, Kingston 10, Jamaica",
  instagram: "https://www.instagram.com/rogueautomotiveja_",
};
