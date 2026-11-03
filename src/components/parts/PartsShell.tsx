import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Minus, Plus, ShoppingBag, Wrench, AlertCircle } from "lucide-react";
import Footer from "@/components/Footer";
import {
  getPartsCatalog,
  loadCart,
  loadCurrency,
  loadSession,
  storeCart,
  storeCurrency,
  type Cart,
  type Currency,
  type PartsSession,
} from "@/lib/partsApi";

/** Session, draft cart and currency from localStorage, kept in sync across components and tabs. */
export function usePartsState() {
  const [session, setSession] = useState<PartsSession | null>(() => loadSession());
  const [cart, setCartState] = useState<Cart>(() => loadCart());
  const [currency, setCurrencyState] = useState<Currency>(() => loadCurrency());

  useEffect(() => {
    const sync = () => {
      setSession(loadSession());
      setCartState(loadCart());
      setCurrencyState(loadCurrency());
    };
    window.addEventListener("rogue-parts-storage", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("rogue-parts-storage", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setQty = (slug: string, qty: number) => {
    const next = { ...loadCart() };
    if (qty > 0) next[slug] = Math.min(qty, 50);
    else delete next[slug];
    storeCart(next);
  };

  return {
    session,
    cart,
    currency,
    setCurrency: storeCurrency,
    setCart: storeCart,
    setQty,
    cartCount: Object.values(cart).reduce((a, b) => a + b, 0),
  };
}

export const useCatalog = () =>
  useQuery({ queryKey: ["parts-catalog"], queryFn: getPartsCatalog, staleTime: 30_000 });

function CurrencyToggle({ value, onChange }: { value: Currency; onChange: (c: Currency) => void }) {
  return (
    <div className="inline-flex rounded-full bg-white/10 p-0.5" role="group" aria-label="Currency">
      {(["USD", "JMD"] as Currency[]).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          aria-pressed={value === c}
          className={`px-3 py-1.5 text-xs font-montserrat font-semibold rounded-full transition-colors min-h-[32px] ${
            value === c ? "bg-white text-rogue-dark" : "text-rogue-silver hover:text-white"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

function PartsNav() {
  const { cartCount, currency, setCurrency } = usePartsState();
  const link = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-montserrat font-semibold transition-colors ${isActive ? "text-white" : "text-rogue-silver hover:text-white"}`;

  return (
    <header className="sticky top-0 z-50 bg-rogue-dark/95 backdrop-blur border-b border-white/10 print:hidden">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <Link to="/parts" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/lovable-uploads/962d3bfb-d1d6-4416-8e25-35bf7d657300.png"
            alt="Rogue Automotive"
            className="h-9 sm:h-11 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <span className="hidden sm:inline font-montserrat font-bold text-white tracking-wide">PARTS</span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-5">
          <NavLink to="/parts/list" className={link}>
            Parts
          </NavLink>
          <NavLink to="/parts/sheet" className={({ isActive }) => `hidden sm:inline ${link({ isActive })}`}>
            Demand
          </NavLink>
          <CurrencyToggle value={currency} onChange={setCurrency} />
          <Link
            to="/parts/order"
            className="relative inline-flex items-center justify-center h-10 w-10 rounded-full bg-rogue-red hover:bg-rogue-red-dark text-white transition-colors"
            aria-label={`My order${cartCount ? `, ${cartCount} items` : ""}`}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-white text-rogue-dark text-[11px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function PartsShell({ children, bare }: { children: ReactNode; bare?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col bg-rogue-light">
      {!bare && <PartsNav />}
      <main className="flex-grow">{children}</main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

/** Part photo with an on-brand fallback tile when the file is missing. */
export function PartImage({ src, alt, className = "" }: { src?: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`bg-gradient-to-br from-rogue-charcoal to-rogue-dark flex items-center justify-center ${className}`} role="img" aria-label={alt}>
        <Wrench className="h-10 w-10 text-white/25" />
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}

export function QtyStepper({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-slate-300 bg-white" role="group" aria-label={`Quantity of ${label}`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="h-11 w-11 flex items-center justify-center text-rogue-charcoal hover:text-rogue-red disabled:opacity-40"
        disabled={value <= 0}
        aria-label="One less"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center font-montserrat font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(50, value + 1))}
        className="h-11 w-11 flex items-center justify-center text-rogue-charcoal hover:text-rogue-red"
        aria-label="One more"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

export function Loading() {
  return (
    <div className="flex justify-center py-24" role="status" aria-label="Loading">
      <Loader2 className="h-8 w-8 animate-spin text-rogue-red" />
    </div>
  );
}

export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export function IndicativeBadge() {
  return (
    <span className="inline-flex items-center text-[11px] font-montserrat font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
      Indicative price
    </span>
  );
}
