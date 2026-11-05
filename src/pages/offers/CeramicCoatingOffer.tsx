import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import Footer from "@/components/Footer";
import { OfferCta, OfferFinePrint, OfferHero, OfferSteps } from "@/components/offers/OfferParts";
import { bookingUrl } from "@/lib/links";
import { trackEvent } from "@/lib/metaPixel";
import { getCoatingServices } from "@/lib/api";

/**
 * Landing page for the Ceramic Coating ad: 10% off the coating for customers
 * who create an account and book their free inspection through this page.
 * The booking app remembers the offer (/offer/coating), the booking is tagged
 * COATING10, and the 10% comes off when staff set the quote. Mirrors
 * CoatingOffer in the API.
 */

const OFFER = "ceramic-coating-offer";
// Shown if the live catalog can't be reached.
const FALLBACK = [
  { name: "Ceramic Coating (9–12 Months)", basePrice: 45000 },
  { name: "Ceramic Coating Pro (2–3 Years)", basePrice: 85000 },
];

const jmd = (n: number) => `J$${Math.round(n).toLocaleString()}`;

const claimHref = (content: string) => bookingUrl("/offer/coating", { campaign: OFFER, content });
const onClaim = () => trackEvent("Lead", { content_name: OFFER });

const CeramicCoatingOffer = () => {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: OFFER });
  }, []);

  const { data } = useQuery({ queryKey: ["coating-services"], queryFn: getCoatingServices, staleTime: 1000 * 60 * 10 });
  const coatings = data && data.length > 0 ? data : FALLBACK;
  const from = coatings[0].basePrice;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>10% off a ceramic coating | Rogue Automotive</title>
        <meta
          name="description"
          content="Book a free ceramic coating inspection at Rogue Automotive. We check your paint, send your exact price, and take 10% off."
        />
      </Helmet>

      <OfferHero
        eyebrow="Ceramic coating offer"
        title="10% off your ceramic coating. The inspection is free."
        subtitle="A ceramic coating protects your paint for 9 months to 3 years. Book a free inspection, we check your paint and send your exact price with 10% off."
        video="/offer-media/coating-hero.mp4"
        poster="/offer-media/coating-hero.jpg"
        cta={{ label: "Book my free inspection", href: claimHref("hero"), onClick: onClaim }}
        ctaNote="Free account · nothing to pay to book · 10% off your quote"
        secondary={{
          label: "Book without an account (no 10% off)",
          href: bookingUrl("/book-a-detail", { campaign: OFFER, content: "no-account", service: "ceramic-coating" }),
        }}
      />

      {/* Why there's no fixed price: open on the worry ("what will it cost me?"). */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-rogue-charcoal mb-2">Why inspect first?</h2>
          <p className="text-rogue-slate mb-8 leading-relaxed">
            A coating locks in whatever is under it, so the price depends on your paint: its size, and whether it needs
            polishing first. We look before we quote, so you never pay for work your car doesn't need. Coatings start at{" "}
            {jmd(from)}.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Up to 3 months</p>
              <h3 className="font-montserrat font-semibold text-rogue-charcoal">Ceramic Sealant</h3>
              <p className="text-rogue-red font-montserrat font-bold mt-1">{jmd(5000)}</p>
              <p className="text-sm text-rogue-slate mt-2">A spray-on top-up, added to any wash.</p>
            </div>
            {coatings.map((c, i) => (
              <div
                key={c.name}
                className={`rounded-2xl p-5 border ${i === 0 ? "border-rogue-red ring-1 ring-rogue-red/20" : "border-slate-200"}`}
              >
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                  {/\((.+)\)/.exec(c.name)?.[1] ?? "Long-lasting"}
                </p>
                <h3 className="font-montserrat font-semibold text-rogue-charcoal">{c.name.replace(/\s*\(.+\)\s*$/, "")}</h3>
                <p className="text-rogue-red font-montserrat font-bold mt-1">From {jmd(c.basePrice)}</p>
                <p className="text-sm text-green-700 mt-2">10% off with this offer</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OfferSteps
        title="How it works"
        steps={[
          { title: "Create your free account", body: "Name, email and a password. About a minute." },
          { title: "Pick an inspection time", body: "Nothing to pay to book. Your 10% is attached to the booking." },
          { title: "We inspect and send your price", body: "You get your exact quote by email, with 10% already taken off." },
          { title: "You decide", body: "No obligation. Go ahead only if the price works for you." },
        ]}
      />

      <OfferCta title="Protect your paint for years, not weeks." cta={{ label: "Book my free inspection", href: claimHref("bottom"), onClick: onClaim }} />

      <OfferFinePrint
        items={[
          "10% off the quoted price of a Ceramic Coating or Ceramic Coating Pro.",
          "For customers with a Rogue account who book their inspection through this page. One per account.",
          "Your exact price is set after the inspection. The offer comes off that price.",
        ]}
      />

      <Footer />
    </div>
  );
};

export default CeramicCoatingOffer;
