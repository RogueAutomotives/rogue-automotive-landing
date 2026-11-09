/** Shared client for the public Rogue API (gallery, testimonials, contact). */

export const API_BASE: string =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "https://api.rogueautomotiveja.com/api";

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  categoryName?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface Testimonial {
  rating: number;
  comment: string;
  displayName: string;
  serviceName?: string;
  createdAt: string;
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (await res.json()) as T;
}

/** Public before/after showcase gallery (active items only, ordered). */
export async function getGallery(): Promise<GalleryItem[]> {
  const items = await getJson<GalleryItem[]>("/gallery");
  return items
    .filter((g) => g.isActive && g.beforeImageUrl && g.afterImageUrl)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/** Public, approved customer testimonials. */
export async function getTestimonials(): Promise<Testimonial[]> {
  return getJson<Testimonial[]>("/testimonials");
}

export interface DetailingPackage {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  isFeatured: boolean;
}

interface DetailingServiceListItem {
  id: string;
  name: string;
  description: string;
  category: number;
  basePrice: number;
  isActive: boolean;
  bookingType?: number;
  isFeatured?: boolean;
}

const PACKAGE_CATEGORY = 4; // ServiceCategory.Package
const CONSULTATION = 2; // BookingType.Consultation (quote-based — excluded from tiers)

/**
 * The customer-facing three-tier detail lineup (Package category, standard
 * pricing), ordered cheapest → priciest. Excludes quote-based premium protection.
 */
export async function getDetailingPackages(): Promise<DetailingPackage[]> {
  const items = await getJson<DetailingServiceListItem[]>("/detailingservices");
  return items
    .filter((s) => s.isActive && s.category === PACKAGE_CATEGORY && s.bookingType !== CONSULTATION)
    .sort((a, b) => a.basePrice - b.basePrice)
    .map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      basePrice: s.basePrice,
      isFeatured: !!s.isFeatured,
    }));
}

export interface WashPrice {
  serviceType: number; // 1 = Exterior Wash, 2 = Wash & Vacuum
  serviceTypeName: string;
  vehicleType: number; // 1 = Sedan
  price: number;
}

/** The walk-in wash price list (what the counter charges, per vehicle type). */
export async function getWashPrices(): Promise<WashPrice[]> {
  return getJson<WashPrice[]>("/washlogs/prices");
}

export interface CoatingService {
  id: string;
  name: string;
  description: string;
  basePrice: number;
}

/** The ceramic coating services (quote-based), cheapest first. */
export async function getCoatingServices(): Promise<CoatingService[]> {
  const items = await getJson<DetailingServiceListItem[]>("/detailingservices");
  return items
    .filter((s) => s.isActive && /^ceramic coating/i.test(s.name.trim()))
    .sort((a, b) => a.basePrice - b.basePrice)
    .map((s) => ({ id: s.id, name: s.name, description: s.description, basePrice: s.basePrice }));
}

export interface ComboService {
  id: string;
  name: string;
  basePrice: number;
  /** Last Jamaica date the service can be booked ("YYYY-MM-DD"), if time-boxed. */
  availableUntil?: string | null;
}

/**
 * The Coating Combo promo service, or null when the catalog doesn't list it
 * (the API hides it once its availableUntil date has passed).
 */
export async function getCoatingCombo(): Promise<ComboService | null> {
  const items = await getJson<(DetailingServiceListItem & { availableUntil?: string | null })[]>("/detailingservices");
  const combo = items.find((s) => s.isActive && /^coating combo/i.test(s.name.trim()));
  return combo
    ? { id: combo.id, name: combo.name, basePrice: combo.basePrice, availableUntil: combo.availableUntil ?? null }
    : null;
}
