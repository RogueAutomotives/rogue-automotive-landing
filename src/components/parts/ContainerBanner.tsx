import { Clock, Ship } from "lucide-react";
import { closesLabel, fmt, type PartsCatalog } from "@/lib/partsApi";
import { usePartsState } from "./PartsShell";

/** The one line every Parts page shows: which container, whether it's taking pledges, how long is left. */
export default function ContainerBanner({ catalog }: { catalog: PartsCatalog }) {
  const { currency } = usePartsState();
  const c = catalog.container;
  if (!c) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-rogue-slate">
        No container is running right now — browse the parts, and we'll open the next one soon.
      </div>
    );
  }
  return (
    <div
      className={`flex flex-wrap items-center gap-x-5 gap-y-1.5 rounded-xl px-4 py-3 text-sm ${
        c.acceptingPledges ? "bg-rogue-charcoal text-white" : "bg-white border border-slate-200 text-rogue-charcoal"
      }`}
    >
      <span className="inline-flex items-center gap-2 font-montserrat font-semibold">
        <Ship className="h-4 w-4" /> {c.name}
      </span>
      {c.acceptingPledges ? (
        <span className="inline-flex items-center gap-2">
          <Clock className="h-4 w-4 text-rogue-red" />
          Closes {closesLabel(c)} · {c.daysLeft === 0 ? "closing today" : c.daysLeft === 1 ? "1 day left" : `${c.daysLeft} days left`}
        </span>
      ) : (
        <span>{c.status === 1 ? "Pledges open soon — build your order now and it's saved on this device." : c.statusName}</span>
      )}
      <span className={c.acceptingPledges ? "text-rogue-silver" : "text-rogue-slate"}>
        Freight {fmt(c.freightRatePerCbm, currency, catalog.fxRate)} per m³{c.freightIsEstimate ? " (estimate)" : ""}
      </span>
    </div>
  );
}
