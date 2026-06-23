import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2, AlertCircle, MessageCircle } from "lucide-react";
import { sendContactMessage } from "@/lib/contact";
import { whatsappUrl } from "@/lib/links";
import type { BusinessLine } from "@/lib/businessLines";

type Status = "idle" | "submitting" | "success" | "error";

/** Lead-capture form for a not-yet-live business line. Posts to /api/contact
 *  tagged with the line so the business can build a waitlist. */
const WaitlistForm = ({ line }: { line: BusinessLine }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "", website: "" });
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
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email.";
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
        service: line.name,
        source: `waitlist:${line.key}`,
        message: form.note.trim() || `Please add me to the ${line.name} waitlist.`,
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
      <div className="rounded-2xl bg-white/10 border border-white/15 p-6 text-center" role="status" aria-live="polite">
        <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-3" />
        <h3 className="text-xl font-montserrat font-bold text-white mb-1">You're on the list!</h3>
        <p className="text-white/80 text-sm">
          We'll email you the moment {line.name} goes live. Thanks for your interest.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl bg-white/10 border border-white/15 p-5 sm:p-6">
      <h3 className="text-lg font-montserrat font-bold text-white mb-1">Join the waitlist</h3>
      <p className="text-white/70 text-sm mb-4">Be first to know when {line.name} launches.</p>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-lg bg-red-500/15 border border-red-400/30 p-3 mb-4 text-sm text-red-100" role="alert" aria-live="assertive">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <div>
            <p>{errorMsg}</p>
            <a
              href={whatsappUrl(`Hi Rogue Automotive — please add me to the ${line.name} waitlist.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-1.5 font-semibold text-white hover:underline"
            >
              <MessageCircle className="h-4 w-4 mr-1.5" /> Use WhatsApp instead
            </a>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <Input
            aria-label="Your name"
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            className="bg-white/95 border-0 text-rogue-charcoal placeholder:text-slate-400"
          />
          {errors.name && <p className="text-red-200 text-xs mt-1" role="alert">{errors.name}</p>}
        </div>
        <div>
          <Input
            type="email"
            inputMode="email"
            aria-label="Email"
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="you@email.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className="bg-white/95 border-0 text-rogue-charcoal placeholder:text-slate-400"
          />
          {errors.email && <p className="text-red-200 text-xs mt-1" role="alert">{errors.email}</p>}
        </div>
        <Input
          type="tel"
          inputMode="tel"
          aria-label="Phone (optional)"
          value={form.phone}
          onChange={(e) => set("phone")(e.target.value)}
          placeholder="Phone (optional)"
          autoComplete="tel"
          className="bg-white/95 border-0 text-rogue-charcoal placeholder:text-slate-400"
        />

        {/* Honeypot */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website")(e.target.value)} />
        </div>

        <Button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold rounded-full py-5 disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Joining…
            </>
          ) : (
            "Notify me at launch"
          )}
        </Button>
      </div>
    </form>
  );
};

export default WaitlistForm;
