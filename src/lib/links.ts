/**
 * Central place for outbound/brand links so CTAs stay consistent and carry
 * attribution into the booking app (the social-funnel attribution the app reads).
 */

const BOOKING_APP = "https://wash.rogueautomotiveja.com";

/** Append UTM params so the booking app can attribute traffic from this site. */
export function bookingUrl(
  path = "/book-a-detail",
  opts: { source?: string; medium?: string; campaign?: string; content?: string } = {},
): string {
  const params = new URLSearchParams({
    utm_source: opts.source ?? "landing",
    utm_medium: opts.medium ?? "web",
    utm_campaign: opts.campaign ?? "hub",
    ...(opts.content ? { utm_content: opts.content } : {}),
  });
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
