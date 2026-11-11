/**
 * Rental fleet — single source of truth for the /car-rentals grid, the
 * per-car detail pages (PDP) and the booking-request form's car selector.
 *
 * Photos live in public/lovable-uploads/ as rental-<slug>-N.jpg; the first
 * image is the hero/card shot. Cars with an empty images array render the
 * on-brand fallback tile until photos are uploaded.
 */

export interface RentalCar {
  slug: string;
  name: string;
  type: string;
  pricePerDay: number;
  /** Fixed USD guide price for overseas visitors (display only — bookings charge in JMD). */
  priceUsdPerDay: number;
  /** Card + PDP hero blurb. */
  blurb: string;
  /** Longer PDP description. */
  description: string;
  /** Card checklist (kept short). */
  points: string[];
  /** PDP spec sheet. */
  specs: { label: string; value: string }[];
  /** public/ paths; first entry is the hero. Empty = fallback tile. */
  images: string[];
}

export const FLEET: RentalCar[] = [
  {
    slug: "honda-accord",
    name: "Honda Accord",
    type: "Sedan",
    pricePerDay: 18000,
    priceUsdPerDay: 120,
    blurb: "A refined midsize sedan — polished, powerful and comfortable everywhere.",
    description:
      "The Accord blends executive comfort with Honda dependability: a composed highway ride, a quiet, well-finished cabin, and enough performance to make cross-island trips effortless. The step-up sedan when you want to arrive relaxed.",
    points: ["Seats 5", "Automatic transmission", "Premium cabin", "Composed highway ride"],
    specs: [
      { label: "Seats", value: "5" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel", value: "Petrol" },
      { label: "Air conditioning", value: "Climate control" },
      { label: "Insurance", value: "Included" },
    ],
    images: [
      "/lovable-uploads/rental-honda-accord-1.jpg",
      "/lovable-uploads/rental-honda-accord-2.jpg",
      "/lovable-uploads/rental-honda-accord-3.jpg",
      "/lovable-uploads/rental-honda-accord-4.jpg",
      "/lovable-uploads/rental-honda-accord-5.jpg",
    ],
  },
  {
    slug: "honda-fit-shuttle",
    name: "Honda Fit Shuttle",
    type: "Hybrid wagon",
    pricePerDay: 10000,
    priceUsdPerDay: 70,
    blurb: "A thrifty hybrid wagon — nimble in town, surprisingly big in the back.",
    description:
      "The Fit Shuttle is the smart-money rental: Honda's hybrid system sips fuel in Kingston traffic, it parks anywhere, and the wagon body hides a load bay far bigger than the footprint suggests. Ideal for solo travellers, couples and errand-heavy weeks.",
    points: ["Seats 5", "Hybrid — excellent fuel economy", "Automatic transmission", "Big fold-flat cargo area"],
    specs: [
      { label: "Seats", value: "5" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel", value: "Hybrid (petrol-electric)" },
      { label: "Air conditioning", value: "Yes" },
      { label: "Insurance", value: "Included" },
    ],
    images: [
      "/lovable-uploads/rental-fit-shuttle-1.jpg",
      "/lovable-uploads/rental-fit-shuttle-2.jpg",
      "/lovable-uploads/rental-fit-shuttle-3.jpg",
      "/lovable-uploads/rental-fit-shuttle-4.jpg",
      "/lovable-uploads/rental-fit-shuttle-5.jpg",
    ],
  },
];

export const findRental = (slug: string | undefined) =>
  FLEET.find((c) => c.slug === slug);

export const formatJmd = (n: number) => `J$${n.toLocaleString()}`;
