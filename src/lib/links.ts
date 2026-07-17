/**
 * Central place for outbound/brand links so CTAs stay consistent and carry
 * attribution into the booking app (the social-funnel attribution the app reads).
 */

const BOOKING_APP = "https://wash.rogueautomotiveja.com";

/**
 * The affiliate/referral code from the current URL (?ref=CODE), if any. A visitor
 * arrives on this landing page via a partner's link; we forward the code to the
 * booking app so the discount can be applied at checkout. Without this, clicking
 * "Book" would drop the code and the affiliate link would never discount.
 */
function currentRefCode(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return new URLSearchParams(window.location.search).get("ref");
  } catch {
    return null;
  }
}

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
