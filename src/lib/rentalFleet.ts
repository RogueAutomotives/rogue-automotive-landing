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
    slug: "bmw-328i-gt",
    name: "BMW 328i GT",
    type: "Luxury",
    pricePerDay: 20000,
    blurb: "The head-turner — a turbocharged BMW Gran Turismo with a sunroof and red leather.",
    description:
      "Our flagship rental. The 328i Gran Turismo pairs BMW's turbocharged four with a hatchback body that swallows luggage, wrapped in red leather with a panoramic sunroof. For weddings, special occasions, or simply making the trip feel like the destination.",
    points: ["Seats 5", "Turbocharged — effortless overtaking", "Red leather interior", "Panoramic sunroof"],
    specs: [
      { label: "Seats", value: "5" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel", value: "Petrol (turbo)" },
      { label: "Interior", value: "Red leather" },
      { label: "Sunroof", value: "Panoramic" },
      { label: "Insurance", value: "Included" },
    ],
    images: [
      "/lovable-uploads/rental-bmw-328i-gt-1.jpg",
      "/lovable-uploads/rental-bmw-328i-gt-2.jpg",
      "/lovable-uploads/rental-bmw-328i-gt-3.jpg",
      "/lovable-uploads/rental-bmw-328i-gt-4.jpg",
      "/lovable-uploads/rental-bmw-328i-gt-5.jpg",
      "/lovable-uploads/rental-bmw-328i-gt-6.jpg",
    ],
  },
  {
    slug: "honda-accord",
    name: "Honda Accord",
    type: "Sedan",
    pricePerDay: 18000,
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
    slug: "nissan-teana",
    name: "Nissan Teana",
    type: "Sedan",
    pricePerDay: 9000,
    blurb: "A smooth, executive-class sedan for business trips and everyday driving.",
    description:
      "The Teana is the easy pick for business travel and everyday driving: a soft, quiet ride, an automatic gearbox, and an executive-feeling cabin without the executive price. Comfortable for four adults on long drives.",
    points: ["Seats 5", "Automatic transmission", "Cold A/C", "Comfortable highway cruiser"],
    specs: [
      { label: "Seats", value: "5" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel", value: "Petrol" },
      { label: "Air conditioning", value: "Yes" },
      { label: "Insurance", value: "Included" },
    ],
    images: [
      "/lovable-uploads/rental-nissan-teana-1.jpg",
      "/lovable-uploads/rental-nissan-teana-2.jpg",
      "/lovable-uploads/rental-nissan-teana-3.jpg",
      "/lovable-uploads/rental-nissan-teana-4.jpg",
      "/lovable-uploads/rental-nissan-teana-5.jpg",
    ],
  },
  {
    slug: "honda-odyssey",
    name: "Honda Odyssey",
    type: "Minivan",
    pricePerDay: 10000,
    blurb: "Room for the whole crew — airport runs, family trips and group outings in comfort.",
    description:
      "The Odyssey is the fleet's people-mover: seven proper seats, cold air throughout, and enough luggage room for an airport run with the whole family's bags. Sliding doors make loading kids (and car seats) painless, and it cruises quietly on the highway.",
    points: ["Seats up to 7", "Automatic transmission", "Cold A/C throughout", "Generous luggage space"],
    specs: [
      { label: "Seats", value: "7" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel", value: "Petrol" },
      { label: "Air conditioning", value: "Front & rear" },
      { label: "Insurance", value: "Included" },
    ],
    images: [
      "/lovable-uploads/rental-honda-odyssey-1.jpg",
      "/lovable-uploads/rental-honda-odyssey-2.jpg",
      "/lovable-uploads/rental-honda-odyssey-3.jpg",
      "/lovable-uploads/rental-honda-odyssey-4.jpg",
      "/lovable-uploads/rental-honda-odyssey-5.jpg",
    ],
  },
  {
    slug: "honda-fit-shuttle",
    name: "Honda Fit Shuttle",
    type: "Hybrid wagon",
    pricePerDay: 10000,
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
