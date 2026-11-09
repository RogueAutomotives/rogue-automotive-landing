import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Car, Check, ShieldCheck } from "lucide-react";
import Footer from "@/components/Footer";
import { OfferCta, OfferFinePrint, OfferHeader, OfferHero, OfferSteps } from "@/components/offers/OfferParts";
import { bookingUrl } from "@/lib/links";
import { trackEvent } from "@/lib/metaPixel";
import { getCoatingCombo } from "@/lib/api";
import { COATING_COMBO_UNTIL, jamaicaToday } from "@/lib/promos";

/**
 * Landing page for the Coating Combo promo (Nov 2026): Bronze Detail +
 * 1-year ceramic coating in one visit, booked like any detail (30% deposit).
 * The booking app pre-selects it from ?service=coating-combo. The API hides
 * the service after its availableUntil date, and this page then says so.
 */

const OFFER = "coating-combo-nov26";
// Shown if the live catalog can't be reached.
const FALLBACK_CAR = 49999;
// What a car would pay booking Bronze Detail + Ceramic Coating separately.
const SEPARATE_CAR = 9999 + 45000;
const SUV_MULTIPLIER = 1.1;

const jmd = (n: number) => `J$${Math.round(n).toLocaleString()}`;

const bookHref = (content: string) =>
  bookingUrl("/book-a-detail", { campaign: OFFER, content, service: "coating-combo" });
const onBook = () => trackEvent("Lead", { content_name: OFFER });

const INSIDE = [
  "Seats steamed and shampooed",
  "Full vacuum, carpets and mats",
  "Dash, console and door panels cleaned",
  "Interior UV protection",
  "Streak-free glass",
];

const OUTSIDE = [
  "Foam pre-wash and two-bucket hand wash",
  "Wheels and tyres cleaned",
  "Clay-bar decontamination",
  "Machine prep and IPA wipe-down",
  "Ceramic coating: 9–12 months of water-beading shine and UV resistance",
];

const TITLE = "The Coating Combo: inside and out for J$49,999 | Rogue Automotive";
const DESCRIPTION =
  "Bronze Detail + 1-year ceramic coating in one visit at Rogue Automotive, Kingston. J$49,999 for cars, J$54,999 for SUVs. Until November 30.";
const PAGE_URL = "https://rogueautomotiveja.com/offers/coating-combo";
const OG_IMAGE = "https://rogueautomotiveja.com/offer-media/coating-hero.jpg";

const CoatingComboOffer = () => {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: OFFER });
  }, []);

  const { data, isSuccess } = useQuery({
    queryKey: ["coating-combo"],
    queryFn: getCoatingCombo,
    staleTime: 1000 * 60 * 10,
  });

  // Ended: past the last day, or the live catalog no longer lists it. If the
  // catalog can't be reached we keep showing the offer with fallback prices.
  const ended = jamaicaToday() > COATING_COMBO_UNTIL || (isSuccess && data === null);
  const car = data?.basePrice ?? FALLBACK_CAR;
  const suv = Math.round(car * SUV_MULTIPLIER);
  const saving = SEPARATE_CAR - car;

  const head = (
    <Helmet>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <link rel="canonical" href={PAGE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={PAGE_URL} />
      <meta property="og:title" content="The Coating Combo: inside and out for J$49,999" />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content="The Coating Combo: inside and out for J$49,999" />
      <meta property="twitter:description" content={DESCRIPTION} />
      <meta property="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );

  if (ended) {
    return (
      <div className="min-h-screen bg-white">
        {head}
        <section className="relative min-h-[70svh] flex items-center bg-rogue-dark">
          <OfferHeader />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-28 pb-16">
            <div className="max-w-xl">
              <p className="text-red-400 font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3">
                The Coating Combo
              </p>
              <h1 className="text-[2rem] leading-[1.1] sm:text-5xl font-montserrat font-bold text-white mb-4">
                This offer has ended
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-7">
                The Coating Combo ran until November 30, 2026. Our detailing packages and ceramic coatings are still
                available to book.
              </p>
              <Link
                to="/car-wash"
                className="flex sm:inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold text-base px-7 py-4 transition-colors"
              >
                See our detailing packages
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {head}

      <OfferHero
        eyebrow="Limited time · Until November 30"
        title={`The Coating Combo — inside and out for ${jmd(car)}`}
        subtitle="Bronze Detail + 1-year ceramic coating in one visit. Until November 30."
        video="/offer-media/coating-hero.mp4"
        poster="/offer-media/coating-hero.jpg"
        cta={{ label: "Book the Coating Combo", href: bookHref("hero"), onClick: onBook }}
        ctaNote="30% deposit secures your slot · drop off at 9 or 10 AM"
      />

      {/* The price, in plain numbers */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-rogue-charcoal mb-6">What you pay</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-rogue-red ring-1 ring-rogue-red/20 p-5 sm:p-6">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Cars</p>
              <p className="text-3xl sm:text-4xl font-montserrat font-bold text-rogue-charcoal">{jmd(car)}</p>
              {saving > 0 && (
                <p className="text-sm text-green-700 font-medium mt-2">
                  Save {jmd(saving)} vs booking separately (cars)
                </p>
              )}
            </div>
            <div className="rounded-2xl border border-slate-200 p-5 sm:p-6">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">SUVs, pickups &amp; vans</p>
              <p className="text-3xl sm:text-4xl font-montserrat font-bold text-rogue-charcoal">{jmd(suv)}</p>
              <p className="text-sm text-rogue-slate mt-2">Same work, sized for a bigger vehicle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-rogue-charcoal mb-2">What's included</h2>
          <p className="text-rogue-slate mb-8">A full Bronze Detail plus a ceramic coating, done in one visit.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Car, title: "Inside", items: INSIDE },
              { icon: ShieldCheck, title: "Outside", items: OUTSIDE },
            ].map(({ icon: Icon, title, items }) => (
              <div key={title} className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="h-6 w-6 text-rogue-red" />
                  <h3 className="font-montserrat font-semibold text-rogue-charcoal text-lg">{title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm sm:text-base text-rogue-slate leading-snug">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-rogue-red flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OfferSteps
        title="How it works"
        steps={[
          { title: "Book online", body: "Pick your day. A 30% deposit secures your slot." },
          { title: "Drop off at 9 or 10 AM", body: "Morning starts only, so the coating has time to go on properly." },
          { title: "Pick up the same afternoon", body: "Clean inside, coated outside, ready to go." },
        ]}
      />

      <OfferCta
        title="Inside and out, in one visit."
        cta={{ label: "Book the Coating Combo", href: bookHref("bottom"), onClick: onBook }}
      />

      <OfferFinePrint
        items={[
          `${jmd(car)} for cars; ${jmd(suv)} for SUVs, pickups and vans.`,
          "Price assumes paint in normal condition. Heavy swirls or scratches that need paint correction are quoted separately.",
          "Morning drop-off only (9 or 10 AM). The 30% deposit is non-refundable and secures your slot.",
          "Offer ends November 30, 2026.",
        ]}
      />

      <Footer />
    </div>
  );
};

export default CoatingComboOffer;
