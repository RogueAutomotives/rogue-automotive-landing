import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Key, Car, MessageCircle, Phone, CheckCircle2, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SubPageNav from "@/components/SubPageNav";
import Footer from "@/components/Footer";
import { sendContactMessage } from "@/lib/contact";
import { whatsappUrl, CONTACT } from "@/lib/links";

import { FLEET, formatJmd } from "@/lib/rentalFleet";

/** Vehicle photo with an on-brand fallback tile shown until the real image is uploaded. */
function CarPhoto({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="aspect-[3/4] w-full rounded-xl bg-gradient-to-br from-rogue-charcoal to-rogue-dark flex items-center justify-center mb-4"
        role="img"
        aria-label={alt}
      >
        <Car className="h-10 w-10 text-white/25" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="aspect-[3/4] w-full object-cover rounded-xl mb-4"
    />
  );
}

/** Whole days between two yyyy-mm-dd dates (same-day rental counts as 1). */
function rentalDays(pickup: string, ret: string): number {
  const ms = new Date(ret).getTime() - new Date(pickup).getTime();
  return Math.max(1, Math.round(ms / 86400000));
}

type Status = "idle" | "submitting" | "success" | "error";

const BookingRequestForm = ({
  selectedCar,
  onCarChange,
}: {
  selectedCar: string;
  onCarChange: (car: string) => void;
}) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", pickup: "", ret: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const today = new Date().toISOString().slice(0, 10);

  const set = (k: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Please enter a valid email address.";
    if (!form.phone.trim()) e.phone = "Please enter a phone number so we can confirm your booking.";
    if (!selectedCar) e.car = "Please choose a car.";
    if (!form.pickup) e.pickup = "Please choose a pick-up date.";
    if (!form.ret) e.ret = "Please choose a return date.";
    else if (form.pickup && form.ret < form.pickup) e.ret = "Return date can't be before pick-up.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!validate()) return;
    setStatus("submitting");

    const car = FLEET.find((c) => c.name === selectedCar);
    const days = rentalDays(form.pickup, form.ret);
    const lines = [
      "Rental booking request",
      `Car: ${selectedCar}${car ? ` — ${formatJmd(car.pricePerDay)}/day` : ""}`,
      `Pick-up: ${form.pickup}`,
      `Return: ${form.ret} (${days} day${days === 1 ? "" : "s"}${car ? `, est. ${formatJmd(days * car.pricePerDay)}` : ""})`,
      form.message.trim() ? `Notes: ${form.message.trim()}` : "",
    ].filter(Boolean);

    try {
      await sendContactMessage({
        fullName: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        service: "Car Rentals",
        message: lines.join("\n"),
        source: "rentals:booking",
        website: form.website,
      });
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-5 sm:p-7">
          <div className="flex flex-col items-center justify-center text-center py-10" role="status" aria-live="polite">
            <CheckCircle2 className="h-14 w-14 text-green-500 mb-4" />
            <h3 className="text-2xl font-montserrat font-bold text-rogue-charcoal mb-2">Request sent!</h3>
            <p className="text-rogue-slate max-w-sm">
              We've got your booking request and will confirm availability by phone or email shortly. Check your
              inbox for a confirmation.
            </p>
            <Button
              variant="outline"
              className="mt-6 rounded-full border-slate-300"
              onClick={() => {
                setForm({ name: "", email: "", phone: "", pickup: "", ret: "", message: "", website: "" });
                onCarChange("");
                setStatus("idle");
              }}
            >
              Send another request
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-5 sm:p-7">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {status === "error" && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4" role="alert" aria-live="assertive">
              <AlertCircle className="h-5 w-5 text-rogue-red flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-sm text-red-800">
                <p>{errorMsg}</p>
                <a
                  href={whatsappUrl("Hi Rogue Automotive — I tried the rental booking form.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-2 font-semibold text-rogue-red hover:underline"
                >
                  <MessageCircle className="h-4 w-4 mr-1.5" /> Message us on WhatsApp instead
                </a>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" required error={errors.name} htmlFor="r-name">
              <Input
                id="r-name"
                value={form.name}
                onChange={(e) => set("name")(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                className="border-slate-300 focus-visible:ring-rogue-red"
              />
            </Field>
            <Field label="Email" required error={errors.email} htmlFor="r-email">
              <Input
                id="r-email"
                type="email"
                inputMode="email"
                value={form.email}
                onChange={(e) => set("email")(e.target.value)}
                placeholder="you@email.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                className="border-slate-300 focus-visible:ring-rogue-red"
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Phone" required error={errors.phone} htmlFor="r-phone">
              <Input
                id="r-phone"
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => set("phone")(e.target.value)}
                placeholder="(876) 000-0000"
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                className="border-slate-300 focus-visible:ring-rogue-red"
              />
            </Field>
            <Field label="Car" required error={errors.car} htmlFor="r-car">
              <Select value={selectedCar} onValueChange={onCarChange}>
                <SelectTrigger id="r-car" className="border-slate-300 focus:ring-rogue-red" aria-invalid={!!errors.car}>
                  <SelectValue placeholder="Choose a car" />
                </SelectTrigger>
                <SelectContent>
                  {FLEET.map((c) => (
                    <SelectItem key={c.name} value={c.name}>
                      {c.name} — {formatJmd(c.pricePerDay)}/day
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Pick-up date" required error={errors.pickup} htmlFor="r-pickup">
              <Input
                id="r-pickup"
                type="date"
                min={today}
                value={form.pickup}
                onChange={(e) => set("pickup")(e.target.value)}
                aria-invalid={!!errors.pickup}
                className="border-slate-300 focus-visible:ring-rogue-red"
              />
            </Field>
            <Field label="Return date" required error={errors.ret} htmlFor="r-return">
              <Input
                id="r-return"
                type="date"
                min={form.pickup || today}
                value={form.ret}
                onChange={(e) => set("ret")(e.target.value)}
                aria-invalid={!!errors.ret}
                className="border-slate-300 focus-visible:ring-rogue-red"
              />
            </Field>
          </div>

          <Field label="Anything else?" htmlFor="r-message">
            <Textarea
              id="r-message"
              value={form.message}
              onChange={(e) => set("message")(e.target.value)}
              placeholder="Airport pickup, driver requirements, questions…"
              className="min-h-[100px] border-slate-300 focus-visible:ring-rogue-red"
            />
          </Field>

          {/* Honeypot (hidden from users) */}
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="r-website">Leave this empty</label>
            <input
              id="r-website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => set("website")(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold py-6 rounded-full disabled:opacity-70"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending…
              </>
            ) : (
              "Send booking request"
            )}
          </Button>
          <p className="text-xs text-rogue-slate text-center">
            This is a request, not an instant booking — we'll confirm availability with you before anything is charged.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

const CarRentals = () => {
  const [selectedCar, setSelectedCar] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();

  // A PDP's "Request this car" arrives as /car-rentals?car=<slug>#booking-request —
  // pre-select that car in the form (the hash scrolls the section natively).
  useEffect(() => {
    const slug = searchParams.get("car");
    if (slug) {
      const car = FLEET.find((c) => c.slug === slug);
      if (car) {
        setSelectedCar(car.name);
        // react-router doesn't scroll to the hash on SPA navigations — do it
        // after layout so the visitor lands on the form with the car selected.
        setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestCar = (name: string) => {
    setSelectedCar(name);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Helmet>
        <title>Car Rentals — Rogue Automotive Jamaica | Daily Rates</title>
        <meta
          name="description"
          content="Rent a Honda Odyssey, Fit Shuttle, Accord, Nissan Teana or BMW 328i GT in Kingston, Jamaica from J$9,000 per day. Insurance included — send a booking request online with Rogue Automotive."
        />
        <link rel="canonical" href="https://www.rogueautomotiveja.com/car-rentals" />
      </Helmet>

      <div className="min-h-screen bg-white font-roboto">
        <SubPageNav />

        {/* Hero */}
        <section className="relative bg-gradient-to-br from-rogue-dark via-rogue-charcoal to-rogue-slate text-white">
          <div className="absolute inset-0 bg-rogue-dark/20" />
          <div className="relative container mx-auto px-4 sm:px-6 py-20 sm:py-28 max-w-3xl">
            <span className="inline-flex items-center text-[11px] font-montserrat font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-rogue-red text-white mb-6">
              <Key className="h-3.5 w-3.5 mr-1.5" />
              Now renting
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-bold mb-5 leading-[1.05]">
              Car Rentals
            </h1>
            <p className="text-lg sm:text-xl text-white/85 mb-8 leading-relaxed max-w-xl">
              Daily rentals with insurance included — pick your car, send a booking request, and we'll
              confirm availability the same day.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                onClick={() => requestCar(selectedCar)}
                className="w-full sm:w-auto bg-rogue-red hover:bg-rogue-red-dark text-white border-0 px-7 py-6 text-base font-montserrat font-semibold rounded-full"
              >
                Request a booking
              </Button>
              <a href={whatsappUrl("Hi Rogue Automotive — I'd like to ask about car rentals.")} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border-white/30 px-7 py-6 text-base font-montserrat font-semibold rounded-full">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Ask on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Fleet */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3">
                The fleet
              </p>
              <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-rogue-charcoal">
                Pick your ride
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
              {FLEET.map((car) => (
                <div
                  key={car.slug}
                  className="relative flex flex-col rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <Link to={`/car-rentals/${car.slug}`} aria-label={`View ${car.name} details`}>
                    <CarPhoto src={car.images[0] ?? ""} alt={`${car.name} — available for rental`} />
                  </Link>
                  <span className="self-start text-[11px] font-montserrat font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-rogue-light text-rogue-charcoal mb-3">
                    {car.type}
                  </span>
                  <h3 className="text-xl font-montserrat font-bold text-rogue-charcoal mb-1">{car.name}</h3>
                  <p className="text-2xl font-montserrat font-bold text-rogue-red mb-2">
                    {formatJmd(car.pricePerDay)}
                    <span className="text-sm font-semibold text-rogue-slate"> / day</span>
                  </p>
                  <p className="text-sm text-rogue-slate mb-4 leading-relaxed">{car.blurb}</p>
                  <ul className="space-y-1.5 mb-6">
                    {car.points.map((pt) => (
                      <li key={pt} className="flex items-center text-sm text-rogue-slate">
                        <Check className="h-4 w-4 text-rogue-red mr-2 flex-shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto space-y-2">
                    <Link to={`/car-rentals/${car.slug}`} className="block">
                      <Button
                        variant="outline"
                        className="w-full rounded-full font-montserrat font-semibold border-slate-300"
                      >
                        View details & photos
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => requestCar(car.name)}
                      className="w-full rounded-full font-montserrat font-semibold bg-rogue-charcoal hover:bg-rogue-dark text-white"
                    >
                      Request this car
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-rogue-slate mt-8">
              All rentals include insurance. Weekly and long-term rates available — ask us on WhatsApp.
            </p>
          </div>
        </section>

        {/* Booking request */}
        <section className="py-16 sm:py-20 bg-rogue-light scroll-mt-20" ref={formRef} id="booking-request">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3">
                  Book your rental
                </p>
                <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-rogue-charcoal mb-4">
                  Send a booking request
                </h2>
                <p className="text-base sm:text-lg text-rogue-slate">
                  Tell us the car and dates — we'll confirm availability and get you on the road.
                </p>
              </div>

              <BookingRequestForm selectedCar={selectedCar} onCarChange={setSelectedCar} />

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-8 text-sm text-rogue-slate">
                <a href={CONTACT.phoneHref} className="flex items-center gap-2 hover:text-rogue-red transition-colors">
                  <Phone className="h-4 w-4 text-rogue-red" /> {CONTACT.phone}
                </a>
                <a
                  href={whatsappUrl("Hi Rogue Automotive — I'd like to book a rental car.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-rogue-red transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-rogue-red" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

/** Labeled field wrapper with required marker + inline error. */
function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-rogue-charcoal mb-1.5">
        {label}
        {required && <span className="text-rogue-red ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-rogue-red mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default CarRentals;
