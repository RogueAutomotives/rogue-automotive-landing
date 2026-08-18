/**
 * Client for the rentals API — fleet pricing, availability, bookings and the
 * tokenized payment page. The API is the pricing/availability authority; the
 * static FLEET in rentalFleet.ts stays the content source (photos, blurbs).
 */
import { API_BASE } from "./api";

export interface ApiRentalCar {
  id: string;
  slug: string;
  name: string;
  type: string;
  pricePerDay: number;
  securityDeposit: number;
  /** Minimum rental length in days for online bookings (default 3). */
  minRentalDays: number;
  isActive: boolean;
}

export interface BlockedRange {
  start: string;
  end: string;
}

export interface RentalPricing {
  days: number;
  pricePerDay: number;
  rentalSubtotal: number;
  securityDeposit: number;
  depositDue: number;
  totalWithSecurity: number;
}

export interface RentalPayPage {
  bookingId: string;
  carName: string;
  carSlug: string;
  startDate: string;
  endDate: string;
  customerFirstName: string;
  pricing: RentalPricing;
  /** "Unpaid" | "DepositPaid" | "FullyPaid" | "FullyPaidWithSecurity" */
  paymentState: string;
  status: string;
  amountPaidOnline: number;
  balanceWithSecurity: number;
  isExpired: boolean;
}

export interface CreateRentalBookingRequest {
  carSlug: string;
  startDate: string;
  endDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  notes?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  referrer?: string;
}

export interface CreateRentalBookingResult {
  isSuccess: boolean;
  errorMessage?: string;
  bookingId: string;
  token: string;
  pricing: RentalPricing;
}

export interface RentalPaymentIntent {
  isSuccess: boolean;
  errorMessage?: string;
  paymentIntentId: string;
  clientSecret: string;
  amount: number;
  currency: string;
}

export interface ConfirmRentalPaymentResult {
  isSuccess: boolean;
  errorMessage?: string;
  bookingId: string;
  status?: string;
  paymentState?: string;
  datesUnavailable?: boolean;
  refunded?: boolean;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message =
      (data as { message?: string } | null)?.message ??
      "Something went wrong — please try again.";
    throw new Error(message);
  }
  return data as T;
}

export const getRentalCars = () => request<ApiRentalCar[]>("/rentals/cars");

export const getRentalAvailability = (slug: string) =>
  request<{ slug: string; blocked: BlockedRange[] }>(`/rentals/cars/${slug}/availability`);

export const createRentalBooking = (body: CreateRentalBookingRequest) =>
  request<CreateRentalBookingResult>("/rentals/bookings", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const getRentalPayPage = (token: string) =>
  request<RentalPayPage>(`/rentals/pay/${encodeURIComponent(token)}`);

export const createRentalPayment = (token: string, option: "Deposit50" | "FullWithSecurity") =>
  request<RentalPaymentIntent>("/rentalpayments/create", {
    method: "POST",
    body: JSON.stringify({ token, option }),
  });

export const confirmRentalPayment = (paymentIntentId: string) =>
  request<ConfirmRentalPaymentResult>(
    `/rentalpayments/confirm/${encodeURIComponent(paymentIntentId)}`,
    { method: "POST" }
  );

export const formatJmd = (n: number) => `J$${Math.round(n).toLocaleString()}`;

export const STRIPE_PUBLISHABLE_KEY: string =
  (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined) ?? "";
