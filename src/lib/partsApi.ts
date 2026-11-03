/**
 * Client for Rogue Parts — group-buy containers of factory parts (launching with
 * the Rely R8 / Chery Himla). The API owns prices, demand and invoices; the
 * browser keeps the owner's gate key, a draft cart and the currency choice.
 * All catalogue money is USD; JMD is a display conversion at the API's FX rate.
 */
import { API_BASE } from "./api";

export type ContainerStatus = 1 | 2 | 3 | 4 | 5; // Collecting, Ordered, InTransit, Arrived, Completed

export interface PartsContainer {
  id: string;
  name: string;
  closesOn: string;
  acceptingPledges: boolean;
  status: ContainerStatus;
  statusName: string;
  daysLeft: number;
  freightRatePerCbm: number;
  freightIsEstimate: boolean;
}

export interface Part {
  slug: string;
  name: string;
  subtitle?: string;
  partNumber?: string;
  material?: string;
  dimensions?: string;
  fitment?: string;
  price: number;
  cbm: number;
  kg: number;
  freightEach: number;
  landedEach: number;
  priceConfirmed: boolean;
  images: string[];
  videos: string[];
  notes: string[];
  demandUnits: number;
  demandOwners: number;
}

export interface DemandTotals {
  owners: number;
  units: number;
  cbm: number;
}

export interface PartsCatalog {
  container: PartsContainer | null;
  fxRate: number;
  cardPaymentsEnabled: boolean;
  parts: Part[];
  totals: DemandTotals;
}

export interface PledgeLine {
  slug: string;
  qty: number;
}

export interface PartsSession {
  name: string;
  plate: string;
  phone: string;
  accessKey: string;
  pledge?: PledgeLine[] | null;
  pledgedAt?: string | null;
  invoice?: { number: string; token: string; partsPaid: boolean; freightPaid: boolean } | null;
}

export interface PartsPayment {
  paid: boolean;
  paidAt?: string | null;
  amount?: number | null;
  method?: string | null;
  reference?: string | null;
}

export interface PartsInvoice {
  number: string;
  partsDocNumber: string;
  freightDocNumber: string;
  name: string;
  plate: string;
  phone: string;
  containerName: string;
  containerStatus: ContainerStatus;
  containerStatusName: string;
  issuedAt: string;
  fxRate: number;
  freightRatePerCbm: number;
  freightIsEstimate: boolean;
  lines: { name: string; partNumber?: string; qty: number; unitPrice: number; lineTotal: number; cbm: number; kg: number; freight: number }[];
  totals: { units: number; goods: number; cbm: number; kg: number; freight: number; total: number; goodsJmd: number; freightJmd: number };
  parts: PartsPayment;
  freight: PartsPayment;
  payee: { business: string; contact?: string; accountName?: string; bank?: string; account?: string; instructions?: string };
  cardPaymentsEnabled: boolean;
  canPayFreightByCard: boolean;
}

export interface PartsDemand {
  container: PartsContainer | null;
  fxRate: number;
  rows: { slug: string; name: string; price: number; cbmEach: number; priceConfirmed: boolean; units: number; owners: number; cbm: number; goods: number; freight: number }[];
  totals: DemandTotals;
  goods: number;
  freight: number;
}

export interface PartsCardPayment {
  isSuccess: boolean;
  errorMessage?: string;
  paymentIntentId?: string;
  clientSecret?: string;
  amount: number;
}

/** Error carrying the API's own message (shown to the owner as-is). */
export class PartsApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

async function call<T>(path: string, init: RequestInit = {}, key?: string): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (key) headers["X-Parts-Key"] = key;
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, { ...init, headers: { ...headers, ...(init.headers as Record<string, string>) } });
  } catch {
    throw new PartsApiError("We couldn't reach the server — check your connection and try again.", 0);
  }
  if (res.status === 204) return undefined as T;
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 429) throw new PartsApiError("Too many tries — wait a minute and try again.", 429);
    throw new PartsApiError(body?.message ?? `Something went wrong (${res.status}).`, res.status);
  }
  return body as T;
}

export const getPartsCatalog = () => call<PartsCatalog>("/parts/catalog");
export const getPartsDemand = () => call<PartsDemand>("/parts/demand");
export const joinParts = (b: { name: string; plate: string; phone: string }) =>
  call<PartsSession>("/parts/members", { method: "POST", body: JSON.stringify(b) });
export const getPartsSession = (key: string) => call<PartsSession>("/parts/me", {}, key);
export const savePledge = (key: string, lines: PledgeLine[]) =>
  call<PartsSession>("/parts/me/pledge", { method: "PUT", body: JSON.stringify({ lines }) }, key);
export const withdrawPledge = (key: string) => call<PartsSession>("/parts/me/pledge", { method: "DELETE" }, key);
export const getPartsInvoice = (number: string, token: string) =>
  call<PartsInvoice>(`/parts/invoices/${encodeURIComponent(number)}?k=${encodeURIComponent(token)}`);
export const createPartsCardPayment = (number: string, token: string, document: 1 | 2) =>
  call<PartsCardPayment>(`/parts/invoices/${encodeURIComponent(number)}/pay`, {
    method: "POST",
    body: JSON.stringify({ token, document }),
  });
export const confirmPartsCardPayment = (paymentIntentId: string) =>
  call<PartsCardPayment>(`/parts/payments/confirm/${encodeURIComponent(paymentIntentId)}`, { method: "POST" });

// ── Browser state (every access guarded: private mode can throw) ──

const SESSION_KEY = "rogue-parts-session";
const CART_KEY = "rogue-parts-cart";
const CURRENCY_KEY = "rogue-parts-currency";

function read<T>(k: string): T | null {
  try {
    const raw = localStorage.getItem(k);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
function write(k: string, v: unknown) {
  try {
    if (v === null) localStorage.removeItem(k);
    else localStorage.setItem(k, JSON.stringify(v));
  } catch {
    /* storage unavailable — the page still works for this visit */
  }
  window.dispatchEvent(new Event("rogue-parts-storage"));
}

export const loadSession = () => read<PartsSession>(SESSION_KEY);
export const storeSession = (s: PartsSession | null) => write(SESSION_KEY, s);

/** Draft cart: slug → qty. */
export type Cart = Record<string, number>;
export const loadCart = (): Cart => read<Cart>(CART_KEY) ?? {};
export const storeCart = (c: Cart) => write(CART_KEY, c);
export const cartFromPledge = (lines?: PledgeLine[] | null): Cart =>
  Object.fromEntries((lines ?? []).map((l) => [l.slug, l.qty]));

export type Currency = "USD" | "JMD";
export const loadCurrency = (): Currency => (read<Currency>(CURRENCY_KEY) === "JMD" ? "JMD" : "USD");
export const storeCurrency = (c: Currency) => write(CURRENCY_KEY, c);

/** Format a USD amount in the reader's chosen currency. */
export function fmt(usd: number, currency: Currency, fxRate: number, dp = 0) {
  if (currency === "JMD") return `J$${Math.round(usd * fxRate).toLocaleString("en-US")}`;
  return `US$${usd.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp })}`;
}
export const fmtJmd = (n: number) => `J$${Math.round(n).toLocaleString("en-US")}`;
export const fmtUsd = (n: number, dp = 2) =>
  `US$${n.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp })}`;
export const fmtCbm = (n: number) => `${n.toFixed(2)} m³`;

export function closesLabel(c: PartsContainer) {
  return new Date(`${c.closesOn}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** Video poster = same path with .jpg. */
export const posterFor = (video: string) => video.replace(/\.mp4$/i, ".jpg");

// ── Jamaican formats (the API re-checks; this is fast feedback) ──

export function normalizeJmPhone(raw: string): string | null {
  const d = raw.replace(/\D/g, "");
  let ten: string | null = null;
  if (d.length === 10 && (d.startsWith("876") || d.startsWith("658"))) ten = d;
  else if (d.length === 11 && d.startsWith("1") && ["876", "658"].includes(d.slice(1, 4))) ten = d.slice(1);
  return ten ? `+1 ${ten.slice(0, 3)}-${ten.slice(3, 6)}-${ten.slice(6)}` : null;
}

export function normalizeJmPlate(raw: string): string | null {
  const s = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (/^\d{4}[A-Z]{2}$/.test(s)) return `${s.slice(0, 4)} ${s.slice(4)}`;
  if (/^[A-Z]{2}\d{4}$/.test(s)) return `${s.slice(0, 2)} ${s.slice(2)}`;
  return null;
}

export const PHONE_HINT = "Enter a Jamaican WhatsApp number — 876 or 658, e.g. 876-555-0123.";
export const PLATE_HINT = "Enter the plate as it appears — e.g. 1234 AB (private) or CL 1234 (commercial).";
