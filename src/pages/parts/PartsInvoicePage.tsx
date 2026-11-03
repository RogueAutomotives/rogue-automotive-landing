/**
 * /parts/invoice/:number?k=token — one number, two printable documents:
 * RP-xxxx-P the parts invoice (payable now) and RP-xxxx-F the freight estimate
 * (settled when the container lands). Card payment shows only when switched on.
 */
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle2, CreditCard, Loader2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PartsShell, Loading, ErrorNote } from "@/components/parts/PartsShell";
import PartsStripeForm from "@/components/parts/PartsStripeForm";
import {
  createPartsCardPayment,
  fmtCbm,
  fmtJmd,
  fmtUsd,
  getPartsInvoice,
  type PartsInvoice,
  type PartsPayment,
} from "@/lib/partsApi";

const longDate = (iso: string) => new Date(iso).toLocaleDateString("en-JM", { day: "numeric", month: "long", year: "numeric" });

export default function PartsInvoicePage() {
  const { number = "" } = useParams();
  const [params] = useSearchParams();
  const token = params.get("k") ?? "";
  const { data: inv, isLoading, error, refetch } = useQuery({
    queryKey: ["parts-invoice", number, token],
    queryFn: () => getPartsInvoice(number, token),
    retry: false,
  });

  return (
    <PartsShell>
      <Helmet>
        <title>{inv ? `Invoice ${inv.number} — Rogue Parts` : "Invoice — Rogue Parts"}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-4xl print:max-w-none print:p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 print:hidden">
          <Link to="/parts/order" className="inline-flex items-center text-sm font-montserrat font-semibold text-rogue-slate hover:text-rogue-red">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> My order
          </Link>
          {inv && (
            <Button onClick={() => window.print()} variant="outline" className="rounded-full font-montserrat font-semibold">
              <Printer className="h-4 w-4 mr-2" /> Print / save PDF
            </Button>
          )}
        </div>

        {isLoading && <Loading />}
        {error && <ErrorNote>{(error as Error).message === "Invoice not found." ? "We couldn't find that invoice — check the link you were sent." : (error as Error).message}</ErrorNote>}
        {inv && (
          <div className="space-y-8 print:space-y-0">
            <PartsDocument inv={inv} token={token} onPaid={() => refetch()} />
            <FreightDocument inv={inv} token={token} onPaid={() => refetch()} />
          </div>
        )}
      </div>
    </PartsShell>
  );
}

function DocHeader({ inv, docNo, title }: { inv: PartsInvoice; docNo: string; title: string }) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-6 border-b border-slate-200 pb-6">
      <div>
        <img src="/lovable-uploads/962d3bfb-d1d6-4416-8e25-35bf7d657300.png" alt="Rogue Automotive" className="h-10 w-auto mb-3" />
        <p className="text-xs uppercase tracking-[0.2em] font-montserrat font-semibold text-rogue-red">Rogue Parts · {inv.containerName}</p>
        <h2 className="font-montserrat font-bold text-2xl text-rogue-charcoal mt-1">{title}</h2>
      </div>
      <dl className="text-sm text-right space-y-1">
        <div><dt className="inline text-rogue-slate">No. </dt><dd className="inline font-montserrat font-bold text-rogue-charcoal">{docNo}</dd></div>
        <div><dt className="inline text-rogue-slate">Issued </dt><dd className="inline text-rogue-charcoal">{longDate(inv.issuedAt)}</dd></div>
        <div className="pt-2"><dd className="font-semibold text-rogue-charcoal">{inv.name}</dd></div>
        <div><dd className="text-rogue-slate">Plate {inv.plate}</dd></div>
        <div><dd className="text-rogue-slate">WhatsApp {inv.phone}</dd></div>
      </dl>
    </header>
  );
}

function PaidStamp({ p }: { p: PartsPayment }) {
  if (!p.paid) return null;
  const bits = [p.paidAt && `Paid ${longDate(p.paidAt)}`, p.amount != null && fmtJmd(p.amount), p.method, p.reference && `ref ${p.reference}`].filter(Boolean);
  return (
    <div className="flex items-center gap-2 rounded-xl border-2 border-emerald-600 bg-emerald-50 px-4 py-3 text-emerald-900 font-montserrat font-semibold text-sm">
      <CheckCircle2 className="h-5 w-5 shrink-0" /> {bits.join(" · ")}
    </div>
  );
}

function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-8 shadow-sm print:shadow-none print:border-0 print:rounded-none print:break-after-page">
      {children}
    </section>
  );
}

function PartsDocument({ inv, token, onPaid }: { inv: PartsInvoice; token: string; onPaid: () => void }) {
  const t = inv.totals;
  return (
    <Sheet>
      <DocHeader inv={inv} docNo={inv.partsDocNumber} title="Parts invoice" />
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm mt-6">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-rogue-slate border-b border-slate-200">
              <th className="py-2 font-semibold">Part</th>
              <th className="py-2 font-semibold text-right">Qty</th>
              <th className="py-2 font-semibold text-right">Each</th>
              <th className="py-2 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {inv.lines.map((l) => (
              <tr key={l.name} className="border-b border-slate-100">
                <td className="py-3">
                  <span className="font-semibold text-rogue-charcoal">{l.name}</span>
                  {l.partNumber && <span className="block text-xs text-rogue-slate">{l.partNumber}</span>}
                </td>
                <td className="py-3 text-right tabular-nums">{l.qty}</td>
                <td className="py-3 text-right tabular-nums">{fmtUsd(l.unitPrice)}</td>
                <td className="py-3 text-right tabular-nums font-semibold">{fmtUsd(l.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-between gap-6 mt-6">
        <div className="max-w-sm text-sm">
          <h3 className="font-montserrat font-bold text-rogue-charcoal mb-2">How to pay</h3>
          <dl className="space-y-1 text-rogue-slate">
            <div className="font-semibold text-rogue-charcoal">{inv.payee.business}</div>
            {inv.payee.accountName && <div>Account name: {inv.payee.accountName}</div>}
            {inv.payee.bank && <div>Bank: {inv.payee.bank}</div>}
            {inv.payee.account && <div>Account: {inv.payee.account}</div>}
            {inv.payee.contact && <div>{inv.payee.contact}</div>}
            <div>Reference: <span className="font-semibold text-rogue-charcoal">{inv.partsDocNumber} · {inv.plate}</span></div>
          </dl>
          {inv.payee.instructions && <p className="text-xs text-rogue-slate mt-3">{inv.payee.instructions}</p>}
        </div>
        <dl className="text-sm min-w-[220px] space-y-1.5">
          <div className="flex justify-between gap-6"><dt className="text-rogue-slate">Parts ({t.units})</dt><dd className="tabular-nums">{fmtUsd(t.goods)}</dd></div>
          <div className="flex justify-between gap-6"><dt className="text-rogue-slate">Rate</dt><dd className="tabular-nums">J${inv.fxRate} per US$1</dd></div>
          <div className="flex justify-between gap-6 border-t border-slate-200 pt-2 mt-2">
            <dt className="font-montserrat font-bold text-rogue-charcoal">Due now</dt>
            <dd className="font-montserrat font-bold text-xl text-rogue-charcoal tabular-nums">{fmtJmd(t.goodsJmd)}</dd>
          </div>
        </dl>
      </div>
      <div className="mt-6 space-y-4">
        <PaidStamp p={inv.parts} />
        {!inv.parts.paid && inv.cardPaymentsEnabled && <CardPay inv={inv} token={token} document={1} amount={t.goodsJmd} onPaid={onPaid} />}
      </div>
      <p className="text-xs text-rogue-slate mt-6">
        Prices are as quoted on the day you pledged. Once this invoice is paid the figures are locked and your pledge can't be changed online.
      </p>
    </Sheet>
  );
}

function FreightDocument({ inv, token, onPaid }: { inv: PartsInvoice; token: string; onPaid: () => void }) {
  const t = inv.totals;
  return (
    <Sheet>
      <DocHeader inv={inv} docNo={inv.freightDocNumber} title={inv.freightIsEstimate ? "Freight estimate" : "Freight invoice"} />
      {inv.freightIsEstimate && (
        <p className="mt-6 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
          This is an estimate, not a bill. Final freight is confirmed when the container lands in Jamaica and is
          measured — nothing on this page is payable yet.
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm mt-6">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-rogue-slate border-b border-slate-200">
              <th className="py-2 font-semibold">Part</th>
              <th className="py-2 font-semibold text-right">Volume</th>
              <th className="py-2 font-semibold text-right">Weight</th>
              <th className="py-2 font-semibold text-right">Freight</th>
            </tr>
          </thead>
          <tbody>
            {inv.lines.map((l) => (
              <tr key={l.name} className="border-b border-slate-100">
                <td className="py-3"><span className="font-semibold text-rogue-charcoal">{l.name}</span> <span className="text-rogue-slate">× {l.qty}</span></td>
                <td className="py-3 text-right tabular-nums">{l.cbm.toFixed(3)} m³</td>
                <td className="py-3 text-right tabular-nums">{l.kg} kg</td>
                <td className="py-3 text-right tabular-nums font-semibold">{fmtUsd(l.freight)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dl className="text-sm ml-auto max-w-xs space-y-1.5 mt-6">
        <div className="flex justify-between gap-6"><dt className="text-rogue-slate">Packed volume</dt><dd className="tabular-nums">{fmtCbm(t.cbm)}</dd></div>
        <div className="flex justify-between gap-6"><dt className="text-rogue-slate">Rate</dt><dd className="tabular-nums">{fmtUsd(inv.freightRatePerCbm, 0)} per m³</dd></div>
        <div className="flex justify-between gap-6"><dt className="text-rogue-slate">Freight</dt><dd className="tabular-nums">{fmtUsd(t.freight)}</dd></div>
        <div className="flex justify-between gap-6 border-t border-slate-200 pt-2 mt-2">
          <dt className="font-montserrat font-bold text-rogue-charcoal">{inv.freightIsEstimate ? "Estimated" : "Due on arrival"}</dt>
          <dd className="font-montserrat font-bold text-xl text-rogue-charcoal tabular-nums">{fmtJmd(t.freightJmd)}</dd>
        </div>
      </dl>
      <div className="mt-6 space-y-4">
        <PaidStamp p={inv.freight} />
        {!inv.freight.paid && inv.canPayFreightByCard && <CardPay inv={inv} token={token} document={2} amount={t.freightJmd} onPaid={onPaid} />}
      </div>
      <p className="text-xs text-rogue-slate mt-6">Container status: {inv.containerStatusName}.</p>
    </Sheet>
  );
}

function CardPay({ inv, token, document, amount, onPaid }: { inv: PartsInvoice; token: string; document: 1 | 2; amount: number; onPaid: () => void }) {
  const [intent, setIntent] = useState<{ clientSecret: string; amount: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const start = async () => {
    setLoading(true);
    setError("");
    try {
      const r = await createPartsCardPayment(inv.number, token, document);
      if (!r.isSuccess || !r.clientSecret) throw new Error(r.errorMessage ?? "Could not start the card payment.");
      setIntent({ clientSecret: r.clientSecret, amount: r.amount });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start the card payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="print:hidden rounded-xl border border-slate-200 p-4">
      {intent ? (
        <PartsStripeForm clientSecret={intent.clientSecret} amount={intent.amount} onPaid={onPaid} />
      ) : (
        <Button onClick={start} disabled={loading} className="bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold rounded-full px-6">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><CreditCard className="h-4 w-4 mr-2" /> Pay {fmtJmd(amount)} by card</>}
        </Button>
      )}
      {error && <p className="text-sm text-red-700 mt-3" role="alert">{error}</p>}
    </div>
  );
}
