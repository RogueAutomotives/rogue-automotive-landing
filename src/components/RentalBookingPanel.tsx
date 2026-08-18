/**
 * "Book & pay online" panel for a rental PDP. Availability calendar (blocked
 * dates from the API), live price summary (50% deposit vs full incl. security),
 * guest details form → creates the booking and funnels into the tokenized
 * payment page (/car-rentals/pay/:token) — the single payment surface shared
 * with staff-generated links.
 */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DateRange } from "react-day-picker";
import { AlertCircle, CalendarDays, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  createRentalBooking,
  formatJmd,
  getRentalAvailability,
  getRentalCars,
  type ApiRentalCar,
  type BlockedRange,
} from "@/lib/rentalsApi";

interface Props {
  slug: string;
}

/** Rental days as 24-hour periods (nights): pickup Fri, return Sat = 1 day; same-day = 1. */
const rangeDays = (r: DateRange) =>
  r.from && r.to ? Math.max(1, Math.round((r.to.getTime() - r.from.getTime()) / 86400000)) : 0;

const toYmd = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export default function RentalBookingPanel({ slug }: Props) {
  const navigate = useNavigate();
  const [car, setCar] = useState<ApiRentalCar | null>(null);
  const [blocked, setBlocked] = useState<BlockedRange[]>([]);
  const [loadFailed, setLoadFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  const [range, setRange] = useState<DateRange | undefined>();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    let cancelled = false;
    Promise.all([getRentalCars(), getRentalAvailability(slug)])
      .then(([cars, availability]) => {
        if (cancelled) return;
        setCar(cars.find((c) => c.slug === slug) ?? null);
        setBlocked(availability.blocked);
      })
      .catch(() => !cancelled && setLoadFailed(true))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const disabledDays = useMemo(
    () => [
      { before: new Date() },
      ...blocked.map((b) => ({ from: new Date(b.start), to: new Date(b.end) })),
    ],
    [blocked]
  );

  // A single selected date = same-day pickup & return (1-day minimum), so the
  // customer doesn't need to click the same date twice.
  const sel: DateRange | undefined = range?.from
    ? { from: range.from, to: range.to ?? range.from }
    : undefined;

  /** Reject ranges that span a blocked booking (endpoints are free but middle isn't). */
  const rangeCrossesBlocked = useMemo(() => {
    if (!sel?.from || !sel?.to) return false;
    return blocked.some(
      (b) => new Date(b.start) <= sel.to! && new Date(b.end) >= sel.from!
    );
  }, [sel, blocked]);

  const days = sel ? rangeDays(sel) : 0;
  const subtotal = car && days > 0 ? car.pricePerDay * days : 0;
  const minDays = car?.minRentalDays ?? 1;
  const belowMinimum = days > 0 && days < minDays;

  const set = (k: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = async () => {
    if (!car || !sel?.from || !sel?.to) return;
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Please enter a valid email address.";
    if (!form.phone.trim()) e.phone = "Please enter a phone number.";
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const params = new URLSearchParams(window.location.search);
      const [firstName, ...rest] = form.name.trim().split(/\s+/);
      const result = await createRentalBooking({
        carSlug: car.slug,
        startDate: toYmd(sel.from),
        endDate: toYmd(sel.to),
        firstName,
        lastName: rest.join(" "),
        email: form.email.trim(),
        phone: form.phone.trim(),
        utmSource: params.get("utm_source") ?? undefined,
        utmMedium: params.get("utm_medium") ?? undefined,
        utmCampaign: params.get("utm_campaign") ?? undefined,
        utmContent: params.get("utm_content") ?? undefined,
        referrer: document.referrer || undefined,
      });
      navigate(`/car-rentals/pay/${result.token}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong — please try again.");
      setSubmitting(false);
    }
  };

  // API unreachable or car not in the DB fleet → hide the panel entirely; the
  // page's enquiry-form fallback still works.
  if (loadFailed || (!loading && !car)) return null;

  return (
    <Card className="border-0 shadow-lg mt-8">
      <CardContent className="p-5 sm:p-7">
        <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-rogue-red mb-1">
          Book online
        </p>
        <h2 className="text-xl font-montserrat font-bold text-rogue-charcoal mb-1">
          Pick your dates & lock them in
        </h2>
        <p className="text-sm text-rogue-slate mb-5">
          Pay a 50% deposit (or everything up front) and your dates are secured instantly.
          Greyed-out dates are already booked.
        </p>

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-rogue-slate py-8" role="status">
            <Loader2 className="h-4 w-4 animate-spin text-rogue-red" /> Checking availability…
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex justify-center md:justify-start">
              <Calendar
                mode="range"
                selected={range}
                onSelect={setRange}
                disabled={disabledDays}
                numberOfMonths={1}
                className="rounded-xl border border-slate-200"
              />
            </div>

            <div>
              {belowMinimum && !rangeCrossesBlocked ? (
                <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 mb-4 text-sm text-amber-800">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Minimum rental for this car is {minDays} days — extend your return date.
                </div>
              ) : sel?.from && sel?.to && !rangeCrossesBlocked ? (
                <div className="rounded-xl bg-rogue-light p-4 mb-4 space-y-1.5 text-sm">
                  <p className="flex items-center gap-2 text-rogue-charcoal font-medium">
                    <CalendarDays className="h-4 w-4 text-rogue-red" />
                    {sel.from.getTime() === sel.to.getTime()
                      ? `${sel.from.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })} (same-day)`
                      : `${sel.from.toLocaleDateString(undefined, { month: "short", day: "numeric" })} – ${sel.to.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`}{" "}
                    ({days} day{days === 1 ? "" : "s"})
                  </p>
                  <div className="flex justify-between text-rogue-slate">
                    <span>
                      {days} × {formatJmd(car!.pricePerDay)}
                    </span>
                    <span className="font-semibold text-rogue-charcoal">{formatJmd(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-rogue-slate">
                    <span>Lock in with 50% deposit</span>
                    <span className="font-semibold text-rogue-charcoal">{formatJmd(subtotal * 0.5)}</span>
                  </div>
                  <div className="flex justify-between text-rogue-slate">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-rogue-red" /> Security deposit (refundable)
                    </span>
                    <span className="font-semibold text-rogue-charcoal">{formatJmd(car!.securityDeposit)}</span>
                  </div>
                </div>
              ) : rangeCrossesBlocked ? (
                <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 mb-4 text-sm text-amber-800">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Those dates include days that are already booked — please pick a clear stretch.
                </div>
              ) : (
                <p className="text-sm text-rogue-slate mb-4">
                  Select your pick-up and return dates on the calendar
                  {minDays > 1 ? ` (${minDays}-day minimum)` : ""}.
                </p>
              )}

              <div className="space-y-3">
                <div>
                  <Input
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                    placeholder="Your full name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    className="border-slate-300 focus-visible:ring-rogue-red"
                  />
                  {errors.name && <p className="text-sm text-rogue-red mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Input
                    type="email"
                    inputMode="email"
                    value={form.email}
                    onChange={(e) => set("email")(e.target.value)}
                    placeholder="you@email.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    className="border-slate-300 focus-visible:ring-rogue-red"
                  />
                  {errors.email && <p className="text-sm text-rogue-red mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Input
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    placeholder="(876) 000-0000"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    className="border-slate-300 focus-visible:ring-rogue-red"
                  />
                  {errors.phone && <p className="text-sm text-rogue-red mt-1">{errors.phone}</p>}
                </div>
              </div>

              {submitError && (
                <p className="text-sm text-rogue-red mt-3" role="alert">
                  {submitError}
                </p>
              )}

              <Button
                onClick={submit}
                disabled={!sel?.from || !sel?.to || rangeCrossesBlocked || belowMinimum || submitting}
                className="w-full mt-4 bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold py-6 rounded-full disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Reserving…
                  </>
                ) : (
                  "Continue to payment"
                )}
              </Button>
              <p className="text-xs text-rogue-slate text-center mt-2">
                Dates are held once your deposit is paid. The security deposit is fully refunded
                after the vehicle is returned in good condition.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
