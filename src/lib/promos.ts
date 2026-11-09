/**
 * Time-boxed promos. Dates are Jamaica calendar dates (America/Jamaica, UTC-5,
 * no DST) so a promo ends at local midnight, not UTC midnight.
 */

/** Today's date in Jamaica as YYYY-MM-DD. */
export function jamaicaToday(): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Jamaica",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** Last day the Coating Combo can be booked (mirrors the API's AvailableUntil). */
export const COATING_COMBO_UNTIL = "2026-11-30";

export const COATING_COMBO_PATH = "/offers/coating-combo";

/** True through the last day of the offer (Jamaica date). */
export function isCoatingComboLive(): boolean {
  return jamaicaToday() <= COATING_COMBO_UNTIL;
}
