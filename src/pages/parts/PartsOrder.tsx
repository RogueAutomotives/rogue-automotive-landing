/**
 * /parts/order — the owner's order. The draft cart lives on this device; pledging
 * sends it to the API, which cuts (or re-cuts) the invoice. Once the parts invoice
 * is paid the pledge is locked.
 */
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, CheckCircle2, FileText, Loader2, Lock, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PartsShell, useCatalog, usePartsState, PartImage, QtyStepper, Loading, ErrorNote } from "@/components/parts/PartsShell";
import ContainerBanner from "@/components/parts/ContainerBanner";
import {
  cartFromPledge,
  closesLabel,
  fmt,
  getPartsSession,
  PartsApiError,
  savePledge,
  storeCart,
  storeSession,
  withdrawPledge,
  type PartsSession,
} from "@/lib/partsApi";

export default function PartsOrder() {
  const queryClient = useQueryClient();
  const { data: catalog, isLoading, error } = useCatalog();
  const { session, cart, setQty, currency } = usePartsState();
  const [busy, setBusy] = useState<"" | "pledge" | "withdraw">("");
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  // Refresh the session so a pledge made on another device (or an invoice paid) shows here.
  useEffect(() => {
    if (!session) return;
    getPartsSession(session.accessKey)
      .then((s) => storeSession(s))
      .catch((err) => {
        if (err instanceof PartsApiError && err.status === 404) storeSession(null);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const money = (n: number, dp = 0) => fmt(n, currency, catalog?.fxRate ?? 0, dp);
  const lines = useMemo(
    () =>
      Object.entries(cart)
        .map(([slug, qty]) => ({ part: catalog?.parts.find((p) => p.slug === slug), slug, qty }))
        .filter((l) => l.qty > 0),
    [cart, catalog]
  );
  const known = lines.filter((l) => l.part);
  const missing = lines.filter((l) => catalog && !l.part);
  const totals = known.reduce(
    (a, { part, qty }) => {
      a.goods += part!.price * qty;
      a.cbm += part!.cbm * qty;
      a.freight += part!.freightEach * qty;
      a.units += qty;
      return a;
    },
    { goods: 0, cbm: 0, freight: 0, units: 0 }
  );

  const container = catalog?.container ?? null;
  const pledged = cartFromPledge(session?.pledge);
  const hasPledge = Object.keys(pledged).length > 0;
  const unchanged =
    hasPledge &&
    Object.keys(pledged).length === known.length &&
    known.every((l) => pledged[l.slug] === l.qty);
  const locked = !!session?.invoice?.partsPaid;
  const invoiceHref = session?.invoice ? `/parts/invoice/${session.invoice.number}?k=${session.invoice.token}` : null;

  const done = (s: PartsSession, text: string) => {
    storeSession(s);
    storeCart(cartFromPledge(s.pledge));
    setMessage({ kind: "ok", text });
    queryClient.invalidateQueries({ queryKey: ["parts-catalog"] });
  };

  const pledge = async () => {
    if (!session) return;
    setBusy("pledge");
    setMessage(null);
    try {
      const s = await savePledge(session.accessKey, known.map((l) => ({ slug: l.slug, qty: l.qty })));
      done(s, hasPledge ? "Pledge updated — your invoice has been re-issued." : `Pledge recorded — you're in ${container?.name}.`);
    } catch (err) {
      setMessage({ kind: "error", text: err instanceof Error ? err.message : "Could not save your pledge." });
    } finally {
      setBusy("");
    }
  };

  const withdraw = async () => {
    if (!session || !window.confirm("Withdraw your pledge? Your place in the container and your invoice are removed.")) return;
    setBusy("withdraw");
    setMessage(null);
    try {
      const s = await withdrawPledge(session.accessKey);
      storeSession(s);
      setMessage({ kind: "ok", text: "Pledge withdrawn. Your list is still saved on this device." });
      queryClient.invalidateQueries({ queryKey: ["parts-catalog"] });
    } catch (err) {
      setMessage({ kind: "error", text: err instanceof Error ? err.message : "Could not withdraw your pledge." });
    } finally {
      setBusy("");
    }
  };

  return (
    <PartsShell>
      <Helmet>
        <title>My order — Rogue Parts</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 max-w-5xl">
        <h1 className="font-montserrat font-bold text-3xl sm:text-4xl text-rogue-charcoal">Your order</h1>
        <p className="text-rogue-slate mt-2 mb-6">
          {container?.acceptingPledges
            ? "Review your quantities, then pledge to lock your place in the container."
            : "Build your order now — it's kept on this device until pledges open."}
        </p>

        {isLoading && <Loading />}
        {error && <ErrorNote>{(error as Error).message}</ErrorNote>}

        {catalog && (
          <>
            <ContainerBanner catalog={catalog} />

            {locked && (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 mt-4 text-sm text-emerald-900">
                <Lock className="h-4 w-4 mt-0.5 shrink-0" />
                Your parts invoice is paid, so this pledge is locked. Message us on WhatsApp if you need to change it.
              </div>
            )}

            {lines.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white py-16 text-center mt-6">
                <p className="text-rogue-slate mb-4">Nothing in your order yet.</p>
                <Link to="/parts/list" className="inline-flex items-center rounded-full bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold px-6 py-3">
                  Browse the parts <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="grid lg:grid-cols-[1fr_340px] gap-6 mt-6 items-start">
                <div className="rounded-2xl bg-white border border-slate-200 divide-y divide-slate-100">
                  {known.map(({ part, qty, slug }) => (
                    <div key={slug} className="flex flex-wrap items-center gap-4 p-4">
                      <PartImage src={part!.images[0]} alt="" className="h-16 w-16 rounded-lg shrink-0" />
                      <div className="flex-1 min-w-[160px]">
                        <Link to={`/parts/${slug}`} className="font-montserrat font-semibold text-rogue-charcoal hover:text-rogue-red">{part!.name}</Link>
                        <p className="text-xs text-rogue-slate tabular-nums mt-0.5">
                          {money(part!.price, 2)} + {money(part!.freightEach, 2)} freight · {(part!.cbm * qty).toFixed(3)} m³
                        </p>
                      </div>
                      <QtyStepper value={qty} onChange={(n) => !locked && setQty(slug, n)} label={part!.name} />
                      <span className="w-24 text-right font-montserrat font-bold text-rogue-charcoal tabular-nums">{money(part!.landedEach * qty, 2)}</span>
                      {!locked && (
                        <button type="button" onClick={() => setQty(slug, 0)} className="h-10 w-10 flex items-center justify-center text-rogue-slate hover:text-rogue-red" aria-label={`Remove ${part!.name}`}>
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {missing.map((l) => (
                    <div key={l.slug} className="flex items-center justify-between gap-3 p-4 text-sm text-rogue-slate">
                      <span>A part in your list ({l.slug}) is no longer offered.</span>
                      <button type="button" onClick={() => setQty(l.slug, 0)} className="text-rogue-red font-semibold">Remove</button>
                    </div>
                  ))}
                </div>

                <aside className="rounded-2xl bg-white border border-slate-200 p-5 lg:sticky lg:top-24">
                  <dl className="space-y-2.5 text-sm">
                    <Row k={`Parts (${totals.units})`} v={money(totals.goods, 2)} />
                    <Row k="Packed volume" v={`${totals.cbm.toFixed(3)} m³`} />
                    <Row k={`Freight${container?.freightIsEstimate !== false ? " (estimate)" : ""}`} v={money(totals.freight, 2)} />
                  </dl>
                  <div className="flex items-baseline justify-between border-t border-slate-200 mt-4 pt-4">
                    <span className="text-xs uppercase tracking-wide text-rogue-slate font-semibold">Total landed</span>
                    <span className="font-montserrat font-bold text-2xl text-rogue-charcoal tabular-nums">{money(totals.goods + totals.freight, 2)}</span>
                  </div>
                  <p className="text-xs text-rogue-slate mt-2">
                    You pay for the parts now; the freight is settled when the container lands and is measured.
                  </p>

                  {!session ? (
                    <Link to="/parts" className="block mt-5">
                      <Button className="w-full bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold py-6 rounded-full">
                        Verify your vehicle to pledge
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={pledge}
                      disabled={!container?.acceptingPledges || locked || busy !== "" || known.length === 0 || unchanged}
                      className="w-full mt-5 bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold py-6 rounded-full disabled:opacity-50"
                    >
                      {busy === "pledge" ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : !container?.acceptingPledges ? (
                        "Pledges aren't open yet"
                      ) : unchanged ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" /> Pledged
                        </>
                      ) : hasPledge ? (
                        "Update my pledge"
                      ) : (
                        "Pledge my order"
                      )}
                    </Button>
                  )}

                  {invoiceHref && (
                    <Link to={invoiceHref} className="mt-3 flex items-center justify-center gap-2 rounded-full border border-slate-300 py-3 font-montserrat font-semibold text-sm text-rogue-charcoal hover:border-rogue-red hover:text-rogue-red">
                      <FileText className="h-4 w-4" /> My invoice {session!.invoice!.number}
                    </Link>
                  )}

                  {message && (
                    <p className={`text-sm mt-4 ${message.kind === "ok" ? "text-emerald-700" : "text-red-700"}`} role={message.kind === "error" ? "alert" : "status"}>
                      {message.text}
                    </p>
                  )}

                  {session && hasPledge && !locked && container?.acceptingPledges && (
                    <button
                      type="button"
                      onClick={withdraw}
                      disabled={busy !== ""}
                      className="mt-5 inline-flex items-center gap-1.5 text-xs text-rogue-slate hover:text-rogue-red"
                    >
                      {busy === "withdraw" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                      Withdraw my pledge
                    </button>
                  )}
                  {container?.acceptingPledges && (
                    <p className="text-xs text-rogue-slate mt-4">
                      {container.name} closes {closesLabel(container)}. You can change your pledge until then, or until your parts invoice is paid.
                    </p>
                  )}
                  {session && (
                    <p className="text-xs text-rogue-slate mt-4 border-t border-slate-100 pt-3">
                      Signed in as {session.name} · {session.plate}.{" "}
                      <button
                        type="button"
                        className="underline hover:text-rogue-red"
                        onClick={() => {
                          storeSession(null);
                          storeCart({});
                        }}
                      >
                        Not you?
                      </button>
                    </p>
                  )}
                </aside>
              </div>
            )}
          </>
        )}
      </div>
    </PartsShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-rogue-slate">{k}</dt>
      <dd className="text-rogue-charcoal font-semibold tabular-nums">{v}</dd>
    </div>
  );
}
