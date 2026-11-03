/** /parts/list — the container catalogue with freight share, landed price and demand. */
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Info, Users } from "lucide-react";
import {
  PartsShell,
  useCatalog,
  usePartsState,
  PartImage,
  QtyStepper,
  Loading,
  ErrorNote,
  IndicativeBadge,
} from "@/components/parts/PartsShell";
import ContainerBanner from "@/components/parts/ContainerBanner";
import { fmt } from "@/lib/partsApi";

export default function PartsList() {
  const { data, isLoading, error } = useCatalog();
  const { cart, setQty, currency, cartCount } = usePartsState();
  const money = (n: number, dp = 0) => fmt(n, currency, data?.fxRate ?? 0, dp);

  return (
    <PartsShell>
      <Helmet>
        <title>Parts list — Rogue Parts | Rogue Automotive</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-rogue-red">Rely R8 · Chery Himla</p>
            <h1 className="font-montserrat font-bold text-3xl sm:text-4xl text-rogue-charcoal mt-2">The parts list</h1>
            <p className="text-rogue-slate mt-2 max-w-2xl">
              Each price shows the part, its share of the sea freight (worked out from its packed size), and what it
              costs landed.
            </p>
          </div>
          {cartCount > 0 && (
            <Link
              to="/parts/order"
              className="inline-flex items-center rounded-full bg-rogue-charcoal hover:bg-rogue-dark text-white font-montserrat font-semibold px-5 py-3 text-sm"
            >
              Review my order ({cartCount}) <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          )}
        </div>

        {isLoading && <Loading />}
        {error && <ErrorNote>{(error as Error).message}</ErrorNote>}
        {data && (
          <>
            <ContainerBanner catalog={data} />
            {data.parts.length === 0 ? (
              <p className="text-center text-rogue-slate py-16">No parts are listed yet — check back soon.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {data.parts.map((p) => (
                  <article key={p.slug} className="flex flex-col rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <Link to={`/parts/${p.slug}`} className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rogue-red">
                      <PartImage src={p.images[0]} alt={p.name} className="aspect-[4/3] w-full group-hover:opacity-95 transition-opacity" />
                    </Link>
                    <div className="flex flex-col flex-grow p-5">
                      <div className="flex items-start justify-between gap-3">
                        <Link to={`/parts/${p.slug}`} className="hover:text-rogue-red">
                          <h2 className="font-montserrat font-bold text-lg text-rogue-charcoal leading-snug">{p.name}</h2>
                        </Link>
                        {!p.priceConfirmed && <IndicativeBadge />}
                      </div>
                      {p.subtitle && <p className="text-sm text-rogue-slate mt-1.5 line-clamp-2">{p.subtitle}</p>}

                      <dl className="grid grid-cols-3 gap-2 mt-4 rounded-xl bg-rogue-light p-3 text-center">
                        <div>
                          <dt className="text-[11px] uppercase tracking-wide text-rogue-slate">Part</dt>
                          <dd className="font-montserrat font-semibold text-rogue-charcoal tabular-nums">{money(p.price, p.price < 50 ? 2 : 0)}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] uppercase tracking-wide text-rogue-slate">Freight</dt>
                          <dd className="font-montserrat font-semibold text-rogue-red tabular-nums">{money(p.freightEach, 2)}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] uppercase tracking-wide text-rogue-slate">Landed</dt>
                          <dd className="font-montserrat font-bold text-rogue-charcoal tabular-nums">{money(p.landedEach, 2)}</dd>
                        </div>
                      </dl>

                      <p className="flex items-center gap-1.5 text-xs text-rogue-slate mt-3">
                        <Users className="h-3.5 w-3.5" />
                        {p.demandOwners} {p.demandOwners === 1 ? "owner" : "owners"} · {p.demandUnits} {p.demandUnits === 1 ? "unit" : "units"} requested
                      </p>

                      <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                        <QtyStepper value={cart[p.slug] ?? 0} onChange={(n) => setQty(p.slug, n)} label={p.name} />
                        <Link to={`/parts/${p.slug}`} className="text-sm font-montserrat font-semibold text-rogue-charcoal hover:text-rogue-red inline-flex items-center">
                          Details <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
            <p className="flex items-start gap-2 text-xs text-rogue-slate mt-8 max-w-3xl">
              <Info className="h-4 w-4 shrink-0" />
              Freight is an estimate until the container is measured in Kingston. Indicative prices are firmed up when
              the factory quotes; your invoice always shows the price on the day you pledge.
            </p>
          </>
        )}
      </div>
    </PartsShell>
  );
}
