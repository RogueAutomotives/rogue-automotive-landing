import { Sparkles, Car, Key, type LucideIcon } from "lucide-react";

export type BusinessLineStatus = "live" | "soon";

export interface BusinessLine {
  key: "wash" | "sales" | "rentals";
  name: string;
  tagline: string;
  blurb: string;
  features: string[];
  status: BusinessLineStatus;
  route: string;
  icon: LucideIcon;
  /** Tailwind gradient classes for the card/hero accent imagery (interim visual). */
  gradient: string;
}

export const BUSINESS_LINES: BusinessLine[] = [
  {
    key: "wash",
    name: "Wash & Detailing",
    tagline: "Showroom-clean, every time",
    blurb:
      "From an express wash to full interior + exterior detailing, paint correction and PPF — booked online in under a minute.",
    features: ["Wash & vac", "Interior & exterior detailing", "Paint correction & PPF", "Subscriptions"],
    status: "live",
    route: "/car-wash",
    icon: Sparkles,
    gradient: "from-rogue-dark via-rogue-charcoal to-rogue-red-dark",
  },
  {
    key: "sales",
    name: "Car Sales",
    tagline: "Quality vehicles, fairly priced",
    blurb:
      "Hand-picked, inspected vehicles ready for Jamaican roads — with honest pricing and trade-ins welcome.",
    features: ["Inspected & guaranteed", "Fair, transparent pricing", "Trade-ins welcome"],
    status: "soon",
    route: "/car-sales",
    icon: Car,
    gradient: "from-rogue-dark via-rogue-charcoal to-rogue-slate",
  },
  {
    key: "rentals",
    name: "Car Rentals",
    tagline: "Flexible wheels, any occasion",
    blurb:
      "Daily and weekly rentals with insurance included and round-the-clock support — for business or pleasure.",
    features: ["Daily & weekly rates", "Insurance included", "24/7 support"],
    status: "soon",
    route: "/car-rentals",
    icon: Key,
    gradient: "from-rogue-dark via-rogue-charcoal to-rogue-slate",
  },
];

export const STATUS_LABEL: Record<BusinessLineStatus, string> = {
  live: "Available now",
  soon: "Coming soon",
};
