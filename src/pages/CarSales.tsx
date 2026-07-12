import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Check, Car, MessageCircle, Phone, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SubPageNav from "@/components/SubPageNav";
import Footer from "@/components/Footer";
import { sendContactMessage } from "@/lib/contact";
import { whatsappUrl, CONTACT } from "@/lib/links";

interface SaleVehicle {
  name: string;
  type: string;
  /** Formatted asking price, or undefined for price on request. */
  price?: string;
  blurb: string;
  points: string[];
}

const INVENTORY: SaleVehicle[] = [
  {
    name: "2016 Land Rover Discovery Sport",
    type: "SUV",
    price: "J$2,600,000",
    blurb: "A premium compact SUV that's as comfortable in town as it is capable off the beaten path.",
    points: ["2.0L turbocharged engine", "Automatic • 4WD", "Fully inspected by our team", "Test drives welcome"],
  },
];

type Status = "idle" | "submitting" | "success" | "error";

const EnquiryForm = ({
  selectedCar,
  onCarChange,
}: {
  selectedCar: string;
  onCarChange: (car: string) => void;
}) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (k: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Please enter a valid email address.";
    if (!form.phone.trim()) e.phone = "Please enter a phone number so we can get back to you.";
    if (!selectedCar) e.car = "Please choose a vehicle.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!validate()) return;
    setStatus("submitting");

    const lines = [
      "Vehicle sales enquiry",
      `Vehicle: ${selectedCar}`,
      form.message.trim() ? `Notes: ${form.message.trim()}` : "",
    ].filter(Boolean);

    try {
      await sendContactMessage({
        fullName: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        service: "Car Sales",
        message: lines.join("\n"),
        source: "sales:enquiry",
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
            <h3 className="text-2xl font-montserrat font-bold text-rogue-charcoal mb-2">Enquiry sent!</h3>
            <p className="text-rogue-slate max-w-sm">
              We've got your enquiry and will get back to you shortly to talk price, viewing and a test
              drive. Check your inbox for a confirmation.
            </p>
            <Button
              variant="outline"
              className="mt-6 rounded-full border-slate-300"
              onClick={() => {
                setForm({ name: "", email: "", phone: "", message: "", website: "" });
                onCarChange("");
                setStatus("idle");
              }}
            >
              Send another enquiry
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
                  href={whatsappUrl("Hi Rogue Automotive — I tried the car sales enquiry form.")}
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
            <Field label="Name" required error={errors.name} htmlFor="s-name">
              <Input
                id="s-name"
                value={form.name}
                onChange={(e) => set("name")(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                className="border-slate-300 focus-visible:ring-rogue-red"
              />
            </Field>
            <Field label="Email" required error={errors.email} htmlFor="s-email">
              <Input
                id="s-email"
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
            <Field label="Phone" required error={errors.phone} htmlFor="s-phone">
              <Input
                id="s-phone"
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
            <Field label="Vehicle" required error={errors.car} htmlFor="s-car">
              <Select value={selectedCar} onValueChange={onCarChange}>
                <SelectTrigger id="s-car" className="border-slate-300 focus:ring-rogue-red" aria-invalid={!!errors.car}>
                  <SelectValue placeholder="Choose a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {INVENTORY.map((c) => (
                    <SelectItem key={c.name} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field label="Anything else?" htmlFor="s-message">
            <Textarea
              id="s-message"
              value={form.message}
              onChange={(e) => set("message")(e.target.value)}
              placeholder="Questions, trade-in details, preferred viewing time…"
              className="min-h-[100px] border-slate-300 focus-visible:ring-rogue-red"
            />
          </Field>

          {/* Honeypot (hidden from users) */}
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="s-website">Leave this empty</label>
            <input
              id="s-website"
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
              "Send enquiry"
            )}
          </Button>
          <p className="text-xs text-rogue-slate text-center">
            No obligation — we'll get back to you to arrange a viewing or test drive.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

const CarSales = () => {
  const [selectedCar, setSelectedCar] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const enquireAbout = (name: string) => {
    setSelectedCar(name);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Helmet>
        <title>Car Sales — Rogue Automotive Jamaica | Quality Used Vehicles</title>
        <meta
          name="description"
          content="Quality, inspected vehicles at fair prices from Rogue Automotive in Kingston, Jamaica. 2016 Land Rover Discovery Sport in stock — enquire online today."
        />
        <link rel="canonical" href="https://www.rogueautomotiveja.com/car-sales" />
      </Helmet>

      <div className="min-h-screen bg-white font-roboto">
        <SubPageNav />

        {/* Hero */}
        <section className="relative bg-gradient-to-br from-rogue-dark via-rogue-charcoal to-rogue-slate text-white">
          <div className="absolute inset-0 bg-rogue-dark/20" />
          <div className="relative container mx-auto px-4 sm:px-6 py-20 sm:py-28 max-w-3xl">
            <span className="inline-flex items-center text-[11px] font-montserrat font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-rogue-red text-white mb-6">
              <Car className="h-3.5 w-3.5 mr-1.5" />
              In stock now
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-bold mb-5 leading-[1.05]">
              Car Sales
            </h1>
            <p className="text-lg sm:text-xl text-white/85 mb-8 leading-relaxed max-w-xl">
              Hand-picked, inspected vehicles ready for Jamaican roads — honest pricing, trade-ins
              welcome, and test drives on request.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                onClick={() => enquireAbout(selectedCar)}
                className="w-full sm:w-auto bg-rogue-red hover:bg-rogue-red-dark text-white border-0 px-7 py-6 text-base font-montserrat font-semibold rounded-full"
              >
                Enquire now
              </Button>
              <a href={whatsappUrl("Hi Rogue Automotive — I'd like to ask about a vehicle for sale.")} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border-white/30 px-7 py-6 text-base font-montserrat font-semibold rounded-full">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Ask on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Inventory */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3">
                In stock
              </p>
              <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-rogue-charcoal">
                Available now
              </h2>
            </div>

            <div className="grid gap-5 sm:gap-6 max-w-md mx-auto">
              {INVENTORY.map((car) => (
                <div
                  key={car.name}
                  className="relative flex flex-col rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="self-start text-[11px] font-montserrat font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-rogue-light text-rogue-charcoal mb-3">
                    {car.type}
                  </span>
                  <h3 className="text-xl font-montserrat font-bold text-rogue-charcoal mb-1">{car.name}</h3>
                  <p className="text-2xl font-montserrat font-bold text-rogue-red mb-2">
                    {car.price ?? "Price on request"}
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
                  <Button
                    onClick={() => enquireAbout(car.name)}
                    className="mt-auto w-full rounded-full font-montserrat font-semibold bg-rogue-charcoal hover:bg-rogue-dark text-white"
                  >
                    Enquire about this car
                  </Button>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-rogue-slate mt-8">
              Looking for something specific? Tell us what you're after — new stock arrives regularly.
            </p>
          </div>
        </section>

        {/* Enquiry */}
        <section className="py-16 sm:py-20 bg-rogue-light scroll-mt-20" ref={formRef} id="enquiry">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3">
                  Interested?
                </p>
                <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-rogue-charcoal mb-4">
                  Send an enquiry
                </h2>
                <p className="text-base sm:text-lg text-rogue-slate">
                  Tell us which vehicle caught your eye — we'll get back to you to set up a viewing or
                  test drive.
                </p>
              </div>

              <EnquiryForm selectedCar={selectedCar} onCarChange={setSelectedCar} />

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-8 text-sm text-rogue-slate">
                <a href={CONTACT.phoneHref} className="flex items-center gap-2 hover:text-rogue-red transition-colors">
                  <Phone className="h-4 w-4 text-rogue-red" /> {CONTACT.phone}
                </a>
                <a
                  href={whatsappUrl("Hi Rogue Automotive — I'm interested in a vehicle you have for sale.")}
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

export default CarSales;
