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
