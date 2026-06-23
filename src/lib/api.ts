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
