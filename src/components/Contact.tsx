import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, MessageCircle, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { sendContactMessage } from "@/lib/contact";
import { CONTACT, whatsappUrl } from "@/lib/links";

type Status = "idle" | "submitting" | "success" | "error";

const SERVICES = ["Wash & Detailing", "Car Sales", "Car Rentals", "Other"];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const { elementRef: headerRef, isVisible: isHeaderVisible } = useScrollAnimation();

  const set = (k: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Please enter a valid email address.";
    if (!form.message.trim()) e.message = "Please enter a message.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!validate()) return;
    setStatus("submitting");
    try {
      await sendContactMessage({
        fullName: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        service: form.service || undefined,
        message: form.message.trim(),
        source: "contact",
        website: form.website,
      });
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 bg-rogue-light scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16" ref={headerRef}>
            <p
              className={`text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3 transition-all duration-500 ${
                isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Get in touch
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-rogue-charcoal mb-4">
              Let's talk about your car
            </h2>
            <p className="text-base sm:text-lg text-rogue-slate">
              Questions, quotes, or just want to say hi? Send a message — we usually reply within a day.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg h-full">
                <CardContent className="p-5 sm:p-7">
                  {status === "success" ? (
                    <div className="flex flex-col items-center justify-center text-center py-10" role="status" aria-live="polite">
                      <CheckCircle2 className="h-14 w-14 text-green-500 mb-4" />
                      <h3 className="text-2xl font-montserrat font-bold text-rogue-charcoal mb-2">Message sent!</h3>
                      <p className="text-rogue-slate max-w-sm">
                        Thanks for reaching out — we've got your message and will be in touch shortly. Check your
                        inbox for a confirmation.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-6 rounded-full border-slate-300"
                        onClick={() => {
                          setForm({ name: "", email: "", phone: "", service: "", message: "", website: "" });
                          setStatus("idle");
                        }}
                      >
                        Send another message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      {status === "error" && (
                        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4" role="alert" aria-live="assertive">
                          <AlertCircle className="h-5 w-5 text-rogue-red flex-shrink-0 mt-0.5" />
                          <div className="flex-1 text-sm text-red-800">
                            <p>{errorMsg}</p>
                            <a
                              href={whatsappUrl("Hi Rogue Automotive — I tried the website contact form.")}
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
                        <Field label="Name" required error={errors.name} htmlFor="c-name">
                          <Input
                            id="c-name"
                            value={form.name}
                            onChange={(e) => set("name")(e.target.value)}
                            placeholder="Your name"
                            autoComplete="name"
                            aria-invalid={!!errors.name}
                            className="border-slate-300 focus-visible:ring-rogue-red"
                          />
                        </Field>
                        <Field label="Email" required error={errors.email} htmlFor="c-email">
                          <Input
                            id="c-email"
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
                        <Field label="Phone" htmlFor="c-phone">
                          <Input
                            id="c-phone"
                            type="tel"
                            inputMode="tel"
                            value={form.phone}
                            onChange={(e) => set("phone")(e.target.value)}
                            placeholder="(876) 000-0000"
                            autoComplete="tel"
                            className="border-slate-300 focus-visible:ring-rogue-red"
                          />
                        </Field>
                        <Field label="I'm interested in" htmlFor="c-service">
                          <Select value={form.service} onValueChange={set("service")}>
                            <SelectTrigger id="c-service" className="border-slate-300 focus:ring-rogue-red">
                              <SelectValue placeholder="Choose a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {SERVICES.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>

                      <Field label="Message" required error={errors.message} htmlFor="c-message">
                        <Textarea
                          id="c-message"
                          value={form.message}
                          onChange={(e) => set("message")(e.target.value)}
                          placeholder="How can we help?"
                          aria-invalid={!!errors.message}
                          className="min-h-[130px] border-slate-300 focus-visible:ring-rogue-red"
                        />
                      </Field>

                      {/* Honeypot (hidden from users) */}
                      <div className="absolute left-[-9999px]" aria-hidden="true">
                        <label htmlFor="c-website">Leave this empty</label>
                        <input
                          id="c-website"
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
                          "Send message"
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Info */}
            <div className="space-y-5">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-5 sm:p-6 space-y-4">
                  <h3 className="text-lg font-montserrat font-bold text-rogue-charcoal">Visit or call us</h3>
                  <a href={CONTACT.phoneHref} className="flex items-center gap-3 text-rogue-slate hover:text-rogue-red transition-colors">
                    <Phone className="h-5 w-5 text-rogue-red flex-shrink-0" />
                    {CONTACT.phone}
                  </a>
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-rogue-slate hover:text-rogue-red transition-colors">
                    <MessageCircle className="h-5 w-5 text-rogue-red flex-shrink-0" />
                    Chat on WhatsApp
                  </a>
                  <a href={CONTACT.emailHref} className="flex items-center gap-3 text-rogue-slate hover:text-rogue-red transition-colors break-all">
                    <Mail className="h-5 w-5 text-rogue-red flex-shrink-0" />
                    {CONTACT.email}
                  </a>
                  <div className="flex items-start gap-3 text-rogue-slate">
                    <MapPin className="h-5 w-5 text-rogue-red flex-shrink-0 mt-0.5" />
                    {CONTACT.address}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-5 sm:p-6">
                  <h3 className="text-lg font-montserrat font-bold text-rogue-charcoal mb-3">Business hours</h3>
                  <ul className="space-y-1.5 text-sm text-rogue-slate">
                    <li className="flex justify-between"><span>Mon – Fri</span><span>8:00 AM – 7:00 PM</span></li>
                    <li className="flex justify-between"><span>Saturday</span><span>9:00 AM – 6:00 PM</span></li>
                    <li className="flex justify-between"><span>Sunday</span><span>10:00 AM – 4:00 PM</span></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map */}
          <div className="mt-8">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="w-full h-[300px] sm:h-[380px]">
                <iframe
                  title="Rogue Automotive location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.1799095152896!2d-76.80362222509278!3d18.016852384367457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8edb3f21c2c78e9d%3A0x8a7686bf5f0b8bc!2sRogue%20Automotive%20Ltd!5e0!3m2!1sen!2sjm!4v1749444466821!5m2!1sen!2sjm"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
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

export default Contact;
