/** /parts/:slug — one part: gallery, price breakdown, demand, specs and notes. */
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Play } from "lucide-react";
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
import { fmt, posterFor } from "@/lib/partsApi";

type Media = { kind: "img" | "video"; src: string };

export default function PartDetail() {
  const { slug } = useParams();
  const { data, isLoading, error } = useCatalog();
  const { cart, setQty, currency } = usePartsState();
  const [active, setActive] = useState(0);

  const part = data?.parts.find((p) => p.slug === slug);
  const money = (n: number, dp = 0) => fmt(n, currency, data?.fxRate ?? 0, dp);
  const media: Media[] = part
    ? [...part.images.map((src) => ({ kind: "img" as const, src })), ...part.videos.map((src) => ({ kind: "video" as const, src }))]
    : [];
  const current = media[Math.min(active, Math.max(0, media.length - 1))];
  const maxUnits = Math.max(1, ...(data?.parts ?? []).map((p) => p.demandUnits));
  const qty = part ? cart[part.slug] ?? 0 : 0;

  return (
    <PartsShell>
      <Helmet>
        <title>{part ? `${part.name} — Rogue Parts` : "Rogue Parts"}</title>
        {part?.subtitle && <meta name="description" content={part.subtitle} />}
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-6xl">
        <Link to="/parts/list" className="inline-flex items-center text-sm font-montserrat font-semibold text-rogue-slate hover:text-rogue-red">
          <ArrowLeft className="h-4 w-4 mr-1.5" /> All parts
        </Link>

        {isLoading && <Loading />}
        {error && <div className="mt-6"><ErrorNote>{(error as Error).message}</ErrorNote></div>}
        {data && !part && (
          <div className="text-center py-20">
            <p className="text-rogue-slate">That part isn't on the list any more.</p>
            <Link to="/parts/list" className="text-rogue-red font-semibold hover:underline">Back to the parts list</Link>
          </div>
        )}

        {part && (
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-6 items-start">
            <div>
              <div className="rounded-2xl overflow-hidden bg-rogue-dark aspect-[4/3]">
                {current?.kind === "video" ? (
                  <video key={current.src} src={current.src} poster={posterFor(current.src)} controls playsInline className="h-full w-full object-contain" />
                ) : (
                  <PartImage src={current?.src} alt={part.name} className="h-full w-full" />
                )}
              </div>
              {media.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1" role="tablist" aria-label="Photos and videos">
                  {media.map((m, i) => (
                    <button
                      key={m.src}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      aria-label={m.kind === "video" ? `Video ${i + 1}` : `Photo ${i + 1}`}
                      onClick={() => setActive(i)}
                      className={`relative shrink-0 h-16 w-20 rounded-lg overflow-hidden border-2 ${i === active ? "border-rogue-red" : "border-transparent"}`}
                    >
                      <PartImage src={m.kind === "video" ? posterFor(m.src) : m.src} alt="" className="h-full w-full" />
                      {m.kind === "video" && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="h-5 w-5 text-white" fill="white" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {part.priceConfirmed ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-montserrat font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    <Check className="h-3 w-3" /> Price confirmed
                  </span>
                ) : (
                  <IndicativeBadge />
                )}
              </div>
              <h1 className="font-montserrat font-bold text-3xl text-rogue-charcoal leading-tight">{part.name}</h1>
              {part.subtitle && <p className="text-rogue-slate mt-2 leading-relaxed">{part.subtitle}</p>}

              <dl className="grid grid-cols-3 rounded-xl border border-slate-200 bg-white mt-6 divide-x divide-slate-200">
                <div className="p-4">
                  <dt className="text-[11px] uppercase tracking-wide text-rogue-slate">Part price</dt>
                  <dd className="font-montserrat font-bold text-xl text-rogue-charcoal tabular-nums mt-1">{money(part.price, part.price < 50 ? 2 : 0)}</dd>
                </div>
                <div className="p-4">
                  <dt className="text-[11px] uppercase tracking-wide text-rogue-slate">Freight</dt>
                  <dd className="font-montserrat font-bold text-xl text-rogue-red tabular-nums mt-1">{money(part.freightEach, 2)}</dd>
                </div>
                <div className="p-4">
                  <dt className="text-[11px] uppercase tracking-wide text-rogue-slate">Landed each</dt>
                  <dd className="font-montserrat font-bold text-xl text-rogue-charcoal tabular-nums mt-1">{money(part.landedEach, 2)}</dd>
                </div>
              </dl>
              {data?.container && (
                <p className="text-xs text-rogue-slate mt-2 tabular-nums">
                  {part.cbm.toFixed(3)} m³ × {money(data.container.freightRatePerCbm)} per m³ = {money(part.freightEach, 2)} freight
                </p>
              )}

              <div className="rounded-xl bg-white border border-slate-200 p-4 mt-5">
                <div className="flex justify-between gap-3 text-sm mb-2">
                  <span className="font-semibold text-rogue-charcoal">
                    {part.demandOwners} {part.demandOwners === 1 ? "owner has" : "owners have"} requested this part
                  </span>
                  <span className="font-montserrat font-semibold text-rogue-red tabular-nums">{part.demandUnits} units</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden" aria-hidden>
                  <div className="h-full bg-rogue-red rounded-full" style={{ width: `${Math.round((part.demandUnits / maxUnits) * 100)}%` }} />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-6">
                <QtyStepper value={qty} onChange={(n) => setQty(part.slug, n)} label={part.name} />
                {qty > 0 ? (
                  <Link
                    to="/parts/order"
                    className="inline-flex items-center rounded-full bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold px-6 py-3"
                  >
                    In your order · review <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setQty(part.slug, 1)}
                    className="inline-flex items-center rounded-full bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold px-6 py-3"
                  >
                    Add to my order
                  </button>
                )}
              </div>

              <dl className="mt-8 border-t border-slate-200">
                {(
                  [
                    ["Part number", part.partNumber ?? "Quote pending"],
                    ["Material", part.material],
                    ["Packed size", part.dimensions],
                    ["Volume · weight", `${part.cbm.toFixed(3)} m³ · ${part.kg} kg`],
                    ["Fitment", part.fitment],
                  ] as [string, string | undefined][]
                )
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[130px_1fr] gap-4 py-3 border-b border-slate-100 text-sm">
                      <dt className="text-rogue-slate">{k}</dt>
                      <dd className="text-rogue-charcoal">{v}</dd>
                    </div>
                  ))}
              </dl>

              {part.notes.length > 0 && (
                <>
                  <h2 className="font-montserrat font-bold text-rogue-charcoal mt-8 mb-3">What to know</h2>
                  <ul className="space-y-2.5">
                    {part.notes.map((n) => (
                      <li key={n} className="flex gap-2.5 text-sm text-rogue-slate leading-relaxed">
                        <Check className="h-4 w-4 text-rogue-red mt-0.5 shrink-0" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </PartsShell>
  );
}
