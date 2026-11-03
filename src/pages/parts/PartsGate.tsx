/**
 * /parts — the gate. Rely R8 owners enter name, plate and WhatsApp to see the
 * container catalogue; a returning browser (session in localStorage) goes
 * straight to the list.
 */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PartsShell, useCatalog, ErrorNote } from "@/components/parts/PartsShell";
import {
  closesLabel,
  joinParts,
  loadSession,
  normalizeJmPhone,
  normalizeJmPlate,
  PHONE_HINT,
  PLATE_HINT,
  storeCart,
  storeSession,
  cartFromPledge,
  loadCart,
  PartsApiError,
} from "@/lib/partsApi";

export default function PartsGate() {
  const navigate = useNavigate();
  const { data: catalog } = useCatalog();
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; plate?: string; phone?: string }>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (loadSession()) navigate("/parts/list", { replace: true });
  }, [navigate]);

  const c = catalog?.container;
  const stats: [string, string][] = c
    ? [
        [String(catalog!.totals.owners), "owners in"],
        [String(catalog!.totals.units), "units pledged"],
        [catalog!.totals.cbm.toFixed(2), "m³ booked"],
        c.acceptingPledges ? [String(c.daysLeft), `days left · closes ${closesLabel(c)}`] : ["—", c.statusName],
      ]
    : [];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 3) next.name = "Enter the name the vehicle is registered to.";
    if (!normalizeJmPlate(plate)) next.plate = PLATE_HINT;
    if (!normalizeJmPhone(phone)) next.phone = PHONE_HINT;
    setErrors(next);
    setServerError("");
    if (Object.keys(next).length) {
      document.getElementById(`gate-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const session = await joinParts({ name: name.trim(), plate, phone });
      storeSession(session);
      // A returning owner picks up their pledge where they left it (unless they have a newer draft).
      if (session.pledge?.length && Object.keys(loadCart()).length === 0) storeCart(cartFromPledge(session.pledge));
      navigate("/parts/list");
    } catch (err) {
      setServerError(err instanceof PartsApiError ? err.message : "Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PartsShell>
      <Helmet>
        <title>Rogue Parts — Rely R8 parts, one container | Rogue Automotive</title>
        <meta
          name="description"
          content="Bars, covers, liners, mats and trim for the Rely R8 / Chery Himla. Owners pool their orders into one container from the factory, so the parts land together."
        />
      </Helmet>

      <div className="grid lg:grid-cols-[1.15fr_1fr] min-h-[calc(100dvh-64px)]">
        <section className="relative bg-rogue-dark text-white overflow-hidden">
          <img
            src="/parts-media/hero.webp"
            alt="Rely R8 pickup fitted with a gantry roll bar and cargo rack"
            className="absolute inset-0 h-full w-full object-cover opacity-40 hidden sm:block"
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rogue-dark via-rogue-dark/70 to-rogue-dark/30" />
          <div className="relative container mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-20 h-full flex flex-col justify-end gap-10">
            <div className="max-w-xl">
              <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-rogue-red mb-4">
                {c ? `${c.name} · factory → Kingston` : "Rogue Parts"}
              </p>
              <h1 className="font-montserrat font-bold text-4xl sm:text-5xl leading-[1.05] mb-5">
                Everything your Rely R8 is missing.
              </h1>
              <p className="text-rogue-silver text-base sm:text-lg leading-relaxed">
                Bars, covers, liners, mats and trim for the Rely R8 and Chery Himla — the pieces nobody stocks here.
                Owners pool their orders into one container from the factory, so the parts land together and the
                freight is shared.
              </p>
            </div>
            {stats.length > 0 && (
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/15 pt-6">
                {stats.map(([v, l], i) => (
                  <div key={l}>
                    <dt className="sr-only">{l}</dt>
                    <dd className={`font-montserrat font-bold text-2xl sm:text-3xl tabular-nums ${i === 3 ? "text-rogue-red" : ""}`}>{v}</dd>
                    <dd className="text-xs text-rogue-silver mt-1">{l}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        <section className="bg-white flex items-center">
          <div className="w-full max-w-md mx-auto px-4 sm:px-8 py-12">
            <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-rogue-red">
              Step 1 of 2 · Verify your vehicle
            </p>
            <h2 className="font-montserrat font-bold text-2xl sm:text-3xl text-rogue-charcoal mt-3 mb-3">
              Join the container
            </h2>
            <p className="text-sm text-rogue-slate leading-relaxed mb-7">
              We keep the pool to real Rely R8 owners so the demand numbers stay honest. Every price shows the part and
              its share of the freight, so nothing is a surprise. Just looking?{" "}
              <Link to="/parts/list" className="font-semibold text-rogue-red hover:underline">Browse the parts</Link>.
            </p>

            <form onSubmit={submit} noValidate className="space-y-5">
              <Field id="gate-name" label="Name on the registration" error={errors.name}>
                <Input id="gate-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="h-12 text-base" />
              </Field>
              <Field id="gate-plate" label="Licence plate" error={errors.plate} hint="e.g. 1234 AB or CL 1234">
                <Input
                  id="gate-plate"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value.toUpperCase())}
                  onBlur={() => {
                    const n = normalizeJmPlate(plate);
                    if (n) setPlate(n);
                  }}
                  autoCapitalize="characters"
                  className="h-12 text-base uppercase"
                />
              </Field>
              <Field id="gate-phone" label="WhatsApp number" error={errors.phone} hint="We'll message you about your order here.">
                <Input
                  id="gate-phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  placeholder="876-555-0123"
                  className="h-12 text-base"
                />
              </Field>

              {serverError && <ErrorNote>{serverError}</ErrorNote>}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold py-6 rounded-full text-base"
              >
                {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <>See the parts <ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>
              <p className="flex items-start gap-2 text-xs text-rogue-slate">
                <ShieldCheck className="h-4 w-4 shrink-0 text-rogue-red" />
                Your plate and number are only seen by the Rogue team — never on the public demand sheet.{" "}
                <Link to="/privacy" className="underline hover:text-rogue-red">Privacy</Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </PartsShell>
  );
}

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label htmlFor={id} className="font-montserrat font-semibold text-rogue-charcoal">{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p className="text-sm text-red-700 mt-1.5" role="alert">{error}</p>
      ) : hint ? (
        <p className="text-xs text-rogue-slate mt-1.5">{hint}</p>
      ) : null}
    </div>
  );
}
