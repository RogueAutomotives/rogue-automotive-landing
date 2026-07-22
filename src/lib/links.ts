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

/** Append UTM params so the booking app can attribute traffic from this site. */
export function bookingUrl(
  path = "/book-a-detail",
  opts: { source?: string; medium?: string; campaign?: string; content?: string; service?: string } = {},
): string {
  const params = new URLSearchParams({
    utm_source: opts.source ?? "landing",
    utm_medium: opts.medium ?? "web",
    utm_campaign: opts.campaign ?? "hub",
    ...(opts.content ? { utm_content: opts.content } : {}),
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
