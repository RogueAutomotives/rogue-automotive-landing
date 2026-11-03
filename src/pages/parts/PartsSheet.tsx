/** /parts/sheet — the public demand sheet: what the container holds so far. No names or plates. */
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { PartsShell, usePartsState, Loading, ErrorNote, IndicativeBadge } from "@/components/parts/PartsShell";
import { closesLabel, fmt, getPartsDemand } from "@/lib/partsApi";

export default function PartsSheet() {
  const { data, isLoading, error } = useQuery({ queryKey: ["parts-demand"], queryFn: getPartsDemand, staleTime: 30_000 });
  const { currency } = usePartsState();
  const money = (n: number, dp = 0) => fmt(n, currency, data?.fxRate ?? 0, dp);
  const c = data?.container;

  return (
    <PartsShell>
      <Helmet>
        <title>Demand sheet — Rogue Parts</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 max-w-5xl">
        <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-rogue-red">{c ? c.name : "Rogue Parts"}</p>
        <h1 className="font-montserrat font-bold text-3xl sm:text-4xl text-rogue-charcoal mt-2">Demand sheet</h1>
        <p className="text-rogue-slate mt-2 mb-8">
          Everything pledged so far, totalled live.{" "}
          {c?.acceptingPledges ? `Pledges close ${closesLabel(c)}.` : c ? c.statusName + "." : "No container is running right now."}
        </p>

        {isLoading && <Loading />}
        {error && <ErrorNote>{(error as Error).message}</ErrorNote>}
        {data && (
          <>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {(
                [
                  ["Owners", String(data.totals.owners)],
                  ["Units", String(data.totals.units)],
                  ["Volume", `${data.totals.cbm.toFixed(2)} m³`],
                  ["Parts value", money(data.goods)],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k} className="rounded-xl bg-white border border-slate-200 p-4">
                  <dt className="text-xs uppercase tracking-wide text-rogue-slate">{k}</dt>
                  <dd className="font-montserrat font-bold text-2xl text-rogue-charcoal tabular-nums mt-1">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="rounded-2xl bg-white border border-slate-200 overflow-x-auto">
              <table className="w-full text-sm min-w-[620px]">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-rogue-slate border-b border-slate-200">
                    <th className="p-4 font-semibold">Part</th>
                    <th className="p-4 font-semibold text-right">Owners</th>
                    <th className="p-4 font-semibold text-right">Units</th>
                    <th className="p-4 font-semibold text-right">Volume</th>
                    <th className="p-4 font-semibold text-right">Parts</th>
                    <th className="p-4 font-semibold text-right">Freight</th>
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((r) => (
                    <tr key={r.slug} className="border-b border-slate-100 last:border-0">
                      <td className="p-4">
                        <span className="font-semibold text-rogue-charcoal">{r.name}</span>{" "}
                        {!r.priceConfirmed && <IndicativeBadge />}
                      </td>
                      <td className="p-4 text-right tabular-nums">{r.owners}</td>
                      <td className="p-4 text-right tabular-nums font-semibold">{r.units}</td>
                      <td className="p-4 text-right tabular-nums">{r.cbm.toFixed(3)} m³</td>
                      <td className="p-4 text-right tabular-nums">{money(r.goods)}</td>
                      <td className="p-4 text-right tabular-nums">{money(r.freight)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-200 font-montserrat font-bold text-rogue-charcoal">
                    <td className="p-4">Total</td>
                    <td className="p-4 text-right tabular-nums">{data.totals.owners}</td>
                    <td className="p-4 text-right tabular-nums">{data.totals.units}</td>
                    <td className="p-4 text-right tabular-nums">{data.totals.cbm.toFixed(3)} m³</td>
                    <td className="p-4 text-right tabular-nums">{money(data.goods)}</td>
                    <td className="p-4 text-right tabular-nums">{money(data.freight)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <p className="text-xs text-rogue-slate mt-4">Freight figures are estimates until the container is measured on arrival.</p>
          </>
        )}
      </div>
    </PartsShell>
  );
}
