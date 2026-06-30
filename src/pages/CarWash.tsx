import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Check, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubPageNav from "@/components/SubPageNav";
import Footer from "@/components/Footer";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import Testimonials from "@/components/Testimonials";
import AppShowcase from "@/components/AppShowcase";
import Lounge from "@/components/Lounge";
import JoinCommunity from "@/components/JoinCommunity";
import { bookingUrl, whatsappUrl } from "@/lib/links";
import { getDetailingPackages } from "@/lib/api";

// Curated marketing copy per tier (the API stores inclusions as prose; we present
// them as bullets here). Keyed by the tier's service name so live data drives
// price / featured / ordering while the presentation stays polished.
const TIER_CONTENT: Record<string, { blurb: string; points: string[] }> = {
  "Express Detail": {
    blurb: "A quick refresh inside and out — the easy way to keep your car sharp between full details.",
    points: ["Interior vacuum & wipe-down", "Interior & exterior glass", "Hand wash & tyre shine", "About 90 minutes"],
  },
  "Full Detail": {
    blurb: "A complete inside-and-out reset that brings back the showroom feel.",
    points: ["Everything in Express", "Deep interior shampoo & leather care", "Foam wash, clay bar & sealant", "Vents & door jambs"],
  },
  "Showroom Detail": {
    blurb: "The full showroom treatment — meticulous, top to bottom, with lasting protection.",
    points: ["Everything in Full Detail", "One-step paint enhancement", "Ceramic-spray protection", "Engine bay + interior care"],
  },
};

// Shown only if the live catalog can't be reached, so the marketing page never
// renders an empty pricing section.
const FALLBACK_TIERS = [
  { name: "Express Detail", featured: false },
  { name: "Full Detail", featured: true },
  { name: "Showroom Detail", featured: false },
];

const formatFrom = (price: number) => `From J$${price.toLocaleString()}`;

interface PackageCardData {
  name: string;
  blurb: string;
  points: string[];
  featured: boolean;
  price?: number;
  serviceId?: string;
}

const PackagesSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["detailing-packages"],
    queryFn: getDetailingPackages,
    staleTime: 1000 * 60 * 10,
  });

  const live = data ?? [];
  const cards: PackageCardData[] =
    live.length > 0
      ? live.map((p) => ({
          name: p.name,
          blurb: TIER_CONTENT[p.name]?.blurb ?? p.description,
          points: TIER_CONTENT[p.name]?.points ?? [],
          featured: p.isFeatured,
          price: p.basePrice,
          serviceId: p.id,
        }))
      : FALLBACK_TIERS.map((t) => ({
          name: t.name,
          blurb: TIER_CONTENT[t.name]?.blurb ?? "",
          points: TIER_CONTENT[t.name]?.points ?? [],
          featured: t.featured,
        }));

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3">
            Packages
          </p>
          <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-rogue-charcoal">
            Pick your level of clean
          </h2>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {cards.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                  pkg.featured
                    ? "border-rogue-red shadow-xl ring-1 ring-rogue-red/20"
                    : "border-slate-200 shadow-sm hover:shadow-lg"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-6 text-[11px] font-montserrat font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-rogue-red text-white">
                    Most popular
                  </span>
                )}
                <h3 className="text-xl font-montserrat font-bold text-rogue-charcoal mb-1">{pkg.name}</h3>
                {pkg.price !== undefined && (
                  <p className="text-2xl font-montserrat font-bold text-rogue-red mb-2">{formatFrom(pkg.price)}</p>
                )}
                <p className="text-sm text-rogue-slate mb-4 leading-relaxed">{pkg.blurb}</p>
                <ul className="space-y-1.5 mb-6">
                  {pkg.points.map((pt) => (
                    <li key={pt} className="flex items-center text-sm text-rogue-slate">
                      <Check className="h-4 w-4 text-rogue-red mr-2 flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <a
                  href={bookingUrl("/book-a-detail", {
                    campaign: "car-wash",
                    content: `pkg-${pkg.name}`,
                    service: pkg.serviceId,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto"
                >
                  <Button
                    className={`w-full rounded-full font-montserrat font-semibold ${
                      pkg.featured
                        ? "bg-rogue-red hover:bg-rogue-red-dark text-white"
                        : "bg-rogue-charcoal hover:bg-rogue-dark text-white"
                    }`}
                  >
                    Book now
                  </Button>
                </a>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-sm text-rogue-slate mt-8">
          Looking for paint correction, ceramic or PPF? Those are quote-based — start in the booking app and a
          specialist will assess your vehicle.
        </p>
      </div>
    </section>
  );
};

const CarWash = () => (
  <>
    <Helmet>
      <title>Wash &amp; Detailing — Rogue Automotive Jamaica | Book Online</title>
      <meta
        name="description"
        content="Premium car wash, full detailing, paint correction and PPF in Kingston, Jamaica. Book your detail online in under a minute with Rogue Automotive."
      />
      <link rel="canonical" href="https://www.rogueautomotiveja.com/car-wash" />
    </Helmet>

    <div className="min-h-screen bg-white font-roboto">
      <SubPageNav />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-rogue-dark via-rogue-charcoal to-rogue-red-dark text-white">
        <div className="absolute inset-0 bg-rogue-dark/20" />
        <div className="relative container mx-auto px-4 sm:px-6 py-20 sm:py-28 max-w-3xl">
          <span className="inline-flex items-center text-[11px] font-montserrat font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-rogue-red text-white mb-6">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Available now
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-bold mb-5 leading-[1.05]">
            Wash &amp; Detailing
          </h1>
          <p className="text-lg sm:text-xl text-white/85 mb-8 leading-relaxed max-w-xl">
            From a quick express wash to full detailing, paint correction and PPF — booked online in under
            a minute and done by people who treat your car like their own.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href={bookingUrl("/book-a-detail", { campaign: "car-wash", content: "hero" })} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto bg-rogue-red hover:bg-rogue-red-dark text-white border-0 px-7 py-6 text-base font-montserrat font-semibold rounded-full group">
                Book a Detail
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </a>
            <a href={whatsappUrl("Hi Rogue Automotive — I'd like to ask about detailing.")} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border-white/30 px-7 py-6 text-base font-montserrat font-semibold rounded-full">
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Packages (live from the catalog) */}
      <PackagesSection />

      {/* App features showcase — booking, loyalty, saved vehicles, pay, vouchers */}
      <AppShowcase />

      {/* Real before/after gallery (hidden if none available) */}
      <BeforeAfterGallery />

      {/* The lounge — comfort, food & drink, free wifi */}
      <Lounge />

      {/* Real testimonials (hidden if none available) */}
      <Testimonials />

      {/* Join the community — sign-up CTA */}
      <JoinCommunity />

      <Footer />
    </div>
  </>
);

export default CarWash;
